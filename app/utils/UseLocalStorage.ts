export class BasicStorage<K extends string, V extends object> {
    private storage: Storage | null = null;
    constructor() {
        // Initialize storage safely
        if (typeof window !== "undefined") {
            this.storage = window.localStorage;
        }
    }

    private isStorageAvailable(): boolean {
        return this.storage !== null;
    }

    set(key: K, value: V): boolean {
        if (!this.isStorageAvailable()) return false;

        try {
            this.storage!.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error("Error setting storage item:", error);
            return false;
        }
    }

    get(key: K): V | null {
        if (!this.isStorageAvailable()) return null;

        try {
            const item = this.storage!.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error("Error getting storage item:", error);
            return null;
        }
    }

    has(key: K): boolean {
        if (!this.isStorageAvailable()) return false;
        return this.storage!.getItem(key) !== null;
    }

    delete(key: K): boolean {
        if (!this.isStorageAvailable()) return false;

        try {
            this.storage!.removeItem(key);
            return true;
        } catch (error) {
            console.error("Error deleting storage item:", error);
            return false;
        }
    }

    clear(): boolean {
        if (!this.isStorageAvailable()) return false;

        try {
            this.storage!.clear();
            return true;
        } catch (error) {
            console.error("Error clearing storage:", error);
            return false;
        }
    }

    size(): number {
        if (!this.isStorageAvailable()) return 0;
        return this.storage!.length;
    }

    // New: Get a specific property from an object
    getProperty<T extends keyof V>(key: K, property: T): V[T] | null {
        const item = this.get(key);
        return item ? item[property] : null;
    }

    // New: Update a specific property in an object
    updateProperty<T extends keyof V>(key: K, property: T, value: V[T]): boolean {
        const item = this.get(key);
        if (!item) return false;

        try {
            item[property] = value;
            this.set(key, item);
            return true;
        } catch (error) {
            console.error("Error updating storage property:", error);
            return false;
        }
    }
}

// // Usage example:
// interface UserData {
//     id: string;
//     name: string;
//     email: string;
// }

// const userStorage = new BasicStorage<string, UserData>();

// // Store user data
// userStorage.set('user1', {
//     id: '123',
//     name: 'John Doe',
//     email: 'john@example.com'
// });

// // Retrieve user data
// const user = userStorage.get('user1');

// // Check if user exists
// const hasUser = userStorage.has('user1');

// // Delete user
// userStorage.delete('user1');

// // Clear all data
// userStorage.clear();

// // Get storage size
// const size = userStorage.size();