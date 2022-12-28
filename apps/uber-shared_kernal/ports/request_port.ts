export interface IRequest<T> {
    body: T;
    params: Record<string, any>;
    query: Record<string, any>;
    headers: Record<string, any>
}