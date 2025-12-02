import { BASE_BACK_URL } from '../config/configBaseBackUrl';
import { endPointUser } from '../config/configEndpointUser';
import type { iStatusError } from '../interfaces/iSatatus';
import { EModalGlobalType } from '../types/enumGlobalModalType';
import type { TActiveTaskerUser } from '../types/typeActiveTaskUser';
import type { TTaskerImage } from '../types/typeTaskerImage';
import apiRequest from '../utils/apiRequestUtils';
import { bufferToBase64 } from '../utils/dataUrlToBlob';
import useGlobalModal from './useGlobalModal';
import useMain from './useMain';

const useTaskerApi = () => {
  const { ALL_TASKERS } = endPointUser; // ahora solo necesitás este
  const { showError, openGlobalModal } = useGlobalModal();
  const { setLoading, setTaskerData } = useMain();

  // CARGAR IMAGENES POR URL QUE VIENE DEL BACKEND
  const loadTaskerImages = async (taskers: TActiveTaskerUser[], accessToken: string): Promise<TActiveTaskerUser[]> => {
    setLoading(true)
    return Promise.all(
      taskers.map(async (t) => {
        let profileImage: string | null = null;
        let experienceImages: string[] = [];

        // PERFIL
        if (t.profileImageUrl) {
          const img: TTaskerImage = await apiRequest<TTaskerImage>(`${BASE_BACK_URL}/${t.profileImageUrl}`, { headers: { Authorization: `Bearer ${accessToken}` } });
          
          // SI  VIENE IMAGEN Y SU LONGITUD ES MAYOR QUE CERO
          if (img?.base64 && img.base64.data.length > 0) {
            const base64Str:string = bufferToBase64(img.base64.data);
            profileImage = `data:${img.mimeType};base64,${base64Str}`;
          }
        }

        // EXPERIENCIAS
        const urls: string[] = Array.isArray(t.experienceImagesUrl) ? t.experienceImagesUrl : t.experienceImagesUrl ? [t.experienceImagesUrl] : [];

        // SI VIENEN URLS
        if (urls.length > 0) { 
          const imgs = await Promise.all(
            urls.map(async (url) => {
              const img: TTaskerImage = await apiRequest<TTaskerImage>(`${BASE_BACK_URL}/${url}`, { headers: { Authorization: `Bearer ${accessToken}` } });
              if (img?.base64 && img.base64.data.length > 0) {
                const base64Str:string = bufferToBase64(img.base64.data);
                return `data:${img.mimeType};base64,${base64Str}`;
              }
              return ''; // SI NO HAY IMAGEN
            }),
          );
          experienceImages = imgs.filter(Boolean); //EVITAR VACIOS
        }
        return { ...t, imageExpBase64:experienceImages, imageProfileBase64:profileImage } as TActiveTaskerUser;
      }),
    );
  };

  const getTaskers = async ({ accessToken }: { accessToken: string }): Promise<void> => {
    setLoading(true)
    try {
      const taskers: TActiveTaskerUser[] = await apiRequest<TActiveTaskerUser[]>(ALL_TASKERS, {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: 'include',
      });

      // SI NO ES UN ARREGLO
      if (!Array.isArray(taskers)) {
        console.error('Respuesta de API inválida:', taskers);
        throw new Error('La API no devolvió un array.');
      }

      // TASKERS CON IMAGENES
      const taskersWithImages: TActiveTaskerUser[] = await loadTaskerImages(taskers, accessToken);

      setTaskerData(taskersWithImages); //GUARDAR TASKERS
    } catch (error) {
      const err = error as iStatusError;
      openGlobalModal(EModalGlobalType.MODAL_ERROR);
      showError('Ups', 'Ocurrio un error inesperado. Intente de nuevo más tarde.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { getTaskers, loadTaskerImages };
};

export default useTaskerApi;
