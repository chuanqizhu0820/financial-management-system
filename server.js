const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.urlencoded({
    extended: true
}))

let uri = "mongodb+srv://dbUser:dbUserpw@cluster0.qjxut.mongodb.net/db2021?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;
const itemSchema = new Schema(
    {
        date: { type: Date, required: true },
        amount: { type: Number, required: true },
        category: { type: String, required: true },
        note: String
    }
)

let Item = mongoose.model("Item", itemSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/add", (req, res) => {
    let item = new Item({
        date: req.body.date,
        amount: req.body.amount,
        category: req.body.category,
        note: req.body.note
    })
    item.save();
    res.json(req.body);
})

const listener = app.listen(3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})