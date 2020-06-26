//Code Setup
const express = require("express");
//đọc dữ liệu từ form gửi lên
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient;
const path = require('path')
const app = express();
//Nhúng bodyParser vào app
app.use(bodyParser.urlencoded({ extended: true }))
    //Đọc file ejs
app.set("view engine", "ejs")
app.use(express.static(__dirname));


MongoClient.connect("mongodb://localhost:27017", (err, client) => {
    if (err) {
        return console.log(err)
    }
    db = client.db("database")
    console.log("Access Database Successful!")
})

app.get("/", function(req, res) {
    db.collection("fate").find().toArray().then(results => {
        res.render("index.ejs", { results });
    }).catch(error => {
        console.error(error)
    })
})

app.post("/add", function(req, res) {
    console.log("Accept request", req.body)
    db.collection("fate").insertOne(req.body).then(results => {
        console.log(results)
    }).catch(error => {
        console.error(error)
    })
})

app.post("/fix", function(req, res) {
    db.collection("fate").updateOne({ name: req.body.name }, { $set: { name: req.body.newName } }).then(results => {
        console.log(results);
    }).catch(error => {
        console.error(error)
    })
})

app.post("/del", function(req, res) {
    db.collection("fate").deleteOne({ name: req.body.name }).then(results => {
        console.log(results);
    }).catch(error => {
        console.error(error)
    })
})

app.listen(3000, function() {
    console.log("Access Port Succesful!")
})