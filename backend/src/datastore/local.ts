export class LocalDataStore<T extends { id: string }> {
    store: Array<T> = []

    create(item: T) {
        this.store.push(item)
        console.log("Created", item)
    }

    read(id: string) {
        const item = this.store.find(item => item.id === id)
        console.log("Read", item)
        return item
    }

    update(id: string, value: Omit<T, 'id'>) {
        const index = this.store.findIndex(item => item.id === id)
        if (index < 0) return undefined
        const item = this.store[index]
        const newItem = {
            ...item,
            ...value
        }
        this.store[index] = newItem
        console.log("Updated", {
            from: item,
            to: newItem
        })
        return this.store[index]
    }

    del(id: string) {
        this.store = this.store.filter(item => item.id !== id)
        console.log("Deleted", id)
    }

    list() {
        // TODO: Maybe add some pagination etc
        return this.store
    }
}