import {ApiPane, Header, Layout, Search} from "components"
import React, {FC} from "react"
import {connect} from "react-redux"
import {
    getError,
    getMenuItems,
    isLoading,
    requestMenusListRoutine,
} from "../../ducks/get-menus"

const mapStateToProps = state => {
    return {
        isLoading: isLoading(state),
        error: getError(state),
        menuItems: getMenuItems(state),
    }
}

const mapDispatchToProps = dispatch => ({
    getMenulist: searchPayload =>
        dispatch(requestMenusListRoutine.trigger(searchPayload)),
})

interface Props
    extends ReturnType<typeof mapStateToProps>,
        ReturnType<typeof mapDispatchToProps> {}

const Home: FC<Props> = ({isLoading, menuItems, getMenulist}) => {
    return (
        <Layout>
            <br />
            <Search getSearchResults={getMenulist} />
            <ApiPane menuItems={menuItems} isLoading={isLoading} />
        </Layout>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
