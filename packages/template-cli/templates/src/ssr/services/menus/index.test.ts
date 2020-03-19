/* eslint-disable prefer-promise-reject-errors */
import axios from "axios"
import {getMenus, postMenu} from "."

jest.mock("next/config")

let mock
let mockPost

beforeEach(() => {
    mock = jest.spyOn(axios, "get")
    mockPost = jest.spyOn(axios, "post")
})

afterEach(() => {
    mock.mockRestore()
})

test("should call the getMenus API", async () => {
    getMenus()
    expect(mock).toHaveBeenCalled()
})

test("should call the getMenus API", async () => {
    postMenu("test", "tests", true, "d290f1ee")
    expect(mockPost).toHaveBeenCalled()
})
