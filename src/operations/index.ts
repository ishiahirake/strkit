
import IOperation, { OperationValue, OperationOptions } from './Operation'
import Replace from './Replace'

export class OperationMetadata {
    constructor(
        public readonly operationId: string,
        public readonly options: OperationOptions
    ) { }
}

const operations: {[index: string]: IOperation} = {
    replace: new Replace()
}

export function execute(value: OperationValue ,metadata: OperationMetadata): OperationValue | false {
    const target = operations[metadata.operationId]
    if (!target) {
        throw new Error(`Operation ${metadata.operationId} not found.`)
    }

    return target.execute(value, metadata.options)
}
