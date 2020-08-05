import { AbstractOperation } from './Operation'
import { IOperationOptions, OperationValue } from '../types'
import * as _ from 'lodash'

export interface ReplaceOptions extends IOperationOptions {
    searchValue: string
    replaceValue: string
}

export function doReplace(text: string, options: ReplaceOptions): string {
    let pattern: RegExp
    if (options.searchValue.startsWith('/')) {
        let components = options.searchValue.split('/')
        const flags = components.length > 2 ? components[2] : ''
        pattern = new RegExp(components[1], flags)
    }
    else {
        pattern = new RegExp(options.searchValue, 'g')
    }

    return _.replace(text, pattern, options.replaceValue)
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
