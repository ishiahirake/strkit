import { Memento, EventEmitter } from "vscode"

import { ICommandVariant } from './commands/Command'

export const strKitItemEventEmitter = new EventEmitter<ICommandVariant | undefined>()

let store: Memento

export function initStore(storage: Memento) {
    store = storage
}

export const getStore = () => store

export function addRecently(variant: ICommandVariant) {
    const recently = getRecently()
    recently.unshift(variant)
    store.update('recently', recently)

    strKitItemEventEmitter.fire(variant)
}

export function getRecently(): Array<ICommandVariant> {
    return store.get<Array<ICommandVariant>>('recently', [])
}
