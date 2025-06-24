import { TInputs } from "../types/types";
import { formState } from "./constant.js";

const setValidationStrategiesMap = ({ map }:{  map: Record<number, TInputs> }): Record<number, TInputs> => {
    formState.validationTypesByStep = map;
    return formState.validationTypesByStep;
};

export default setValidationStrategiesMap;