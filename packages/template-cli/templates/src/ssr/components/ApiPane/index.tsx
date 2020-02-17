import React, { useState } from "react";
import { Container, Pane } from "./components";
import { Button } from "@material-ui/core";
import api from "constants/apis/menu";
import axios from "axios";
import logger from './../../server/core/root-logger';

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
          logger.info(res)
          res ? setState(res.data.results) : undefined
        } catch (err) {
          logger.error(err.message)
        }
    };
    return (
        <Container item>
            <Pane>
                <h1>Get Menu List</h1>
                <Button onClick={callApi}>{myapi.method}</Button>
            </Pane>
            {state && (
                <Pane id="results">
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
