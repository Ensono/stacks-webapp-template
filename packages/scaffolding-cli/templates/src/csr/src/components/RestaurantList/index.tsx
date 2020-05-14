import {List} from "@material-ui/core"
import React, {useEffect} from "react"
import {
    IDispatchToProps,
    IPostRaw,
    IPostState,
} from "../../state/ducks/menus/types"
import RestaurantListItem from "../RestaurantListItem"

type AllProps = IPostState & IDispatchToProps

const RestaurantListComponent: React.FC<AllProps> = ({
    data,
    fetchPosts,
}: AllProps) => {
    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])
    return (
        <List data-testid="results">
            {data.map((post: IPostRaw) => (
                <RestaurantListItem key={post.id} restaurant={post} />
            ))}
        </List>
    )
}

export default RestaurantListComponent
