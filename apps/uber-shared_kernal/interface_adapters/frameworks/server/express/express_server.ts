import express, { Router, Express, Application } from 'express';
import { IServer } from '~/ports/server_port';

export class ExpressServerAdapter implements IServer {
    app: Express;
    
    constructor(
        e: typeof express, 
        private service_name: string
    ){
        this.app = e();
        this.app.use(express.json());
        this.app.use(express.urlencoded());
    }
    
    // @ts-ignore
    add_middleware = this.app.use;
    // @ts-ignore
    add_routes = this.app.use;

    start_server = (
        port: number | string,
        callback?: () => void
    ) => {
        const cb = callback || (() => {console.log(`[@uber/${this.service_name}]: Server started on port ${port}`)});
        this.app.listen(port, cb);
    }
}