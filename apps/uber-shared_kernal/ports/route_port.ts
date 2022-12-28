import { IRequest } from './request_port';
import { IResponse } from './response_port';

export interface IRoute<T> {
    route(req: IRequest<T>, res: IResponse): Promise<void>
}