import DescriptionValidator from '../modules/validators/DescriptionValidator';
import type { TFieldState } from '../types/typeStateFields';
import useTasker from './useTasker';
import { EKeyDataByStep } from '../types/enums';
import type { iPropsHandleDescriptionInput } from '../interfaces/iPropsHandleDescriptionInput';
import { formatTextArea } from '../utils/parsedAndFormatValuesUtils';
import type { FormEvent } from 'react';

const useTaskerDescriptionHandlers = (props: iPropsHandleDescriptionInput) => {
  const descriptionValidator: DescriptionValidator = new DescriptionValidator();

  let result: TFieldState;
  const { setStepData, setFormState, edit } = useTasker();

  // EVENTO INPUT A DESCRIPCION PASO 2
  const handleDescriptionInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const value: string = (e.target as HTMLTextAreaElement).value;
    // VALIDAR CON EL VALOR ACTUAL TANTO REGISTRO COMO EDICION
    result = descriptionValidator.validate(value);

    // ACTUALIZAR EL formState CON RESULTADO DE VALIDACION
    setFormState((prevState) => ({ ...prevState, description: result }));
    if (!edit) {
      // SI ES REGISTRO
      if (props.setStepData) {
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
    }

    props.setIsStepValid(result.isValid); //SETEAR AL MOMENTO ASEGURANDO LA UNICA FUENTE DE LA VERDAD
  };

  // EVENTO AL HACER BLUR EN DESCRIPCION
  const handleDescriptionBlur = () => {
    // SI EL ESTADO REAL ACTUAL ES VALIDO
    if (props.formState.description.isValid) {
      if (!edit && props.setStepData) {
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
    }
  };

  return { handleDescriptionBlur, handleDescriptionInput };
};

export default useTaskerDescriptionHandlers;
