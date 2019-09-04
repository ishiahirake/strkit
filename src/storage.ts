import { Memento } from "vscode"

import { values, orderBy } from 'lodash'

import { StrKitTreeItemMetadata, OperationMetadata, IFluent } from './types'

let store: Memento

const enum Storage {
    Saved = 'Saved',
    Recently = 'Recently',
}

export function initStore(storage: Memento) {
    store = storage
}

export function deleteOperation(metadata: StrKitTreeItemMetadata) {
    if (metadata.label === Storage.Recently) {
        store.update(Storage.Recently, {})
    }
    else if (metadata.label === Storage.Saved) {
        // Todo
    }
    else {
        const recently = getStorage(Storage.Recently)
        if (metadata.id in recently) {
            delete recently[metadata.id]
            return
        }
        // Todo
    }
}

export function addRecently(metadata: OperationMetadata) {
    const recently = getStorage(Storage.Recently)
    recently[metadata.id] = metadata
    store.update(Storage.Recently, recently)
}

function getStorage(storage: Storage): IFluent<OperationMetadata> {
    return store.get<IFluent<OperationMetadata>>(Storage.Recently, {})
}

export function getRecently(): OperationMetadata[] {
    const recently = getStorage(Storage.Recently)
    return orderBy(values(recently), ['createdAt'], ['desc'])
}
