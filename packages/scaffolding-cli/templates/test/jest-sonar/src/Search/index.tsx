import {Box, Container, TextField} from "@material-ui/core"
import React, {useState} from "react"

export const Search = () => {
    const [, setSearchTerm] = useState("")

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <TextField
                    id="search-bar"
                    label="Search Menus"
                    name="SearchTerm"
                    type="search"
                    fullWidth
                    variant="outlined"
                    data-testid="search_btn"
                    margin="normal"
                    helperText="Search terms are case sensitive and partial matches are not searched"
                    onChange={evt => setSearchTerm(evt.target.value)}
                />
            </Box>
        </Container>
    )
}

