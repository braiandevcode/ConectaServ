import type { TExperienceImagesPreviewProps } from "./typeImageExperiences";
import type { TProfileImagePreviewProps } from "./typeImageProfilePreview";
import type { TStepTwoProps } from "./typePropsStepTwo";

export type TTypeContextStepTwo = TExperienceImagesPreviewProps & TProfileImagePreviewProps & Pick<TStepTwoProps, 'loadImg' | 'setLoadImg' | 'setLoadImgExp' | 'loadImgExp' | 'handleDescriptionInput' | 'handleDescriptionBlur' | 'handleImageExperiencesChange' | 'handleImageProfileChange'>;
