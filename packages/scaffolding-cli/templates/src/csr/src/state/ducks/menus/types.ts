// import {IMetaAction} from ".."
import {MetaAction, TypeConstant} from "typesafe-actions"
// eslint-disable-next-line
export interface IMetaAction extends MetaAction<TypeConstant, IMeta> {}
export interface IPostState {
    readonly data: IPostRaw[]
    readonly loading: boolean
    readonly errors: []
}
export type ApiResponse = Record<string, any>
export interface IPostRaw extends ApiResponse {
    description: string
    enabled: boolean
    id: string
    name: string
    restaurantId: string
}
export const PostActionTypes = {
    FETCH_POSTS: "@@post/FETCH_POSTS",
    FETCH_POSTS_SUCCESS: "@@post/FETCH_POSTS_SUCCESS",
    FETCH_POSTS_ERROR: "@@post/FETCH_POSTS_ERROR",
}
interface IMeta {
    method: string
    route: string
}
export interface IDispatchToProps {
    fetchPosts: () => IMetaAction
}
