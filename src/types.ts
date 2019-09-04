import { uniqueId } from 'lodash'

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
    id: string
    label: string
    type: StrKitTreeItemMetadataType
    description?: string,
    createdAt?: number
}

export class OperationMetadata implements StrKitTreeItemMetadata {

    readonly id: string
    readonly createdAt: number

    constructor(
        public readonly operationId: string,
        public readonly options: IOperationOptions,
        public readonly label: string,
        public readonly type: StrKitTreeItemMetadataType
    ) {
        this.id = uniqueId('om_')
        this.createdAt = Date.now()
     }
}
