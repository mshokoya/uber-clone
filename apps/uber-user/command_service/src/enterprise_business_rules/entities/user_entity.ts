import { v4 as uuid } from 'uuid';

export interface IUser {
    id: string;
    email?: string;
    first_name: string;
    last_name?: string;
    password: string;
    is_driver?: boolean;
    street: string;
    city: string;
    postcode: string;
    phone_number?: string;
    email_verified?: boolean;
    phone_verified?: boolean;
    avatar?: string;
    longitude?: string,
    latitude?: string,
    orientation?: string,
    createdAt?: Date;
    updatedAt?: Date;
    role?: IRole;
}

export class User implements IUser {
    private constructor(props: IUser) {
        this.id = props.id;
        this.email = props.email;
        this.first_name = props.first_name;
        this.last_name = props.last_name;
        this.street = props.street;
        this.city = props.city;
        this.postcode = props.postcode;
        this.password = props.password;
        this.is_driver = props.is_driver;
        this.email_verified = props.email_verified;
        this.phone_verified = props.phone_verified;
        this.phone_number = props.phone_number;
        this.avatar = props.avatar;
        this.latitude = props.latitude;
        this.longitude = props.longitude;
        this.orientation = props.orientation;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.role = props.role;
    }
    
    readonly id;
    readonly email;
    readonly first_name;
    readonly last_name;
    readonly street;
    readonly city;
    readonly postcode;
    readonly password;
    readonly is_driver;
    readonly email_verified;
    readonly phone_verified;
    readonly phone_number
    readonly avatar;
    readonly latitude;
    readonly longitude;
    readonly orientation;
    readonly createdAt;
    readonly updatedAt;
    readonly role;


    public static create_entity(data: IUser){
        data.id = uuid();
        data.is_driver = data.is_driver || false;
        data.email_verified = false;
        data.phone_verified = false;
        data.createdAt = data.createdAt || new Date();
        data.updatedAt = data.createdAt || new Date();
        data.role = data.role || IRole.customer;

        return new User(data);
    }
}

export enum IRole {
    admin,
    customer,
    driver,
}

export const user_serialization_schema_avro = {
    type: 'record',
    name: 'user_user',
    fields: [
        {name:'id', type: ['string', 'null'], default: null},
        {name: 'email', type: ['string', 'null'], default: null},
        {name: 'password', type: ['string', 'null'], default: null},
        {name: 'phone_number', type: ['string', 'null'], default: null},
        {name: 'name', type: ['string', 'null'], default: null},
        {name: "street", type: ['string', 'null'], default: null},
        {name: "city", type: ['string', 'null'], default: null},
        {name: "postcode", type: ['string', 'null'], default: null},
        {name: "is_driver", type: ['boolean', 'null'], default: null},
        {name: "email_verified", type: ['boolean', 'null'], default: null},
        {name: "phone_verified", type: ['boolean', 'null'], default: null},
        {name: "avatar", type: ["string", "null"], default: null},
        {name: "longitude", type: ['int', 'null'], default: null},
        {name: "latitude", type: ['int', 'null'], default: null},
        {name: "orientation", type: ['int', 'null'], default: null},
        {name: "createdAt", type: "string"},
        {name: "updatedAt", type: "string"},
        {name: "role", type: {type: "enum", symbols: ["admin", "customer", "driver"]}, default: 'customer'},
    ]
}