import { formStateValidField } from "../../config/constant.js";
import FullNameValidator from "../../modules/form/register/validators/FullNameValidator.js";
import { TFieldName, TFieldState, TValidateFieldParams } from "../../types/types.js";
import { capitalizeWords } from "../../ui/auxiliars.js";
import UserNameValidator from "../../modules/form/register/validators/UserNameValidator.js";
import EmailValidator from "../../modules/form/register/validators/EmailValidator.js";
import SelectedValidator from "../../modules/form/register/validators/SelectedValidator.js";
import PasswordValidator from "../../modules/form/register/validators/PasswordValidator.js";
import { isValueField } from "../../utils/domUtils.js";
import ConfirmPasswordValidator from "../../modules/form/register/validators/ConfirmPasswordValidator.js";
import DescriptionValidator from "../../modules/form/register/validators/DescriptionValidator.js";
import BudgeValidator from "../../modules/form/register/validators/BudgeValidator.js";
import ImageProfileValidator from "../../modules/form/register/validators/ImageProfileValidator.js";
import ImageExperiencesValidator from "../../modules/form/register/validators/ImageExperiencesValidator.js";

// FABRICA DE VALIDACIONES PARA REGISTRO
export class ValidatorFactory {
  // CREAR MODAL
  static validateField(type: TValidateFieldParams): { validate: TFieldState } | null {
    // SEGUN EL CASO DEL TIPO SE  INSTANCIA UNA CLASE DE MODAL
    let result: TFieldState;

    const isValidFieldName = (name: string): name is TFieldName => {
      return name in formStateValidField;
    };

    if (!isValidFieldName(type.fieldName)) return null;

    // FUNCION AUXILIAR PARA EVITAR NULOS COMO STRINGS
    const safeString = (val: unknown): string => (val != null ? String(val) : "");

    // SEGUN EL NAME
    switch (type.fieldName) {
      case "fullName":
        result = new FullNameValidator().validate(capitalizeWords(safeString(type.value)));
        break;
      case "userName":
        result = new UserNameValidator().validate(safeString(type.value));
        break;
      case "email":
        result = new EmailValidator().validate(safeString(type.value));
        break;
      case "location":
      case "category":
        result = new SelectedValidator().validate(safeString(type.value));
        break;
      case "password":
        result = new PasswordValidator().validate(safeString(type.value));
        formStateValidField.password = result;
        const confirmValue = formStateValidField.confirmPassword?.value?.toString().trim() ?? "";
        if (isValueField({ text: confirmValue.trim() })) {
          const confirmResult = new ConfirmPasswordValidator().validate(confirmValue);
          formStateValidField.confirmPassword = confirmResult;
        }
        break;
      case "confirmPassword":
        result = new ConfirmPasswordValidator().validate(safeString(type.value));
        break;
      case "descriptionUser":
        result = new DescriptionValidator().validate(safeString(type.value));
        break;
      case "amountBudge":
        result = new BudgeValidator().validate(safeString(type.value));
        break;
      case "service[]":
      case "context[]":
      case "day[]":
      case "hour[]":
        result = new SelectedValidator().validate(type.value);
        break;
      case "imageProfile":
        result = new ImageProfileValidator().validate(type.file ?? null); // SI NO HAY FILE PASAMOS NULL
        break;
      case "imageExperiences":
        result = new ImageExperiencesValidator().validate(type.files ?? null);
        break;
      default:
        // result = { error: "", value: type.value ?? "", isValid: true };
        throw new Error(`Validacion type "${type}" no soportado`);
    }

    formStateValidField[type.fieldName] = result;

    return { validate: result };
  }
}