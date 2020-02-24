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
        try {
          const res = await axios({
            method: myapi.method,
            url: myapi.internalEndpoint(),
          })
          res ? setState(res.data.results) : undefined
        } catch (err) {
        }
    };
    return (
      <Container item>
        <Pane>
          <h1>Get Menu List</h1>
          <Button data-testid="apiPaneBtn" onClick={callApi}>
            {myapi.method}
          </Button>
        </Pane>
        {state && (
          <Pane>
            <ul data-testid="results">
              {state.map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </Pane>
        )}
      </Container>
    )
};

export default ApiPane;
