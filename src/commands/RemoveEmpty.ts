import { TextLine } from "vscode"
import { BaseCommand, ICommandVariant } from "./Command"

import { setEditorText } from "../vs"
import { isEmpty } from "../str"

/**
 * Remove empty lines.
 */
export default class RemoveEmpty extends BaseCommand {

    get commandId(): string {
        return 'strkit.remove.empty'
    }

    run() {
        setEditorText(this.editor, this.operate(this.getDocumentTextLines()))

        return {
            type: 'operation',
            label: 'Remove Empty Lines',
            commandId: this.commandId
        }
    }

    operate(textLines: Array<TextLine>) {
        return textLines.filter((textLine) => !isEmpty(textLine.text))
    }
}
