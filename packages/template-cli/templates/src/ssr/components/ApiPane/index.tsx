import React, { useState, useEffect } from "react";
import { Container, Pane } from "./components";
import { Button, Typography } from "@material-ui/core";
import api from "constants/apis/menu";
import axios from "axios";
import RestaurantListComponent from '../RestaurantList';

type ApiPaneProps = {};

const ApiPane = (props: ApiPaneProps) => {
  const myapi = api("getMenuList");
  const [state, setState] = useState(null);
  const callApi = async () => {
    try {
      const res = await axios({
        method: myapi.method,
        url: myapi.internalEndpoint(),
      })
      res ? setState(res.data) : undefined
    } catch (err) {
      console.log(err)
    }
  };
  useEffect(() => { callApi(); }, []);
  console.log(state);
  return (
    <>
      <Typography variant="h2">Latest menus:</Typography>
      {state && <RestaurantListComponent restaurantList={state.results} />}
    </>
  )
};

export default ApiPane;
