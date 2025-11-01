import type { TIdString } from "./typeUUID";

// TIPO PARA IMAGEN VISTA PREVIA PERFIL CONTEXTO
export type TProfileImagePreviewProps = {
  onDeleteProfile: (id: TIdString) => void;
  setSrc: React.Dispatch<React.SetStateAction<string | null>>;
  src: string | null;
};