/* eslint-disable import/no-unresolved */
import {Method} from "axios"
import {action} from "typesafe-actions"
import {GetMenuActionTypes, MenuItem} from "../../../interfaces/sagas.interface"

export const fetchMenus = () =>
    action(GetMenuActionTypes.FETCH_POSTS, [], {
        method: "get" as Method,
        route: "/menu", // Todo: Point to deployed example API
    })

export const fetchMenusSuccess = (data: MenuItem[]) =>
    action(GetMenuActionTypes.FETCH_POSTS_SUCCESS, data)

export const fetchMenusError = (errorMessage: string) =>
    action(GetMenuActionTypes.FETCH_POSTS_ERROR, null, null, errorMessage)
