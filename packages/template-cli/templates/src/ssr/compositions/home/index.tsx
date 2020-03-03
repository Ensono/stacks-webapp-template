import ApiPane from "components/ApiPane"
import React, { FC } from "react"
import { connect } from "react-redux"
import { getError, getMenuItems, isLoading, requestMenusListRoutine } from "../../ducks/get-menus"
import env from "../../environment-configuration"
import { Container } from "./components"

interface State {
    isLoading: boolean
    error: string
    menuList: []
}

const mapStateToProps = (state: State) => {
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
    return (
        <Container container>
            <h2>Loading: {isLoading}</h2>
            Welcome to Stacks-react app! your current environment is:{" "}
            {env.NODE_ENV} <br />
            <br />
            <br />
            <ApiPane
                getMenulist={getMenulist}
                menuItems={menuItems}
                isLoading={isLoading}
            />
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
