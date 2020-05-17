import {action} from "typesafe-actions"
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import {IPostRaw, GetMenuActionTypes} from "./types"

export const fetchPosts = () =>
    action(GetMenuActionTypes.FETCH_POSTS, [], {
        method: "get",
        route: "/menu",
    })
export const fetchPostsSuccess = (data: IPostRaw[]) =>
    action(GetMenuActionTypes.FETCH_POSTS_SUCCESS, data)
export const fetchPostsError = (message: string) =>
    action(GetMenuActionTypes.FETCH_POSTS_ERROR, message)
