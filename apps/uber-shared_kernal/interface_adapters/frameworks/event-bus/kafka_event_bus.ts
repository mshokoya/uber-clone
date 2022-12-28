import { Kafka, KafkaConfig, ConsumerConfig, ProducerConfig, Consumer, Producer, RecordMetadata} from 'kafkajs';
import { IEventBus } from '../../../ports/event_bus_port';
import { wrapper } from '~/utils/types_wrapper';

type fdfs = Parameters<(conf: Kafka) => void>

export interface IEventBusArgs {
    clientId: string;
    brokers: string[];
    consumer: {
        groupId: string;
        topic: string
    },
    producer?: {}
}

/*
    P = List of all events published by service
    C = List of all Consumers the service subscribes too
*/ 
export class KafkaEventBusAdapter<P, C> implements IEventBus<P,C> {
    protected is_started: boolean = false;
    private consumer: Consumer
    private producer: Producer
    private kafka_client: Kafka
    // Might need to remove in app state
    private actions: { [key: string]: (message: Buffer | string | null) => void }

    constructor (
        private kafka: typeof Kafka,
        private service_name: string
    ) {}

    async start_client(config: KafkaConfig, cb?: () => void) {
        this.kafka_client = new this.kafka(config);
        this.is_started = true;
        // @ts-ignore
        delete this.kafka
    }

    async setup_consumer (config: ConsumerConfig) {
        this.consumer = this.kafka_client.consumer({ groupId: config.groupId });
        try {
            await this.consumer.connect();
            await this.consumer.run({
                eachMessage: async ({topic, message}) => this.actions[topic](message.value) 
            })
            .then(() => {console.log(`[@uber/${this.service_name}]: Event bus consumer is connected`);})
            
        } catch {} 
    }

    async setup_producer (_config?: ProducerConfig) {
        const producer =  this.kafka_client.producer();
        await producer.connect()
            .then(() => {console.log(`[@uber/${this.service_name}]: Event bus producer is connected`);});
    }

    subscribe_to_event(topic: string, action:(message: Buffer | string | null) => void) {
        this.consumer.subscribe({ topic })
        this.actions[topic] = action;
    }

    async publish_event(topic: string, message: Buffer | string | null, ack: boolean = false): Promise<RecordMetadata[]> {
        const wait_for_ack = ack ? -1 : 0;
        return await this.producer.send({
            acks: wait_for_ack,
            topic,
            messages: [
              {value: message},
            ],
        })
    }   
}