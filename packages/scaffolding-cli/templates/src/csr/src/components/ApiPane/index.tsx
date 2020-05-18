import {Typography, CircularProgress} from "@material-ui/core"
import React, {useEffect} from "react"
import {DispatchToProps, MenuState} from "../../interfaces/sagas.interface"
import {Container} from "./components"
import RestaurantListComponent from "../RestaurantList"

// type ApiPaneProps = {
//     menuItems: RestaurantItemProps[]
//     isLoading: boolean
// }

type ApiPaneProps = MenuState & DispatchToProps

const ApiPane: React.FC<ApiPaneProps> = ({
    loading,
    errors,
    data,
    fetchPosts,
}: ApiPaneProps) => {
    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])
    return (
        <Container item>
            <Typography variant="h1">Latest menus:</Typography>
            {loading && <CircularProgress size={26} />}
            {!loading && errors && (
                <Typography variant="h2">{errors}</Typography>
            )}
            {!loading && data?.length === 0 && (
                <Typography variant="h2">No results</Typography>
            )}
            {!loading && data?.length >= 1 && (
                <RestaurantListComponent restaurantList={data} />
            )}
        </Container>
    )
}

export default ApiPane
