
export interface IFluent<T> {
    [index: string]: T
}

export type OperationValue = string[]
export interface IOperationOptions extends IFluent<string> {
}

export enum StrKitTreeItemMetadataType {
    ROOT = 'root',
    OPERATION = 'operation',
    PIPELINE = 'pipeline'
}

export interface StrKitTreeItemMetadata {
    label: string
    type: StrKitTreeItemMetadataType
    description?: string
}

export class OperationMetadata implements StrKitTreeItemMetadata {
    constructor(
        public readonly operationId: string,
        public readonly options: IOperationOptions,
        public readonly label: string,
        public readonly type: StrKitTreeItemMetadataType
    ) { }
}
