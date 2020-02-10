import React, { useState } from "react";
import { Container, Pane } from "./components";
import { Button } from "@material-ui/core";
import api from "constants/apis/menu";
import axios from "axios";

type ApiPaneProps = {};

const ApiPane = (props: ApiPaneProps) => {
  const myapi = api("getMenuList");
  const [state, setState] = useState(null);
  const callApi = async () => {
    const res = await axios({
      method: myapi.method,
      url: myapi.internalEndpoint(10)
    });
    setState(res.data.results);
  };
  return (
    <Container item>
      <Pane>
        <h1>Get Menu List</h1>
        <Button onClick={callApi}>{myapi.method}</Button>
      </Pane>
      {state && (
        <Pane>
          <ul>
            {state.map(item => (
              <li>{item.name}</li>
            ))}
          </ul>
        </Pane>
      )}
    </Container>
  );
};

export default ApiPane;
