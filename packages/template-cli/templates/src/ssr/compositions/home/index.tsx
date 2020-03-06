import ApiPane from "components/ApiPane"
import React, {useEffect, FC} from "react"
import {connect} from "react-redux"
import {
    getError,
    getMenuItems,
    isLoading,
    requestMenusListRoutine,
} from "../../ducks/get-menus"
import env from "../../environment-configuration"
import {Container} from "./components"
import { AppBar, Toolbar, Typography } from "@material-ui/core"

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
            <AppBar position="fixed" color="secondary">
                <Toolbar>
                    <Typography variant="h2" style={{margin: "0 auto"}}>Yumido</Typography>
                </Toolbar>
            </AppBar>
            Welcome to Stacks-react app! your current environment is:{" "}
            {env.NODE_ENV} <br />
            <br />
            <br />
            <ApiPane menuItems={menuItems} isLoading={isLoading} />
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
