import React from "react"
import {
    ListItem,
    ListItemText,
    Typography,
    ListItemSecondaryAction,
    IconButton,
} from "@material-ui/core"
import {RestaurantItemProps} from "../../interfaces/restaurant.interface"
import EditIcon from "@material-ui/icons/Edit"

export default function RestaurantListItem(props: {
    restaurant: RestaurantItemProps
}) {
    const {restaurant} = props
    return (
        <ListItem disableGutters={true} disabled={!restaurant.enabled}>
            <ListItemText>
                <Typography component="h2" variant="h2">
                    {restaurant.name}
                </Typography>
                <ListItemText primary={`${restaurant.description}`} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" color="primary" aria-label="edit" data-cy="editMenuItem">
                        <EditIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItemText>
        </ListItem>
    )
}
