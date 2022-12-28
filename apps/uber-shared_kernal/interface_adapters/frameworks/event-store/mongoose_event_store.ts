import { IEventStore } from "~/ports/event_store";
import { Model } from "mongoose";
import { EventStoreError } from "~/errors/event_store_error";
import { ConnectOptions, Mongoose } from 'mongoose';

export class MongooseEventStoreAdapter<T> implements IEventStore<T> {
    constructor(
        protected readonly mongoose: Mongoose,
        protected readonly event_store_model: Model<T>
        ){}

    async save_event(event: T): Promise<boolean> {
        try {
            const store_event = new this.event_store_model(event);
            await store_event.save();
            return true
        } catch (e: any) {
            throw new EventStoreError(e.message)
        }
    }

    async connect(URI: string, opts: ConnectOptions = {}, cb: () => void){
        await this.mongoose.connect(URI, opts) //{useNewUrlParser: true, useUnifiedTopology: true}
        if (cb) await cb();
    } 
}