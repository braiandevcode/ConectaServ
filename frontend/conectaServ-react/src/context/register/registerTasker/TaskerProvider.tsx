import { useEffect, useState } from 'react';
import { ECategoryKey, EDefaultSelected, EKeyDataByStep, ENamesOfKeyLocalStorage } from '../../../types/enums';
import DescriptionValidator from '../../../modules/validators/DescriptionValidator';
import ImageProfileValidator from '../../../modules/validators/ImageProfileValidator';
import ImageExperiencesValidator from '../../../modules/validators/ImageExperiencesValidator';
import SelectedValidator from '../../../modules/validators/SelectedValidator';
import BudgeValidator from '../../../modules/validators/BudgeValidator';
import ConfirmPasswordValidator from '../../../modules/validators/ConfirmPasswordValidator';
import PasswordValidator from '../../../modules/validators/PasswordValidator';
import EmailValidator from '../../../modules/validators/EmailValidator';
import UserNameValidator from '../../../modules/validators/UserNameValidator';
import FullNameValidator from '../../../modules/validators/FullNameValidator';
import useRegister from '../../../hooks/useRegister';
import type { TRegisterTasker } from '../../../types/typeRegisterTasker';
import { readExistingData } from '../../../utils/storageUtils';
import Loader from '../../../components/Loader';
import { defaultDataPro } from '../../../config/defaultDataPro';
import { TaskerContext } from './TaskerContext';
import type { iFormStateValidationTask } from '../../../interfaces/iFormStateValidationTask';
import useValidateTasker from '../../../hooks/useValidateTasker';
import scrolledTop from '../../../utils/scrollTop';
import type { TStepDataTasker } from '../../../types/typeStepData';

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

/*
****EXPLICACION DEL FLUJO ENTRE VALIDAR Y ALMACENAR EN STRORAGE:*****
- LO QUE SE ESCRIBE => VA A formState QUE VALIDA LA ENTRADA.
- DE AHI SE SINCRONIZA A ==> stepData. (ALMACENAMIENTO LOCAL)
- stepData ==> ES LO QUE SE GUARDA EN STORAGE.
- AL RECARGAR, SE INICIALIZA EL "formState" DESDE LO QUE ESTA EN stepData => LOGRANDO REPOBLAR CAMPOS.
*/

