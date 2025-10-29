import useGlobalModal from './useGlobalModal';
import { EModalGlobalType } from '../types/enumGlobalModalType';
import type { iHeader } from '../interfaces/iHeader';

const useHeader = () => {
  const { openGlobalModal } = useGlobalModal();
  const openLogin = () => openGlobalModal(EModalGlobalType.MODAL_LOGIN);

  // FUNCION QUE SOLO INDICA ABRIR MODAL DE ROL A ELEGUIR
  const openRole = (): void => openGlobalModal(EModalGlobalType.MODAL_ROLE); // ==> PASO EL TIPO DE MODAL A ABRIR

  return { openRole, openLogin } as iHeader;
};

export default useHeader;
