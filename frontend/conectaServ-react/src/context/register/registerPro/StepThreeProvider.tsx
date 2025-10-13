import type React from 'react';
import { useEffect } from 'react';
import useRegisterPro from '../../../hooks/useRegisterPro';
import { StepThreeContext } from './StepThreeContext';
import type { TFieldState, TStepData, TTypeContextStepThree, TYesOrNo } from '../../../types/types';
import { EKeyDataByStep } from '../../../types/enums';
import { formatMontoWithCurrency, parseMontoToNumber } from '../../../utils/parsedAndFormatValuesUtils';
import BudgeValidator from '../../../modules/validators/BudgeValidator';

const StepThreeProvider = ({ children }: { children: React.ReactNode }) => {
  const budgeValidator: BudgeValidator = new BudgeValidator(); // INSTANCIA VALIDADOR DE MONTO
  // HOOK REGISTER PROFESIONAL
  const { formState, stepData, isFocus, isBudgeMountDisabled, validateCurrentStep, setIsFocus, setIsBudgeMountDisabled, setIsReinsertDisabled, setAmountFieldFormat, setFormState, setStepData, setIsStepValid, step } = useRegisterPro();

  const storedAmount: number = stepData[EKeyDataByStep.THREE]?.amountBudge ?? 0;
  const storedBudgeSelected: TYesOrNo = stepData[EKeyDataByStep.THREE]?.budgeSelected ?? 'no';

  // ---------------------------------------------------EFECTOS----------------------------------------------------------------//

  // // FORMATEAR VISUALMENTE EL CAMPO DEL MONTO
  useEffect(() => {
    console.log('No continuar: ', storedBudgeSelected === 'no' && isFocus);

    console.log('es cero el monto: ', storedAmount === 0);
    setIsStepValid(validateCurrentStep()); // ==> REVALIDAR

    if (storedBudgeSelected === 'yes' && storedAmount === 0) {
      setIsBudgeMountDisabled(false);
      setIsStepValid(false);
      setAmountFieldFormat('');
      return; // SI LO QUE ESTA EN STORAGE ES CERO NO SEGUIR
    }

    if (storedBudgeSelected === 'no' && storedAmount === 0) {
      setIsBudgeMountDisabled(true);
      setAmountFieldFormat('');
      setIsStepValid(true);
      return;
    }

    if (storedBudgeSelected === 'no' && storedAmount > 0) {
      setIsBudgeMountDisabled(true);
      setAmountFieldFormat('');
      setIsStepValid(false);
      return;
    }

    const storedAmountString: string = storedAmount.toString(); //FUENTE DE LA VERDAD

    //ASEGURAR QUE NO ESTE VACIO
    if (storedAmountString) {
      // EL VALOR DE  "amount" ES EL QUE SE VERA EN INPUT UI AL USUARIO
      // SI ESTA EN FOCUS, MANTENER VALOR FORMATEADO CON SOLO NUMEROS, SINO FORMATEAR A MONEDA
      const amount: string = isFocus ? storedAmountString : formatMontoWithCurrency(storedAmountString);
      setAmountFieldFormat(amount); // SETEAR EL VALOR FORMATEADO
      return;
    }

    // SI ESTABA VACIO
    // setAmountFieldFormat(''); //DEJARLO VACIO
  }, [step, isFocus, storedBudgeSelected, storedAmount, isBudgeMountDisabled]); // ==> DEPENDE DE PASO Y BANDERA DE FOCUS

  //-----------------------------------------------EVENTOS PARA EL PASO 3-------------------------------------//
  // EVENTO ONCHANGE RADIO COBRA O NO PRESUPUESTO PASO 3
  const onChangeIsBudge = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ALMACENAR VALOR ELEGIDO EN EVENTO CHANGE DEL PRESUPUESTO
    const value = e.target.value as TYesOrNo;

    // SETEAR ESTADO GLOBAL DEL OBJETO EN STORAGE
    setStepData(
      (prev) =>
        ({
          ...prev, // COPIAR TODO EL OBJETO PRINCIPAL
          [EKeyDataByStep.THREE]: {
            // SUBOBJETO A MODIFICAR
            ...prev[EKeyDataByStep.THREE], // COPIAR EL SUBOBJETO ANTERIOR
            budgeSelected: value, // PISAR SOLO ESTE ATRIBUTOA PROP
          },
        }) as TStepData,
    );

    if (value === 'no') {
      // setIsBudgeMountDisabled(true);
      // LIMPIAR EL MONTO Y ACTUALIZAR EL OBJETO GLOBAL DE PASOS
      setStepData(
        (prev) =>
          ({
            ...prev,
            [EKeyDataByStep.THREE]: {
              ...prev[EKeyDataByStep.THREE],
              amountBudge: 0,
              reinsert: 'no',
            },
          }) as TStepData,
      );

      return;
    }

    // setIsBudgeMountDisabled(false);
  };

  // EVENTO DE ONINPUT DE CAMPO DEL MONTO
  const handleBudgeAmount = (e: React.FormEvent<HTMLInputElement>) => {
    const val: string = e.currentTarget.value;

    if (storedBudgeSelected === 'no' && isFocus) return; //SI EL USUARIO NO COBRA PRESUPUESTO PERO LOGRA HACER FOCO ==> NO SEGUIR

    if (val === '0') return; // SI EL USUARIO EMPIEZA CON CERO Y AUN NO HAY MAS NUMEROS ==> IGNORAR

    setAmountFieldFormat(val); //SETEAR CON SU VALOR ORIGINAL
    setIsFocus(true); //FOCUS EN TRUE PORQUE ESTA ESCRIBIENDO

    const result: TFieldState = budgeValidator.validate(val); // ==> VALIDAR EL CAMPO
    setFormState((prevState) => ({ ...prevState, amountBudge: result })); //==> SETEAR VALIDACION DEL

    setIsStepValid(result.isValid);

    // SI ES VALIDO, ACTUALIZAR EL STORAGE
    if (result.isValid) {
      setStepData(
        (prev) =>
          ({
            ...prev,
            [EKeyDataByStep.THREE]: {
              ...prev[EKeyDataByStep.THREE],
              amountBudge: parseMontoToNumber(result.value as string),
            },
          }) as TStepData,
      );
      setIsReinsertDisabled(false);
    } else {
      // LIMPIAR EL MONTO Y ACTUALIZAR EL OBJETO GLOBAL DE PASOS
      setStepData(
        (prev) =>
          ({
            ...prev,
            [EKeyDataByStep.THREE]: {
              ...prev[EKeyDataByStep.THREE],
              amountBudge: 0,
              reinsert: 'no',
            },
          }) as TStepData,
      );
      setIsReinsertDisabled(true);
    }
  };

  // EVENTO ONBLUR DE INPUT DE MONTO PASO 3
  const onBlurAmount = () => {
    // SI NO ES VALIDO, NO FORMATEAR NI LIMPIAR, SOLO MANTENER EL VALOR ORIGINAL Y EL FOCUS
    if (!formState.amountBudge.isValid) {
      setIsFocus(true);
      return;
    }

    setIsFocus(false); // FOCUS FALSE

    if (storedAmount > 0) {
      // TOMAR VALOR LIMPIO DE FORMSTATE NORMALIZADO UNICA FUENTE DE LA VERDAD
      const storedMountString: string = storedAmount.toString();
      if (storedMountString) {
        setAmountFieldFormat(formatMontoWithCurrency(storedMountString)); // FORMATEAR
      } else {
        setAmountFieldFormat('');
      }
    }
  };

  // EVENTO FOCUS
  const onFocusAmount = () => {
    // SI NO ES VALIDO, MANTENER FOCUS Y NO FORMATEAR
    if (!formState.amountBudge.isValid) {
      setIsFocus(true);
      return;
    }

    setIsFocus(true); // FOCUS TRUE

    //SI ES MAYOR QUE CERO
    if (storedAmount > 0) {
      const storedAmountString: string = storedAmount.toString();
      if (storedAmountString) {
        // MOSTRAR EL VALOR SIN FORMATO, SOLO DIGITOS
        setAmountFieldFormat(storedAmountString);
      }
      return;
    }

    setAmountFieldFormat('');
  };

  // EVENTO ONCHANGE DE RADIO REINTEGRO
  const onChangeIsReinsert = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as TYesOrNo;
    // SETEAR ESTADO GLOBAL DEL OBJETO EN STORAGE
    setStepData(
      (prev) =>
        ({
          ...prev, // COPIAR TODO EL OBJETO PRINCIPAL
          [EKeyDataByStep.THREE]: {
            // SUBOBJETO A MODIFICAR
            ...prev[EKeyDataByStep.THREE], // COPIAR EL SUBOBJETO ANTERIOR
            reinsert: value, // PISAR SOLO ESTE ATRIBUTOA PROP
          },
        }) as TStepData,
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
