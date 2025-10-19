import { useLocation, useNavigate } from 'react-router';
import { ProfessionalContext } from './ProfessionalContext';
import { useEffect, useState, type FormEvent } from 'react';
import { ECategoryKey, EDefaultSelected, EKeyDataByStep, ENamesOfKeyLocalStorage } from '../../../types/enums';
import { readExistingData } from '../../../utils/storageUtils';
import DescriptionValidator from '../../../modules/validators/DescriptionValidator';
import ImageProfileValidator from '../../../modules/validators/ImageProfileValidator';
import ImageExperiencesValidator from '../../../modules/validators/ImageExperiencesValidator';
import SelectedValidator from '../../../modules/validators/SelectedValidator';
import { emptyStepData } from '../../../config/constant';
import BudgeValidator from '../../../modules/validators/BudgeValidator';
import ConfirmPasswordValidator from '../../../modules/validators/ConfirmPasswordValidator';
import PasswordValidator from '../../../modules/validators/PasswordValidator';
import EmailValidator from '../../../modules/validators/EmailValidator';
import UserNameValidator from '../../../modules/validators/UserNameValidator';
import FullNameValidator from '../../../modules/validators/FullNameValidator';
import useMain from '../../../hooks/useMain';
import useRegister from '../../../hooks/useRegister';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import generateRandomNumber from '../../../utils/generateRandomNumber';
import type { TVerifyCode } from '../../../types/typeVerifyCode';
import CodeValidator from '../../../modules/validators/CodeValidator';
import type { TStepData } from '../../../types/typeStepData';
import type { iFormStateValidationPro } from '../../../interfaces/iFormStateValidationPro';
import type { TRegisterPro } from '../../../types/typeRegisterProfessional';

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
  const codeValidator: CodeValidator = new CodeValidator();

  //--------------------------------------------------------------------HOOKS DE REACT--------------------------------------------------------------------//
  const location = useLocation(); //HOOK DE REACT LOCATION
  const navigate = useNavigate(); // HOOK DE REACT NAVIGATION
  const { setIsModalOpen } = useMain();
  const { setIsSending, isSending, terms, password, confirmPassword, setTerms, inputCodeEmail, updateCodeEmail } = useRegister();

  // ------------------------------------------------------------------------useState------------------------------------------------------------------------//
  // ESTADO PARA EL PASO ACTUAL DEL FORMULARIO
  const [step, setStep] = useState<number>(() => {
    const storedStep = localStorage.getItem(ENamesOfKeyLocalStorage.CURRENT_STEP); // LEO CURRENT_STEP UNA SOLA VEZ
    return storedStep ? parseInt(storedStep, 10) : 1; //SI NO ES NULL PARSEA A NUMERO SI ES NULO , SINO POR DEFECTO ES 1
  });

  // ------------------------FRAGMENTO CODIGO DE VERIFICACION---------------------------//
  // CARGAR LA PUBLIC_KEY DESDE VARIABLE DE ENTORNO
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY; // ==> CLAVE PUBLICA
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID; // ==> ID SERVICIO
  const TEMPLATE_VERIFICATION_ID = import.meta.env.VITE_TEMPLATE_ID; // ==> ID PLANTILLA

  // INICIALIZAR LIBRERIA
  emailjs.init({
    publicKey: PUBLIC_KEY, //==> CLAVE
  });

  // FUNCION PARA ENVIAR CODIGO
  async function sendCodeToUser(emailUser: string) {
    const generatedCode: number = generateRandomNumber(); //GENERAR RANDOM

    updateCodeEmail(generatedCode.toString()); //SETEO NUMERO RANDOM Y PARSEO A STRING

    // OBJETO DE CONFIGURACION PARA ENVIO
    const templateParams: TVerifyCode = {
      to_email: emailUser, // ==> CORREO DE DESTINO
      verification_code: generatedCode, //==> CODIGO GENERADO A LA PLANTILLA
    };

    // INTENTAR ENVIO
    try {
      const response: EmailJSResponseStatus = await emailjs.send(SERVICE_ID, TEMPLATE_VERIFICATION_ID, templateParams);
      console.log('Correo con código enviado con éxito!', response.status);
      return { success: true, code: generatedCode };
    } catch (err) {
      console.error('Fallo al enviar el código:', err);
      return { success: false, error: err };
    }
  }

  //--------------------------FIN FRAGMENTO VERIFICACION-------------------------------------//
  const stored = readExistingData(ENamesOfKeyLocalStorage.STEP_DATA); //LEEO Y PARSEO OBJETO GENERAL DE PASOS

  // OBJETO GENERAL DE PASOS CON VALORES POR DEFECTO Y PARA ALMACENAR EN STROAGE
  const [stepData, setStepData] = useState<TStepData>(() => {
    return {
      [EKeyDataByStep.ONE]: {
        ...emptyStepData[EKeyDataByStep.ONE], //VALOR POR DEFECTO
        ...stored?.[EKeyDataByStep.ONE], // PISADO PODR EL VALOR EN STORAGE
      },
      [EKeyDataByStep.TWO]: {
        ...emptyStepData[EKeyDataByStep.TWO],
        ...stored?.[EKeyDataByStep.TWO],
      },
      [EKeyDataByStep.THREE]: {
        ...emptyStepData[EKeyDataByStep.THREE],
        ...stored?.[EKeyDataByStep.THREE],
      },
      [EKeyDataByStep.FOUR]: {
        ...emptyStepData[EKeyDataByStep.FOUR],
        ...stored?.[EKeyDataByStep.FOUR],
      },
    };
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
    return stored[EKeyDataByStep.ONE]?.valueSelected ?? EDefaultSelected.SELECT_CATEGORY; // ==> DATO DE CATEGORIA O DEFAULT "none"
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

    // ESTADOS DE ENTRADA EN VERIFICACION DE CODIGO
    emailCode: codeValidator.validate(inputCodeEmail ?? ''),
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

    const isNotValidAndStepNotValid: boolean = !isStepValid || (hasBudge && step !== 4) || (!hasBudge && step !== 3);

    if (isNotValidAndStepNotValid) return; //SI NO ES VALIDO ASEGURA NO SEGUIR

    if (isSending) return; // SI YA SE ESTA ENVIANDO, NO HACER NADA

    await sendCodeToUser(stepData[EKeyDataByStep.FOUR].email); // ==> TOMO REFERENCIA EL EMAIL ALMACENADO EN STORAGE

    setIsSending(true); //SI SE ESTA ENVIANDO MOSTRAR MODAL DE VERIFICACION DE CODIGO
    setIsModalOpen(true); // ABRIR MODAL
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
          const isValidStep: boolean = fullName.isValid && userName.isValid && email.isValid && location.isValid && password.isValid && confirmPassword.isValid && terms;
          isValid = isValidStep;
          return isValid;
        }
        return isValid;
      }
      case 4: {
        const { fullName, userName, email, location, password, confirmPassword } = formState;
        const isValidStep: boolean = fullName.isValid && userName.isValid && email.isValid && location.isValid && password.isValid && confirmPassword.isValid && terms;
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
    setStepData,
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
    stepData,
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
