import { window } from 'vscode'

import StrKitProvider from './StrkitProvider'

export function registerViews() {
    window.registerTreeDataProvider('strkit', new StrKitProvider())
}
