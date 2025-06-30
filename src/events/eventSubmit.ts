import apiRequest from "../utils/apiRequest.js";
import { iClient, iFieldsForms } from "interfaces/interfaces.js";
import everyFieldsFormsByFormatter from "../utils/everyFieldsFormsByFormater.js";
import formatedValuesClient from "../ui/formattedValuesClient.js";

const eventSubmit = async ({ form }: { form: HTMLFormElement | null }): Promise<void | null> => {
    if (!form) return null;
    form.addEventListener('submit', async (e: Event) => {
        e.preventDefault();
        const formElement = e.target as HTMLFormElement;
        if (!formElement) return null;

        // SI ES EL FORMULARIO DEL CLIENTE ASEGURAR
        if (formElement.matches('.register-client')) {
            const fieldsFormClient = ['fullName', 'userName', 'email', 'location', 'password'];

            const dataToSend: Record<string, string> = {};

            everyFieldsFormsByFormatter({ vNames: fieldsFormClient, dataToSend, formElement, formatters: formatedValuesClient() })

            const parsed = apiRequest<iClient>('http://localhost:3000/client', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            });
            form.reset();
            localStorage.removeItem('stepData');
        }


        // ---------------------------------//
    });
};

export default eventSubmit;