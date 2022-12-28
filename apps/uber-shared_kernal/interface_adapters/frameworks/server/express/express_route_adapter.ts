import { IRequest } from '~/ports/request_port'
import { IResponse } from '~/ports/response_port';
import { IRoute } from '~/ports/route_port';
import { IController } from '~/ports/controller_port';
import { Response, Request } from 'express';

export class ExpressRouteAdapter<T> implements IRoute<T> {
    constructor(private controller: IController<T>){}
    async route<
        URequest extends IRequest<T> & Request, 
        UResponse extends IResponse & Response
    >(request: URequest, response: UResponse): Promise<void> {
        const val = await this.controller.handel_request({
            body: request.body,
            params: request.params,
            query: request.query,
            headers: request.headers
        });

        if (val.headers) {
            response.set({
                ...val.headers
            })
        }
    
        response.statusCode = val.status_code
        response.json(val.body)
    }
}

