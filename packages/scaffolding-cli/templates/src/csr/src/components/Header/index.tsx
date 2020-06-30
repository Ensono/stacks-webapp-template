import {AppBar, Fab, Toolbar, Tooltip, Typography} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import React from "react"
import {Wrapper} from "./components"

const title = require("../../../package.json").name

const Header = () => {
    return (
        <Wrapper>
            <AppBar position="fixed" color="secondary">
                <Toolbar>
                    <Typography variant="h2" style={{margin: "0 auto"}}>
                        {title}
                    </Typography>
                    <Tooltip title="Create menu" aria-label="create menu">
                        <Fab disabled
                            size="small"
                            color="primary"
                            aria-label="create menu button"
                        >
                            <AddIcon data-testid="create_button" />
                        </Fab>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </Wrapper>
    )
}

export default Header
