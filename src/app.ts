import { Application, Request, Response, NextFunction} from 'express';
import express = require('express');
import { AppController } from './AppController';

const app: Application = express();
const db = require('./mock_database/db.json');
const appController: AppController = new AppController(db, 'src/mock_database/db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req: Request, res: Response) {
  res.send("go to /heroes");
});

app.get('/heroes', function (req: Request, res: Response) {
    let response = appController.getHeroes();
    res.send(response);
});

app.post('/heroes', function (req: Request, res: Response) {
    let response = appController.submitHeroes(req.body);
    res.sendStatus(response.status).send(response.message);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
  console.log(db);
});
