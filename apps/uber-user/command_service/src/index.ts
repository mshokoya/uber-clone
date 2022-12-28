import { UserCommandServiceApplication } from '~/setup';
import { server } from "~/interface_adapters/gateways/server";
import { user_event_store } from './interface_adapters/gateways/event_store/mongoose_event_store';
import { user_event_bus } from './interface_adapters/gateways/event_bus'

new UserCommandServiceApplication(server, user_event_store, user_event_bus)
    .start_application(
        parseInt(process.env.PORT!),
        process.env.MONGO_EVENT_STORE_URI!,
        {
            clientId: process.env.CLIENTID!,
            brokers: [process.env.KAFKA_EVENT_BUS_BROKERS!],
            groupId: process.env.KAFKA_EVENT_BUS_GROUP!  
        }
    );

