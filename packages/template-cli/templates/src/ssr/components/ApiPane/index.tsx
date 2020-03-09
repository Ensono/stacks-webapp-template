import {Typography, CircularProgress} from "@material-ui/core"
import {RestaurantItemProps} from "interfaces/restaurant.interface"
import React from "react"
import RestaurantListComponent from "../RestaurantList"
import {Container} from "./components"

type ApiPaneProps = {
    menuItems: RestaurantItemProps[]
    isLoading: boolean
}

export const ApiPane = ({menuItems, isLoading}: ApiPaneProps) => {
    return (
        <Container item>
            <Typography variant="h2">Latest menus:</Typography>
            {isLoading && <CircularProgress size={26} />}
            {!isLoading && menuItems && menuItems.length && (
                <RestaurantListComponent restaurantList={menuItems} />
            )}
        </Container>
    )
}
