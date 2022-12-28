export class InvalidFieldsError extends Error {
    public invalid_fields: any[] = [];
    constructor(message: string){
        super(message);
        this.name = this.constructor.name;
    }
}