import { ICache } from "~/ports/cache_port";
import Redis from 'redis';

// https://www.tabnine.com/code/javascript/functions/redis/RedisClient/expire  for expire key
export class RedisCacheAdapter<T> implements ICache<T> {
    private redis_client: Redis.RedisClientType<any>
    constructor(
        protected redis: typeof Redis,
        ){}

    async retrieve(key: string) {
        const result = await this.redis_client.get(key);
        return result 
            ?  (JSON.parse(result) || result) as T
            :  null
    } 

    async store(key: string, value: T) {
        const formatted_data = JSON.stringify(value);
        await this.redis_client.set(key, formatted_data);
    }

    async connect(url: string, opts: Redis.RedisClientOptions<any, any>){
        this.redis_client = await this.redis.createClient({
            url,
            ...opts
        })
        this.redis_client.connect();
    }
}