import { Button } from "@material-ui/core"
import React from "react"
import { Container, Pane } from "./components"


type menuItem = {
    id: string
    name: string
    description: string
}

type ApiPaneProps = {
    getMenulist: Function
    menuItems: menuItem[]
    isLoading: boolean
}

const ApiPane = ({getMenulist, menuItems, isLoading}: ApiPaneProps) => {
    const callApi = async () =>  await getMenulist()
    return (
        <Container item>
            <Pane>
                <h1>Get Menu List</h1>
                <Button data-testid="apiPaneBtn" onClick={callApi}>
                    Get
                </Button>
            </Pane>
            {menuItems && menuItems.length && (
                <Pane>
                    <ul data-testid="results">
                        {menuItems.map((item: menuItem) => (
                            <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                </Pane>
            )}
        </Container>
    )
}

export default ApiPane
