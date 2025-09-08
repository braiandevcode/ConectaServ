// IMPORTACIONES
import { TFieldConcreteMap, TFieldOptionsMap, TFieldUIMap, TTypeField } from "../../types/types";
import InputField from "../../modules/form/components/InputField.js";
import { iInputFieldCheckOptions, iInputFieldOptions, iInputFileOptions, iSelectFieldOptions, iTextAreaFieldOptions } from "../../interfaces/interfaces";
import FieldBaseOptions from "../../modules/dto/FieldBaseOptions.js";
import InputFieldCheckUI from "../../modules/form/ui/InputFieldCheckUI.js";
import InputFieldCheck from "../../modules/form/components/InputFieldCheck.js";
import InputFieldUI from "../../modules/form/ui/InputFieldUI.js";
import SelectFieldUI from "../../modules/form/ui/SelectFieldUI.js";
import InputFileUI from "../../modules/form/ui/InputFileUI.js";
import InputFile from "../../modules/form/components/InputFile.js";
import TextAreaFieldUI from "../../modules/form/ui/TextAreaFieldUI.js";
import TextAreaField from "../../modules/form/components/TextAreaField.js";
import SelectField from "../../modules/form/components/SelectField.js";

// --------------------------FABRICA DE CAMPOS PARA FORMULARIOS---------------------------------------//
/* 
  UN POCO DE CLARIDAD AL ASUNTO AQUI:
    - T: ES UN GENERICO UTIL PARA DAR DINAMISMO, EN ESTE CASO LO ATAMOS AL TIPO DE LAS CLAVES DE "TTypeField" QUE NO ES MAS QUE EL TIPO DE LAS "CLAVES" QUE TENGA "TFieldOptionsMap"(select, input, file, etc)
    - TFieldUIMap[T]: ES UN TIPO QUE SE DEFINE MEDIANTE EL MAPEO SEGUN EL GENERICO "T", 
      DONDE CADA VALOR DEL TIPO ESPERA UNA CLASE DE UI ESPECIFICA, LA CUAL SE DEFINE EN EL CONTEXTO ACTUAL PASANDOLA LITERALMENTE, EJEMPLO: VISUAL A ESTO SERIA  TFieldUIMap[select]
    - TFieldConcreteMap[T]: ES OTRO MAPEO PERO PARA DEFINIR EL RETORNO DE LA CLASE CONCRETA EN LA FABRICA
    - TFieldOptionsMap[T]: DEFINE QUE TIPO DE OPCIONES SE LE PASARA A LA CLASE CONCRETA PARA SU PRE-CONFIGURACION.
*/
export default class FormFieldFactory {
  public static createFieldForm<T extends TTypeField>(typeField: T, options: TFieldOptionsMap[T]): TFieldConcreteMap[T] {
    switch (typeField) {
      case "select":
        const optionsSelect = new FieldBaseOptions<string, iSelectFieldOptions>(options as iSelectFieldOptions); // CASTEAR ASEGURANDO SU TIPO DE INTERFACE
        const uiSelect: SelectFieldUI = new SelectFieldUI(optionsSelect); //=> INSTANCIAR UI DEL SELECT Y PASAR LA CONFIGURACION
        return new SelectField(optionsSelect, uiSelect) as TFieldConcreteMap[T]; // => INSTANCIAR CONCRETA Y PASAR CONFIGURACION + UI
      case "input":
        const optionsInput = new FieldBaseOptions<string, iInputFieldOptions>(options as iInputFieldOptions); // CASTEAR ASEGURANDO SU TIPO DE INTERFACE
        const uiInputField: InputFieldUI = new InputFieldUI(optionsInput); //=> INSTANCIAR UI DEL SELECT Y PASAR LA CONFIGURACION
        return new InputField(optionsInput, uiInputField) as TFieldConcreteMap[T]; // => INSTANCIAR CONCRETA Y PASAR CONFIGURACION + UI
      case "file":
        const optionsInputFile = new FieldBaseOptions<FileList, iInputFileOptions>(options as iInputFileOptions); // CASTEAR ASEGURANDO SU TIPO DE INTERFACE
        const uiInputFile: InputFileUI = new InputFileUI(optionsInputFile); //=> INSTANCIAR UI DEL SELECT Y PASAR LA CONFIGURACION
        return new InputFile(optionsInputFile, uiInputFile) as TFieldConcreteMap[T]; // => INSTANCIAR CONCRETA Y PASAR CONFIGURACION + UI
      case "textArea":
        const optionsTextAreaField = new FieldBaseOptions<string, iTextAreaFieldOptions>(options as iTextAreaFieldOptions); // CASTEAR ASEGURANDO SU TIPO DE INTERFACE
        const uiTextAreaField: TextAreaFieldUI = new TextAreaFieldUI(optionsTextAreaField); //=> INSTANCIAR UI DEL SELECT Y PASAR LA CONFIGURACION
        return new TextAreaField(optionsTextAreaField, uiTextAreaField) as TFieldConcreteMap[T]; // => INSTANCIAR CONCRETA Y PASAR CONFIGURACION + UI
      case "inputCheck":
        const optionsFieldCheck = new FieldBaseOptions<string, iInputFieldCheckOptions>(options as iInputFieldCheckOptions); // CASTEAR ASEGURANDO SU TIPO DE INTERFACE
        const uiFieldCheck: InputFieldCheckUI = new InputFieldCheckUI(optionsFieldCheck); //=> INSTANCIAR UI DEL SELECT Y PASAR LA CONFIGURACION
        return new InputFieldCheck(optionsFieldCheck, uiFieldCheck) as TFieldConcreteMap[T]; // => INSTANCIAR CONCRETA Y PASAR CONFIGURACION + UI
      default:
        throw new Error(`Tipo de campo no soportado: ${typeField}`);
    }
  }
}
