import {Method} from "axios"
import {action} from "typesafe-actions"
import {GetMenuActionTypes, MenuItem} from "../../../interfaces/sagas.interface"

export const fetchPosts = () =>
    action(GetMenuActionTypes.FETCH_POSTS, [], {
        method: "get" as Method,
        route: "/menu",
    })

export const fetchPostsSuccess = (data: MenuItem[]) =>
    action(GetMenuActionTypes.FETCH_POSTS_SUCCESS, data)

export const fetchPostsError = (message: string) =>
    action(GetMenuActionTypes.FETCH_POSTS_ERROR, message)
