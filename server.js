const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/add", (req, res) => {
    res.json(req.body);
})

const listener = app.listen(3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})