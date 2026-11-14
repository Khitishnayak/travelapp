class SimpleCache {
    private cache = new Map<string, { data: any; expiry: number }>();
    set(key: string, data: any, ttlMs: number = 60000) {
        this.cache.set(key, { data, expiry: Date.now() + ttlMs });
    }
    get(key: string): any | null {
        const item = this.cache.get(key);
        if (!item || Date.now() > item.expiry) return null;
        return item.data;
    }
}
export const cache = new SimpleCache();
