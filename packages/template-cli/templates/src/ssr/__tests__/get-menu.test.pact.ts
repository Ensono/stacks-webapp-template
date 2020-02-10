/* tslint:disable:no-unused-expression object-literal-sort-keys max-classes-per-file no-empty */
import { Interaction } from '@pact-foundation/pact'
import { provider } from '../pact/pactSetup'

import {MenuService} from '../server/apis/menuapi/mocks/menuService'


describe('Yumido Menu API', () => {
    const url = "http://localhost"
    let menuService: MenuService

    menuService = new MenuService({ url, port: provider.opts.port })

    const EXPECTED_BODY = {
        "pageSize": 1,
        "pageNumber": 1,
        "results": [
            {
                "id": "1234",
                "restaurantId": "1234",
                "name": "Breakfast Menu",
                "description": "Eggs, Bread, Coffee and more",
                "enabled": true
            }
        ]
    }

    afterEach(() => {
        return provider.verify()
    })

    describe('another works', () => {
        beforeEach(() => {
            const interaction = new Interaction()
                .given('An existing menu')
                .uponReceiving('A request for all menus')
                .withRequest({
                    method: 'GET',
                    path: '/v1/menu',
                    headers: {
                        Accept: 'application/json',
                    },
                    query: 'pageSize=1&pageNumber=1'
                })
                .willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: EXPECTED_BODY,
                })

            return provider.addInteraction(interaction)
        })

        it('sends a request according to contract', () => {
            return menuService.getMenu()
                .then((response: any) => {
                    expect(response.headers["content-type"]).toEqual("application/json")
                    expect(response.status).toEqual(200)
                    expect(response.data).toEqual(EXPECTED_BODY)
            })
        })

    })
})

