/* eslint-disable prefer-promise-reject-errors */
import axios from "axios"
import {getMenus} from "."

jest.mock("next/config")

let mock

beforeEach(() => {
    mock = jest.spyOn(axios, "get")
})

afterEach(() => {
    mock.mockRestore()
})

test("should call the getMenus API", async () => {
    getMenus()
    expect(mock).toHaveBeenCalled()
})
