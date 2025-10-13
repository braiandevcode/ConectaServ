import type React from 'react';
import { EKeyDataByStep } from '../types/enums';
import type { TOptionWork, TStepOne } from '../types/types';
import useRegisterPro from './useRegisterPro';
import { useEffect } from 'react';

export const useVerifyGroup = () => {
  const { stepData, step, formState, setFormState, setStepData, isResetDetailsWork } = useRegisterPro();

  // EFECTO PARA RESETEAR DETALLES DE TRABAJO CUANDO CAMBIA CATEGORÍA
  useEffect(() => {
    if (!isResetDetailsWork) return; // SI NO SE SOLICITA RESET, NO CONTINUAR

    // LIMPIAR TODOS LOS VALORES EN ARREGLOS DE GRUPOS DEL formState
    formState['service[]'].value = [];
    formState['context[]'].value = [];
    formState['day[]'].value = [];
    formState['hour[]'].value = [];

    // NUEVO OBJETO DE DETALLES VACIO
    const newStepOneDetailsWork: Omit<TStepOne, 'valueSelected' | 'category'> = {
      'service[]': [],
      'context[]': [],
      'day[]': [],
      'hour[]': [],
    };

    // RESETEAR TODOS LOS GRUPOS EN OBJETO GLOBAL DE PASOS
    setStepData((prev) => ({
      ...prev, //COPIAR TODO
      [EKeyDataByStep.ONE]: {
        //==> PORPIEDAD 1
        ...prev[EKeyDataByStep.ONE], // COPIAR TODO EL OBJETO DE ATRIUTO 1
        ...newStepOneDetailsWork, // ==> PISAR CON NUEVOS VALORES RESETEADOS
      },
    }));
  }, [step, isResetDetailsWork]);

  // FUNCION PARA ACTUALIZAR UN ARRAY SEGUN EL CHECK SELECCIONADO
  // SI EL CHECK ESTA MARCADO ==> AGREGO EL VALUE AL ARRAY
  // SI EL CHECK NO ESTA MARCADO ==> QUITO EL VALUE DEL ARRAY
  //RETORNA UN ARRAY DE STRINGS
  const updater = (prev: string[], checked: boolean, value: string): string[] => (checked ? [...prev, value] : prev.filter((v) => v !== value));

  // FUNCION PRINCIPAL DE VERIFICACION DE GRUPOS
  const verifyGroup = ({ e, group }: { e: React.ChangeEvent<HTMLInputElement>; group: TOptionWork }): void => {
    const value: string = e.target.value; // ALMACENO EN MEMORIA VALOR DEL CHECK
    const checked: boolean = e.target.checked; // ALMACENO EN MEMORIA BANDERA DEL CHECK

    // OBTENER ARRAY ACTUAL DEL GRUPO DESDE stepData
    const currentValues: string[] = stepData[EKeyDataByStep.ONE]?.[`${group}[]`] || [];

    // GENERAR NUEVO ARRAY ACTUALIZADO
    const updatedValues: string[] = updater(currentValues, checked, value);

    // FUNCION DE ACTUALIZACION DE DATOS GLOBALES Y VALIDACIONES
    const updateCommon = (next: string[]) => {
      const isValid = next.length > 0;

      // ACTUALIZAR VALIDACION LOCAL
      setFormState((prev) => ({
        ...prev,
        [`${group}[]`]: {
          isValid: isValid,
          error: isValid ? '' : 'Checkbox requeridos',
          value: next,
        },
      }));

      // ACTUALIZAR DATOS GLOBALES
      setStepData((prev) => ({
        ...prev,
        [EKeyDataByStep.ONE]: {
          ...prev[EKeyDataByStep.ONE],
          [`${group}[]`]: next,
        },
      }));
    };

    // ACTUALIZAR CON NUEVOS VALORES
    updateCommon(updatedValues);
  };

  return { verifyGroup };
};
