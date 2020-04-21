import {Box, Container, TextField} from "@material-ui/core"
import debounce from "lodash/debounce"
import React, {useCallback, useEffect, useState} from "react"

export function Search(props) {
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchResult = useCallback(
        debounce((text: any) => {
            props.getSearchResults({searchTerm: text})
        }, 500),
        [],
    )

    useEffect(() => {
        debouncedSearchResult(searchTerm)
    }, [searchTerm, debouncedSearchResult])

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <TextField
                    id="search-bar"
                    label="Search Menus"
                    name="SearchTerm"
                    type="search"
                    fullWidth={true}
                    variant="outlined"
                    data-testid="search_btn"
                    margin="normal"
                    onChange={evt => setSearchTerm(evt.target.value)}
                />
            </Box>
        </Container>
    )
}
