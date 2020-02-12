import { Api, HTTPMethod, buildExport } from ".";
import conf from "../../config"

let app_base_path: string = conf.APP_BASE_PATH

class MenuApi implements Api {
  baseURL = conf.MENU_API_URL;
  version = "v1";
  endpoints = {
    getMenuList: {
      routeDefinition: '/menus/:id?', // this is how I expect it to be called
      getInternalURL: (id: number) => `${app_base_path}/menus/${id}`,
        // // logger.info(`conf.APP_BASE_PATH is  ${conf.APP_BASE_PATH}`)
        // // logger.info(`${conf.APP_BASE_PATH}/menus/${id}`)
        // console.log('conf.APP_BASE_PATH :', conf.APP_BASE_PATH);
        // console.log(`${conf.APP_BASE_PATH}/menus/${id}`);
        // return `${conf.APP_BASE_PATH}/menus/${id}`
        // }, // this is to build the URL internally for the FE
      getExternalURL: () => "menu", // this is the URL that will be called externally
      method: HTTPMethod.get
    },
    getMenu: {
      routeDefinition: '/menu/:id',
      getInternalURL: (id: string)=>`menu/${id}`,
      getExternalURL: (id: string) => `${conf.APP_BASE_PATH}/menu/${id}`,
      method: HTTPMethod.get
    },
    deleteMenu: {
      routeDefinition: '/menu/:id',
      getInternalURL: (id: string)=>`/deletemenu/${id}`,
      getExternalURL: (id: string) => `menu/${id}`,
      method: HTTPMethod.delete
    },
    updateMenu: {
      routeDefinition: '/menu/:id',
      getInternalURL: (id: string)=>`/updatemenu/${id}`,
      getExternalURL: (id: string) => `menu/${id}`,
      method: HTTPMethod.put
    },
    addMenu: {
      routeDefinition: '/menu',
      getInternalURL: ()=>'/addmenu',
      getExternalURL: () => `menu`,
      method: HTTPMethod.post
    }
  };
}


const menuApi = new MenuApi();
export default (endpoint: keyof typeof menuApi.endpoints) => buildExport(menuApi, endpoint)
