import apiRequest from "../utils/apiRequest.js";
import { iClient, iFormStateValidation } from "../interfaces/interfaces.js";
import { formState } from "../config/constant.js";
import { EKeyDataByStep } from "../types/enums.js";
import { TData } from "../types/types.js";
const eventSubmit = async (): Promise<void | null> => {
    document.addEventListener('submit', async (e: Event) => {
        const existingCurrentStep = JSON.parse(localStorage.getItem('currentStep') || '{}');
        e.preventDefault();
        const formElement = e.target as HTMLFormElement;
        if (!formElement) return null;

        // SI ES EL FORMULARIO DEL CLIENTE ASEGURAR
        if (formElement.matches('.register-client')) {
            const formData = new FormData();
            const password: HTMLInputElement | null = formElement.querySelector('input[name="password"]');
            if (password) {
                formData.append('password', password.value);
                const stepZeroData = formState?.dataByStep?.[EKeyDataByStep.ZERO] ?? null;//SI EL VALOR DE LA IZQUIERDA ES NULO O INDEFINIDO USA EL VALOR DE LA DERECHA 
                stepZeroData.password = formData.get('password');

                // OPERCAION DE FUSION NULA
                //FUNCION QUE EJECUTA EL FETCH
                const parsed = await apiRequest<iClient>('http://localhost:3000/client', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(stepZeroData)
                });
                formElement.reset();
                if (existingCurrentStep) localStorage.removeItem('currentStep');
                localStorage.removeItem('stepData');
            }
        }

        // SI ES EL FORMULARIO DEL profesional ASEGURAR
        if (formElement.matches('.register-professional')) {
            const formData = new FormData();
            const password: HTMLInputElement | null = formElement.querySelector('input[name="password"]');
            if (password) {
                formData.append('password', password.value);
                // OBTENER LOS OBJETOS DE CADA PASO COMO ARRAY
                const stepDataArray: Record<string, TData>[] = Object.values(formState.dataByStep ?? {});

                // assign: Copia los valores de todas las propiedades enumerables propias de uno o más objetos fuente a un objeto de destino. Devuelve el objeto de destino. 
                // UNIR TODOS LOS OBJETOS EN UNO SOLO
                //ORTRA OPCION CON reduce, PERO ES MAS LENTO
                const combinedData: Record<string, TData> = Object.assign({}, ...stepDataArray);

                combinedData.password = formData.get('password') as TData;

                //FUNCION QUE EJECUTA EL FETCH
                const parsed = await apiRequest<iFormStateValidation>('http://localhost:3000/professional', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(combinedData)
                });

                formElement.reset();
                if (existingCurrentStep) localStorage.removeItem('currentStep');
                localStorage.removeItem('stepData');
            }
        }
    });
};

export default eventSubmit;