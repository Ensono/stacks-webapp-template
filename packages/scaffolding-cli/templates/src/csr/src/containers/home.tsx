import React, {useCallback} from "react"
import {useDispatch, useSelector} from "react-redux"
import RestaurantListComponent from "../components/RestaurantList"
import {ApplicationState} from "../state/ducks/index"
import {fetchMenus} from "../state/ducks/get-menus/actions"
import {MenuState} from "../interfaces/sagas.interface"
import ApiPane from "../components/ApiPane"

const MenuListContainer = () => {
    const dispatch = useDispatch()

    const stateToProps: MenuState = useSelector(({post}: ApplicationState) => ({
        loading: post.loading,
        errors: post.errors,
        data: post.data,
    }))

    const dispatchToProps = {
        fetchPosts: useCallback(() => dispatch(fetchMenus()), [dispatch]),
    }
    // eslint-disable-next-line
    return <ApiPane {...stateToProps} {...dispatchToProps} />
}

export default MenuListContainer
