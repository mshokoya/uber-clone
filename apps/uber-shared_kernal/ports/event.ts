export interface IEvent<T>{
    type: string;
    data: T;
    id: string;
    metadata: {createdAt: Date, [key: string]: any}
}