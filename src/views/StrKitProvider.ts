import { 
    TreeDataProvider, 
    TreeItem, 
    TreeItemCollapsibleState, 
    ProviderResult
} from "vscode"

import { getRecently, strKitItemEventEmitter } from "../storage"
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

export default class StrKitProvider implements TreeDataProvider<ICommandVariant> {

    onDidChangeTreeData = strKitItemEventEmitter.event

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
