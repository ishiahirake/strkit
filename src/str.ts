/**
 * @param input {string}
 */
export function parsePatternInput(input: string): string | RegExp {
    const matches = input.match(/\/([^\/]+)\/(.*)/)
    // input is plain text
    if (matches === null) {
        return input
    }

    const [_, pattern, flags] = matches

    return new RegExp(pattern, flags)
}
