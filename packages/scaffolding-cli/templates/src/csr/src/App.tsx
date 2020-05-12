import {ThemeProvider as MuiThemeProvider} from "@material-ui/core/styles"
import React from "react"
import {Helmet} from "react-helmet"
import "./App.css"
import Header from "./components/Header"
import Search from "./components/Search"
import theme from "./constants/theme"

function App() {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Amido Stacks CSR</title>
            </Helmet>
            <MuiThemeProvider theme={theme}>
                <Header />
                <br />
                <br />
                <Search />
            </MuiThemeProvider>
        </>
    )
}

export default App
