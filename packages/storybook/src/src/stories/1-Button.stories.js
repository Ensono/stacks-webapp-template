import React from "react"
import {action} from "@storybook/addon-actions"
import {Button} from "@storybook/react/demo"

import {withDesign} from "storybook-addon-designs"

export default {
    title: "Button",
    component: Button,
    decorators: [withDesign],

    parameters: {
        design: {
            type: "figma",
            url:
                "https://www.figma.com/file/S7XUIRMGHRcU2dhw2KlGzu/Google-Material-Design?node-id=0%3A835",
        },
    },
}
 
export const Emoji = () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
)
