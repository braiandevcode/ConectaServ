import type React from 'react';
import { useEffect } from 'react';
import useRegisterPro from '../../../hooks/useRegisterTasker';
import { StepThreeContext } from './StepThreeContext';
import { EKeyDataByStep } from '../../../types/enums';
import { formatMontoWithCurrency, parseMontoToNumber } from '../../../utils/parsedAndFormatValuesUtils';
import BudgeValidator from '../../../modules/validators/BudgeValidator';
import type { TYesOrNo } from '../../../types/typeRadioYesOrNo';
import type { TFieldState } from '../../../types/typeStateFields';
import type { TTypeContextStepThree } from '../../../types/typeContextStepThree';
import type { TStepDataTasker } from '../../../types/typeStepData';

// PROVIDER PASO TRES
const StepThreeProvider = ({ children }: { children: React.ReactNode }) => {
  const budgeValidator: BudgeValidator = new BudgeValidator(); // INSTANCIA VALIDADOR DE MONTO
  // HOOK QUE USA CONTEXTO A NIVEL REGISTRO DE PROFESIONAL
  const { formState, isFocus, stepData, setStepData , amountFieldFormat, step, validateCurrentStep, setIsFocus, setIsBudgeMountDisabled, setIsReinsertDisabled, setAmountFieldFormat, setFormState, setIsStepValid } = useRegisterPro();

  const storedAmount: number = stepData[EKeyDataByStep.THREE]?.amountBudge ?? 0;
  const storedBudgeSelected: TYesOrNo = stepData[EKeyDataByStep.THREE]?.budgeSelected ?? 'no';

  // ---------------------------------------------------EFECTOS----------------------------------------------------------------//

  // FORMATEAR VISUALMENTE EL CAMPO DEL MONTO Y REVALIDAR EL PASO
  useEffect(() => {
    // REVALIDAR EL PASO EN CADA RENDER RELEVANTE
    setIsStepValid(validateCurrentStep());

    // SI EL USUARIO NO COBRA PRESUPUESTO Y ESTÁ EN FOCO => NO CONTINUAR
    if (storedBudgeSelected === 'no' && isFocus) return;

    // SI EL USUARIO DIJO "YES" => ASEGURAR CAMPO HABILITADO Y REINTEGRO HABILITADO
    if (storedBudgeSelected === 'yes') {
      setIsBudgeMountDisabled(false);
      setIsReinsertDisabled(false);
    }
    // OBTENER VALOR NUMÉRICO ACTUAL DEL FORMSTATE (FUENTE DE VERDAD PARA CÁLCULOS)
    const currentAmount: number = (formState.amountBudge.value as string).trim() !== '' ? parseMontoToNumber(formState.amountBudge.value as string) : parseMontoToNumber('0');

    // SI EN PERSISTENCIA DICE "NO" Y EL  PERSISTIDO ACTUAL ES 0 => DESHABILITAR CAMPO Y MARCAR PASO VÁLIDO
    if (storedBudgeSelected === 'no' && storedAmount === 0) {
      setIsBudgeMountDisabled(true); // MONTO DESHABILITADO
      setAmountFieldFormat(''); // LIMPIAR CAMPO VISUAL
      setIsStepValid(true); // MARCAR PASO COMO VÁLIDO
      return;
    }

    // SI NO HAY MONTO ALMACENADO => SALIR (NO HAY NADA QUE FORMATEAR)
    if (storedAmount === 0) return;

    // SI EN PERSISTENCIA DICE "NO" PERO EN PERSISTENCIA HAY MONTO => PASO NO VALIDO
    if (storedBudgeSelected === 'no' && currentAmount > 0) {
      setIsStepValid(false); // PASO NO VALIDO
      return;
    }

    // FUENTE DE LA VERDAD PARA UI: STRING DEL MONTO ACTUAL
    const storedAmountString: string = currentAmount.toString();

    // SI EXISTE VALOR EN LA CADENA, SETEAR FORMATO EN EL INPUT SEGÚN FOCO (SOLO DÍGITOS EN FOCO, SINO FORMATO MONEDA)
    if (storedAmountString) {
      const amount: string = isFocus ? storedAmountString : formatMontoWithCurrency(storedAmountString);
      setAmountFieldFormat(amount); // SETEAR VALOR FORMATEADO EN EL INPUT
      return;
    }

    setIsBudgeMountDisabled(false); // DESHABILITAR CAMPO DE MONTO
    setAmountFieldFormat(''); // DEJAR CAMPO VISUALMENTE VACIO
  }, [step, isFocus, storedBudgeSelected]); // DEPENDENCIAS: PASO, FOCO Y SELECCIÓN DE PRESUPUESTO

  //-----------------------------------------------EVENTOS -------------------------------------//

  // EVENTO ONCHANGE DEL RADIO "¿COBRA PRESUPUESTO?" EN EL PASO 3
  const onChangeIsBudge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as TYesOrNo; // VALOR SELECCIONADO ("yes" O "no")

    // ACTUALIZAR EL OBJETO GLOBAL DE PASOS CON EL NUEVO VALOR DE "budgeSelected"
    setStepData(
      (prev) =>
        ({
          ...prev,
          [EKeyDataByStep.THREE]: {
            ...prev[EKeyDataByStep.THREE],
            budgeSelected: value,
          },
        }) as TStepDataTasker,
    );

    // DETERMINAR SI EL PASO ES VALIDO SEGUN SELECCION Y MONTO
    const isValid = (value === 'no' && storedAmount === 0) || (value === 'yes' && amountFieldFormat !== '' && storedAmount > 0);

    // ACTUALIZAR ESTADO LOCAL DE VALIDACIÓN DEL RADIO
    setFormState((prev) => ({
      ...prev,
      budgeSelected: { error: '', value, isValid },
    }));

    // SI EL USUARIO SELECCIONA "NO"
    if (value === 'no') {
      // RESETEAR MONTO Y REINTEGRO EN EL STORAGE
      setStepData(
        (prev) =>
          ({
            ...prev, //COPIO TODOS LOS DATOS DEL OBJETO COMPLETO
            [EKeyDataByStep.THREE]: {
              // ESPECIFICO EL PASO 3
              ...prev[EKeyDataByStep.THREE], // COPIO TODO LO PREVIO AL PASO 3
              amountBudge: 0, //PISO CON VALOR NUEVO EL PRESUPUESTO
              reinsert: 'no', //PISO CON VALOR NUEVO EL REINTEGRO
            },
          }) as TStepDataTasker,
      );

      // RESETEAR VALIDACION LOCAL DEL CAMPO MONTO
      setFormState((prev) => ({
        ...prev,
        amountBudge: { error: '', value: '', isValid: true },
      }));

      setAmountFieldFormat(''); // LIMPIAR INPUT VISUAL
      setIsBudgeMountDisabled(true); // DESHABILITAR CAMPO MONTO
      setIsReinsertDisabled(true); //DESHABILITAR RADIO REINTEGRO
      setIsStepValid(true); //MARCAR COMO VALIDO
      return; //==> RETORNAR Y NO SEGUIR
    }

    // SI EL USUARIO SELECCIONA "YES" => VALIDAR MONTO INGRESADO
    const result: TFieldState = budgeValidator.validate(amountFieldFormat);

    // ACTUALIZAR FORMSTATE LOCAL CON RESULTADO DE VALIDACIÓN
    setFormState((prevState) => ({ ...prevState, amountBudge: result }));

    // SI EL MONTO ES VALIDO => ACTUALIZAR STORAGE CON EL VALOR NUMERICO
    if (result.isValid) {
      setIsFocus(false); //FOCO EN FALSE
      setStepData(
        (prev) =>
          ({
            ...prev,
            [EKeyDataByStep.THREE]: {
              ...prev[EKeyDataByStep.THREE],
              amountBudge: parseMontoToNumber(result.value as string),
            },
          }) as TStepDataTasker,
      );
    }

    setIsBudgeMountDisabled(false); // HABILITAR CAMPO DE MONTO
    setIsStepValid(isValid); // VALIDAR EN RUNTIME
  };

  // EVENTO ONINPUT DEL CAMPO MONTO
  const handleBudgeAmount = (e: React.FormEvent<HTMLInputElement>) => {
    const val: string = e.currentTarget.value; // VALOR INGRESADO POR EL USUARIO

    // IGNORAR SI EL USUARIO EMPIEZA CON CERO Y NO HAY MÁS NÚMEROS
    if (val === '0') return;

    // ACTUALIZAR INPUT VISUAL CON EL VALOR ORIGINAL
    setAmountFieldFormat(val);
    setIsFocus(true); // MARCAR FOCUS PORQUE EL USUARIO ESTÁ ESCRIBIENDO

    // SI EL USUARIO COBRA PRESUPUESTO ("yes")
    if (storedBudgeSelected === 'yes') {
      const result: TFieldState = budgeValidator.validate(val); // VALIDAR MONTO

      // ACTUALIZAR ESTADO LOCAL DE VALIDACION
      setFormState((prevState) => ({ ...prevState, amountBudge: result }));

      // MARCAR PASO COMO VALIDO O NO SEGUN RESULTADO
      setIsStepValid(result.isValid);

      // ES VALIDO
      if (result.isValid) {
        // ACTUALIZAR STORAGE CON MONTO NUMÉRICO
        setStepData(
          (prev) =>
            ({
              ...prev,
              [EKeyDataByStep.THREE]: {
                ...prev[EKeyDataByStep.THREE],
                amountBudge: parseMontoToNumber(result.value as string),
              },
            }) as TStepDataTasker,
        );
        setIsReinsertDisabled(false); // HABILITAR REINTEGRO
      } else {
        // SINO
        // RESETEAR STORAGE SI EL MONTO NO ES VÁLIDO
        setStepData(
          (prev) =>
            ({
              ...prev,
              [EKeyDataByStep.THREE]: {
                ...prev[EKeyDataByStep.THREE],
                amountBudge: 0,
              },
            }) as TStepDataTasker,
        );
        setIsStepValid(false);
        setIsReinsertDisabled(true); // DESHABILITAR REINTEGRO
      }
      return; // => RETORNAR
    }

    // SI EL USUARIO NO COBRA PRESUPUESTO ("no")
    if (storedBudgeSelected === 'no') {
      const numericVal: number = parseMontoToNumber(val); // ALMACENAR MONTO PARSEADO

      // SI EL MONTO ES 0 => PASO VALIDO
      if (numericVal === 0) {
        setIsStepValid(true);
      }

      // SI EL MONTO ES MAYOR QUE 0 => PASO NO VALIDO Y ERROR
      if (numericVal > 0) {
        setFormState((prev) => ({
          ...prev,
          amountBudge: {
            error: 'Confirma que cobra presupuesto', // MENSAJE DE ERROR
            value: val, // VALOR ACTUAL
            isValid: false, // FALSE
          },
        }));
        setIsStepValid(true); // ASEGURAR A FALSE
      }
    }
  };

  // EVENTO ONBLUR DEL CAMPO MONTO EN EL PASO 3
  const onBlurAmount = () => {
    // SI EL MONTO NO ES VÁLIDO => MANTENER FOCUS Y NO FORMATEAR
    if (!formState.amountBudge.isValid) {
      setIsFocus(true);
      return;
    }

    setIsFocus(false); // QUITAR FOCUS

    // SI HAY MONTO ALMACENADO
    if (storedAmount > 0) {
      const storedMountString: string = storedAmount.toString();

      // FORMATEAR MONTO CON MONEDA PARA MOSTRAR EN INPUT
      if (storedMountString) {
        setAmountFieldFormat(formatMontoWithCurrency(storedMountString));
      } else {
        setAmountFieldFormat(''); // CAMPO VACÍO SI NO HAY MONTO
      }
    }
  };

  // EVENTO ONFOCUS DEL CAMPO MONTO EN EL PASO 3
  const onFocusAmount = () => {
    // SI EL MONTO NO ES VÁLIDO => MANTENER FOCUS Y NO FORMATEAR
    if (!formState.amountBudge.isValid) {
      setIsFocus(true);
      return;
    }

    setIsFocus(true); // MARCAR FOCUS

    // SI HAY MONTO ALMACENADO => MOSTRAR SOLO NÚMEROS (SIN FORMATO)
    if (storedAmount > 0) {
      const storedAmountString: string = storedAmount.toString();
      if (storedAmountString) {
        setAmountFieldFormat(storedAmountString);
      }
      return;
    }

    // CASO: NO COBRA PRESUPUESTO Y MONTO 0 => CAMPO VACÍO Y PASO VÁLIDO
    if (storedBudgeSelected === 'no' && storedAmount === 0) {
      setAmountFieldFormat('');
      setIsStepValid(true);
    }
  };

  // EVENTO ONCHANGE DEL RADIO "REINTEGRO" EN EL PASO 3
  const onChangeIsReinsert = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as TYesOrNo; // VALOR SELECCIONADO ("yes" O "no")

    // ACTUALIZAR EL OBJETO GLOBAL DE PASOS CON NUEVO VALOR DE "reinsert"
    setStepData(
      (prev) =>
        ({
          ...prev,
          [EKeyDataByStep.THREE]: {
            ...prev[EKeyDataByStep.THREE],
            reinsert: value,
          },
        }) as TStepDataTasker,
    );
  };

  const contextValueStepThree: TTypeContextStepThree = {
    handleBudgeAmount,
    onBlurAmount,
    onChangeIsBudge,
    onChangeIsReinsert,
    onFocusAmount,
  };

  return <StepThreeContext.Provider value={contextValueStepThree}>{children}</StepThreeContext.Provider>;
};

export default StepThreeProvider;
