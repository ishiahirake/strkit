import { commands, ExtensionContext } from 'vscode'

import ICommand from './Command'
import Replace from './Replace'
import RemoveEmpty from './RemoveEmpty'

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
        command.run()
    }))
}
