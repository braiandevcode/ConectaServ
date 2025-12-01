import { endPointUser } from '../config/configEndpointUser';
import type { iStatusError } from '../interfaces/iSatatus';
import { EModalGlobalType } from '../types/enumGlobalModalType';
import type { TDataPayloadUser } from '../types/typeDataPayloadUser';
import apiRequest from '../utils/apiRequestUtils';
import useGlobalModal from './useGlobalModal';
import useMain from './useMain';

const useTaskerApi = () => {
  const { ALL_TASKERS } = endPointUser;
  const { showError, openGlobalModal } = useGlobalModal();
  const { setLoading, setTaskerData } = useMain();

  // ESPERAR A CARGAR FUNCIONES
  const loadTaskerImages = async (taskers: TDataPayloadUser[], accessToken: string): Promise<TDataPayloadUser[]> => {
    const updatedTaskers = await Promise.all(
      taskers.map(async (t) => {
        let profileImage = null;
        let experienceImages: string[] = [];

        // SI EL TASKER TIENE UNA IMAGEN
        if (t.profileImageId) {
          const img = await apiRequest<{mimeType:string, base64:string }>(`${ALL_TASKERS}/images/${t.profileImageId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          profileImage = `data:${img.mimeType};base64,${img.base64}`;
        }

        if (t.experienceImageIds && t.experienceImageIds.length > 0) {
          const imgs = await Promise.all(
            t.experienceImageIds.map(async (id) => {
              const img = await apiRequest<{ mimeType:string, base64:string }>(`${ALL_TASKERS}/experiences/images/${id}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
              });
              
              if(img){
                return `data:${img.mimeType};base64,${img.base64}`;
              }
              return null;
            }),
          );
          experienceImages = imgs.filter(Boolean) as string[];
        }

        return { ...t, profileImage, experienceImages };
      }),
    );

    return updatedTaskers;
  };

  const getTaskers = async ({ accessToken }: { accessToken: string }): Promise<void> => {
    try {
      const taskers = await apiRequest<TDataPayloadUser[]>(`${ALL_TASKERS}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: 'include',
      });

      // PIDO IMAGENES USANDO EL ID
      const taskersWithImages = await loadTaskerImages(taskers, accessToken);

      setTaskerData(taskersWithImages);
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
