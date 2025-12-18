import type { Dispatch, SetStateAction } from "react";

// TIPO PARA IMAGEN VISTA PREVIA EXPERIENCIAS CONTEXTO
export type TExperienceImagesPreviewProps = {
  setSrcVector: Dispatch<SetStateAction<string[]>>;
  onDeleteExperience: (id:string) => void;
  srcVector: string[];
};