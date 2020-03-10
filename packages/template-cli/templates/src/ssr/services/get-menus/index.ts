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
    enabled,
    tenantId = "d290f1ee-6c54-4b01-90e6-d701748f0851",
) => {
    const addMenuApi = api("addMenu")
    return new Promise((resolve, reject) => {
        axios
            .post(addMenuApi.internalEndpoint(), {
                name: "test1",
                description: "test desc",
                enabled: "true",
                tenantId: "d290f1ee-6c54-4b01-90e6-d701748f0851",
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

// export default getMenus
