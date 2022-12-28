import { IRequest } from "./request_port";
import { IResponseModel } from "./response_model_port";

export interface IController<T = unknown> {
    handel_request(request_model: IRequest<T>): Promise<IResponseModel>
}