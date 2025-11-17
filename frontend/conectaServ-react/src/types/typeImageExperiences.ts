import type { Dispatch, SetStateAction } from "react";
import type { TIdString } from "./typeUUID";

// TIPO PARA IMAGEN VISTA PREVIA EXPERIENCIAS CONTEXTO
export type TExperienceImagesPreviewProps = {
  setSrcVector: Dispatch<SetStateAction<string[]>>;
  onDeleteExperience: (id: TIdString) => void;
  srcVector: string[];
};