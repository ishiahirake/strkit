import { showInputBox } from '../vs'
import { BaseCommand } from './Command'

import { ReplaceOptions } from '../operations/Replace'

const inputSteps = 2

/**
 * Show pattern input box and get the user input.
 */
function showPatternInputBox(value: string = ''): Promise<string | null> {
    return showInputBox((inputBox) => {
        // configure the pattern input box
        inputBox.step = 1
        inputBox.totalSteps = inputSteps
        inputBox.title = "StrKit Replace - Input Repalce Pattern"
        inputBox.placeholder = "Eg. Regex or plain text"
        inputBox.value = value
    })
}

/**
 * Show replace value input box and get the user input.
 */
function showReplaceValueInputBox(value: string = ''): Promise<string | null> {
    return showInputBox((inputBox) => {
        // configure the replace value input box
        inputBox.step = 2
        inputBox.totalSteps = inputSteps
        inputBox.title = "StrKit Replace - Input Replace Value"
        inputBox.placeholder = "Eg. Regex or plain text"
        inputBox.value = value
    })
}

/**
 *
 */
export default class Replace extends BaseCommand {

    /**
     * ID of this command.
     */
    get commandId() {
        return "strkit.replace"
    }

    async input(): Promise<ReplaceOptions | false> {
        const searchValue = await showPatternInputBox()
        if (searchValue === null) {
            return Promise.resolve(false)
        }

        const replaceValue = await showReplaceValueInputBox()
        if (replaceValue === null) {
            return Promise.resolve(false)
        }

        return Promise.resolve({ searchValue, replaceValue })
    }
}
