
export type OperationValue = Array<string>
export interface OperationOptions {
}

export default interface IOperation {
    readonly operationId: string
    execute(arg: OperationValue, options: OperationOptions): OperationValue
}

export abstract class AbstractOperation implements IOperation {
    abstract get operationId(): string
    abstract execute(arg: OperationValue, options: OperationOptions): OperationValue
}
