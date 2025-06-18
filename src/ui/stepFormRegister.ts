import getFormElementsByStep from "../utils/getFormElementByStep.js";
import { TFormStep, TInputs, TFormElement, TFieldName } from "../types/types";
import { allInputsChecked, allInputsCheckedRadio, isCheckboxChecked } from "../utils/allInputsFilled.js";
import { formState, formStateValidField } from "../config/constant.js";
import addInputListener from "../events/addInputListener.js";
import { validateStepBudge, validateStepBasic, validateFullProfileStep } from "./stepValidationsFields.js";
import saveDataStep from "../utils/saveDataStep.js";
import { iFieldState } from "../interfaces/interfaces.js";
import { formatMontoOnlyNumber } from "./auxiliars.js";
import { ECategoryKey, EKeyDataByStep } from "../types/enums.js";
import isCategory from "../utils/validators/isCategory.js";
import { createImagesPreviews } from "../dom/createElementsDom.ts.js";



/*
    ---ESTE CODIGO SI BIEN FUNCIONA A FUTURO SE PODRIA ANALIZAR RESPONSABILIDAES, REDUNDANCIAS, ETC Y MEJORAR LA LEGILIBILIDAD Y ESCALABILIDAD--
*/ 

// FUNCION PARA CAPTURAR LOS CAMPOS DE CADA PASO DEL FORMULARIO GENERAL DE REGISTRO.
const stepInputs = ({ step, formSelector, btnSelector }: TFormStep): void | null => {
    const D: Document = document; // DOCUMENT

    // FUNCION QUE RETORNA LISTA DE NODOS  ELEMENTOS select/inputs/textarea A PARTIR DE REFERENCIA BASE DEL PASO ACTUAL
    const { inputs, selects, textArea } = getFormElementsByStep({ formSelector, step });
    // LISTA DE TIPOS CHECKSBOX Y RADIO
    const vectorType: string[] = ['checkbox', 'radio'];

    // LISTA DE NAMES PARA SECCION PERFIL
    const listSectionProfile: string[] = ['description', 'imageProfile', 'imageExperiences'];

    // REFERENCIA DE ELEMENTOS DEL DOM
    const $BUTTON: HTMLButtonElement | null = D.querySelector<HTMLButtonElement>(`.${btnSelector}[data-step="${step}"]`);
    const $MONT_BUDGET: HTMLInputElement | null = D.querySelector(`.form-professional-groupBudget__field`);
    const $RADIO_REINSERT: NodeListOf<HTMLInputElement> = D.querySelectorAll('.form-professional-groupBudget__radioOption input[name="reinsert"]');
    const $RADIOS_BUDGET: NodeListOf<HTMLInputElement> = D.querySelectorAll('input[name="budgeSelected"]');
    const $DESCRIPTION: HTMLTextAreaElement | null = D.querySelector('.form-professional-groupProfile__textarea[name="description"]');
    const $FILE_PROFILE: HTMLInputElement | null = D.querySelector('.upload-area__input[name="imageProfile"]');
    const $FILES_EXPERIENCES: HTMLInputElement | null = D.querySelector('.upload-area__input[name="imageExperiences"]');

    const allFormElements: TFormElement[] = [...inputs, ...selects, ...textArea]; // CREAR NUEVO ARRAY CON TODOS LOS ELEMENTOS DEL FORMULARIO

    // LLAMAR FUNCION Y GUARDAR VALOR EN VARIABLE GLOBAL QUE VALIDA SI LA CATEGORIA SELECCIONADA ES  "reparacion-mantenimiento"
    const isCategoryRepair: boolean = isCategory({ category: ECategoryKey.REPAIR, key: EKeyDataByStep.TWO });

    let isValidBudge: boolean = false; //VARIABLE AXILIAR BOOLEANA PARA EL PASO 4 PRESUPUESTO
    let isInvalidProfile: boolean = false; //VARIABLE AXILIAR BOOLEANA PARA EL PASO 4 O 5 DE PERFIL

    //FUNCION PARA EVITAR RADIOS Y CHECKBOX EN VALIDACIONES ESPECIFICAS PARA CAMPOS
    const filterInputsNoChecksAndNoRadio: TFormElement[] = allFormElements.filter(el => {
        const isInStep = el.closest(`[data-step="${step}"]`) as HTMLElement;
        // SI NO ES UN INPUT => ES TRUE, PERO SI ES UN INPUT VALIDA QUE EL TIPO NO SEA EL DE LA LISTA
        const isValidType: boolean = el.tagName !== 'INPUT' || !vectorType.includes(el.type);
        return isInStep && isValidType; // AMBOS DEBEN SER TRUE
    });

    // OBTENER LOS INPUTS DE TIPO CHECKBOX Y RADIO EN EL PASO ACTUAL
    const filterOnlyChecksAndRadio: TFormElement[] = allFormElements.filter(el => {
        const isInStep = el.closest(`[data-step="${step}"]`) as HTMLElement;
        const isValidType: boolean = el.tagName === 'INPUT' && vectorType.includes((el as HTMLInputElement).type);
        return isInStep && isValidType;
    });

    /*
        - ESTA FUNCION SE ENCARGA DE VALIDAR CAMPOS INDIVIDUALES TEXTO/RADIO/CHECKBOX 
        - LLAMA A FUNCIONES ESPECIALIZADAS POR PASO EJEMPLO lidateStepBudge()
        - USAR UNA ESTRATEGIA POR PASO PARA SABER QUE VALIDAR
    */
    //-------------------------ESTA FUNCION ES COMO EL CEREBRO DEL PASO ACTUAL------------------------------------//
    const validateStep = () => {
        // -------VARIABLES BOOLEANAS PARA ESTRATEGIA DE PASOS--------------------//
        const currentIsBudgeYes: boolean = allInputsCheckedRadio({ inputs, name: "budgeSelected", value: "yes" }); //COBRA PRESUPUESTO
        const currentIsBudgeNo: boolean = allInputsCheckedRadio({ inputs, name: "budgeSelected", value: "no" }); //COBRA PRESUPUESTO
        const isChecksValid = allInputsChecked({ inputs, hasContext: formState.hasContext }); //VARIABLE QUE EVALUA LOS CHECKED DEPENDIENDO SI hasContext ES TRUE O FALSE(SI EXISTE EL GRUPO DE CONTEXTO O NO) 
        const isTermsChecked = isCheckboxChecked({ inputs, name: 'terms' }); // SOLO DETERMINA QUE EL CHECK DE TERMINOS ESTA EN TRUE

        // VALIDAR QUE TODO EN EL PASO 1 ESTE VALIDO
        const validateStepBasicAll = (): boolean => {
            return allFormElements.every(el => {
                const { isValid } = validateStepBasic({
                    fieldName: el.name as TFieldName,
                    value: el.value,
                });
                return isValid;
            });
        };

        const isTextValid: boolean = step === 1 ? validateStepBasicAll() : true; //VARIABLE CON TERNARIO DE SI ESTA EN PASO UNO EJECUTAR EL ALL SINO TRUE

        // SI EL PASO ACTUAL ES 4 Y SI LA CATEGORIA ELEGIDA ES "reparacion-mantenimiento" SIGNIFICA QUE SE CREO LA SECCION PRESUPUESTO
        if (step === 4 && isCategoryRepair) {
            const fieldName = $MONT_BUDGET?.name as TFieldName;
            const result: iFieldState = validateStepBudge({
                isBudgeYes: currentIsBudgeYes,
                elementRadioReinsert: $RADIO_REINSERT,
                elementInputAmount: $MONT_BUDGET,
                elementBtn: $BUTTON,
                fieldName
            });
            isValidBudge = result.isValid; ///GUARDAR VALOR A VARIABLE DE PRESUPUESTO BOOLEANA PARA PODER LLAMARLA ACTUALIZADA EN OTRO SCOPE
        }

        // SI TODO SE CUMPLE CORECTAMENTE EN EL PASO 4
        const validateStepBudgeAll = (): boolean => {
            const isValid = currentIsBudgeNo || (currentIsBudgeYes && isValidBudge);
            return isValid;
        };

        // SI EL PASO ES EL 4 Y LA CATEGORIA ES "reparacion-mantenimiento" validar
        const isStepFour: boolean = step === 4 && isCategoryRepair ? validateStepBudgeAll() : true;

        const strategy: TInputs = formState.validationTypesByStep[step]; // ESTRATEGIA DE VALIDACION ACTUAL SEGUN EL PASO (step) 

        // SI ES EL PASO 4 Y LA CATEGORIA NO ES "mantenimiento-reparacion" O SI ES EL PASO 5
        if ((step === 4 && !isCategoryRepair) || step === 5) {
            // LLAMAR Y GUARDAR AARAY DE LOS OBJETOS DE VALIDACION DE PERFIL
            const resultProfile: iFieldState[] = validateFullProfileStep({
                description: $DESCRIPTION?.value || '',
                file: $FILE_PROFILE?.files?.[0] || null,
                files: $FILES_EXPERIENCES?.files || null,
            });

            // ACTUALIZAR GUARDANDO LOS ESTADOS POR DEFECTO EN formStateValidField
            listSectionProfile.forEach((fieldName, index) => {
                formStateValidField[fieldName as TFieldName] = {
                    value: resultProfile[index].value || "", // GUARDAR VALOR PUEDE SER VACIO SI NO SE LLENO EL CAMPO
                    error: resultProfile[index].error || "", // GUARDAR ERROR SI EXISTE
                    isValid: resultProfile[index].isValid,  // GUARDAR ESTADO DE VALIDEZ
                };
            });

            // DETERMINAR SI ALGUNO ES INVÁLIDO
            const hasInvalidFields: boolean = resultProfile.some(field => !field.isValid);  //ESTO ES TURE SI ALGUNO ES INVALIDO

            isInvalidProfile = hasInvalidFields; //GUARDAR VALOR A VARIABLE DE PERFIL BOOLEANA PARA PODER LLAMARLA ACTUALIZADA EN OTRO SCOPE
        }


        // OBJETO DE ESTRATEGIAS DE VALIDACIONES PARA CADA
        const strategies: Record<TInputs, boolean> = {
            text: isTextValid, //SI TODOS LOS CAMPOS DE SECCION BASICA ESTAN  TRUE => SIGUIENTE

            // SE VALIDAN AMBAS SECCIONES 2 Y 3  PARA ASEGURAR QUE SOLO SE AVANZE SI SE SELECCIONA CATEGORIA Y SE VALIDAN LOS CHECKSBOX DEL PASO 3.
            selectedCategoryAndCheckBoxes: isTextValid && isChecksValid, // SI NO SE VALIDAN LOS CHECKBOX EN EL PASO DOS SIEMPRE SERA FALSE
            checkbox: isChecksValid,
            radioBudgetFull: isStepFour,
            filesTextareaTerms: isTermsChecked && !isInvalidProfile
        };

        // RECORRER TODOS LOS CAMPOS DEL FORMULARIO Y MAPEAR SI LAS VALIDACIONES ESPECIFICAS DE CADA CAMPO SON VALIDAS
        const allFieldsValid: boolean = filterInputsNoChecksAndNoRadio.every(el => {
            const field: iFieldState = formStateValidField[el.name as TFieldName];
            return field?.isValid === true;
        });

        const strategyValid: boolean = strategies[strategy]; // GUARDAR EN VARIABLE EL VALOR ACTUAL BOOLEANO DE LA ESTRATEGIA SEGUN EL MAPEO DEL OBJETO strategys

        const isValid: boolean = strategyValid && allFieldsValid; //QUE TODO SEA VALIDO, TANTO POR PASOS COMO POR VALIDACIONES DE CADA CAMPO EN GENERAL DEL FORMULARIO

        formState.stepStatus = { ...formState.stepStatus, [step]: isValid }; // AÑADIR EL NUEVO VALOR AL PASO ACTUAL PARA SABER SI PUEDE O NO PASAR AL SIGUIENTE


        // CREAR LA VISTA PREVIA (FALTA MEJORAR)

        if (step === 4 && !isCategoryRepair || (step == 5)) {
            const $CONTAINER_IMAGES_EXPERIENCES = document.querySelector('.form-professional-groupProfile__previewMultipleImages') as HTMLElement | null;
            const $CONTAINER_IMAGE_PROFILE = D.querySelector('.form-professional-groupProfile__previewImage') as HTMLElement | null;

            if (!$CONTAINER_IMAGE_PROFILE || !$CONTAINER_IMAGES_EXPERIENCES) return null;

            // CREAR VISTA PREVIA
            createImagesPreviews({
                containerPrevProfile: $CONTAINER_IMAGE_PROFILE,
                containerPrevExperiences: $CONTAINER_IMAGES_EXPERIENCES,
                fileProfile: $FILE_PROFILE as HTMLInputElement,
                filesExperiences: $FILES_EXPERIENCES as HTMLInputElement
            });
        }

        // SI TODO ES VALIDO SEGUN EL PASO ACTUAL EL BOTON DE LA SECCION ACTUAL ES HABILITADO 
        // ESTO ES GENERAL PARA TODOS LOS BOTONES DE CADA PASO
        if (isValid) {
            $BUTTON?.removeAttribute("disabled");
        } else {
            // SINO DESHABILITADO
            $BUTTON?.setAttribute("disabled", "true");
        }
    };

    //-----------------------------ASIGNAR UN LISTENER PERSONALIZADO A CADA INPUT------------------------------------------------------------------------//

    // VALIDAR CAMPOS CON MENSAJES DE ERROR DE CADA PASO
    filterInputsNoChecksAndNoRadio.forEach(el => {
        addInputListener({
            element: el,
            callback: () => {

                const stepKey = String(step); //CONVERTIR A STRING EL VALOR DEL PASO

                validateStep(); //LLAMAR A VALIDAR PASOS

                // ESPERA UNA CLAVE DE TIPO string y LA LISTA DE ELEMNTOS DE TODO FORMULARIO PARA INTERNAMENTE VALIDAR QUE DATOS SE GUARDAN.
                saveDataStep({ step: stepKey, elements: allFormElements }); // GUARDAR DATOS DL FORMULARIO GENERAL

                console.log('todos menos radio y checks', formState.dataByStep);

                const fieldName = el.name as TFieldName; //NAME
                const value: string = el.value; //VALUE

                const messageError = document.querySelector(`[data-message=${fieldName}] .has-error`) as HTMLSpanElement | null;
                if (!messageError) return;

                // VALIDACION BASE PARA LOS INPUTS
                const result: iFieldState = validateStepBasic({ fieldName, value });

                let isValidFinal: boolean = result.isValid;
                let errorFinal: string = result.error;

                //SI ES EL CAMPO DE MONTO PRESUPUESTO HACER VALIDACION ADICIONAL
                if (fieldName === $MONT_BUDGET?.name) {
                    const currentIsBudgeYes = allInputsCheckedRadio({ inputs, name: "budgeSelected", value: "yes" });
                    // VALIDAR CAMPOS PASO 4
                    const resultBudge = validateStepBudge({
                        isBudgeYes: currentIsBudgeYes,
                        elementRadioReinsert: $RADIO_REINSERT,
                        elementInputAmount: $MONT_BUDGET,
                        elementBtn: $BUTTON,
                        fieldName
                    });

                    // COMBINAR RESULTADOS, AMBOS DEBEN SERLO PARA SER VALIDO
                    isValidFinal = result.isValid && resultBudge.isValid;

                    // PRIORIZAR MENSAJE DE ERROR QUE TENGA CONTENIDO
                    errorFinal = !result.isValid ? result.error : (!resultBudge.isValid ? resultBudge.error : '');
                }

                if (listSectionProfile.includes(fieldName)) {
                    const resultProfile: iFieldState[] = validateFullProfileStep({
                        description: $DESCRIPTION?.value || '',
                        file: $FILE_PROFILE?.files?.[0] || null,
                        files: $FILES_EXPERIENCES?.files || null,
                    });

                    // DETERMINAR SI ALGUNO ES INVÁLIDO
                    const hasInvalidFields: boolean = resultProfile.some(field => !field.isValid); //SI ALGUN CAMPO  NO ES VALIDO DEVUELVE TRUE

                    // ACTUALIZAR EL ESTADO FINAL
                    isValidFinal = isValidFinal && !hasInvalidFields; // DEBE SER VÁLIDO EN AMBAS VALIDACIONES

                    // OBTIENE EL MENSAJE DE ERROR DEL CAMPO ACTUAL BASADO EN EL NOMBRE DEL CAMPO (fieldName) 
                    // BUSCA EL ERROR CORRESPONDIENTE EN EL ARRAY resultProfile SEGUN EL INDICE DE fieldName EN listSectionProfile
                    const currentFieldError = resultProfile[listSectionProfile.indexOf(fieldName)]?.error || '';

                    // SI HAY CAMPOS INVALIDOS, ASIGNA EL ERROR DEL CAMPO ACTUAL A errorFinal, SINO MANTIENE EL errorFinal ANTERIOR
                    errorFinal = hasInvalidFields ? currentFieldError : errorFinal;
                }

                // APLICAR CLASES
                el.classList.toggle('is-valid', isValidFinal);
                el.classList.toggle('is-invalid', !isValidFinal);

                // ACTUALIZAR EL MENSAJE DE ERROR
                messageError.textContent = isValidFinal ? '' : errorFinal; // SI ES TRUE texContent VACIO SINO MENSAJE DE ERROR
            }
        });
    });

    // PASO 4 ESPECIFICO (SI APLICA) SOLO PARA EVENTOS DE RADIO
    filterOnlyChecksAndRadio.forEach(el => {
        addInputListener({
            element: el,
            callback: () => {
                validateStep(); //LLAMAR VALIDACION DEL PASO EVITANDO REPETIR LOGICA
                saveDataStep({ step: step.toString(), elements: allFormElements }); // GUARDAR DATOS DL FORMULARIO GENERAL
                console.log('todos los de radio y checks', formState.dataByStep);
            }
        });
    });

    // ESCUCHA EVENTO DEL INPUT RADIO SI COBRA PRESUPUESTO (Sí/No)
    if (step === 4 && isCategoryRepair) {
        // EJECUTAR VALIDACION INICIAL SI EL RADIO DEL PRESUPUESTO ESTA EN NO
        const $RADIO_BUDGET_NO: HTMLInputElement | undefined = Array.from($RADIOS_BUDGET).find(r => r.value === 'no' && r.checked);
        if ($RADIO_BUDGET_NO) {
            validateStepBudge({
                isBudgeYes: false,
                elementRadioReinsert: $RADIO_REINSERT,
                elementInputAmount: $MONT_BUDGET,
                elementBtn: $BUTTON,
                fieldName: $MONT_BUDGET?.name as TFieldName
            });
            validateStep(); //LLAMAR VALIDACION DEL PASO EVITANDO REPETIR LOGICA

            saveDataStep({ step: step.toString(), elements: allFormElements }); // GUARDAR DATOS DL FORMULARIO GENERAL
            console.log('todos los de radio y checks', formState.dataByStep);
        }

        $RADIOS_BUDGET.forEach(radio => {
            addInputListener({
                element: radio,
                callback: () => {
                    const currentIsBudgeYes = allInputsCheckedRadio({ inputs, name: "budgeSelected", value: "yes" }); // SELECCIONADO => TRUE O FALSE
                    // validateStep();//VALIDAR ESTADO DEL PASO ACTUAL

                    validateStepBudge({
                        isBudgeYes: currentIsBudgeYes,
                        elementRadioReinsert: $RADIO_REINSERT,
                        elementInputAmount: $MONT_BUDGET,
                        elementBtn: $BUTTON,
                        fieldName: $MONT_BUDGET?.name as TFieldName
                    });
                    validateStep(); //LLAMAR VALIDACION DEL PASO EVITANDO REPETIR LOGICA

                    saveDataStep({ step: step.toString(), elements: allFormElements }); // GUARDAR DATOS DL FORMULARIO GENERAL
                    console.log('todos los de radio y checks', formState.dataByStep);
                },
            });
        });


        // EVENTO BLUR PARA MOSTRAR VISUALMENTE EL MONTO ENTENDIBLE AL USUARIO
        $MONT_BUDGET?.addEventListener("blur", () => {
            const rawValue: string = $MONT_BUDGET.value;
            const numericRaw: string = rawValue.replace(/\D/g, ''); // SOLO DIGITOS

            // VERIFICAR SI EXISTE EL VALOR, LA LONGITUD Y QUE NO TOME EN CUENTA NADA MAS PARA SER EXACTO
            if (numericRaw && numericRaw.length <= 10) {
                $MONT_BUDGET.value = formatMontoOnlyNumber(rawValue); //FORMATEAR VALOR DEL CAMPO
            }
        });
    }
};

export default stepInputs;
