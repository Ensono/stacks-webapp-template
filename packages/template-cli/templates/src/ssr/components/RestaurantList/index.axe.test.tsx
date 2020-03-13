/*
We expect every component to pass our accessibility checks. By using jest-axe we get fast feedback whilst developing.

⚠️ IMPORTANT:
    Note that this will render the component, without notion of the document as a whole.
    To test the end user result with the components rendered in Page by Next, please
    use Cypress with Axe.
    Example: index.test.axe.cy.ts
*/

import * as React from "react"
import RestaurantListComponent from "."
import {accessibilityTestHelper} from "../../__tests__/axe/accessibilityHelper.test"

accessibilityTestHelper(
    <RestaurantListComponent
        restaurantList={[
            {
                id: "1",
                restaurandId: "b",
                name: "c",
                description: "d",
                enabled: true,
            },
            {
                id: "2",
                restaurandId: "b",
                name: "c",
                description: "d",
                enabled: true,
            },
        ]}
    />,
)
