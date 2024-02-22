const set = (name: string, item: unknown) => {
    sessionStorage.setItem(name, JSON.stringify(item))
}

const get = (name: string) => {
    const item = sessionStorage.getItem(name)
    if(item !== null){
        return (item.startsWith('{') && item.endsWith('}'))? JSON.parse(item) : JSON.parse(item)
    }
    return null
}

const remove = (name: string) => {
    sessionStorage.removeItem(name)
}

const clear = () => {
    sessionStorage.clear()
}

export {
    get,
    set,
    remove,
    clear
}