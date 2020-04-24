var express = require('express');
var heroes = require('./mock-heroes.json');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send("go to /heroes");
});

app.get('/heroes', function (req, res) {
    let list = heroes.slice();
    let sortedList = [];
    let i;

    for (i = 0; i < 8; i++) {
        let rand = Math.floor(Math.random()*list.length);
        sortedList.push(list[rand]);
        list.splice(rand, 1);
    }
    res.send(sortedList);
});

app.post('/heroes', function (req, res) {
    let body = req.body;
    let banAmount = 0;
    let errorMessage = {};

    if (body.length === 8) {
        body.forEach(element => {
            if (element["status"] === "banned") {
                banAmount++;
            }
        });
    
        if (banAmount === 2) {
            res.send(200);
        } else {
            errorMessage["Message"] = "You must ban two (2) heroes!";
            // res.status(400).send({ Message: "You must ban two (2) heroes!"});
        }
        // res.send(banAmount.toString());
    } else {
        errorMessage["Message"] = "The party must consist of eight (8) members!";
    }

    res.status(400).send(errorMessage);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});