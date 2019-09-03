import { Memento } from "vscode"

import { ICommandVariant } from './commands/Command'

let store: Memento

export function initStore(storage: Memento) {
    store = storage
}

export function addRecently(variant: ICommandVariant) {
    const recently = getRecently()
    recently.unshift(variant)
    store.update('recently', recently)
}

export function getRecently(): Array<ICommandVariant> {
    return store.get<Array<ICommandVariant>>('recently', [])
}
