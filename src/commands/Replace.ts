import { window, TextLine } from 'vscode'

import { BaseCommand } from './Command'

const inputSteps = 2

/**
 * Show pattern input box and get the user input.
 */
function showPatternInputBox(): Promise<string | null> {
    const inputBox = window.createInputBox()

    // configure the pattern input box
    inputBox.step = 1
    inputBox.totalSteps = inputSteps
    inputBox.title = "StrKit Replace - Input Repalce Pattern"
    inputBox.placeholder = "Eg. Regex or plain text"

    inputBox.show()

    return new Promise((resolve, reject) => {
        inputBox.onDidAccept(() => {
            resolve(inputBox.value)
            inputBox.dispose()
        })
        inputBox.onDidHide(() => {
            return resolve(null)
        })
    })
}

function showReplaceValueInputBox(): Promise<string | null> {
    const inputBox = window.createInputBox()

    // configure the replace value input box
    inputBox.step = 2
    inputBox.totalSteps = inputSteps
    inputBox.title = "StrKit Replace - Input Replace Value"
    inputBox.placeholder = "Eg. Regex or plain text"

    inputBox.show()

    return new Promise((resolve, reject) => {
        inputBox.onDidAccept(() => {
            resolve(inputBox.value)
            inputBox.dispose()
        })
        inputBox.onDidHide(() => {
            resolve(null)
        })
    })
}

/**
 * 
 */
export default class Replace extends BaseCommand {

    async run() {
        const pattern = await showPatternInputBox()
        if (pattern === null) {
            return
        }

        const replaceValue = await showReplaceValueInputBox()
        if (replaceValue === null) {
            return
        }

        return this.operate({ pattern, replaceValue })
    }

    operate({pattern, replaceValue}: {pattern: string, replaceValue: string}) {
        const regex = new RegExp(pattern)
        this.editEachLine((textLine) => {
            return textLine.text.replace(regex, replaceValue)
        })
    }

    /**
     * ID of this command.
     */
    get commandId() {
        return "strkit.replace"
    }
}
