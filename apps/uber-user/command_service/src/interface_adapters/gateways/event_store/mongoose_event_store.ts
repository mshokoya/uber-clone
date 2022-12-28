import { IEvent } from '@uber/shared_kernal/ports/event';
import {  Schema, model } from 'mongoose';
import { IUser } from '~/enterprise_business_rules/entities/user_entity';

const user_event_schema = new Schema<IEvent<IUser>>({
    id: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    data: {type: {}, required: true},
    metadata: {
        type: { createdAt: Date }, required: true 
    }
});

export const user_event_store = model('user-event', user_event_schema);