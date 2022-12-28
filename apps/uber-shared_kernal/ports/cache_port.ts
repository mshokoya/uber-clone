export interface ICache<T> {
    retrieve(key: string): Promise<T | null>
    store(key: string, value: T | any): Promise<void>;
    connect(URI: string, opts: unknown, callback?: () => void): Promise<any>;
}