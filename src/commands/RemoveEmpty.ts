import { TextLine } from "vscode"
import { BaseCommand } from "./Command"

import { setEditorText } from "../vs"
import { isEmpty } from "../str"

/**
 * Remove empty lines.
 */
export default class RemoveEmpty extends BaseCommand {

    get commandId(): string {
        return 'strkit.remove.empty'
    }

    run(): void {
        setEditorText(this.editor, this.operate(this.getDocumentTextLines()))
    }

    operate(textLines: Array<TextLine>) {
        return textLines.filter((textLine) => !isEmpty(textLine.text))
    }
}
