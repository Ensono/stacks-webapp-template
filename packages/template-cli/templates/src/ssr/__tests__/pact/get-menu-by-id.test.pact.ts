/* tslint:disable:no-unused-expression object-literal-sort-keys max-classes-per-file no-empty */
import { Interaction, Matchers } from '@pact-foundation/pact'
import { provider } from './utils/pactSetup'

import {MenuService} from './mocks/menuService'


describe('Yumido Menu API', () => {
    const url = "http://localhost"
    let menuService: MenuService

    menuService = new MenuService({ url, port: provider.opts.port })

    const MENU = {
        "id": "e98583ad-0feb-4e48-9d4f-b20b09cb2633",
        "name": "Breakfast Menu",
        "description": "Eggs, Bread, Coffee and more",
        "enabled": true
    }

    const getMenuExpectation = Matchers.like(MENU)

    afterEach(() => {
        return provider.verify()
    })

    describe('another works', () => {
        beforeEach(() => {
            const interaction = new Interaction()
                .given('An existing menu')
                .uponReceiving('A request for a menu by ID')
                .withRequest({
                    method: 'GET',
                    path: '/v1/menu/e98583ad-0feb-4e48-9d4f-b20b09cb2633',
                    headers: {
                        Accept: 'application/json',
                    }
                })
                .willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    body: getMenuExpectation,
                })

            return provider.addInteraction(interaction)
        })

        it('sends a request according to contract', () => {
            return menuService.getMenuById()
                .then((response: any) => {
                    expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8")
                    expect(response.status).toEqual(200)
                    expect(response.data).toEqual(MENU)
            })
        })

    })
})

