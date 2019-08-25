import { TextDocument, TextLine, window, TextEditor } from 'vscode'

import { getDocumentTextLines } from '../vs'

import { parsePatternInput } from '../str'

/**
 */
export default interface ICommand {
    /**
     * The id of this command.
     */
    readonly commandId: string

    /**
     * Run this comamnd.
     */
    run(): void
}

interface TextLineEditCallback {
    (textLine: TextLine): string
}

/**
 * 
 */
export abstract class BaseCommand implements ICommand {
    abstract get commandId(): string
    abstract run(): void

    get editor(): TextEditor {
        const editor = window.activeTextEditor
        if (!editor) {
            window.showErrorMessage("[StrKit] There are no active TextEditor")
        }

        return editor!
    }

    parsePatternInput = parsePatternInput

    /**
     */
    getDocumentTextLines = (document: TextDocument | null = null) => {
        return getDocumentTextLines(document || this.editor.document)
    }

    /**
     * @param callback
     */
    editEachLine(callback: TextLineEditCallback) {
        this.editor.edit((editorEdit) => {
            this.getDocumentTextLines()
                .forEach((textLine: TextLine) => {
                    editorEdit.replace(textLine.range, callback(textLine))
                })
        })
    }
}
