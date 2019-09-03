
import IOperation from './Operation'
import Replace from './Replace'
import RemoveEmpty from './RemoveEmpty'

import { OperationMetadata, IFluent, OperationValue } from '../types'

const operations: IFluent<IOperation> = {
    replace: new Replace(),
    'remove.empty': new RemoveEmpty()
}

export function execute(value: OperationValue ,metadata: OperationMetadata): OperationValue {
    const target = operations[metadata.operationId]
    if (!target) {
        throw new Error(`Operation ${metadata.operationId} not found.`)
    }

    return target.execute(value, metadata.options)
}
