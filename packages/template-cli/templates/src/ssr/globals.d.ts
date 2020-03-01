import "@testing-library/jest-dom/extend-expect"

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: any
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    }
}
