import { window, ExtensionContext, commands } from 'vscode'

import strKitProvider from './StrKitProvider'

export function registerViews(context: ExtensionContext) {
    window.registerTreeDataProvider('strkit', strKitProvider)
    commands.registerCommand('strkit.refresh', () => strKitProvider.refresh())
}
