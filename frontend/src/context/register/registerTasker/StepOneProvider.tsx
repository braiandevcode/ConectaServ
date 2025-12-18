import React, { useEffect, useRef, type ChangeEvent } from 'react';
import { ECategoryKey, EKeyDataByStep, ENamesOfKeyLocalStorage } from '../../../types/enums';
import { StepOneContext } from './StepOneContext';
import useRegisterTasker from '../../../hooks/useRegisterTasker';
import SelectedValidator from '../../../modules/validators/SelectedValidator';
import { useVerifyGroup } from '../../../hooks/useVerifyGroup';
import type { TCategoryKey } from '../../../types/typeCategory';
import type { TFieldState } from '../../../types/typeStateFields';
import type { TEntitie } from '../../../types/typeOptionsWork';
import type { TTypeContextStepOne } from '../../../types/typeContextStepOne';
import useTasker from '../../../hooks/useTasker';

// PROVIDER PARA EL PASO  ==> 1
const StepOneProvider = ({ children }: { children: React.ReactNode }) => {
  const selectedCategoryValidator: SelectedValidator = new SelectedValidator(); //==> INSTANCIAR VALIDADOR DE SELECT

  // CUSTOM HOOK QUE USA CONTEXTO DE TASKER GENERAL
  const { setStepData, stepData, setFormState, setIsStepValid } = useTasker();

  // CUSTOM HOOK QUE USA CONTEXTO DE REGISTRO DE TASKERS
  const { hasBudge, hasWorkArea, setHasInteracted, setValueSelected, setHasBudge, setHasWorkArea, setIsResetDetailsWork, validateCurrentStep } = useRegisterTasker();
  const { verifyGroup } = useVerifyGroup(); //HOOK PARA MANEJAR LOGICA DE ELECCION DE DETALLES DE TRABAJO

  const titleRef = useRef<HTMLSelectElement>(null); // ==> REF PARA ACCEDER AL VALOR ACTUAL DE ELEMENTOS SELECT DEL DOM

  // EFECTO SOLO PARA ELIMINAR DEL STORAGE EL PASO PRESUPUESTO
  useEffect(() => {
    //SI LA BANDERA DE QUE PRESUPUESTO ES FALSE
    if (!hasBudge) {
      // LIMIAR TODO ANTES
      setFormState((prev) => ({
        ...prev,
        amountBudge: { value: '', error: '', isValid: false },
        budgeSelected: { value: '', error: '', isValid: false },
        reinsert: { value: '', error: '', isValid: false },
      }));

      // SETEAR DATA GLOBAL EN STORAGE SIN EL PASO 3
      setStepData((prev) => {
        const copy = { ...prev }; // COPIAR ATOS PREVIOS
        delete copy[EKeyDataByStep.THREE]; // ==> ELIMINAR PASO 3
        return copy;
      });
    }
  }, [hasBudge]); //==> OBSERVAR ESTADO EXTERNO EN "professionalProvider" Y EJECUTAR

  // EFECTO PARA OBSERVAR SI CONTIENE O NO GRUPO CONTEXT Y REVALIDAR
  useEffect(() => {
    // SI NO HAY GRUPO DE CHECKS DE CONTEXTO (HABITOS)
    if (!hasWorkArea) {
      // SETEAR DATA GLOBAL EN STORAGE
      setStepData((prev) => {
        const copy = { ...prev }; // COPIAR TODO
        delete copy[EKeyDataByStep.ONE]?.workAreaData; // ==> ELIMINAR SOLO ATRIBUTO "workArea"
        return copy;
      });
    }
    setIsStepValid(validateCurrentStep()); //REVALIDAR
  }, [hasWorkArea]); //==> OBSERVAR ESTADO "hasContext" EXTERNO EN "professionalProvider" Y EJECUTAR

  // ACTUALIZAR STORAGE DE INTERACCION
  const updateHasInteracted = (newValue: boolean) => {
    localStorage.setItem(ENamesOfKeyLocalStorage.INTERACTED, String(newValue));
    setHasInteracted(newValue);
  };

  //---------------------------------------------------------------------EVENTOS --------------------------------------------------------------------//
  // EVENTO CHANGE DE SELECCION DE CATEGORIA
  // EVENTO DE CAMBIO DEL SELECT
  const handleChangeSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    updateHasInteracted(true); //ACTIVAMOS QUE INTERACTUO
    setIsResetDetailsWork(true);
    const value = e.target.value as TCategoryKey; //GUARDAMOS VALOR ELEGIDO Y CASTEAMOS AL TIPADO ESTRICTO PARA CATEGORIA

    // ACTUALIZAMOS BANDERAS
    setHasWorkArea(value !== ECategoryKey.MOVE);
    setHasBudge(value === ECategoryKey.REPAIR);

    if (!titleRef.current) return; //SI NO HAY VALOR EN REFERENCIA NO CONTINUAR
    const current: HTMLSelectElement = titleRef.current; //GUARDO REFERENCIA DE ELEMENTO EN MEMORIA

    const selectedOptionText: string = current.options[current.selectedIndex]?.text;
    setValueSelected(selectedOptionText); // SETEAR EL TEXTO DEL ELEMENTO SELECT SEGUN OPCION ELEGIDA

    const result: TFieldState = selectedCategoryValidator.validate(value); //VALIDAR
    setFormState((prevState) => ({ ...prevState, category: result }));

    // GUARDAR EN STEP DATA
    setStepData((prev) => ({
      ...prev,
      [EKeyDataByStep.ONE]: {
        ...prev[EKeyDataByStep.ONE],
        categoryData: {
          category: value,
        },
        valueSelected: selectedOptionText,
      },
    }));
    setIsStepValid(false); //SETEAR SI ES VALIDO O NO
  };

  //HANDLER DE EVENTO CHANGE CHECKBOXES
  // MANEJA EL CAMBIO DE LOS CHECKBOXES EN LOS DIFERENTES GRUPOS (service, context, day, hour)
  // ACTUALIZA EL ESTADO CORRESPONDIENTE AGREGANDO O REMOVIENDO EL VALOR SEGUN SI ESTA CHECKEADO O NO
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, entitie: TEntitie) => {
    setIsResetDetailsWork(false); //NO RESETEAR
    const updatedValues: string[] = verifyGroup({ e, entitie }); //==> INVOCAR FUNCION DE HOOK PARA VERFICAR CHECKSBOXES

    // ----------------------VALIDACION INSTANTANEA-----------------------//
    // ARMAR LISTA DE GRUPOS A VALIDAR
    const groups = [entitie === 'serviceData' ? updatedValues : stepData[EKeyDataByStep.ONE].serviceData['service'] ?? [], entitie === 'dayData' ? updatedValues : stepData[EKeyDataByStep.ONE].dayData['day'] ?? [], entitie === 'hourData' ? updatedValues : stepData[EKeyDataByStep.ONE].hourData['hour'] ?? []];

    // // AGREGAR workArea[] SOLO SI EXISTE
    if (hasWorkArea) {
      groups.push(entitie === 'workAreaData' ? updatedValues : stepData[EKeyDataByStep.ONE].workAreaData?.workArea ?? []);
    }

    // VALIDAR QUE TODOS LOS GRUPOS TENGAN AL MENOS UN CHECK
    const isValidGroups = groups.every((arr) => arr.length > 0);
    setIsStepValid(isValidGroups); // ACTUALIZA VALIDACION DEL PASO INSTANTANEAMENTE
  };

  const contextStepOneValue: TTypeContextStepOne = {
    handleChangeSelected,
    handleCheckboxChange,
    titleRef,
  };

  return <StepOneContext.Provider value={contextStepOneValue}>{children}</StepOneContext.Provider>;
};
export default StepOneProvider;
