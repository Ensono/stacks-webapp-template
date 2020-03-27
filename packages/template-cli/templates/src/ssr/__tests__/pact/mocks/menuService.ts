import axios from "axios"
import { string } from "@pact-foundation/pact/dsl/matchers"

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

    public getMenuById = (id:String) => {
        return axios.request({
            baseURL: `${this.url}:${this.port}`,
            headers: { Accept: "application/json" },
            method: "GET",
            url: `/v1/menu/${id}`
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
