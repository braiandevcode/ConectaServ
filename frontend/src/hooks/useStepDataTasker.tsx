
import { defaultDataTasker } from '../config/defaultDataTasker';
import type { iFormStateValidationTask } from '../interfaces/iFormStateValidationTask';
import BudgeValidator from '../modules/validators/BudgeValidator';
import ConfirmPasswordValidator from '../modules/validators/ConfirmPasswordValidator';
import DescriptionValidator from '../modules/validators/DescriptionValidator';
import EmailValidator from '../modules/validators/EmailValidator';
import FullNameValidator from '../modules/validators/FullNameValidator';
import ImageExperiencesValidator from '../modules/validators/ImageExperiencesValidator';
import ImageProfileValidator from '../modules/validators/ImageProfileValidator';
import PasswordValidator from '../modules/validators/PasswordValidator';
import SelectedValidator from '../modules/validators/SelectedValidator';
import UserNameValidator from '../modules/validators/UserNameValidator';
import { EKeyDataByStep, ENamesOfKeyLocalStorage } from '../types/enums';
import type { TStepDataTasker } from '../types/typeStepData';
import { readExistingData } from '../utils/storageUtils';
import useRegister from './useRegister';

// INSTANCIO VALIDACIONES NECESARIAS
const descriptionValidator: DescriptionValidator = new DescriptionValidator();
const imageProfileValidator: ImageProfileValidator = new ImageProfileValidator();
const imageExperiencesValidator: ImageExperiencesValidator = new ImageExperiencesValidator();
const selectedCategoryValidator: SelectedValidator = new SelectedValidator();
const budgeValidator: BudgeValidator = new BudgeValidator();
const fullNameValidator: FullNameValidator = new FullNameValidator();
const userNameValidator: UserNameValidator = new UserNameValidator();
const emailValidator: EmailValidator = new EmailValidator();
const passwordValidator: PasswordValidator = new PasswordValidator();
const confirmPasswordValidator: ConfirmPasswordValidator = new ConfirmPasswordValidator();

// HOOK PARA RETORNAR DATOS DEL USUARIO ACTUALIZADOS EN STORAGE
const useStepDataTasker = () => {
  //--------------------------------------------------------------------HOOKS DE REACT--------------------------------------------------------------------//
  const { password, confirmPassword } = useRegister(); //HOOK QUE USA CONTEXTO NIVEL REGISTRO

  const stored = readExistingData(ENamesOfKeyLocalStorage.STEP_DATA); //LEEO Y PARSEO OBJETO GENERAL DE PASOS
  const STEP_DATA_TASKER: TStepDataTasker = {
    [EKeyDataByStep.ONE]: {
      ...defaultDataTasker[EKeyDataByStep.ONE], //VALOR POR DEFECTO
      ...stored?.[EKeyDataByStep.ONE], // PISADO PODR EL VALOR EN STORAGE
    },
    [EKeyDataByStep.TWO]: {
      ...defaultDataTasker[EKeyDataByStep.TWO],
      ...stored?.[EKeyDataByStep.TWO],
    },
    [EKeyDataByStep.THREE]: {
      ...defaultDataTasker[EKeyDataByStep.THREE],
      ...stored?.[EKeyDataByStep.THREE],
    },
    [EKeyDataByStep.FOUR]: {
      ...defaultDataTasker[EKeyDataByStep.FOUR],
      ...stored?.[EKeyDataByStep.FOUR],
    },
  };

  const initialFormState = ({ stepData }: { stepData: TStepDataTasker }) => {
    // OBJETO INICIAL DE VALIDACIONES QUE LEERA LOS DATOS EN ALMACEN LOCAL Y VALIDARA O DEJAR VALORES POR DEFECTO
    const initialFormState: iFormStateValidationTask = {
      // ESTADOS DE ENTRADA EN PASO 1
      category: selectedCategoryValidator.validate(stepData[EKeyDataByStep.ONE].categoryData.category ?? ''),
      'service': { value: stepData[EKeyDataByStep.ONE].serviceData['service'] ?? [], error: '', isValid: false },
      'workArea': { value: stepData[EKeyDataByStep.ONE].workAreaData?.workArea ?? [], error: '', isValid: false },
      'day': { value: stepData[EKeyDataByStep.ONE].dayData['day'] ?? [], error: '', isValid: false },
      'hour': { value: stepData[EKeyDataByStep.ONE].hourData['hour'] ?? [], error: '', isValid: false },

      // ESTADOS DE ENTRADA EN PASO 2
      description: descriptionValidator.validate(stepData[EKeyDataByStep.TWO].description ?? ''),
      imageProfileData: imageProfileValidator.validate(stepData[EKeyDataByStep.TWO].imageProfileData),
      imageExperienceData: imageExperiencesValidator.validate(stepData[EKeyDataByStep.TWO].imageExperienceData),

      // ESTADOS DE ENTRADA EN PASO 3
      amountBudge: budgeValidator.validate(String(stepData[EKeyDataByStep.THREE]?.amountBudge ?? '')),
      budgeSelected: { value: stepData[EKeyDataByStep.THREE]?.budgeSelected as string, error: '', isValid: false },
      reinsert: { value: stepData[EKeyDataByStep.THREE]?.reinsert as string, error: '', isValid: false },

      // ESTADOS DE ENTRADA EN PASO 4
      fullName: fullNameValidator.validate(stepData[EKeyDataByStep.FOUR].fullName) ?? '',
      userName: userNameValidator.validate(stepData[EKeyDataByStep.FOUR].userName ?? ''),
      email: emailValidator.validate(stepData[EKeyDataByStep.FOUR].email ?? ''),
      cityName: selectedCategoryValidator.validate(stepData[EKeyDataByStep.FOUR].locationData.cityName ?? ''),
      password: passwordValidator.validate(password ?? ''),
      confirmPassword: confirmPasswordValidator.validate(confirmPassword ?? ''),
    };

    return initialFormState;
  };

  return { STEP_DATA_TASKER, initialFormState };
};

export default useStepDataTasker;
