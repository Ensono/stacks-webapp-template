/* tslint:disable:no-unused-expression object-literal-sort-keys max-classes-per-file no-empty */

/*
* Example Pact test

* Calls the ./mocks/menuService.ts Menu API when running locally.
* When the tests pass, the contract will be written to ./pacts/<PACT_CONSUMER>-<PACT_PROVIDER>
* ✅ Use Pact Matchers to ensure state change https://docs.pact.io/getting_started/matching
* ✅ Ensure that the provider state has been configured by the Provider
*/


import {Interaction, Matchers} from "@pact-foundation/pact"
import {provider} from "./utils/pactSetup"

import {MenuService} from "./mocks/menuService"

describe("Yumido Menu API", () => {
    const url = "http://localhost"
    let menuService: MenuService

    menuService = new MenuService({url, port: provider.opts.port})

    const MENU = {
        id: "e98583ad-0feb-4e48-9d4f-b20b09cb2633",
        name: "Breakfast Menu",
        description: "Eggs, Bread, Coffee and more",
        enabled: true,
    }

    const getMenuExpectation = Matchers.like(MENU) //Using matches for state changes

    afterEach(() => {
        return provider.verify()
    })

    describe("GET /menu{id}", () => {
        beforeEach(() => {
            const interaction = new Interaction()
                .given("An existing menu") //Provider state
                .uponReceiving("A request for a menu by ID")
                .withRequest({
                    method: "GET",
                    path: `/v1/menu/${MENU.id}`,
                    headers: {
                        Accept: "application/json",
                    },
                })
                .willRespondWith({
                    status: 200,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: getMenuExpectation,
                })

            return provider.addInteraction(interaction)
        })

        it("Returns the menu information", () => {
            return menuService.getMenuById(MENU.id).then((response: any) => {
                expect(response.headers["content-type"]).toEqual(
                    "application/json; charset=utf-8",
                )
                expect(response.status).toEqual(200)
                expect(response.data).toEqual(MENU)
            })
        })
    })
})
