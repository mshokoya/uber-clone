export interface IRepository<T> {
    findById(id: string): Promise<T>;
    // findOne(): T;
    connect(URI: string, opts: unknown, callback?: () => void): Promise<any>
}