import { CreateBudgetDto } from "src/budget/dto/create-budget.dto";
import { CreateCategoryDto } from "src/category/dto/create-category.dto";
import { CreateContextDto } from "src/context/dto/create-context.dto";
import { CreateDayDto } from "src/day/dto/create-day.dto";
import { CreateDetailsProfileTaskerDto } from "src/details_profile_taskers/dto/create-details_profile_tasker.dto";
import { CreateHourDto } from "src/hour/dto/create-hour.dto";
import { CreateServiceDto } from "src/services/dto/create-service.dto";

export class CreateTaskerDto {
    category:CreateCategoryDto; // ==> CATEGORIA ELEGIDA VALIDADA
    service:CreateServiceDto; // ==> SERVICIOS ELEGIDOS VALIDADOS
    context?:CreateContextDto; // ==> HABITOS ELEGIDOS VALIDADOS OPCIONAL
    hour:CreateHourDto; // ==> HORARIOS ELEGIDOS VALIDADOS
    day:CreateDayDto; // ==> DIAS ELEGIDOS VALIDADOS
    detailsProfiles:CreateDetailsProfileTaskerDto
    // FALTAN LOS OTROS DTOS
    amountBudge:CreateBudgetDto
}
