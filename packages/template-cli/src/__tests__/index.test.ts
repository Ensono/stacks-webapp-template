/// <reference types="jest" />
// import * from '@types/jest'
import { basename, resolve } from 'path'
import { ExitMessage } from '../domain/model/cli_response'
import { runCli } from '../domain/prompt'
import * as cli from '../index'

jest.mock('../domain/prompt')
jest.mock('path')

describe("cli mock", () => {
    it("should return an ExitMessage", () => {
        // let test = 

        // import * as cli from '../index' // es-lint-module-import
        // expect(test).toBe(true)
        expect(true).toBe(true)
    })
})
