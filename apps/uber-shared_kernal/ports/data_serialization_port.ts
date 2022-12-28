export interface ISerialization<T> {
    init_schema(data: T): void
    serialize(data: T): Buffer | string
    deserialize(data: string | Buffer): T
}