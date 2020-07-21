/*
* Example helper module to demonstrate data clean up after a test.
* Note that this could instead call the webapp code directly instead of duplicating
* the logic. However, for the purpose of decoupling the test framework this is
* standalone.
* 
* Uses axios as the promise based HTTP client for the browser and node.js https://github.com/axios/axios
*/

import axios from "axios"
import { environmentVariables } from "../environment-variables"

const API_VERSION = "v1"

export const deleteMenu = (menuId: string) => {
    const MENU_API_ENDPOINT = `${environmentVariables.MENU_API_URL}/${API_VERSION}/menu/${menuId}`
    return new Promise((resolve, reject) => {
        axios
            .delete(`${MENU_API_ENDPOINT}`)
            .then(response => {
                const {data, status} = response
                if (status >= 200) {
                    console.log(`Successfully deleted menuId=${menuId} with status=${response.status}`)
                    resolve(status)
                } else {
                    console.log(`Could not delete menuId=${menuId}`)
                    reject(data)
                }
            })
            .catch(() => reject(new Error()))
    })
}

export const addMenu = (menuName: string) => {
    const MENU_API_ENDPOINT = `${environmentVariables.MENU_API_URL}/${API_VERSION}/menu`
    return new Promise((resolve, reject) => {
        axios
            .post(`${MENU_API_ENDPOINT}`, {
                name: menuName,
                description: "Testcafe beforeHook",
                enabled: true,
                tenantId: "d290f1ee-6c54-4b01-90e6-d701748f0851",
            })
            .then(response => {
                const {data, status} = response
                if (status >= 200) {
                    console.log(`Successfully added menuName=${menuName} with status=${response.status}`)
                    resolve(data.id)
                } else {
                    console.log(`Could not add menuName=${menuName}`)
                    reject(data)
                }
            })
            .catch(() => reject(new Error()))
    })
}
