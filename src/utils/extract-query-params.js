export function extractQueryParams(query){
    return query.substr(1).split('&').reduce((queryParams, item) => {  // ?name=adriano&page=1 -> name=adriano&page=1 -> ["name=adriano","page=1"]
        const [key, value] = item.split('=')  // ["name", "adriano"]
        queryParams[key] = value // {name: "adriano"}
        return queryParams
    }, {})
}