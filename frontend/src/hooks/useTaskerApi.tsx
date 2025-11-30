import { endPointUser } from '../config/configEndpointUser';
import type { iStatusError } from '../interfaces/iSatatus';
import { EModalGlobalType } from '../types/enumGlobalModalType';
import type { TDataPayloadUser } from '../types/typeDataPayloadUser';
import apiRequest from '../utils/apiRequestUtils';
import useGlobalModal from './useGlobalModal';
import useMain from './useMain';

const useTaskerApi = () => {
  const { ALL_TASKERS } = endPointUser;
  const { showError, openGlobalModal } = useGlobalModal(); //HOOK QUE USA EL CONTEXTO DE MODAL GLOBAL
  const { setLoading, setTaskerData } = useMain();

  //VER TODOS LOS TASKERS
  const getTaskers = async ({ accessToken }: { accessToken: string; }): Promise<void> => {
    try {
      setLoading(true);
      const taskers = await apiRequest<TDataPayloadUser[]>(`${ALL_TASKERS}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });

      setTaskerData(taskers);
    } catch (error) {
      let title: string = 'Ups';
      let userMessage: string = 'Ocurrio un error inesperado. Intente de nuevo más tarde.';
      const err = error as iStatusError;
      openGlobalModal(EModalGlobalType.MODAL_ERROR);
      // SINO ERROR INESPERADO
      showError(title, userMessage);
      throw err;
    } finally {
        setLoading(false);
    }
  };

  return { getTaskers };
};

export default useTaskerApi;
