import axios from "axios"
import api from "constants/apis/menu"

export const getMenus = searchTerm => {
    const getMenuApi = api("getMenuList")
    return new Promise((resolve, reject) => {
        axios
            .get(getMenuApi.internalEndpoint(), {
                params: {
                    searchTerm,
                },
            })
            .then(response => {
                const {data} = response
                if (data) {
                    resolve(data)
                } else {
                    reject(data.errorDetails)
                }
            })
            .catch(e => reject(new Error(e)))
    })
}

export const postMenu = (
    name,
    description,
    enabled: boolean,
    tenantId = "d290f1ee-6c54-4b01-90e6-d701748f0851",
) => {
    const addMenuApi = api("addMenu")
    return new Promise((resolve, reject) => {
        axios
            .post(addMenuApi.internalEndpoint(), {
                name,
                description,
                enabled,
                tenantId,
            })
            .then(response => {
                const {data} = response
                if (data) {
                    resolve(data)
                } else {
                    reject(data.errorDetails)
                }
            })
            .catch(e => reject(new Error(e)))
    })
}
