export interface IEventBus<P, C> {
    // subscribe_to_event(topic: keyof C, action?:(message: C[keyof C]) => void): void
    subscribe_to_event(topic: string, action:(message: Buffer | string | null) => void): void
    publish_event(topic: string, message:  Buffer | string | null): Promise<unknown>
    setup_consumer(config: {}, cb?: () => void): Promise<void>
    setup_producer(config: {}, cb?: () => void): Promise<void>
    start_client(config: {}, cb?: () => void): Promise<void>
}