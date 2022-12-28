import { CreateUserUseCase } from "~/application_business_rules/use_cases/create_user/create_user_usecase";
import { CreateUserController } from "./create_user_controller";
import { user_event_store} from "~/gateways/event_store";
import { user_event_bus } from "~/gateways/event_bus";

const user_validation = new RequiredFiledsValidation();

const create_user_usecase = new CreateUserUseCase(
    user_event_store,
    user_event_bus
)

const create_user_controller = new CreateUserController(
    create_user_usecase
)

export { create_user_controller }