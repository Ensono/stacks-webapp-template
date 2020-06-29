import {createMuiTheme} from "@material-ui/core/styles"
import {red} from "@material-ui/core/colors"

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {main: "#000000"},
        secondary: {main: "#FECB07"},
        error: {
            main: red.A400,
        },
        background: {
            default: "#fff",
        },
    },
    overrides: {
        MuiButton: {
            root: {
                borderRadius: "5px",
                fontSize: "13px",
                textTransform: "none",
            },
            contained: {
                textTransform: "uppercase",
            },
        },
        MuiListItem: {
            root: {
                marginTop: "20px",
            },
        },
    },
    typography: {
        fontFamily: ["Arial", "Work sans"].join(","),
        h1: {
            fontSize: "24px",
            marginBotton: "40px",
        },
        h2: {
            fontSize: "18px",
            fontWeight: 700,
            marginBottom: "15px",
        },
        body1: {
            fontSize: "13px",
            fontWeight: 400,
            overflowWrap: "break-word",
        },
    },
})

export default theme
