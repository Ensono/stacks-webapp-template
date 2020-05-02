import {ThemeProvider as MuiThemeProvider} from "@material-ui/core/styles"
import React from "react"
import "./App.css"
import Header from "./components/Header"
import Search from "./components/Search"
import theme from "./constants/theme"

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <Header />
            <br />
            <br />
            <Search />
        </MuiThemeProvider>
    )
}

export default App
