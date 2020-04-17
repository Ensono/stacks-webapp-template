import {call, put} from "redux-saga/effects"
import {getMenus} from "../../services"
import reducer, {
    isLoading,
    getError,
    initialState,
    requestMenuList,
    requestMenusListRoutine,
    watchRequestGetMenu,
    getMenuSagas as sagas,
} from "."

const mockInitialState = {loading: false, error: "b", menuItems: []}

const mockPayload = {
    searchTerm: "test",
}

test("the reducer should return the current state", () => {
    expect(reducer(mockInitialState, {type: "TEST"})).toEqual({
        loading: false,
        error: "b",
        menuItems: [],
    })
})

test("Trigger action should reset the state", () => {
    expect(
        reducer(
            {loading: false, error: "b", menuItems: []},
            requestMenusListRoutine.trigger(),
        ),
    ).toEqual(initialState)
})

test("REQUEST action should set the right state", () => {
    const state = {loading: false, error: "error", menuItems: []}
    expect(reducer(state, requestMenusListRoutine.request())).toEqual({
        loading: true,
        error: "error",
        menuItems: [],
    })
})

test("SUCCESS action should set the right state", () => {
    expect(
        reducer(
            {loading: false, error: "error", menuItems: []},
            requestMenusListRoutine.success({
                results: [
                    {
                        testkey: "value",
                    },
                ],
            }),
        ),
    ).toEqual({
        loading: false,
        error: null,
        menuItems: [{testkey: "value"}],
    })
})

test('sagas should dispatch the "success" action on successful response', () => {
    const gen = requestMenuList({payload: mockPayload})
    expect(gen.next().value).toEqual(put(requestMenusListRoutine.request()))
    expect(gen.next().value).toEqual(call(getMenus, mockPayload.searchTerm))
    expect(gen.next("response").value).toEqual(
        put(requestMenusListRoutine.success("response")),
    )
    expect(gen.next().done).toEqual(true)
})

test('sagas should dispatch the "failure" action', () => {
    const gen = requestMenuList({payload: mockPayload})
    expect(gen.next().value).toEqual(put(requestMenusListRoutine.request()))
    expect(gen.next().value).toEqual(call(getMenus, mockPayload.searchTerm))
    expect(gen.throw("internal_server_error").value).toEqual(
        put(requestMenusListRoutine.failure("internal_server_error")),
    )
    expect(gen.next().done).toEqual(true)
})

test("isLoading should select the loading state", () => {
    const state = {
        getMenus: {loading: true},
    }
    expect(isLoading(state)).toEqual(true)
})

test("getError should return the error", () => {
    const state = {
        getMenus: {error: "test error msg"},
    }
    expect(getError(state)).toEqual("test error msg")
})

test("the exported sagas array should contain an array of the watch methods ", () => {
    expect(sagas).toEqual([watchRequestGetMenu])
})
