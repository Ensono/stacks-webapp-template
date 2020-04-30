import {ThemeProvider as MuiThemeProvider} from "@material-ui/core/styles"
import React from "react"
import "./App.css"
import Header from "./components/Header"
import theme from "./constants/theme"

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <Header />
            </div>
        </MuiThemeProvider>
    )
}

export default App
