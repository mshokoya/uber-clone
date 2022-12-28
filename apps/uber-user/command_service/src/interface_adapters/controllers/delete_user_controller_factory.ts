import { DeleteUserUseCase } from "~/application_business_rules/use_cases/delete_user/delete_user_usecase";
import { DeleteUserController } from "./delete_user_controller";
import { RequiredFiledsValidation } from '~/application_business_rules/validations/delete_user_validations/required_fields_validation';
import { user_event_store } from "~/interface_adapters/gateways/event_store/mongoose_event_store";
import { user_event_bus } from "~/interface_adapters/gateways/event_bus";

const user_validation = new RequiredFiledsValidation();

const delete_user_usecase = new DeleteUserUseCase(
    user_validation,
    user_event_store,
    user_event_bus
)

const delete_user_controller = new DeleteUserController(
    delete_user_usecase
)

export { delete_user_controller }