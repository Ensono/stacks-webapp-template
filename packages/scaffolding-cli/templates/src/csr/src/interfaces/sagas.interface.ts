import {Method} from "axios"
import {MetaAction, TypeConstant} from "typesafe-actions"

// eslint-disable-next-line
export interface MetaActionWithAPI extends MetaAction<TypeConstant, Meta> {}

interface Meta {
    method: Method
    route: string
}

export interface MenuState {
    readonly data: MenuRaw[]
    readonly loading: boolean
    readonly errors: []
}

export type ApiResponse = Record<string, any>

export interface MenuRaw extends ApiResponse {
    description: string
    enabled: boolean
    id: string
    name: string
    restaurantId: string
}

export const GetMenuActionTypes = {
    FETCH_POSTS: "@@post/FETCH_MENU",
    FETCH_POSTS_SUCCESS: "@@post/FETCH_MENU_SUCCESS",
    FETCH_POSTS_ERROR: "@@post/FETCH_MENU_ERROR",
}

export interface DispatchToProps {
    fetchPosts: () => MetaActionWithAPI
}
