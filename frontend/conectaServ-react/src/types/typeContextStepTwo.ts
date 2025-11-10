import type { TExperienceImagesPreviewProps } from "./typeImageExperiences";
import type { TProfileImagePreviewProps } from "./typeImageProfilePreview";
import type { TStepTwoProps } from "./typePropsStepTwo";

export type TTypeContextStepTwo = TExperienceImagesPreviewProps & TProfileImagePreviewProps & Pick<TStepTwoProps, 'handleDescriptionInput' | 'handleDescriptionBlur' | 'handleImageExperiencesChange' | 'handleImageProfileChange'>;
