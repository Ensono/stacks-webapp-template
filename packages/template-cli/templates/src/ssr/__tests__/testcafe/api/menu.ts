/*
* Example helper module to demonstrate data clean up after a test.
* Note that this could instead call the webapp code directly instead of duplicating
* the logic. However, for the purpose of decoupling the test framework this is
* standalone.
* 
* Uses axios as the promise based HTTP client for the browser and node.js https://github.com/axios/axios
*/

import axios from "axios"

export const deleteMenu = (menuId: string) => {
    return new Promise((resolve, reject) => {
        axios
            //Todo: pull this in with env variables
            .delete(`http://dev.amidostacks.com/api/menu/v1/menu/${menuId}`)
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
