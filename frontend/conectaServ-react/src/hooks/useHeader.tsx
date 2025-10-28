import useGlobalModal from './useGlobalModal';
import { EModalGlobalType } from '../types/enumGlobalModalType';
import type { iHeader } from '../interfaces/iHeader';

const useHeader = () => {
  const { openGlobalModal } = useGlobalModal();
  // const openLogin = () => openModal(EModalType.MODAL_LOGIN);

  // FUNCION QUE SOLO INDICA ABRIR MODAL DE ROL A ELEGUIR
  const openRole = (): void => openGlobalModal(EModalGlobalType.MODAL_ROLE); // ==> PASO EL TIPO DE MODAL A ABRIR

  return { openRole } as iHeader;
};

export default useHeader;
