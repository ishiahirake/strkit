import { TextDocument, TextLine, window, TextEditor, TextEditorEdit } from 'vscode'

import { range } from 'lodash/fp'

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

/**
 */
function getDocumentTextLines(document: TextDocument | null): Array<TextLine> {
    if (!document) {
        return []
    }

    return range(0, document.lineCount).map((line) => document.lineAt(line))
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
