import { Kafka } from 'kafkajs';
import { KafkaEventBusAdapter } from '@uber/shared_kernal/interface_adapters/frameworks/event-bus/kafka_event_bus';


export interface IEventBusArgs {
    clientId: string;
    brokers: string[];
    consumer: {
        groupId: string;
        topic: string
    },
    producer?: {}
}

const user_event_bus = new KafkaEventBusAdapter(Kafka, 'user');
export { user_event_bus }