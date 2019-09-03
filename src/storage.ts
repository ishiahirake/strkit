import { Memento } from "vscode"

import { OperationMetadata } from './types'

let store: Memento

export function initStore(storage: Memento) {
    store = storage
}

export function addRecently(metadata: OperationMetadata) {
    const recently = getRecently()
    recently.unshift(metadata)
    store.update('recently', recently)
}

export function getRecently(): OperationMetadata[] {
    return store.get<OperationMetadata[]>('recently', [])
}
