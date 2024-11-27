export class MapCache<K, V> {
    private cache: Map<K, V>;
    private maxSize?: number;
    private expiryTimes?: Map<K, number>;
    private defaultTTL?: number;

    constructor(options: {
        maxSize?: number;
        defaultTTL?: number; // in milliseconds
        initialEntries?: Iterable<readonly [K, V]>;
    } = {}) {
        this.cache = new Map(options.initialEntries);
        this.maxSize = options.maxSize;
        this.defaultTTL = options.defaultTTL;
        
        if (this.defaultTTL) {
            this.expiryTimes = new Map();
        }
    }

    private evictExpired(): void {
        if (!this.expiryTimes) return;

        const now = Date.now();
        for (const [key, expiry] of this.expiryTimes) {
            if (expiry <= now) {
                this.delete(key);
            }
        }
    }

    private setExpiry(key: K): void {
        if (this.defaultTTL && this.expiryTimes) {
            this.expiryTimes.set(key, Date.now() + this.defaultTTL);
        }
    }

    set(key: K, value: V): this {
        if (this.maxSize && this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.delete(firstKey!);
        }

        this.cache.set(key, value);
        this.setExpiry(key);
        return this;
    }

    get(key: K): V | undefined {
        this.evictExpired();
        
        if (this.expiryTimes) {
            const expiry = this.expiryTimes.get(key);
            if (expiry && expiry <= Date.now()) {
                this.delete(key);
                return undefined;
            }
        }

        return this.cache.get(key);
    }

    async getOrSet(key: K, valueFactory: () => Promise<V>): Promise<V> {
        const existingValue = this.get(key);
        if (existingValue !== undefined) {
            return existingValue;
        }

        const value = await valueFactory();
        this.set(key, value);
        return value;
    }

    has(key: K): boolean {
        this.evictExpired();
        return this.cache.has(key);
    }

    delete(key: K): boolean {
        if (this.expiryTimes) {
            this.expiryTimes.delete(key);
        }
        return this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
        this.expiryTimes?.clear();
    }

    size(): number {
        this.evictExpired();
        return this.cache.size;
    }

    entries(): IterableIterator<[K, V]> {
        this.evictExpired();
        return this.cache.entries();
    }

    keys(): IterableIterator<K> {
        this.evictExpired();
        return this.cache.keys();
    }

    values(): IterableIterator<V> {
        this.evictExpired();
        return this.cache.values();
    }
}

// Usage example:
// const cache = new Cache<string, any>({
//     maxSize: 1000,
//     defaultTTL: 5 * 60 * 1000, // 5 minutes
// });

// // Use the cache
// await cache.getOrSet('key', async () => {
//     const result = await someExpensiveOperation();
//     return result;
// });

// // Check cache size
// console.log(cache.size());

// // Iterate over cache entries
// for (const [key, value] of cache.entries()) {
//     console.log(key, value);
// }