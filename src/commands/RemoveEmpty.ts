import { BaseCommand } from "./Command"

/**
 * Remove empty lines.
 */
export default class RemoveEmpty extends BaseCommand {

    get commandId(): string {
        return 'strkit.remove.empty'
    }
}
