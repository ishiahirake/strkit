import { showInputBox } from '../vs'
import { BaseCommand, ICommandVariant } from './Command'

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

interface ReplaceOptions {
    pattern: string
    replaceValue: string
}

/**
 * 
 */
export default class Replace extends BaseCommand {

    async run(): Promise<ICommandVariant | null> {
        const pattern = await showPatternInputBox()
        if (pattern === null) {
            return null
        }

        const replaceValue = await showReplaceValueInputBox()
        if (replaceValue === null) {
            return null
        }

        this.operate({ pattern, replaceValue })

        return {
            type: 'operation',
            label: 'Replace',
            commandId: this.commandId
        }
    }

    operate({pattern, replaceValue}: ReplaceOptions) {
        const searchValue = this.parsePatternInput(pattern)
        this.editEachLine((textLine) => {
            return textLine.text.replace(searchValue, replaceValue)
        })
    }

    /**
     * ID of this command.
     */
    get commandId() {
        return "strkit.replace"
    }
}
