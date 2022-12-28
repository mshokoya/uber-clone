export class DefaultError extends Error {
    public messages: string[] = [];
    constructor(message: string){
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
}