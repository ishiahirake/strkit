import * as assert from 'assert'
import { ReplaceOptions, doReplace } from './Replace'

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode'
// import * as myExtension from '../extension'

suite('DoReplace TestSuit', () => {

    test('doReplace with plain text', () => {
        const text = 'aaabbbccc'
        const options: ReplaceOptions = {
            searchValue: 'aa',
            replaceValue: 'bb'
        }
        assert.equal(doReplace(text, options), 'bbabbbccc')
    })

    test('doReplace with plain text multiple replace', () => {
        const text = 'aaaabbbbcccc'
        const options: ReplaceOptions = {
            searchValue: 'aa',
            replaceValue: 'bb'
        }
        assert.equal(doReplace(text, options), 'bbbbbbbbcccc')
    })

    test('doReplace with regex text', () => {
        const text = 'aaaabbbbcccc'
        const options: ReplaceOptions = {
            searchValue: '/aa/',
            replaceValue: 'dd'
        }
        assert.equal(doReplace(text, options), 'ddaabbbbcccc')
    })

    test('doReplace with regex text with flags', () => {
        const text = 'aaaabbbbcccc'
        const options: ReplaceOptions = {
            searchValue: '/aa/g',
            replaceValue: 'dd'
        }
        assert.equal(doReplace(text, options), 'ddddbbbbcccc')
    })

    test('doReplace with regex text with meta character', () => {
        const text = 'aaaabbbbcccc'
        const options: ReplaceOptions = {
            searchValue: '/^.a/g',
            replaceValue: 'dd'
        }
        assert.equal(doReplace(text, options), 'ddaabbbbcccc')
    })

})
