import { IController } from '~~~/shared_kernal/ports/controller_port';
import { IRequest } from '~~~/shared_kernal/ports/request_port';
import { IResponseModel } from '~~~/shared_kernal/ports/response_model_port';
import { UpdateUserUseCase } from '~/application_business_rules/use_cases/update_user/update_user_usecase';
import { IUser } from '~~/shared/src/enterprise_business_rules/entities/user_entity';
import { 
    generic_created_response, 
    generic_failure_response 
} from '~~~/shared_kernal/interface_adapters/gateways/server/responses/generic_responses';
import { InvalidFieldsError } from '~~~/shared_kernal/errors/invalid_fields_error';

export class UpdateUserController implements IController {
    constructor(
        private use_case: UpdateUserUseCase
    ){}

    async handel_request(request_model: IRequest<IUser>): Promise<IResponseModel<string | void | any>> {
        try {
            // verify that body exists
            // sanitize body vals
            // throw into usecase
            await this.use_case.update(request_model.body);
            return generic_created_response('successfully updated user');
        } catch (error: any) {
            console.log(error.message);
            if (error instanceof InvalidFieldsError) {
                return generic_failure_response({message: error.message, fields: error.invalid_fields}, error.name);
            }
            return generic_failure_response({message: error.message}, error.name);
        }
    }
}