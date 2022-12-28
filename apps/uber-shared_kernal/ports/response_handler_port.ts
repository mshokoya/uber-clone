import { IResponseModel } from './response_model_port';

export interface IResponseHandler<T> {
  response(body: T): IResponseModel<T>;
}
