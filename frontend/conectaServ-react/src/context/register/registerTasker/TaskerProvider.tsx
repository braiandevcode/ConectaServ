import { useEffect, useState } from 'react';
import { ECategoryKey, EDefaultSelected, EKeyDataByStep, ENamesOfKeyLocalStorage } from '../../../types/enums';
import useRegister from '../../../hooks/useRegister';
import type { TRegisterTasker } from '../../../types/typeRegisterTasker';
import Loader from '../../../components/Loader';
import { TaskerContext } from './TaskerContext';
import type { iFormStateValidationTask } from '../../../interfaces/iFormStateValidationTask';
import useValidateTasker from '../../../hooks/useValidateTasker';
import scrolledTop from '../../../utils/scrollTop';
import type { TStepDataTasker } from '../../../types/typeStepData';
import useStepDataTasker from '../../../hooks/useStepDataTasker';

/*
****EXPLICACION DEL FLUJO ENTRE VALIDAR Y ALMACENAR EN STRORAGE:*****
- LO QUE SE ESCRIBE => VA A formState QUE VALIDA LA ENTRADA.
- DE AHI SE SINCRONIZA A ==> stepData. (ALMACENAMIENTO LOCAL)
- stepData ==> ES LO QUE SE GUARDA EN STORAGE.
- AL RECARGAR, SE INICIALIZA EL "formState" DESDE LO QUE ESTA EN stepData => LOGRANDO REPOBLAR CAMPOS.
*/

// PROVIDER ES QUIEN NOS PROVEE LOS ESTADOS Y FUNCIONES DE COMPONENTES
const TaskerProvider = ({ children }: { children: React.ReactNode }) => {
  const { STEP_DATA_TASKER, initialFormState } = useStepDataTasker(); //GANCHO PARA TRAER EL OBJETO DE DATOS DE LOS PASOS DE REGISTRO

  // OBJETO GENERAL DE PASOS CON VALORES POR DEFECTO Y PARA ALMACENAR EN STROAGE
  const [stepData, setStepData] = useState<TStepDataTasker>(STEP_DATA_TASKER);

  //--------------------------------------------------------------------HOOKS DE REACT--------------------------------------------------------------------//
  const { setTerms } = useRegister(); //HOOK QUE USA CONTEXTO NIVEL REGISTRO

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

  // ESTADO DE VALIDACIONES EN TODO EL FORMULARIO ==> INICIALIZA CON ==> initialFormState LEE DATOS PERSISTIDOS
  const [formState, setFormState] = useState<iFormStateValidationTask>(() => initialFormState({ stepData }));

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
    isLoaded,
    isFieldsBasic,
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