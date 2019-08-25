import { window, InputBox, TextDocument, TextLine } from 'vscode'

import { range } from 'lodash/fp'

interface InputBoxConfigurator {
    (inputBox: InputBox): void
}

/**
 * Show input box and get the user input.
 * 
 * if cancelled, Promise will return null, otherwise the user input.
 */
export function showInputBox(configurator: InputBoxConfigurator): Promise<string | null> {
    const inputBox = window.createInputBox()

    // configure the input box
    configurator(inputBox)

    inputBox.show()

    return new Promise((resolve) => {
        inputBox.onDidAccept(() => {
            resolve(inputBox.value)
            inputBox.dispose()
        })
        inputBox.onDidHide(() => {
            return resolve(null)
        })
    })
}

/**
 * Get all TextLine in the given document.
 * 
 * if document is null, return empty array.
 */
export function getDocumentTextLines(document: TextDocument | null): Array<TextLine> {
    if (!document) {
        return []
    }

    return range(0, document.lineCount).map((line) => document.lineAt(line))
}
