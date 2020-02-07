import { copy, mkdir } from 'fs-extra'
import { PromptAnswer } from '../../model/prompt_answer'
import { resolve } from 'path'

const TEMPLATES_DIRECTORY = `../../../templates/`
const ssr_aks_azdevops = {}

function copyFilter(src: string, dest: string) {
    // return true
    if (src.indexOf("node_modules") > -1 || 
        src.indexOf(".next") > -1 || 
        src.indexOf("coverage") > -1 || 
        src.indexOf("dist") > -1) {
        return false
    } else {
        return true
    }
}

export const ssr_aks_tfs = jest.fn((instructions: PromptAnswer): Promise<object> => Promise.resolve(instructions))
