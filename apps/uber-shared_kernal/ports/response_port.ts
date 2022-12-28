export interface IResponse {
    headers?: {[key: string]: string}
    statusCode: number;
    json(data: Record<string, any>): void;
    send(): void;
}