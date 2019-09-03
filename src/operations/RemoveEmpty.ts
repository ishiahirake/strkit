import { AbstractOperation } from './Operation'

import { isEmpty } from "../str"

export default class RemoveEmpty extends AbstractOperation {

    get operationId(): string {
        return 'remove.empty'
    }

    execute(value: string[]): string[] {
        return value.filter((line) => !isEmpty(line))
    }
}
