import { Typography } from "@material-ui/core";
import { RestaurantItemProps } from "interfaces/restaurant.interface";
import React from "react";
import RestaurantListComponent from '../RestaurantList';
import { Container } from "./components";

type ApiPaneProps = {
    menuItems: RestaurantItemProps[]
    isLoading: boolean
}

const ApiPane = ({menuItems, isLoading}: ApiPaneProps) => {
    return (
        <Container item>
            <Typography variant="h2">Latest menus:</Typography>
            {menuItems && menuItems.length && (
                <RestaurantListComponent restaurantList={menuItems} />
            )}
        </Container>
    )
}

export default ApiPane
