import React from "react"
import {AppBar, Toolbar, Typography, Fab} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

const title: string = `Yumido`

export const Header = () => {
    return (
        <AppBar position="fixed" color="secondary">
            <Toolbar>
                <Typography variant="h2" style={{margin: "0 auto"}}>
                    {title}
                </Typography>
                <Fab size="small" color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Toolbar>
        </AppBar>
    )
}
