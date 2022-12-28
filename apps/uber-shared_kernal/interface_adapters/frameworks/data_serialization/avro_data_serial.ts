import { ISerialization } from "~/ports/data_serialization_port";
import AVRO from 'avsc';

export class AvroDataSerialization<T> implements ISerialization<T> {
    private schema: AVRO.Type
    constructor(private readonly avro: typeof AVRO) {}

    init_schema(data: T) { this.schema = this.avro.Type.forSchema(data as any)}
    serialize(data: T) { return this.schema.toBuffer(data); }
    deserialize(data: Buffer | string): T { return this.schema.fromBuffer(data as any); }
}