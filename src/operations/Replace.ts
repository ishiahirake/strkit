import { AbstractOperation, OperationValue, OperationOptions } from './Operation'

interface ReplaceOptions extends OperationOptions {
    searchValue: string
    replaceValue: string
}

export function doReplace(text: string, options: ReplaceOptions): string {
    return text.replace(options.searchValue, options.replaceValue)
}

export default class Replace extends AbstractOperation {

    /**
     * ID of this command.
     */
    get operationId() {
        return "strkit.replace"
    }

    execute(arg: OperationValue, options: ReplaceOptions): OperationValue {
        return arg.map(line => doReplace(line, options))
    }
}
