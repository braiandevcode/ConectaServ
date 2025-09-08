import { ECategoryKey, EGroupCheckBox, EKeyDataByStep } from '../types/enums.js';
import { formState } from '../config/constant.js';
import { TFormElement } from '../types/types';
import isCategory from './validators/isCategory.js';
import { capitalizeWords, formatDescription, normalizeSpaces, parseMontoToNumber } from '../ui/auxiliars.js';

// FUNCION PARA GUARDAR DATOS Y HACER LA PERSISTENCIA
const saveDataStep = ({ step, elements }: { step: number; elements: TFormElement[] }): void => {
    // VARIABLE PARA NO SOBREESCRIBIR DATOS E IR ACUMULANDO
    const existingData = JSON.parse(localStorage.getItem("stepData") || "{}");

    const stepKey: string = String(step);
    let stepData: Record<string, any> = {};

    // EVALUAR EL VALOR DE LA CLAVE DEL OBJETO DE DATOS 
    switch (stepKey) {
        case EKeyDataByStep.ZERO: {
            // FILTRAR CAMPOS: EL PRIMERO QUE COINCIDA CON EL NAME DEL INPUT PASO 1
            const fullNameInput = elements.find((el) => el.name === 'fullName');
            const usernameInput = elements.find((el) => el.name === 'userName');
            const emailInput = elements.find((el) => el.name === 'email');
            const locationInput = elements.find((el) => el.name === 'location');
            const acceptedTermsInput = elements.find((el) => el.name === 'terms') as HTMLInputElement | undefined;

            // AÑADIR DATOS AL OBJETO
            stepData = {
                fullName: capitalizeWords(normalizeSpaces(fullNameInput?.value || '')),
                userName: usernameInput?.value || '',
                email: emailInput?.value.toLowerCase() || '',
                location: capitalizeWords(locationInput?.value || ''),
                terms: acceptedTermsInput?.checked || false,
            };
            break;
        }
        case EKeyDataByStep.ONE: {
            // FILTRAR DE LOS CAMPOS EL PRIMERO QUE COINCIDA CON EL NAME DEL INPUT PASO 1 Y
            // FILTRAR TODOS LOS CAMPOS Y CREAR NUEVO ARRAY CON EL VALOR DE LOS CHECK MARCADOS
            const serviceValues = elements.filter((el) => el.name === EGroupCheckBox.SERVICE && (el as HTMLInputElement).checked).map((el) => el.value);
            const contextValues = elements.filter((el) => el.name === EGroupCheckBox.CONTEXT && (el as HTMLInputElement).checked).map((el) => el.value);
            const dayValues = elements.filter((el) => el.name === EGroupCheckBox.DAY && (el as HTMLInputElement).checked).map((el) => el.value);
            const hourValues = elements.filter((el) => el.name === EGroupCheckBox.HOUR && (el as HTMLInputElement).checked).map((el) => el.value);
            const categoryInput = elements.find((el) => el.name === 'category');

            // GUARDAR CATEGORIA
            stepData = {
                category: (categoryInput?.value || ''),
                service: serviceValues,
                ...(formState.hasContext ? { context: contextValues } : {}), //SI 'hasContext' ES FALSE OBJETO VACIO
                day: dayValues,
                hour: hourValues,
            };
            break;
        }

        case EKeyDataByStep.TWO: {
            const profileImageInput: TFormElement | undefined = elements.find((el) => el.name === 'imageProfile');
            const experienceImagesInputs: TFormElement[] = elements.filter((el) => el.name === 'imageExperiences');
            const descriptionInput = elements.find((el) => el.name === 'descriptionUser') as HTMLTextAreaElement | null;
            const profileImageInputEl = profileImageInput as HTMLInputElement | null;
            const experienceImagesInputsEl = experienceImagesInputs as HTMLInputElement[];

            stepData = {
                imageProfile: profileImageInputEl?.files?.[0]?.name || null,
                imageExperiences: experienceImagesInputsEl.length > 0 ? Array.from(experienceImagesInputsEl[0]?.files || [])?.map(f => f.name) : null,// SUPONIENDO UN SOLO INPUT PARA MULTIPLES FILES,
                descriptionUser: formatDescription(descriptionInput?.value || ''),
            };
            break;
        }
        case EKeyDataByStep.THREE: {
            // SI LA CATEGORIA ES 'reparacion-mantenimiento' CREAR EL OBJETO CON LOS DATOS SINO CARGAR LOS DEL PASO 5 (REEMPLAZA A 4)
            if (isCategory({ category: ECategoryKey.REPAIR, key: EKeyDataByStep.ONE })) {
                const budgetSelectedInput = elements.find((el) => el.name === 'budgeSelected' && (el as HTMLInputElement).checked);
                const budgetAmountInput = elements.find((el) => el.name === 'amountBudge');
                const reinsertInput = elements.find((el) => el.name === 'reinsert' && (el as HTMLInputElement).checked);

                stepData = {
                    budgeSelected: budgetSelectedInput?.value || '',
                    amountBudge: budgetAmountInput ? parseMontoToNumber(budgetAmountInput.value) : 0,
                    reinsert: reinsertInput?.value || '',
                };

            } else {
                // FILTRAR DE LOS CAMPOS EL PRIMERO QUE COINCIDA CON EL NAME DEL INPUT PASO 1
                const fullNameInput = elements.find((el) => el.name === 'fullName');
                const usernameInput = elements.find((el) => el.name === 'userName');
                const emailInput = elements.find((el) => el.name === 'email');
                const locationInput = elements.find((el) => el.name === 'location');
                const acceptedTermsInput = elements.find((el) => el.name === 'terms') as HTMLInputElement | null;

                // AÑADIR DATOS AL OBJETO
                stepData = {
                    fullName: capitalizeWords(normalizeSpaces(fullNameInput?.value || '')),
                    userName: usernameInput?.value || '',
                    email: emailInput?.value.toLowerCase() || '',
                    location: capitalizeWords(locationInput?.value || ''),
                    terms: acceptedTermsInput?.checked || false,
                };
            }
            break;
        }
        case EKeyDataByStep.FOUR: {
            // EJECUTAR SOLO SI LA CATEGORIA ES reparacion-mantenimiento ASI EVITAR ESTE PASO
            if (isCategory({ category: ECategoryKey.REPAIR, key: EKeyDataByStep.ONE })) {
                const acceptedTermsInput = elements.find((el) => el.name === 'terms') as HTMLInputElement | null;
                // FILTRAR DE LOS CAMPOS EL PRIMERO QUE COINCIDA CON EL NAME DEL INPUT PASO 1
                const fullNameInput = elements.find((el) => el.name === 'fullName');
                const usernameInput = elements.find((el) => el.name === 'userName');
                const emailInput = elements.find((el) => el.name === 'email');
                const locationInput = elements.find((el) => el.name === 'location');

                // AÑADIR DATOS AL OBJETO
                stepData = {
                    fullName: capitalizeWords(normalizeSpaces(fullNameInput?.value || '')),
                    userName: usernameInput?.value || '',
                    email: emailInput?.value.toLowerCase() || '',
                    location: capitalizeWords(locationInput?.value || ''),
                    terms: acceptedTermsInput?.checked || false,
                };
                break;
            }
        }
        default:
            return;
    };

    // SOBRESCRIBIMOS AL FINAL POR CUALQUIER CASO
    existingData[stepKey] = stepData;
    // ACTUALIZAR ESTADO GLOBAL SIN PERDER LOS DATOS PREVIOS
    // EL SPREAD OPERATOR NOS AYUDA A QUE SIEMPRE TENGAMOS LA ULTIMA INFORMACION DEL OBJETO
    formState.dataByStep = { ...formState.dataByStep, [stepKey]: stepData};
    localStorage.setItem("stepData", JSON.stringify(formState.dataByStep));
};
export default saveDataStep;
