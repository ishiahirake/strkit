import {
    TreeDataProvider,
    TreeItem,
    TreeItemCollapsibleState,
    ProviderResult,
    EventEmitter,
    Event
} from "vscode"

import { getRecently } from "../storage"
import { StrKitTreeItemMetadata, StrKitTreeItemMetadataType } from '../types'

class StrkitItem extends TreeItem {
    constructor(
        public readonly metadata: StrKitTreeItemMetadata,
        public readonly collapsibleState: TreeItemCollapsibleState
    ) {
        super(metadata.label, collapsibleState)
    }

    contextValue = this.metadata.type
}

const SAVED = {
    id: 'Saved',
    label: 'Saved',
    type: StrKitTreeItemMetadataType.ROOT,
}

const RECENTLY = {
    id: 'Recently',
    label: 'Recently',
    type: StrKitTreeItemMetadataType.ROOT
}

const ROOT_TREE_ITEMS = [
    SAVED,
    RECENTLY
]

class StrKitProvider implements TreeDataProvider<StrKitTreeItemMetadata> {

    private _onDidChangeTreeData: EventEmitter<StrKitTreeItemMetadata | undefined> = new EventEmitter<StrKitTreeItemMetadata | undefined>()
    public readonly onDidChangeTreeData: Event<StrKitTreeItemMetadata | undefined> = this._onDidChangeTreeData.event

    refresh(): void {
        this._onDidChangeTreeData.fire()
    }

    getTreeItem(element: StrKitTreeItemMetadata): TreeItem | Thenable<TreeItem> {
        return new StrkitItem(
            element,
            element.type === StrKitTreeItemMetadataType.ROOT
                ? TreeItemCollapsibleState.Expanded
                : TreeItemCollapsibleState.None
        )
    }

    getChildren(element?: StrKitTreeItemMetadata): ProviderResult<StrKitTreeItemMetadata[]> {
        if (!element) {
            return ROOT_TREE_ITEMS
        }

        if (element.id === 'Recently') {
            return getRecently()
        }

        return []
    }
}

const strKitProvider = new StrKitProvider()

export default strKitProvider
