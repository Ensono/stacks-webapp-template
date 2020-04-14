import { Box, Container, TextField } from "@material-ui/core"
import React from "react"

export const Search = props => {
    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <TextField
                    id="search-bar"
                    label="Search Menus"
                    name="seach_menus"
                    type="search"
                    fullWidth={true}
                    variant="outlined"
                    data-testid="search_btn"
                    margin="normal"
                    autoFocus
                    onChange={event =>
                        props.getSearchResults({searchTerm: event.target.value})
                    }
                />
            </Box>
        </Container>
    )
}
