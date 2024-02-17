const set = (name: string, item: unknown) => {
    localStorage.setItem(name, JSON.stringify(item))
}

const get = (name: string) => {
    const item = localStorage.getItem(name)
    if(item !== null){
        return (item.startsWith('{') && item.endsWith('}'))? JSON.parse(item) : item
    }
}

export {
    get,
    set
}