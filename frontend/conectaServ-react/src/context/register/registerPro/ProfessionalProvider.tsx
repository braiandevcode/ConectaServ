import { useLocation, useNavigate } from 'react-router';
import { ProfessionalContext } from './ProfessionalContext';
import { useEffect, useState, type FormEvent } from 'react';
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
import type { iFormStateValidationPro } from '../../../interfaces/iFormStateValidationPro';
import type { TRegisterPro } from '../../../types/typeRegisterProfessional';
import useVerifyEmailCode from '../../../hooks/useFormVerifyEmailCode';
import useSendData from '../../../hooks/useSendData';

/*
****EXPLICACION DEL FLUJO ENTRE VALIDAR Y ALMACENAR EN STRORAGE:*****
- LO QUE SE ESCRIBE => VA A formState QUE VALIDA LA ENTRADA.
- DE AHI SE SINCRONIZA A ==> stepData. (ALMACENAMIENTO LOCAL)
- stepData ==> ES LO QUE SE GUARDA EN STORAGE.
- AL RECARGAR, SE INICIALIZA EL "formState" DESDE LO QUE ESTA EN stepData => LOGRANDO REPOBLAR CAMPOS.
*/

// PROVIDER ES QUIEN NOS PROVEE LOS ESTADOS Y FUNCIONES DE COMPONENTES
const ProfessionalProvider = ({ children }: { children: React.ReactNode }) => {
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


  //--------------------------------------------------------------------HOOKS DE REACT--------------------------------------------------------------------//
  const location = useLocation(); //HOOK DE REACT LOCATION
  const navigate = useNavigate(); // HOOK DE REACT NAVIGATION
  const { isSendingCode } = useVerifyEmailCode(); //HOOK DE VERIFICACION DE CODIGO
  const { terms, password, confirmPassword, setTerms, stepData, setIsSending } = useRegister();
  const { submitNewData } = useSendData(); // HOOK PARA VERIFICACION DE CODIGO Y ENVIO DE LOS DATOS

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

  // -----------------------------------------------------------ESTADOS PASO 1--------------------------------------------------------------------------//
  const [valueSelected, setValueSelected] = useState<string>(() => {
    return stepData[EKeyDataByStep.ONE]?.valueSelected ?? EDefaultSelected.SELECT_CATEGORY; // ==> DATO DE CATEGORIA O DEFAULT "none"
  });

  // ESTADO DE SI SE RESETA O NO LOS DEALLES DE TRABAJO
  const [isResetDetailsWork, setIsResetDetailsWork] = useState<boolean>(false);

  const [hasBudge, setHasBudge] = useState<boolean>(stepData[EKeyDataByStep.ONE].category === ECategoryKey.REPAIR); // ESTADO INICIAL DE SI TIENE PASO DEL PRESUPUESTO O NO
  const [hasContext, setHasContext] = useState<boolean>(stepData[EKeyDataByStep.ONE].category !== ECategoryKey.MOVE); // ESTADO DE SI TIENE O NO GRUPO DE CHECKS DE CONTEXTOS(HABITO)

  //--------------------------------------------------ESTADOS PASO 3 ------------------------------------------------------------------------------------------//
  const [isBudgeMountDisabled, setIsBudgeMountDisabled] = useState<boolean>(true);
  const [isReinsertDisabled, setIsReinsertDisabled] = useState<boolean>(true);

  //ESTADO QUE PERMITE EN TIMPO DE RUNTIME FORMATEAR A MONEDA EN CAMPO UI
  const [amountFieldFormat, setAmountFieldFormat] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false); //PERMITE INDICAR SI SE HIZO O NO FOCO

  // OBJETO INICIAL DE VALIDACIONES QUE LEERA LOS DATOS EN ALMACEN LOCAL Y VALIDARA O DEJAR VALORES POR DEFECTO
  const initialFormState: iFormStateValidationPro = {
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
  const [formState, setFormState] = useState<iFormStateValidationPro>(initialFormState);

  // VALIDAR  CAMPOS POR PASOS
  const [isStepValid, setIsStepValid] = useState<boolean>(validateCurrentStep);

  // -------------------------------------------------------------useEffects-------------------------------------------------------------------------//
  // EFECTO PARA ALMACENAR EN STORAGE SI HAY INTERACCION, LOS DATOS QUE INGRESA EL PROFESIONAL Y REVALIDAR CAMPOS AL MONTARSE
  useEffect(() => {
    //SI NO INTERACTUO
    if (!hasInteracted) return;
    localStorage.setItem(ENamesOfKeyLocalStorage.STEP_DATA, JSON.stringify(stepData));
  }, [stepData]); //HAY AL MENOS UN ESTADO EXTERNO

  // EFECTO PARA FORZAR A RENDERIZAR HOME
  useEffect(() => {
    // CUANDO PRESIONO ATRAS O ADELANTE EN FLECHAS DEL NAVEGADOR Y ESTA EN EL HOME,
    // QUE IGNORE EL HISTORIAL DEL NAVEGADOR
    // Y LO REDIRIGA A SI MISMA AL HOME '/'
    const handlePopState = () => navigate('/', { replace: true });

    // SI LA RUTA DEL PATH ES EL HOME
    if (location.pathname === '/') {
      const wrappedHandler = () => handlePopState(); // GUARDAR REFERENCIA PARA PODER REMOVERLA DESPUES
      window.addEventListener('popstate', wrappedHandler); //SUSCRIPCION DE EVENTO EN FLECHAS ATRAS/ADELANTE DEL NAVEGADOR

      //LIMPIAR Y EVITAR FUGAS DE MEMORIA.
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [location.pathname, navigate]); //==> DEPENDE DE CAMBIOS EN LOCATION Y NAVIGATE, HOOKS DE REACT

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

  // EVENTO SUBMIT FORM
  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //PREVENIR
    // SI NO ES VALIDO O NO CORRESPONDE AL PASO FINAL
    const isNotValidAndStepNotValid: boolean = !isStepValid || (hasBudge && step !== 4) || (!hasBudge && step !== 3);

    //SI ES VERDAD QUE NO CORRESPONDE ==> NO SEGUIR
    //O SI YA SE ESTA ENVIANDO, ==> NO HACER NADA
    if (isNotValidAndStepNotValid || isSendingCode) return;
    
    setIsSending(true); //SI SE ESTA ENVIANDO MOSTRAR MODAL DE VERIFICACION DE CODIGO
    await submitNewData(); // ==> SI EL CODIGO ES CORRECTO COMPLETAR REGISTRO
  };

  //------------------------------------------FUNCIONES MODULARES------------------------------------------------------//

  // ------------------------FUNCION PARA VALIDAR SEGUN EL PASO----------------------------------------//
  function validateCurrentStep(): boolean {
    let isValid: boolean = false;

    switch (step) {
      case 1: {
        // VERIFICAR QUE HAYA AL MENOS UN CHECK EN CADA GRUPO
        const hasServices: boolean = (formState['service[]'].value as string[]).length > 0;
        const hasDays: boolean = (formState['day[]'].value as string[]).length > 0;
        const hasHours: boolean = (formState['hour[]'].value as string[]).length > 0;
        const hasContexts: boolean = !hasContext || (formState['context[]'].value as string[]).length > 0; //TRUE SI hasContext ES FALSO O HAY LONGITUD

        // SI TODO ESTA COMPLETO EN PASO 1, SE CONSIDERA VALIDO
        isValid = hasInteracted && formState.category.value !== ECategoryKey.NONE && hasServices && hasDays && hasHours && hasContexts;
        return isValid;
      }
      case 2: {
        // REVISO SI EL USUARIO INTERACTUO EN ALGUNO DE LOS CAMPOS OPCIONALES
        // CONSIDERO INTERACTUACION SI:
        // - ESCRIBIO ALGO EN DESCRIPTIONUSER
        // - SUBIO UNA IMAGEN DE PERFIL
        // - SUBIO ALGUNA IMAGEN DE EXPERIENCIAS
        const interacted: boolean = Boolean(formState.descriptionUser.value) || Boolean(formState.imageProfile.value) || Boolean(formState.imageExperiences);

        // REVISO SI ALGUNO DE LOS CAMPOS OPCIONALES ES VALIDO
        const descriptionIsValid: boolean = formState.descriptionUser.isValid;

        // DEFINO LA LOGICA DE VALIDACION DEL PASO:
        // SI NO HUBO INTERACCION, EL PASO ES VALIDO
        // SI HUBO INTERACCION, AL MENOS UNO DEBE SER VALIDO
        isValid = !interacted || (interacted && descriptionIsValid);

        return isValid;
      }
      case 3: {
        // ASEGURAR QUE SIEMPRE TENGA EL "hasBudge" EN TRUE
        if (hasBudge) {
          const currentAmount: number = (formState.amountBudge.value as string).trim() !== '' ? parseInt(formState.amountBudge.value as string) : 0;
          if (formState.budgeSelected.value === 'yes') {
            // SI ELIGE "SÍ", DEBE SER UN MONTO VÁLIDO
            isValid = formState.amountBudge.isValid;
          } else if (formState.budgeSelected.value === 'no') {
            const hasNotAmount: boolean = currentAmount === 0;
            isValid = hasNotAmount;
          } else {
            isValid = false;
          }
        } else {
          const { fullName, userName, email, location, password, confirmPassword } = formState;
          const isValidStep: boolean = fullName.isValid && userName.isValid && email.isValid && location.isValid && password.isValid && confirmPassword.isValid && terms && isSendingCode;
          isValid = isValidStep;
          return isValid;
        }
        return isValid;
      }
      case 4: {
        const { fullName, userName, email, location, password, confirmPassword } = formState;
        const isValidStep: boolean = fullName.isValid && userName.isValid && email.isValid && location.isValid && password.isValid && confirmPassword.isValid && terms && isSendingCode;
        isValid = isValidStep;
        return isValid;
      }
      default: {
        return false;
      }
    }
  }

  //------------------------------- FUNCION REUTILIZABLE PARA HACER SCROLL TOP------------------------------------------------//

  function scrolledTop() {
    // SCROLLEAMOS SUAVE HACIA ARRIBA EN CADA EVENTO
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  //-----------------------------OBJETO DE CONTEXTO---------------------------------//
  const contextRegisterValue: TRegisterPro = {
    setValueSelected,
    validateCurrentStep,
    setIsFocus,
    setIsParsed,
    setAmountFieldFormat,
    setIsBudgeMountDisabled,
    setFormState,
    setHasInteracted,
    onSubmitForm,
    handleClickNext,
    handleClickPrev,
    setHasContext,
    setHasBudge,
    setIsStepValid,
    setStep,
    setIsResetDetailsWork,
    setIsReinsertDisabled,
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
  return <ProfessionalContext.Provider value={contextRegisterValue}>{children}</ProfessionalContext.Provider>;
};

export default ProfessionalProvider;
