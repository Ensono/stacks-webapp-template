import {ApiPane, Header} from "components"
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
    getMenulist: () => dispatch(requestMenusListRoutine.trigger()),
})

interface Props
    extends ReturnType<typeof mapStateToProps>,
        ReturnType<typeof mapDispatchToProps> {}

const Home: FC<Props> = ({isLoading, menuItems, getMenulist}) => {
    useEffect(() => {
        getMenulist()
    }, [])
    return (
        <Container container>
            <Header />
            <main>
                <br />
                <br />
                <br />
                <ApiPane menuItems={menuItems} isLoading={isLoading} />
            </main>
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
