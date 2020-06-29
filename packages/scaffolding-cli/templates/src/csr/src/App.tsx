import {ThemeProvider as MuiThemeProvider} from "@material-ui/core/styles"
import React from "react"
import {Helmet} from "react-helmet"
import {Provider} from "react-redux"
import "./App.css"
import Header from "./components/Header"
import Search from "./components/Search"
import theme from "./constants/theme"
import ApiPane from "./containers/home"
import configureStore from "./state"
import {setUpAppInsights} from "./utility/telemetry"

setUpAppInsights()
// eslint-disable-next-line
const initialState = (window as any).initialReduxState
const store = configureStore(initialState)

const App: React.FC = () => {
    return (
        <>
            <main>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Amido Stacks CSR</title>
            </Helmet>
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <Header />
                    <br />
                    <br />
                    <Search />
                    <ApiPane />
                </MuiThemeProvider>
            </Provider>
            </main>
        </>
    )
}

export default App
