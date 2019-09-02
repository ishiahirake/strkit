import { window, commands, ExtensionContext } from 'vscode'

import ICommand from './Command'
import Replace from './Replace'
import RemoveEmpty from './RemoveEmpty'

import { addRecently } from '../storage'

/**
 * Register strkit commands.
 * 
 * @param context
 */
export function registerCommands(context: ExtensionContext) {
    registerCommand(new Replace(), context)
    registerCommand(new RemoveEmpty(), context)
}

/**
 * Register a command.
 */
export function registerCommand(command: ICommand, context: ExtensionContext) {
    context.subscriptions.push(commands.registerCommand(command.commandId, () => {
        execute(command)
    }))
}

/**
 * Execute the given command.
 * 
 * As command require an active text editor, if there isn't one, show error info 
 * and return.
 * 
 * @param command {ICommand}
 */
async function execute(command: ICommand) {
    if (!window.activeTextEditor) {
        window.showInformationMessage("[StrKit] There are no active text editor.")
        return
    }

    let variant = command.run()
    if (variant instanceof Promise) {
        variant = await variant
    }

    if (variant !== null) {
        addRecently(variant)
        commands.executeCommand('strkit.refresh')
    }
}
