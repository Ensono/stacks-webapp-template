import {Method} from "axios"
import {MetaAction, TypeConstant} from "typesafe-actions"

// eslint-disable-next-line
export interface MetaActionWithAPI extends MetaAction<TypeConstant, Meta> {}

interface Meta {
    method: Method
    route: string
    query?: string
}

export interface MenuState {
    readonly data: MenuItem[]
    readonly loading: boolean
    readonly errors: string
}

// eslint-disable-next-line
export type ApiResponse = Record<string, any>

export interface MenuItem extends ApiResponse {
    description: string
    enabled: boolean
    id: string
    name: string
    restaurantId: string
}

export interface MenuApiResponse {
    results: MenuItem[]
}

export const GetMenuActionTypes = {
    FETCH_POSTS: "@@post/FETCH_MENU",
    FETCH_POSTS_SUCCESS: "@@post/FETCH_MENU_SUCCESS",
    FETCH_POSTS_ERROR: "@@post/FETCH_MENU_ERROR",
}

export interface DispatchToProps {
    fetchPosts: () => MetaActionWithAPI
}
