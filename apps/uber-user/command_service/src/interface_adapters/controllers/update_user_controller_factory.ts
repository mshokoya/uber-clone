import { UpdateUserUseCase } from "~/application_business_rules/use_cases/update_user/update_user_usecase";
import { UpdateUserController } from "./update_user_controller";
import { ValidFiledsValidation } from '~/application_business_rules/validations/update_user_validations/valid_field_validation';
import { user_event_store } from "~/interface_adapters/gateways/event_store/mongoose_event_store";
import { user_event_bus } from "~/interface_adapters/gateways/event_bus";

const user_validation = new ValidFiledsValidation();

const update_user_usecase = new UpdateUserUseCase(
    user_validation,
    user_event_store,
    user_event_bus
)

const update_user_controller = new UpdateUserController(
    update_user_usecase
)

export { update_user_controller }