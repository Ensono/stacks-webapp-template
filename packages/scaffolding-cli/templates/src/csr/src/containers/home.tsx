import React, {useCallback} from "react"
import {useDispatch, useSelector} from "react-redux"
import RestaurantListComponent from "../components/RestaurantList"
import {IApplicationState} from "../state/ducks/index"
import {fetchPosts} from "../state/ducks/menus/actions"
import {IPostState} from "../state/ducks/menus/types"

const PostListContainer = () => {
    const dispatch = useDispatch()

    const stateToProps: IPostState = useSelector(
        ({post}: IApplicationState) => ({
            loading: post.loading,
            errors: post.errors,
            data: post.data,
        }),
    )

    const dispatchToProps = {
        fetchPosts: useCallback(() => dispatch(fetchPosts()), [dispatch]),
    }
    // eslint-disable-next-line
    return <RestaurantListComponent {...stateToProps} {...dispatchToProps} />
}

export default PostListContainer
