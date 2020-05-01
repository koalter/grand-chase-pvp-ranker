import { Application, Request, Response, NextFunction} from 'express';
import express = require('express');
import fs = require('fs');
import { Hero } from './Hero';
import { HEROES } from './mock-heroes';
// import { db } from '../mock_database/db';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req: Request, res: Response) {
  res.send("go to /heroes");
});

app.get('/heroes', getHeroes);

app.post('/heroes', submitHeroes);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// FUNCTIONS
function getHeroes(req: Request, res: Response) {
    HEROES.forEach(hero => hero.status = "active");

    let list = HEROES.slice();
    let sortedList = [];
    let i;

    for (i = 0; i < 8; i++) {
        let rand = Math.floor(Math.random()*list.length);
        sortedList.push(list[rand]);
        list.splice(rand, 1);
    }

    hide(sortedList);
    res.send(sortedList);
}

function submitHeroes(req: Request, res: Response) {
    let body: any[] = req.body;
    
    if (body.length === 8) {
        let bannedHeroes = body.filter(element => element.status == "banned").length;
        let hiddenHeroes = body.filter(element => element.status == "hidden").length;
    
        console.log("banned heroes: " + bannedHeroes);
        console.log("hidden heroes: " + hiddenHeroes);
        if (bannedHeroes === 2 && hiddenHeroes === 2) {
            if (save(body) > 0) 
                res.status(200).send(length.toString());
            else
                res.status(400).send("Data could not be saved!");
        } else {
            res.status(400).send("You must ban two (2) heroes!");
        }
    } else {
        res.status(400).send("The party must consist of eight (8) members!");
    }
}

function hide(list: Hero[]) {
    //pick 2 numbers
    let index = getRandomIndex(list.length);
    //hide indexes
    list[index[0]].status = "hidden";
    list[index[1]].status = "hidden";
}

function getRandomIndex(length: number) {
    let num1 = Math.floor(Math.random()*length);
    let num2;
    do {
        num2 = Math.floor(Math.random()*length);
    } while (num2 == num1);

    return [num1, num2];
}

// This will handle the heroes array and save it into a json file.
// In the case the submits.json file doesn't exist it will throw and exception
// TODO: make the function generic to use with any file/object
function save(heroes: any[]) {
    let file = 'submits.json';

    //read file
    let data = fs.readFileSync(file, 'utf8');
    let heroesList = data.length > 0 ? JSON.parse(data) : [];
    console.log(heroesList);
    heroesList.push(heroes);

    //write file
    fs.writeFileSync(file, JSON.stringify(heroesList));

    return heroesList.length;
}