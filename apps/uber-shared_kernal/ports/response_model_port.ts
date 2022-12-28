export interface IResponseModel<T = unknown> {
    headers?: {[key: string]: string},
    status_code: number;
    body: {
        ok: boolean;
        error_type?: string;
        data: T;
    };
}