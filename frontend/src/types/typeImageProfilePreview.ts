import type { Dispatch, SetStateAction } from "react";
import type { TIdString } from "./typeUUID";

// TIPO PARA IMAGEN VISTA PREVIA PERFIL CONTEXTO
export type TProfileImagePreviewProps = {
  onDeleteProfile: (id: TIdString) => void;
  setSrc: Dispatch<SetStateAction<string | null>>;
  src: string | null;
};