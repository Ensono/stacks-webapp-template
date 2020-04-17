import React from 'react'
import { List } from '@material-ui/core'
import { RestaurantItemProps } from '../../interfaces/restaurant.interface';
import RestaurantListItem from '../RestaurantListItem';

const RestaurantListComponent = (props: { restaurantList: RestaurantItemProps[] }) => {
  const { restaurantList } = props;
  return (
    <List data-testid="results">
      {restaurantList.map((restaurant) => (
        <RestaurantListItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </List>
  )
}

export default RestaurantListComponent