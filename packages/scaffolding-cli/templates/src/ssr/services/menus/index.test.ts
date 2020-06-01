/* eslint-disable prefer-promise-reject-errors */
import axios from "axios"
import {getMenus, postMenu} from "."

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

let mock
let mockPost

beforeEach(() => {
    mock = jest.spyOn(axios, "get")
    mockPost = jest.spyOn(axios, "post")
    mockedAxios.get.mockResolvedValue({
        data: {},
    })
    mockedAxios.post.mockResolvedValue({
        data: {},
    })
})

afterEach(() => {
    mock.mockRestore()
})

test("should call the getMenus API", async () => {
    getMenus("")
    expect(mockedAxios.get).toHaveBeenCalled()
})

test("should call the getMenus API", async () => {
    postMenu("test", "tests", true, "d290f1ee")
    expect(mockedAxios.post).toHaveBeenCalled()
})
