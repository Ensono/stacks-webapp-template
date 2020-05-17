import React, {useCallback} from "react"
import {useDispatch, useSelector} from "react-redux"
import RestaurantListComponent from "../components/RestaurantList"
import {ApplicationState} from "../state/ducks/index"
import {fetchPosts} from "../state/ducks/get-menus/actions"
import {MenuState} from "../interfaces/sagas.interface"

const MenuListContainer = () => {
    const dispatch = useDispatch()

    const stateToProps: MenuState = useSelector(({post}: ApplicationState) => ({
        loading: post.loading,
        errors: post.errors,
        data: post.data,
    }))

    const dispatchToProps = {
        fetchPosts: useCallback(() => dispatch(fetchPosts()), [dispatch]),
    }
    // eslint-disable-next-line
    return <RestaurantListComponent {...stateToProps} {...dispatchToProps} />
}

export default MenuListContainer
