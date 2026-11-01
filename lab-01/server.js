
const express = require('express')
const app = express()

app.get('/', (request, response) => {
    response.send("Welcome to the Node.js and Express server!")
})

app.get('/about', (request, response) => {
    response.json({
        Name: "Marthala Venkata Tejasri",
        Section: "CSE - FSD - 2B"
    })
})

app.get('/time', (request, response) => {
    response.json({
        currentDateTime: new Date()
    })
})

app.use((request, response) => {
    response.status(404).send("404 - Page not found")
})

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000")
})
