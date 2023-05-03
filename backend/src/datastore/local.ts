export class LocalDataStore<T extends { id: string }> {
    store: Array<T> = []

    create(item: T) {
        this.store.push(item)
    }

    read(id: string) {
        return this.store.find(item => item.id === id)
    }

    update(id: string, value: Omit<T, 'id'>) {
        const index = this.store.findIndex(item => item.id === id)
        if (index < 0) return undefined
        const item = this.store[index]
        this.store[index] = {
            ...item,
            ...value
        }
        return this.store[index]
    }

    del(id: string) {
        this.store = this.store.filter(item => item.id !== id)
    }

    list() {
        // TODO: Maybe add some pagination etc
        return this.store
    }
}