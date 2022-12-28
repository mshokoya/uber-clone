export interface IApplication {
    init_middleware(): void;
    setup_server(port: number): void;
    setup_event_store?: (mongo_uri: string, cb: () => void) => Promise<void>;
    setup_event_bus: (event_bus_config: any) => Promise<void>
    setup_database?: (uri: string, cb: () => void) => Promise<void>
    start_application(port: number, uri: string, event_bus_config: any): Promise<void>;
}