// PROVIDER ES QUIEN NOS PROVEE LOS ESTADOS Y FUNCIONES DE COMPONENTES
const TaskerProvider = ({ children }: { children: React.ReactNode }) => {
  const stored = readExistingData(ENamesOfKeyLocalStorage.STEP_DATA); //LEEO Y PARSEO OBJETO GENERAL DE PASOS

  // OBJETO GENERAL DE PASOS CON VALORES POR DEFECTO Y PARA ALMACENAR EN STROAGE
  const [stepData, setStepData] = useState<TStepDataTasker>(() => {
    return {
      [EKeyDataByStep.ONE]: {
        ...defaultDataPro[EKeyDataByStep.ONE], //VALOR POR DEFECTO
        ...stored?.[EKeyDataByStep.ONE], // PISADO PODR EL VALOR EN STORAGE
      },
      [EKeyDataByStep.TWO]: {
        ...defaultDataPro[EKeyDataByStep.TWO],
        ...stored?.[EKeyDataByStep.TWO],
      },
      [EKeyDataByStep.THREE]: {
        ...defaultDataPro[EKeyDataByStep.THREE],
        ...stored?.[EKeyDataByStep.THREE],
      },
      [EKeyDataByStep.FOUR]: {
        ...defaultDataPro[EKeyDataByStep.FOUR],
        ...stored?.[EKeyDataByStep.FOUR],
      },
    };
  });

  //--------------------------------------------------------------------HOOKS DE REACT--------------------------------------------------------------------//
  const { password, confirmPassword, setTerms } = useRegister(); //HOOK QUE USA CONTEXTO NIVEL REGISTRO

  // ------------------------------------------------------------------------useState------------------------------------------------------------------------//
  // ESTADO PARA EL PASO ACTUAL DEL FORMULARIO
  const [step, setStep] = useState<number>(() => {
    const storedStep = localStorage.getItem(ENamesOfKeyLocalStorage.CURRENT_STEP); // LEO CURRENT_STEP UNA SOLA VEZ
    return storedStep ? parseInt(storedStep, 10) : 1; //SI NO ES NULL PARSEA A NUMERO SI ES NULO , SINO POR DEFECTO ES 1
  });

  //ESTADO DE INTERACCION DEL USUARIO EN UN CAMPO
  const [hasInteracted, setHasInteracted] = useState<boolean>(() => {
    return localStorage.getItem(ENamesOfKeyLocalStorage.INTERACTED) === 'true'; //LEER KEY DE interacted EN ALMACENAMIENTO  DE STORAGE Y COMPARAR
  });

  //ESTADO QUE ME PERMITIRA SABER SI DEBE ESTAR PARSEADO O NO UN VALOR DE TEXTO
  //UTIL PARA EVITAR PROBLEMAS EN PARSEOS EN CAMPOS EN TIEMPO
  const [isParsed, setIsParsed] = useState(false);

  // -----------------------------------------------------------ESTADOS--------------------------------------------------------------------------//
  const [valueSelected, setValueSelected] = useState<string>(() => {
    return stepData[EKeyDataByStep.ONE]?.valueSelected ?? EDefaultSelected.SELECT_CATEGORY; // ==> DATO DE CATEGORIA O DEFAULT "none"
  });

  // ESTADO DE SI SE RESETA O NO LOS DEALLES DE TRABAJO
  const [isResetDetailsWork, setIsResetDetailsWork] = useState<boolean>(false);

  const [hasBudge, setHasBudge] = useState<boolean>(stepData[EKeyDataByStep.ONE].category === ECategoryKey.REPAIR); // ESTADO INICIAL DE SI TIENE PASO DEL PRESUPUESTO O NO
  const [hasContext, setHasContext] = useState<boolean>(stepData[EKeyDataByStep.ONE].category !== ECategoryKey.MOVE); // ESTADO DE SI TIENE O NO GRUPO DE CHECKS DE CONTEXTOS(HABITO)

  // ESTADO DE BANDER PARA SABER SI RENDERIZA O NO ULTIMO PASO
  const [isFieldsBasic, setIsFieldsBasic] = useState<boolean>(true);

  const [isBudgeMountDisabled, setIsBudgeMountDisabled] = useState<boolean>(true);
  const [isReinsertDisabled, setIsReinsertDisabled] = useState<boolean>(true);

  //ESTADO QUE PERMITE EN TIMPO DE RUNTIME FORMATEAR A MONEDA EN CAMPO UI
  const [amountFieldFormat, setAmountFieldFormat] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false); //PERMITE INDICAR SI SE HIZO O NO FOCO

  // OBJETO INICIAL DE VALIDACIONES QUE LEERA LOS DATOS EN ALMACEN LOCAL Y VALIDARA O DEJAR VALORES POR DEFECTO
  const initialFormState: iFormStateValidationTask = {
    // ESTADOS DE ENTRADA EN PASO 1
    category: selectedCategoryValidator.validate(stepData[EKeyDataByStep.ONE].category ?? ''),
    'service[]': { value: stepData[EKeyDataByStep.ONE]['service[]'] ?? [], error: '', isValid: false },
    'context[]': { value: stepData[EKeyDataByStep.ONE]['context[]'] ?? [], error: '', isValid: false },
    'day[]': { value: stepData[EKeyDataByStep.ONE]['day[]'] ?? [], error: '', isValid: false },
    'hour[]': { value: stepData[EKeyDataByStep.ONE]['hour[]'] ?? [], error: '', isValid: false },

    // ESTADOS DE ENTRADA EN PASO 2
    descriptionUser: descriptionValidator.validate(stepData[EKeyDataByStep.TWO].descriptionUser ?? ''),
    imageProfile: imageProfileValidator.validate(stepData[EKeyDataByStep.TWO].imageProfile),
    imageExperiences: imageExperiencesValidator.validate(stepData[EKeyDataByStep.TWO].imageExperiences),

    // ESTADOS DE ENTRADA EN PASO 3
    amountBudge: budgeValidator.validate(String(stepData[EKeyDataByStep.THREE]?.amountBudge ?? '')),
    budgeSelected: { value: stepData[EKeyDataByStep.THREE]?.budgeSelected as string, error: '', isValid: false },
    reinsert: { value: stepData[EKeyDataByStep.THREE]?.reinsert as string, error: '', isValid: false },

    // ESTADOS DE ENTRADA EN PASO 4
    fullName: fullNameValidator.validate(stepData[EKeyDataByStep.FOUR].fullName) ?? '',
    userName: userNameValidator.validate(stepData[EKeyDataByStep.FOUR].userName ?? ''),
    email: emailValidator.validate(stepData[EKeyDataByStep.FOUR].email ?? ''),
    location: selectedCategoryValidator.validate(stepData[EKeyDataByStep.FOUR].location ?? ''),
    password: passwordValidator.validate(password ?? ''),
    confirmPassword: confirmPasswordValidator.validate(confirmPassword ?? ''),
  };

  // ESTADO DE VALIDACIONES EN TODO EL FORMULARIO ==> INICIALIZA CON ==> initialFormState QUE CONSUME DEL DATASTEP
  const [formState, setFormState] = useState<iFormStateValidationTask>(initialFormState);

  //GANCHO PAR VALIDAR PASOS
  const { validateCurrentStep } = useValidateTasker({ step, formState, hasBudge, hasContext, hasInteracted });

  // VALIDAR  CAMPOS POR PASOS
  const [isStepValid, setIsStepValid] = useState<boolean>(validateCurrentStep);

  const [isLoaded, setIsLoaded] = useState(false);

  // -------------------------------------------------------------useEffects-------------------------------------------------------------------------//
  // EFECTO QUE INDICA QUE TODO FUE CARGADO
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // EFECTO PARA ALMACENAR EN STORAGE SI HAY INTERACCION, LOS DATOS QUE INGRESA EL PROFESIONAL Y REVALIDAR CAMPOS AL MONTARSE
  useEffect(() => {
    //SI NO INTERACTUO
    if (!hasInteracted) return;
    localStorage.setItem(ENamesOfKeyLocalStorage.STEP_DATA, JSON.stringify(stepData));
  }, [stepData]); //HAY AL MENOS UN ESTADO EXTERNO

  // -------------------------------------------------------- EVENTOS --------------------------------------------------------------------//
  // EVENTO DE CLICK PARA EL SIGUIENTE PASO
  const handleClickNext = () => {
    // ASEGURO DE QUE SI ES VALIDO AUMENTO
    if (isStepValid) {
      setStep((prev) => {
        const newStep: number = prev + 1; //INCREMENTAMOS PASO CON VALOR NUMERICO
        localStorage.setItem(ENamesOfKeyLocalStorage.CURRENT_STEP, newStep.toString());
        return newStep;
      });
      setIsResetDetailsWork(false);
      // SCROLLEAR SUAVE HACIA ARRIBA EN CADA EVENTO
      scrolledTop();
    }
  };

  // EVENTO DE CLICK PARA REGRESAR A ANTERIOR
  const handleClickPrev = () => {
    setStep((prev) => {
      const stepPrev: number = prev - 1; //DECREMENTO PASO
      localStorage.setItem(ENamesOfKeyLocalStorage.CURRENT_STEP, stepPrev.toString());
      return stepPrev;
    });
    setTerms(false); //POR DEFAULT SE VACIA CHECK, LUEGO DEL EVENTO SETEAR A FALSE
    setIsResetDetailsWork(false);
    // SCROLLEAMOS SUAVE HACIA ARRIBA EN CADA EVENTO
    scrolledTop();
  };

  //-----------------------------OBJETO DE CONTEXTO---------------------------------//
  const contextRegisterValue: TRegisterTasker = {
    isLoaded,
    isFieldsBasic,
    setIsFieldsBasic,
    setIsLoaded,
    setStepData,
    setValueSelected,
    validateCurrentStep,
    setIsFocus,
    setIsParsed,
    setAmountFieldFormat,
    setIsBudgeMountDisabled,
    setFormState,
    setHasInteracted,
    handleClickNext,
    handleClickPrev,
    setHasContext,
    setHasBudge,
    setIsStepValid,
    setStep,
    setIsResetDetailsWork,
    setIsReinsertDisabled,
    stepData,
    isReinsertDisabled,
    formState,
    hasInteracted,
    isBudgeMountDisabled,
    amountFieldFormat,
    isParsed,
    isResetDetailsWork,
    valueSelected,
    isFocus,
    isStepValid,
    step,
    hasContext,
    hasBudge,
  };

  //RETORNO PROVEEDOR
  return <TaskerContext.Provider value={contextRegisterValue}>{isLoaded ? children : <Loader />}</TaskerContext.Provider>;
};

export default TaskerProvider;