import { globalStateValidationStep } from "../config/constant.js";
import { TFormElement } from "../types/types";
import validateStep from "../utils/validators/validateStep.js";

const lastStepCheckTerms= ({ step, e, form } : {step:number, e:Event, form:HTMLFormElement | null }):void =>{
    const target: EventTarget = e.target as TFormElement;
    if(!(target instanceof HTMLInputElement)) return;
    if(!target) return;
        
    globalStateValidationStep.isTerms= target.checked;
    validateStep({ step, form }); //VALIDAR PASO ACTUAL
}

export default lastStepCheckTerms;