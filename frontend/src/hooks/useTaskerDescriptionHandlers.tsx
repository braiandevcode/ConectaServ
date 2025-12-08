import DescriptionValidator from '../modules/validators/DescriptionValidator';
import type { TFieldState } from '../types/typeStateFields';
import useTasker from './useTasker';
import { EKeyDataByStep } from '../types/enums';
import type { iPropsHandleDescriptionInput } from '../interfaces/iPropsHandleDescriptionInput';
import { formatTextArea } from '../utils/parsedAndFormatValuesUtils';
import type { FormEvent } from 'react';

const useTaskerDescriptionHandlers = (props: iPropsHandleDescriptionInput) => {
  const descriptionValidator: DescriptionValidator = new DescriptionValidator();

  // //ESTADO QUE ME PERMITIRA SABER SI DEBE ESTAR PARSEADO O NO UN VALOR DE TEXTO
  // //UTIL PARA EVITAR PROBLEMAS EN PARSEOS EN CAMPOS EN TIEMPO
  // const [isParsed, setIsParsed] = useState(false);

  const {  setStepData, setFormState } = useTasker();

  // EVENTO INPUT A DESCRIPCION PASO 2
  const handleDescriptionInput = (e:FormEvent<HTMLTextAreaElement>) => {
    // setIsParsed(false); //EN CADA EVENTO DE INPUT EN DESCRIPCION SERA FALSE ==> NO SE PARSEA
    const value: string = (e.target as HTMLTextAreaElement).value;
    const result: TFieldState = descriptionValidator.validate(value); //==>  VALIDAR ENTRADA
    setFormState((prevState) => ({ ...prevState, description: result })); //==> PASAR OBJETO(RESULTADO) DE VALIDACION AL formState.

    // SI ES REGISTRO
    if(props.setStepData){
      // GUARDAR EN STE DATA
      setStepData((prev) => ({
        ...prev, //==> COPIAR TODO LO PREVIO DEL OBJETO GLOBAL
        [EKeyDataByStep.TWO]: {
          // ==>  EN ATRIBUTO 2
          ...prev[EKeyDataByStep.TWO], // MANTENER EL RESTO DE LOS VALORES EXISTENTES EN SUBOBJETO
          description: value, //ACTUALIZAR EL descriptionUser
        },
      }));

    }
    props.setIsStepValid(result.isValid); //SETEAR AL MOMENTO ASEGURANDO LA UNICA FUENTE DE LA VERDAD
  };

  // EVENTO AL HACER BLUR EN DESCRIPCION
  const handleDescriptionBlur = () => {
    // SI EL ESTADO REAL ACTUAL ES VALIDO
    if (props.formState.description.isValid) {
      // setIsParsed(true); // ==> INDICAR PARSEO

      // SETEAR ESTADO GLOBAL EN STORAGE
      setStepData((prev) => ({
        ...prev, //==> COPIAR TODO LO PREVIO DEL OBJETO GLOBAL
        [EKeyDataByStep.TWO]: {
          // ==>  EN SUBOBJETO DEL PASO 2
          ...prev[EKeyDataByStep.TWO], // MANTENER EL RESTO DE LOS VALORES EXISTENTES EN SUBOBJETO PASO 2
          description: formatTextArea(props.formState.description.value as string), // ACTUALIZAR CON FORMATO
        },
      }));
    }
  };


  return { handleDescriptionBlur, handleDescriptionInput }
};

export default useTaskerDescriptionHandlers;
