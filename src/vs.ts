import { window, InputBox } from 'vscode'

interface InputBoxConfigurator {
    (inputBox: InputBox): void
}

/**
 * Show input box and get the user input.
 * 
 * if cancelled, Promise will return null, otherwise the user input.
 */
export function showInputBox(configurator: InputBoxConfigurator): Promise<string | null> {
    const inputBox = window.createInputBox()

    // configure the input box
    configurator(inputBox)

    inputBox.show()

    return new Promise((resolve) => {
        inputBox.onDidAccept(() => {
            resolve(inputBox.value)
            inputBox.dispose()
        })
        inputBox.onDidHide(() => {
            return resolve(null)
        })
    })
}
