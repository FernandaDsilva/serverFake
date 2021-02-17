const express = require('express')
const app = express()

app.listen(3333, () => console.log(`listening on port: ${3333}`))


app.get('/', (request, response) => {
    response.json({ message: 'Hello World!' })
})