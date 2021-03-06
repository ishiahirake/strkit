// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

import { registerCommands } from './commands'
import { registerViews } from './views'

import { initStore } from './storage'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    initStore(context.globalState)

    registerCommands(context)
    registerViews(context)
}

// this method is called when your extension is deactivated
export function deactivate() {}
