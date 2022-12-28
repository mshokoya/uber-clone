import { Schema, model } from 'mongoose';
import { IRole, IUser } from '~/enterprise_business_rules/entities/user_entity';

const user_schema = new Schema<IUser>({
    email: {type: String, required: false, unique: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: false},
    street: {type: String, required: true},
    city: {type: String, required: true},
    postcode: {type: String, required: true},
    password: {type: String, required: false, unique: true},
    is_driver: {type: String, required: true},
    email_verified: {type: String, required: true},
    phone_verified: {type: String, required: true},
    phone_number: {type: String, required: false, unique: true},
    avatar: {type: String, required: false},
    longitude: {type: String, required: false},
    latitude: {type: String, required: false},
    orientation: {type: String, required: false},
    role: {type: String, enum: IRole, required: false}
}, {timestamps: true});

export const user_repository = model('user', user_schema)

