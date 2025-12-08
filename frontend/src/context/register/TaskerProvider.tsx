import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from 'react';
import type { TTasker } from '../../types/typeTasker';
import { ENamesOfKeyLocalStorage } from '../../types/enums';
import { useLocation, useNavigate } from 'react-router';
import type { iEmailUser } from '../../interfaces/iEmailUser';
import type { iTimeExpire } from '../../interfaces/iTimeExpire';
import { TaskerContext } from './TaskerContext';
import useStepDataTasker from '../../hooks/useStepDataTasker';
import type { TStepDataTasker } from '../../types/typeStepData';
import type { iFormStateValidationTask } from '../../interfaces/iFormStateValidationTask';
import useMain from '../../hooks/useMain';
import DescriptionValidator from '../../modules/validators/DescriptionValidator';

// CONTEXTO DE ESTADOS GENERALES A FORMULARIOS
const TaskerProvider = ({ children }: { children: ReactNode }) => {
  const descriptionValidator:DescriptionValidator = new DescriptionValidator();

  const location = useLocation(); //HOOK DE REACT LOCATION
  const navigate = useNavigate(); // HOOK DE REACT NAVIGATION
  const { STEP_DATA_TASKER, initialFormState } = useStepDataTasker(); //GANCHO PARA TRAER EL OBJETO DE DATOS DE LOS PASOS DE REGISTRO
  const { userData } = useMain();
  // OBJETO GENERAL DE PASOS CON VALORES POR DEFECTO Y PARA ALMACENAR EN STROAGE
  const [stepData, setStepData] = useState<TStepDataTasker>(STEP_DATA_TASKER);
  // ESTADO DE VALIDACIONES EN TODO EL FORMULARIO ==> INICIALIZA CON ==> initialFormState LEE DATOS PERSISTIDOS
  const [formState, setFormState] = useState<iFormStateValidationTask>(() => initialFormState({ stepData }));






  
  // VALIDAR  CAMPOS POR PASOS
  const [isStepValid, setIsStepValid] = useState<boolean>(false);

  //ESTADO DE TERMINOS Y CONDICIONES EN FALSE SIEMPRE
  const [terms, setTerms] = useState<boolean>(false);
  //BANDERA PARA SABER SI YA INTERACTUO O NO EN PASSWORD Y CONFIRMAR PASSWORD. UTIL PARA EVITAR ESTILOS INNECESARIOS AL MONTAR COMPONENTE
  const [interactedPassword, setInteractedPassword] = useState<boolean>(false);
  const [interactedConfirmPassword, setInteractedConfirmPassword] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false); // ESTADO PARA BANDERA DE SI SE ESTA ENVIANDO
  const [password, setPassword] = useState<string>(''); //ESTADO EN TIEMPO RUNTIME PARA PASSWORD
  const [confirmPassword, setConfirmPassword] = useState<string>(''); //ESTADO EN TIEMPO RUNTIME PARA CONFIRMPASSWORD
  const [resendEmail, setResendEmail] = useState<iEmailUser>({ emailCode: '' });
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [edit, setEdit] = useState<boolean>(false);//ESTADO PARA SABER SI SE ESTA EDITANDO
  const [time, setTime] = useState<iTimeExpire>({ min: 0, sec: 0 }); // ==> ESTADO PARA EL TIEMPO ACTUAL DE EXPIRACION DEL CODIGO
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null); // ==> ID DE REFERENCIA PARA EL TIMMER

  // ESTADO LOCAL DE SI YA SE VERIFICO CORRECTAMENTE
  const [isSuccefullyVerified, setIsSuccefullyVerified] = useState<boolean>(() => {
    return localStorage.getItem(ENamesOfKeyLocalStorage.IS_VERIFY_CODE) === 'true';
  });

  //ONCHANGE TERMINOS Y CONDICIONES
  const onChangeTerms = (e: ChangeEvent<HTMLInputElement>) => {
    setTerms(e.target.checked);
  };






    // 🔑 PASO CLAVE: Sincronización para Edición Asíncrona
  useEffect(() => {
    // Solo actualiza si estamos editando Y si userData.description ya tiene un valor
    // Y si el valor actual del formulario no es igual al valor de la DB (para evitar loops)
    if (edit && userData?.description && formState.description.value !== userData.description) {
      
      // 1. Validar el valor que vino de la DB
      const result = descriptionValidator.validate(userData.description); 
      
      // 2. Actualizar formState con el valor de la DB
      setFormState(prevState => ({
        ...prevState,
        description: {
          ...result, // Usa el resultado de la validación (incluyendo el valor)
          isTouched: true, // Opcional: marca como tocado si quieres mostrar errores/éxito
        }
      }));
    }
  }, [edit, userData?.description]);







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

  //VALORES DE ESTADOS QUE CONSUME EL CONTEXTO
  const contextValuesRegister: TTasker = {
    setIsSuccefullyVerified,
    setResendEmail,
    setInteractedConfirmPassword,
    setInteractedPassword,
    onChangeTerms,
    setTerms,
    setConfirmPassword,
    setPassword,
    setIsSending,
    setExpiresAt,
    setTime,
    setFormState,
    setStepData,
    setIsStepValid,
    setEdit,
    edit,
    isStepValid,
    stepData,
    formState,
    expiresAt,
    time,
    timerRef,
    resendEmail,
    isSuccefullyVerified,
    isSending,
    confirmPassword,
    interactedConfirmPassword,
    password,
    terms,
    interactedPassword,
  };

  // RETORNAMOS EL PROVIDER  DE REGISTROS
  return <TaskerContext.Provider value={contextValuesRegister}>{children}</TaskerContext.Provider>;
};

export default TaskerProvider;
