import {
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import React from "react"
import {RestaurantItemProps} from "../../interfaces/restaurant.interface"

export default function RestaurantListItem(props: {
    restaurant: RestaurantItemProps
}) {
    const {restaurant} = props
    return (
        <ListItem disableGutters disabled={!restaurant.enabled}>
            <ListItemText>
                <Typography component="h2" variant="h2">
                    {restaurant.name}
                </Typography>
                <ListItemText primary={`${restaurant.description}`} />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        color="primary"
                        aria-label="edit"
                        data-cy="editMenuItem"
                        disabled
                    >
                        <EditIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItemText>
        </ListItem>
    )
}
