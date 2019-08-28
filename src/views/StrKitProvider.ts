import { TreeDataProvider, TreeItem, TreeItemCollapsibleState, Event, ProviderResult } from "vscode"

import { ICommandVariant } from '../commands/Command'

class StrkitItem extends TreeItem {
    constructor(
        public readonly commandVariant: ICommandVariant,
        public readonly collapsibleState: TreeItemCollapsibleState
    ) {
        super(commandVariant.label, collapsibleState)
    }
}

class RootItem extends StrkitItem {
    contextValue = "rootItem"
}

class PipelineItem extends StrkitItem {
    contextValue = "pipelineItem"
}

class OperationItem extends StrkitItem {
    contextValue = "operationItem"
}

export default class StrKitProvider implements TreeDataProvider<StrkitItem> {

    onDidChangeTreeData?: Event<StrkitItem | null | undefined> | undefined = undefined

    getTreeItem(element: StrkitItem): TreeItem | Thenable<TreeItem> {
        return element
    }

    getChildren(element?: StrkitItem): ProviderResult<StrkitItem[]> {
        if (!element) {
            return [
                new RootItem({label: 'Saved'}, TreeItemCollapsibleState.Expanded),
                new RootItem({label: 'Recently'}, TreeItemCollapsibleState.Expanded)
            ]
        }

        return []
    }
}
