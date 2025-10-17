// TIPO DE ESTRUCTURA PARA ROLE
export type TRole = {
  handleToggleModal: () => void;
  handleClientClick: () => void;
  handleProClick: () => void;
  setIsModalClosed: React.Dispatch<React.SetStateAction<boolean>>;
  isModalClosed: boolean;
  isShow: string;
  client: boolean | null;
};
