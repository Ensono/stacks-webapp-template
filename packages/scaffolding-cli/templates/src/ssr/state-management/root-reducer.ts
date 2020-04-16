import {combineReducers} from "redux"
import getMenus from "../ducks/get-menus"
import  addMenu from "../ducks/add-menu"

export default combineReducers({
    getMenus,
    addMenu,
})
