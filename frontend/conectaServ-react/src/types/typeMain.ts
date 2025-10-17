import type { TRole } from "./typeModalRole";

export type TMain = TRole &{
  closeModal:() => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  isModalOpen: boolean;
};