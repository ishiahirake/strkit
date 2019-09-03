
import { OperationValue, IOperationOptions } from '../types'

export default interface IOperation {
    readonly operationId: string
    execute(value: OperationValue, options: IOperationOptions): OperationValue
}

export abstract class AbstractOperation implements IOperation {
    abstract get operationId(): string
    abstract execute(value: OperationValue, options: IOperationOptions): OperationValue
}
