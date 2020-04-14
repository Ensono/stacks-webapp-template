import {TextField} from "@material-ui/core"
import React from "react"

export const Search = props => {
    return (
        <TextField
            id="search-bar"
            label="Search Menus"
            name="seach_menus"
            type="search"
            fullWidth={true}
            variant="outlined"
            style={{
                margin: "0 auto",
            }}
            data-testid="search_btn"
            margin="normal"
            autoFocus
        />
    )
}
