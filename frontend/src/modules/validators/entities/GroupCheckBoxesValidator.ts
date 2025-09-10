import { formStateValidField } from "../../../config/constant.js";
import { IValidator } from "../../../interfaces/interfaces";
import { TFieldName, TFieldState } from "../../../types/types";
import OptionGroupBuilder from "../../form/ui/builder/OptionGrouBuilder.js";

export default class GroupCheckBoxesValidator implements IValidator {
  private optionGroupBuilder: OptionGroupBuilder;
  constructor(optionGroupBuilder:OptionGroupBuilder){
    this.optionGroupBuilder = optionGroupBuilder;
  }

  public validate(value: string): TFieldState {
    // VARIABLE PARA SABER SI TODOS LOS GRUPOS SON VÁLIDOS
    let allGroupsValid = true;

    const names: string[] = this.optionGroupBuilder.getInstanceFieldChecks().map(i => i.getName()); //CREO NUEVO ARRAY SOLO CON SUS NAMES
    // RECORRER CADA GRUPO DE CHECKBOXES
    for (const name of names) {
      // VERIFICAR SI AL MENOS UNO ESTA SELECCIONADO
      const isValid = this.optionGroupBuilder.getInstanceFieldChecks().some((cb) => (cb.render() as HTMLInputElement).checked);

      // ACTUALIZAR EL ESTADO DE VALIDACION EN EL OBJETO GLOBAL PARA ESE GRUPO
      formStateValidField[name as TFieldName] = {
        value: "", // NO GUARDAMOS VALOR ESPECÍFICO ACA
        error: isValid ? "" : "ESTE GRUPO REQUIERE AL MENOS UNA OPCIÓN SELECCIONADA", // MENSAJE SI NO ES VALIDO
        isValid: isValid, // GUARDAMOS EL RESULTADO DE LA VALIDACION
      };

      // SI ALGUNO DE LOS GRUPOS NO ES VALIDO, SE MARCA COMO FALSO EL ESTADO GLOBAL
      if (!isValid) {
        allGroupsValid = false;
      }
    }

    // RETORNAMOS UN OBJETO DE VALIDACION GENERAL
    return {
      error: allGroupsValid ? "" : "UNO O MÁS GRUPOS SON INVÁLIDOS",
      value: "",
      isValid: allGroupsValid,
    };
  }
}