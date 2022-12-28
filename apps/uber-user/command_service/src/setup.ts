import { init_command_presenter } from "./interface_adapters/presenters/commands";
import { IServer } from "~~~/shared_kernal/ports/server_port";
import { IApplication } from "~~~/shared_kernal/ports/application_port";
import { IEventStore } from "~~~/shared_kernal/ports/event_store";
import { IEvent } from "./ports/event";
import { IUser } from "~~/shared/src/enterprise_business_rules/entities/user_entity";
import { IEventBus } from "~~~/shared_kernal/ports/event_bus_port";
import { UserPublishTopics } from '~~/shared/src/enterprise_business_rules/events/publish';


export class UserCommandServiceApplication implements IApplication {
    constructor(
        private readonly server: IServer,
        private readonly event_store: IEventStore<IEvent<IUser>>,
        private readonly event_bus: IEventBus<UserPublishTopics,{}>
        ) {}

    init_middleware(){
        init_command_presenter(this.server);
    }

    setup_server(port: number){
        this.init_middleware();
        this.server.start_server(port, () => { console.log(`[User Command Service]: Server started on port ${port}`)});
    }

    async setup_event_store(mongo_uri: string){
        await this.event_store.connect(mongo_uri, {}, async () => { 
            console.log(`[User Command Service]: Event store has started`);
        });
    }

    async setup_event_bus(event_bus_config: any){
        await this.event_bus.start_client(event_bus_config, async () => {
            console.log(`[User Command Service]: EventBus connected to client`);
        });
        await this.event_bus.setup_consumer({groupId: event_bus_config.groupId}, () => {
            console.log(`[User Command Service]: EventBus consumer functional`)
        });
        await this.event_bus.setup_producer({}, () => {
            console.log(`[User Command Service]: EventBus producer functional`);
        });
    }

    async start_application(port: number, mongo_uri: string, event_bus_config = {}){
        Promise.resolve()
            .then(() => { this.setup_event_bus(event_bus_config) })
            .then(() => { this.setup_event_store(mongo_uri) })
            .then(() => { this.setup_server(port) })
    }
}