import * as assert from 'assert'

import * as strings from '../../str'

suite('Str test suite', () => {

    test('parsePatternInput test', () => {
        // Plain Text
        assert.equal('', strings.parsePatternInput(''))
        assert.equal('plaintext', strings.parsePatternInput('plaintext'))

        // RegExp

        // RegExp - Normal 
        let input = '/^\\d/gi'
        let result = strings.parsePatternInput(input) as RegExp
        assert.ok(result instanceof RegExp)
        assert.equal("^\\d", result.source)
        assert.equal('gi', result.flags)
        assert.ok(result.test('12and'))
    })
})
