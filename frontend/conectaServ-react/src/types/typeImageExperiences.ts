import type { TIdString } from "./typeUUID";

// TIPO PARA IMAGEN VISTA PREVIA EXPERIENCIAS CONTEXTO
export type TExperienceImagesPreviewProps = {
  setSrcVector: React.Dispatch<React.SetStateAction<string[]>>;
  onDeleteExperience: (id: TIdString) => void;
  srcVector: string[];
};