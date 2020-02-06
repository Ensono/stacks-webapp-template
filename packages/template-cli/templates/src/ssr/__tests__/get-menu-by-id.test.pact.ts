/* tslint:disable:no-unused-expression object-literal-sort-keys max-classes-per-file no-empty */
import { Interaction } from '@pact-foundation/pact'
import { provider } from '../pact/pactSetup'

import {MenuService} from '../server/apis/menuapi/mocks/menuService'


describe('Yumido Menu API', () => {
    const url = "http://localhost"
    let menuService: MenuService

    menuService = new MenuService({ url, port: provider.opts.port })

    const EXPECTED_BODY = {
        "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
        "name": "Burger Menu",
        "description": "Cheese burger",
        "enabled": true
    }

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
                    path: '/v1/menu/7f993e28-b9b1-4ea7-830b-b30f9758db68',
                    headers: {
                        Accept: 'application/json',
                    }
                })
                .willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    body: EXPECTED_BODY,
                })

            return provider.addInteraction(interaction)
        })

        it('sends a request according to contract', () => {
            return menuService.getMenuById()
                .then((response: any) => {
                    expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8")
                    expect(response.status).toEqual(200)
                    expect(response.data).toEqual(EXPECTED_BODY)
            })
        })

    })
})

