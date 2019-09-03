import { TextLine, window, commands } from 'vscode'

import { getDocumentTextLines, setEditorText } from '../vs'

import { execute } from '../operations'
import { addRecently } from '../storage'

import { StrKitTreeItemMetadataType } from '../types'

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

export abstract class BaseCommand implements ICommand {

    async run(): Promise<void> {
        const editor = window.activeTextEditor
        if (!editor) {
            window.showInformationMessage("[StrKit] There are no active text editor.")
            return
        }

        const options = await this.input()
        if (options === false) {
            return Promise.resolve()
        }

        const value = getDocumentTextLines(editor.document)
            .map((textLine: TextLine) => textLine.text)

        try {
            const metadata = {
                options,
                type: StrKitTreeItemMetadataType.OPERATION,
                label: this.name,
                operationId: this.targetOperationId,
            }

            const result = execute(value, metadata)

            addRecently(metadata)
            commands.executeCommand('strkit.refresh')

            setEditorText(editor, result)
        }
        catch (e) {
            window.showErrorMessage(e.message)
        }
    }

    async input(): Promise<any> {
        return Promise.resolve({})
    }

    abstract get commandId(): string

    get targetOperationId(): string {
        return this.commandId.replace('strkit.', '')
    }

    get name(): string {
        return this.constructor.name
    }
}
