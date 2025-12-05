import { BASE_BACK_URL } from '../config/configBaseBackUrl';
import { endPointUser } from '../config/configEndpointUser';
import type { iStatusError } from '../interfaces/iSatatus';
import { EModalGlobalType } from '../types/enumGlobalModalType';
import type { TActiveTaskerUser } from '../types/typeActiveTaskUser';
import type { TDataPayloadTaskerSingle } from '../types/typeDataPayloadTaskerSingle';
import type { TTaskerImage } from '../types/typeTaskerImage';
import apiRequest from '../utils/apiRequestUtils';
import { bufferToBase64 } from '../utils/dataUrlToBlob';
import useGlobalModal from './useGlobalModal';
import useMain from './useMain';
import useUserApi from './useUserApi';

const useTaskerApi = () => {
  const { ALL_TASKERS, TASKER_INFO } = endPointUser;
  const { showError, openGlobalModal } = useGlobalModal();
  const { setLoading, setTaskerData } = useMain();
  const { loadTaskerImagesProfile: loadImageTaskerSingle } = useUserApi();

  // CARGAR IMAGENES POR URL QUE VIENE DEL BACKEND
  const loadTaskerImagesProfile = async (taskers: TActiveTaskerUser[], accessToken: string): Promise<TActiveTaskerUser[]> => {
    return Promise.all(
      taskers.map(async (t) => {
        let profileImage: string | null = null;

        // PERFIL
        if (t.profileImageUrl) {
          const img: TTaskerImage = await apiRequest<TTaskerImage>(`${BASE_BACK_URL}/${t.profileImageUrl}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          // SI  VIENE IMAGEN Y SU LONGITUD ES MAYOR QUE CERO
          if (img?.base64 && img.base64.data.length > 0) {
            const base64Str: string = bufferToBase64(img.base64.data);
            profileImage = `data:${img.mimeType};base64,${base64Str}`;
          }
        }
        return { ...t, imageProfileBase64: profileImage } as TActiveTaskerUser;
      }),
    );
  };

  const getDetailsTasker = async ({ accessToken, idTasker }: { accessToken: string; idTasker:string }): Promise<TDataPayloadTaskerSingle | null> => {
    try {
      setLoading(true);
      const tasker = await apiRequest<TDataPayloadTaskerSingle | null>(`${TASKER_INFO}/${idTasker}/details`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!tasker) return null;

      // TASKERS CON IMAGENES
      const taskerSingleWithImages: TDataPayloadTaskerSingle = await loadImageTaskerSingle<TDataPayloadTaskerSingle>(tasker, accessToken);

      const taskerInfo = {...tasker, ...taskerSingleWithImages  } as TDataPayloadTaskerSingle;  
      return taskerInfo;
      
    } catch (error) {
      const err = error as iStatusError;
      openGlobalModal(EModalGlobalType.MODAL_ERROR);
      showError('Ups', 'Ocurrio un error inesperado. Intente de nuevo más tarde.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getTaskers = async ({ accessToken }: { accessToken: string }): Promise<TActiveTaskerUser[]> => {
    setLoading(true);
    try {
      const taskers: TActiveTaskerUser[] = await apiRequest<TActiveTaskerUser[]>(ALL_TASKERS, {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // SI NO ES UN ARREGLO
      if (!Array.isArray(taskers)) {
        throw new Error('La API no devolvió un array.');
      }

      // TASKERS CON IMAGENES
      const taskersWithImages: TActiveTaskerUser[] = await loadTaskerImagesProfile(taskers, accessToken);

      setTaskerData(taskersWithImages); //GUARDAR TASKERS

      return taskersWithImages;
    } catch (error) {
      const err = error as iStatusError;
      openGlobalModal(EModalGlobalType.MODAL_ERROR);
      showError('Ups', 'Ocurrio un error inesperado. Intente de nuevo más tarde.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { getTaskers, loadTaskerImagesProfile, getDetailsTasker };
};

export default useTaskerApi;
