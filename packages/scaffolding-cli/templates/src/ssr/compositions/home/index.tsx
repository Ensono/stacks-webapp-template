import {ApiPane, Header, Search} from "components"
import React, {FC, useEffect} from "react"
import {connect} from "react-redux"
import {
    getError,
    getMenuItems,
    isLoading,
    requestMenusListRoutine,
} from "../../ducks/get-menus"
import {Container} from "./components"

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
    useEffect(() => {
        getMenulist({searchTerm: ""})
    }, [])
    return (
        <Container container>
            <Header />
            <main>
                <br />
                <Search getSearchResults={getMenulist} />
                <ApiPane menuItems={menuItems} isLoading={isLoading} />
            </main>
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
