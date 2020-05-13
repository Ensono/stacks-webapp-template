import {Interaction, Matchers} from "@pact-foundation/pact"
import {pactSetup} from "../index"

import {MenuService} from "../__mocks__/menuService"

describe("Yumido Menu API", () => {
    const url = "http://localhost"
    const port = 8025
    const provider = pactSetup(port)
    
    const menuService = new MenuService({url, port})
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
