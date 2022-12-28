import { IRoute } from './route_port';

export type IServer = {
    add_middleware(...middleware: string[]): void;
    add_routes(...routes: unknown[]): void;
    start_server(port: number | string, callback?: () => void): void;
}