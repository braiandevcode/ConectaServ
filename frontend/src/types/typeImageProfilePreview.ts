import type { Dispatch, SetStateAction } from "react";

// TIPO PARA IMAGEN VISTA PREVIA PERFIL CONTEXTO
export type TProfileImagePreviewProps = {
  onDeleteProfile: (id: string) => void;
  setSrc: Dispatch<SetStateAction<string | null>>;
  src: string | null;
};