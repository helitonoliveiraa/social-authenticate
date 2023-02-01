import Redis from 'ioredis';

// const EXPIRE = 60 * 60 * 24; // 24 Hours
const EXPIRE = 10;

export class Cache {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      keyPrefix: 'cache:',
    });
  }

  /**
   * You can use these two methods below to save and get any information
   */
  set(key: string, value: any) {
    return this.redis.set(key, JSON.stringify(value), 'EX', EXPIRE);
  }

  async get(key: string) {
    const cached = await this.redis.get(key);

    return cached ? JSON.parse(cached) : null;
  }

  /**
   * These two methods below are exclusive for save and get token
   */
  setToken(key: string, token: string) {
    return this.redis.set(key, token, 'EX', EXPIRE);
  }

  async getToken(key: string) {
    const token = await this.redis.get(key);

    return token;
  }

  invalidate(key: string) {
    return this.redis.del(key);
  }

  async invalidatePrefix(prefix: string) {
    const keys = await this.redis.keys(`cache:${prefix}:*`);

    const keysWithoutPrefix = keys.map(key => key.replace('cache:', ''));

    return this.redis.del(keysWithoutPrefix);
  }
}