import { TInputs } from "../types/types";
import { formState } from "./constant.js";

// FUNCION QUE MAPEA OBJETO DE VALIDACIONES POR PASOS
const setValidationStrategiesMap = ({ map }:{  map: Record<number, TInputs> }): Record<number, TInputs> => {
    formState.validationTypesByStep = map;  //SIEMPRE EN CADA LLAMADA SE SOBREESCRIBE CREANDO UN NUEVO OBJETO MUTABLE
    return formState.validationTypesByStep;
};

export default setValidationStrategiesMap;