import {
    TreeDataProvider,
    TreeItem,
    TreeItemCollapsibleState,
    ProviderResult,
    EventEmitter,
    Event
} from "vscode"

import { getRecently } from "../storage"
import { ICommandVariant } from '../commands/Command'

class StrkitItem extends TreeItem {
    constructor(
        public readonly commandVariant: ICommandVariant,
        public readonly collapsibleState: TreeItemCollapsibleState
    ) {
        super(commandVariant.label, collapsibleState)
    }

    contextValue = this.commandVariant.type
}

class StrKitProvider implements TreeDataProvider<ICommandVariant> {

    private _onDidChangeTreeData: EventEmitter<ICommandVariant | undefined> = new EventEmitter<ICommandVariant | undefined>()
    public readonly onDidChangeTreeData: Event<ICommandVariant | undefined> = this._onDidChangeTreeData.event

    refresh(): void {
        this._onDidChangeTreeData.fire()
    }

    getTreeItem(element: ICommandVariant): TreeItem | Thenable<TreeItem> {
        return new StrkitItem(
            element,
            element.type === 'root' ? TreeItemCollapsibleState.Expanded : TreeItemCollapsibleState.None
        )
    }

    getChildren(element?: ICommandVariant): ProviderResult<ICommandVariant[]> {
        if (!element) {
            return [
                { label: 'Saved', type: 'root' },
                { label: 'Recently', type: 'root' },
            ]
        }

        if (element.label === 'Recently') {
            return getRecently()
        }

        return []
    }
}

const strKitProvider = new StrKitProvider()

export default strKitProvider
