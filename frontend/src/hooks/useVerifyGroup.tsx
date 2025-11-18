import { EEntitiesGroup, EKeyDataByStep } from '../types/enums';
import { useEffect, type ChangeEvent } from 'react';
import type { TEntitie, TOptionWork } from '../types/typeOptionsWork';
import type { TStepOne } from '../types/typeStepOne';
import useRegisterTasker from './useRegisterTasker';
import { ENTITY_TO_GROUP } from '../config/configGroupsByNameChekboxTasker';

// CUSTOM HOOK
export const useVerifyGroup = () => {
  const { stepData, setStepData, step, formState, setFormState, isResetDetailsWork } = useRegisterTasker(); //HOOK PERSONALIZADO QUE USA CONTEXTO REGISTRO PROFESIONAL

  // EFECTO PARA RESETEAR DETALLES DE TRABAJO CUANDO CAMBIA CATEGORÍA
  useEffect(() => {
    if (!isResetDetailsWork) return; // SI NO SE SOLICITA RESET, NO CONTINUAR

    // LIMPIAR TODOS LOS VALORES EN ARREGLOS DE GRUPOS DEL formState
    formState['service'].value = [];
    formState['workArea'].value = [];
    formState['day'].value = [];
    formState['hour'].value = [];

    // NUEVO OBJETO DE DETALLES VACIO
    const newStepOneDetailsWork: Pick<TStepOne, 'serviceData' | 'workAreaData' | 'dayData' | 'hourData'> = {
      serviceData: { service: [] },
      workAreaData: { workArea: [] },
      dayData: { day: [] },
      hourData: { hour: [] },
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
  const updater = (prev: string[], checked: boolean, value: string): string[] => {
    return checked ? [...prev, value] : prev.filter((v) => v !== value);
  };

  // FUNCION PRINCIPAL DE VERIFICACION DE GRUPOS
  const verifyGroup = ({ e, entitie }: { e: ChangeEvent<HTMLInputElement>; entitie: TEntitie }): string[] => {
    const group: TOptionWork = ENTITY_TO_GROUP[entitie]; // valor literal del group
    const value = e.target.value;
    const checked = e.target.checked;

    let currentStoredValues: string[] = [];

    //  SEGUN ENTITIE PARA QUE TS RECONOZCA EL ACCESO ==> DENOMINADO NARROWING
    switch (entitie) {
      case EEntitiesGroup.SERVICE_DATA:
        currentStoredValues = stepData[EKeyDataByStep.ONE].serviceData.service;
        break;
      case EEntitiesGroup.WORK_AREA_DATA:
        currentStoredValues = stepData[EKeyDataByStep.ONE]?.workAreaData?.workArea ?? [];
        break;
      case EEntitiesGroup.DAY_DATA:
        currentStoredValues = stepData[EKeyDataByStep.ONE].dayData.day;
        break;
      case EEntitiesGroup.HOUR_DATA:
        currentStoredValues = stepData[EKeyDataByStep.ONE].hourData.hour;
        break;
    }

    const updatedValues: string[] = updater(currentStoredValues, checked, value);

    // FUNCION DE ACTUALIZACION DE DATOS Y VALIDACIONES
    const updateCommon = (next: string[]) => {
      const isValid: boolean = next.length > 0;

      // === ACTUALIZAR FORMSTATE ===
      setFormState((prev) => ({
        ...prev,
        [`${group}[]`]: {
          isValid,
          error: next.length > 0 ? '' : 'Checkbox requeridos',
          value: next,
        },
      }));

      // === ACTUALIZAR STEP DATA ===
      setStepData((prev) => ({
        ...prev,
        [EKeyDataByStep.ONE]: {
          ...prev[EKeyDataByStep.ONE],
          [entitie]: {
            ...prev[EKeyDataByStep.ONE][entitie],
            [group]: next,
          },
        },
      }));
    };

    updateCommon(updatedValues);

    return updatedValues;
  };

  return { verifyGroup };
};
