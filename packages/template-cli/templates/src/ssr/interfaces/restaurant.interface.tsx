export interface RestaurantItemProps {
  id: string,
  restaurandId: string,
  name: string,
  description: string,
  enabled: boolean
}

export interface RestaurantItemList {
  pageSize: Number,
  pageNumber: Number,
  results: RestaurantItemProps[]
}