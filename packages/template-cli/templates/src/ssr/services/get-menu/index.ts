import axios from "axios"
import api from "constants/apis/menu"

export const getMenu = () => {
    const getMenuApi = api("getMenuList")
           return new Promise((resolve, reject) => {
               axios({
                   method: getMenuApi.method,
                   url: getMenuApi.internalEndpoint(),
               })
                   .then(response => {
                       const {data} = response
                       if (data.errorCode === 0) {
                           resolve(data)
                       } else {
                           reject(data.errorDetails)
                       }
                   })
                   .catch(() => reject(new Error()))
           })
       }

export default getMenu
