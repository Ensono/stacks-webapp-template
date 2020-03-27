import axios from "axios"

export class MenuService {
    private url: string
    private port: number

    // Endpoint config can be pulled in from config
    constructor(endpoint: any) {
        this.url = endpoint.url
        this.port = endpoint.port
    }

    public getMenu = () => {
        return axios.request({
            baseURL: `${this.url}:${this.port}`,
            headers: { Accept: "application/json" },
            method: "GET",
            url: "/v1/menu",
            params: {
                pageSize: 1,
                pageNumber: 1
            }
        })
    }

    public getMenuById = () => {
        return axios.request({
            baseURL: `${this.url}:${this.port}`,
            headers: { Accept: "application/json" },
            method: "GET",
            url: "/v1/menu/e98583ad-0feb-4e48-9d4f-b20b09cb2633"
        })
    }
    
    public addMenu = () => {
        return axios.request({
            baseURL: `${this.url}:${this.port}`,
            headers: { Accept: "application/json" },
            method: "POST",
            url: "/v1/menu/",
            data: JSON.stringify({
                name: "",
                description: "",
                enabled: false,
                tenantId: "",
            })
        })
    }
}
