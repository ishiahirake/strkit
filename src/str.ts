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

const EmptyStringRegex = /^\s*$/

/**
 * Check whether a string is empty or not.
 * 
 * a string which contains only whitespace is considered as empty.
 * 
 * @param str {string} the string to test.
 */
export function isEmpty(str: string): boolean {
    return EmptyStringRegex.test(str)
}
