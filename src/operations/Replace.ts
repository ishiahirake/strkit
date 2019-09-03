import { AbstractOperation } from './Operation'
import { IOperationOptions, OperationValue } from '../types'

export interface ReplaceOptions extends IOperationOptions {
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

    execute(value: OperationValue, options: ReplaceOptions): OperationValue {
        return value.map(line => doReplace(line, options))
    }
}
