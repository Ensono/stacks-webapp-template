import {ApiPane, Header, Layout, Search} from "components"
import React, {FC} from "react"
import {connect} from "react-redux"
import {
    getError,
    getMenuItems,
    isLoading,
    requestMenusListRoutine,
} from "../../ducks/get-menus"
import {UserType} from "../../interfaces/auth.interface"

const mapStateToProps = state => {
    return {
        isLoading: isLoading(state),
        error: getError(state),
        menuItems: getMenuItems(state),
        user: {},
    }
}

const mapDispatchToProps = dispatch => ({
    getMenulist: searchPayload =>
        dispatch(requestMenusListRoutine.trigger(searchPayload)),
})

interface Props
    extends UserType,
        ReturnType<typeof mapStateToProps>,
        ReturnType<typeof mapDispatchToProps> {}

const Home: FC<Props> = props => {
    console.log("Home props:", props)

    return (
        <Layout>
            <br />
            <Search getSearchResults={props.getMenulist} />
            <ApiPane menuItems={props.menuItems} isLoading={props.isLoading} />
        </Layout>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
