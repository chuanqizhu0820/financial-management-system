const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/add", (req, res) => {
    console.log(req.body);
})

const listener = app.listen(3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})