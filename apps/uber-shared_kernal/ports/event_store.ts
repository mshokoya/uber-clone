import { IEvent } from "./event";

export interface IEventStore<T> {
    save_event(event: T): Promise<boolean>
    connect(URI: string, opts: unknown, callback?: () => void): Promise<any>
}