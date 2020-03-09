import { Typography } from "@material-ui/core";
import { RestaurantItemProps } from "interfaces/restaurant.interface";
import React from "react";
import RestaurantListComponent from '../RestaurantList';
import { Container } from "./components";

type ApiPaneProps = {
    menuItems: RestaurantItemProps[]
    isLoading: boolean
}

export const ApiPane = ({menuItems, isLoading}: ApiPaneProps) => {
    return (
        <Container item>
            <Typography variant="h1">Latest menus:</Typography>
            {!isLoading && menuItems && menuItems.length && (
                <RestaurantListComponent restaurantList={menuItems} />
            )}
        </Container>
    )
}

