import { window, InputBox, TextDocument, TextLine, TextEditor, EndOfLine, Range, Position } from 'vscode'

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

const EOL_LF = "\n"
const EOL_CRLF = "\r\n"

/**
 * 
 */
function toEolString(eol: number): string {
    return eol === EndOfLine.LF ? EOL_LF : EOL_CRLF
}

type Textable = Array<TextLine> | string

export function toText(textable: Textable, eol: number): string {
    if (typeof textable === 'string') {
        return textable
    }

    return textable.map(textLine => textLine.text).join(toEolString(eol))
}

export function getDocumentRange(document: TextDocument): Range {
    return new Range(
        new Position(0, 0),
        document.lineAt(document.lineCount - 1).range.end
    )
}

export function setEditorText(editor: TextEditor, textable: Textable) {
    const newText = toText(textable, editor.document.eol)
    editor.edit((editorEdit) => {
        editorEdit.replace(getDocumentRange(editor.document), newText)
    })
}
