import axios, { AxiosPromise } from "axios"

export class MenuService {
    private url: string
    private port: number

    // Endpoint config can be pulled in from config
    constructor(endpoint: any) {
        this.url = endpoint.url
        this.port = endpoint.port
    }

    public getMenu = (): AxiosPromise => {
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

    public getMenuById = (): AxiosPromise => {
        return axios.request({
            baseURL: `${this.url}:${this.port}`,
            headers: { Accept: "application/json" },
            method: "GET",
            url: "/v1/menu/7f993e28-b9b1-4ea7-830b-b30f9758db68"
        })
    }
}
