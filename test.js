const { Response } = require('node-fetch'),
    { parse } = require('url')
    url = 'http://localhost:2525'
require = require('esm')(module)
const { default: queryJSON } = require('.')

const user = {
        "id": 1,
        "name": "George Washington",
        "username": "ceo01",
        "email": "01@usa.gov",
    },
    users = [
        {
            "id": 1,
            "name": "George Washington",
            "username": "ceo01",
            "email": "01@usa.gov",
        },
        {
            "id": 2,
            "name": "John Adams",
            "username": "ceo02",
            "email": "02@usa.gov",
        }
    ]

global.fetch = jest.fn(url => {
    const { pathname } = parse(url)

    switch (pathname) {
        case '/':
            return new Response('HOME')
        case '/one':
            return new Response(JSON.stringify(user))
        case '/multiple':
            return new Response(JSON.stringify(users))
        case '/numbers':
            return new Response(JSON.stringify([1, 2, 3]))
        default:
            return new Response('NF')
    }
})

test('Returns a failure object for a missing target', async () => {
    const answer = await queryJSON(url, 'email')
    expect(answer).toHaveProperty('failure')

    const answer2 = await queryJSON(url + '/numbers', 'email')
    expect(answer2).toHaveProperty('failure')
})

test('Returns a success object when the target property is located', async () => {
    const answer = await queryJSON(url + '/one', 'email')
    expect(answer).toHaveProperty('success')
})

test('Returns a success object when the target property is located in an array', async () => {
    const answer = await queryJSON(url + '/multiple', 'username')
    expect(answer).toHaveProperty('success')
})

test('Returns a success property that matches the vendor response', async () => {
    const answer = await queryJSON(url + '/multiple', 'username')
    expect(answer.success).toEqual(users)
})

test('Returns a failure vendor_response property that matches the vendor response', async () => {
    const answer = await queryJSON(url + '/oops', 'data')
    expect(answer.failure.vendor_response).toEqual('NF')
})
