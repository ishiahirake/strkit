import { window, commands, ExtensionContext } from 'vscode';

import ICommand from './Command'
import Replace from './Replace'

/**
 * Register strkit commands.
 * 
 * @param context
 */
export function registerCommands(context: ExtensionContext) {
    registerCommand(new Replace(), context);
}

/**
 * Register a command.
 */
export function registerCommand(command: ICommand, context: ExtensionContext) {
    context.subscriptions.push(commands.registerCommand(command.commandId, () => {
        execute(command)
    }))
}

function execute(command: ICommand) {
    if (!window.activeTextEditor) {
        window.showInformationMessage("[StrKit] There are no active text editor.")
        return
    }

    command.run()
}
