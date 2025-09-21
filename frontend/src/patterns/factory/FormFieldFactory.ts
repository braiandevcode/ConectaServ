// IMPORTACIONES
import {TFieldConcreteMap, TFieldOptionsMap, TTypeField} from '../../types/types';
import {iInputFieldCheckOptions, iInputFieldOptions, iInputFileOptions, iSelectFieldOptions, iTextAreaFieldOptions} from '../../interfaces/interfaces';
import SelectFieldUI from '../../modules/fields/ui/SelectFieldUI.js';
import TextAreaFieldUI from '../../modules/fields/ui/TextAreaFieldUI.js';
import InputFileUI from '../../modules/fields/ui/InputFileUI.js';
import InputFieldCheckUI from '../../modules/fields/ui/InputFieldCheckUI.js';
import InputFieldUI from '../../modules/fields/ui/InputFieldUI.js';
import SelectField from '../../modules/fields/components/SelectField.js';
import InputField from '../../modules/fields/components/InputField.js';
import InputFile from '../../modules/fields/components/InputFile.js';
import TextAreaField from '../../modules/fields/components/TextAreaField.js';
import InputFieldCheck from '../../modules/fields/components/InputFieldCheck.js';
import SelectFieldDto from '../../modules/fields/dto/SelectFieldDto.js';
import InputFieldDto from '../../modules/fields/dto/InputFieldDto.js';
import InputFileDto from '../../modules/fields/dto/InputFileDto.js';
import TextAreaFieldDto from '../../modules/fields/dto/TextAreaFieldDto.js';
import InputCheckboxDto from '../../modules/fields/dto/InputCheckboxDto.js';

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
      case 'select':
        const optionsSelect = new SelectFieldDto(options as iSelectFieldOptions); // CASTEAR ASEGURANDO SU TIPO DE INTERFACE
        const uiSelect: SelectFieldUI = new SelectFieldUI(optionsSelect); //=> INSTANCIAR UI DEL SELECT Y PASAR LA CONFIGURACION
        return new SelectField(optionsSelect, uiSelect) as TFieldConcreteMap[T]; // => INSTANCIAR CONCRETA Y PASAR CONFIGURACION + UI
      case 'input':
        const optionsInput = new InputFieldDto(options as iInputFieldOptions); // CASTEAR ASEGURANDO SU TIPO DE INTERFACE
        const uiInputField: InputFieldUI = new InputFieldUI(optionsInput); //=> INSTANCIAR UI DEL SELECT Y PASAR LA CONFIGURACION
        return new InputField(optionsInput, uiInputField) as TFieldConcreteMap[T]; // => INSTANCIAR CONCRETA Y PASAR CONFIGURACION + UI
      case 'file':
        const optionsInputFile = new InputFileDto(options as iInputFileOptions); // CASTEAR ASEGURANDO SU TIPO DE INTERFACE
        const uiInputFile: InputFileUI = new InputFileUI(optionsInputFile); //=> INSTANCIAR UI DEL SELECT Y PASAR LA CONFIGURACION
        return new InputFile(optionsInputFile, uiInputFile) as TFieldConcreteMap[T]; // => INSTANCIAR CONCRETA Y PASAR CONFIGURACION + UI
      case 'textArea':
        const optionsTextAreaField = new TextAreaFieldDto(options as iTextAreaFieldOptions); // CASTEAR ASEGURANDO SU TIPO DE INTERFACE
        const uiTextAreaField: TextAreaFieldUI = new TextAreaFieldUI(optionsTextAreaField); //=> INSTANCIAR UI DEL SELECT Y PASAR LA CONFIGURACION
        return new TextAreaField(optionsTextAreaField, uiTextAreaField) as TFieldConcreteMap[T]; // => INSTANCIAR CONCRETA Y PASAR CONFIGURACION + UI
      case 'inputCheck':
        const optionsFieldCheck = new InputCheckboxDto(options as iInputFieldCheckOptions); // CASTEAR ASEGURANDO SU TIPO DE INTERFACE
        const uiFieldCheck: InputFieldCheckUI = new InputFieldCheckUI(optionsFieldCheck); //=> INSTANCIAR UI DEL SELECT Y PASAR LA CONFIGURACION
        return new InputFieldCheck(optionsFieldCheck, uiFieldCheck) as TFieldConcreteMap[T]; // => INSTANCIAR CONCRETA Y PASAR CONFIGURACION + UI
      default:
        throw new Error(`Tipo de campo no soportado: ${typeField}`);
    }
  }
}
