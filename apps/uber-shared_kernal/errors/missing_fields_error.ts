export class MissingFieldsError extends Error {
    public missing_fields: any[] = [];
    constructor(message: string){
        super(message);
        this.name = this.constructor.name;
    }
}