import {List} from "@material-ui/core"
import React from "react"
import {MenuItem} from "../../interfaces/sagas.interface"
import RestaurantListItem from "../RestaurantListItem"

type RestaurantListProps = {
    restaurantList: MenuItem[]
}

const RestaurantListComponent: React.FC<RestaurantListProps> = ({
    restaurantList,
}: RestaurantListProps) => {
    return (
        <List data-testid="results">
            {restaurantList.map((post: MenuItem) => (
                <RestaurantListItem key={post.id} restaurant={post} />
            ))}
        </List>
    )
}

export default RestaurantListComponent
