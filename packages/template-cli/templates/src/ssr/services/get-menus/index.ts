import axios from "axios"
import api from "constants/apis/menu"

export const getMenus = () => {
    const getMenuApi = api("getMenuList")
    return new Promise((resolve, reject) => {
        axios
            .get(getMenuApi.internalEndpoint())
            .then(response => {
                const {data} = response
                if (data) {
                    resolve(data)
                } else {
                    reject(data.errorDetails)
                }
            })
            .catch(() => reject(new Error()))
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
        axios({
            method: "post",
            url: addMenuApi.routeDefinition,
            data: {
                name,
                description,
                enabled,
                tenantId,
            },
        })
            .then(response => {
                console.log(response)
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
