# query-json

A small ES2015 function to look for a JSON response containing a specific property

## API

```js
import fn from './path/to/query-json'

fn('https://api.example.com', 'prop')
    .then(res => console.log(res.success.prop))
```

### Error handling

The function always returns only `{ success: (the response) }` or `{ failure: (details + response) }`.

```js
import query from './path/to/query-json'

// Check for success
query('https://jsonplaceholder.typicode.com/users', 'username')
    .then(res => {
        if ('success' in res) console.log(res.success[0].username)
        else throw 'oops'
    })

// Check for failure
query('https://jsonplaceholder.typicode.com/users', 'weather')
    .then(res => {
        if ('failure' in res) throw 'oh no!'
        else exampleCallback(res.success)
    })

// Check for failure using async/await
const answer = await query('https://jsonplaceholder.typicode.com/users', 'weather')
if ('failure' in answer) throw answer.failure
else return answer.success
```
