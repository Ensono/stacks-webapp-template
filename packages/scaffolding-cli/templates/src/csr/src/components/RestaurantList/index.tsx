import {List} from "@material-ui/core"
import React, {useEffect} from "react"
import RestaurantListItem from "../RestaurantListItem"
import {
    DispatchToProps,
    MenuItem,
    MenuState,
} from "../../interfaces/sagas.interface"

type AllProps = MenuState & DispatchToProps

const RestaurantListComponent: React.FC<AllProps> = ({
    data,
    fetchPosts,
}: AllProps) => {
    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])
    return (
        <List data-testid="results">
            {data.map((post: MenuItem) => (
                <RestaurantListItem key={post.id} restaurant={post} />
            ))}
        </List>
    )
}

export default RestaurantListComponent
