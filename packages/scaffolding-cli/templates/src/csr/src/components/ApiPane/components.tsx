import styled from "@emotion/styled"
import {Box, Grid} from "@material-ui/core"
import theme from "../../constants/theme"

const themeConstants = {
    gutter: "1rem",
    borderRadius: "0.5rem",
    darkestColor: "#212121",
    amidoColor: "#fecb07",
    minimumPadding: "0.5rem",
}

export const Container = styled(Grid)`
    padding-bottom: ${themeConstants.gutter};
`

export const Pane = styled(Box)`
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    opacity: 0.9;
    margin-right: ${themeConstants.gutter};
    border-radius: ${themeConstants.borderRadius};
    -webkit-box-shadow: 5px 5px 16px -5px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 5px 5px 16px -5px rgba(0, 0, 0, 0.75);
    box-shadow: 5px 5px 16px -5px rgba(0, 0, 0, 0.75);
    min-height: 3rem;
    display: flex;
    justify-content: space-between;
    margin-top: ${themeConstants.minimumPadding};
`
