import fs = require('fs');
import { Hero } from './Hero';
import { HEROES } from './mock-heroes';
import { Database } from './mock_database/Database';

export class AppController {

    private database: Database;
    private connectionString: string;

    constructor(database: Database, connectionString: string) {
        this.database = database;
        this.connectionString = connectionString;
    }

    getHeroes(): Hero[] {
        HEROES.forEach(hero => hero.status = "active");
    
        let list = HEROES.slice();
        let sortedList = [];
        let i;
    
        for (i = 0; i < 8; i++) {
            let rand = Math.floor(Math.random()*list.length);
            sortedList.push(list[rand]);
            list.splice(rand, 1);
        }
    
        this.hide(sortedList);
        
        return sortedList;
    }
    
    submitHeroes(body: Hero[]) {
        let result = {
            status: 200,
            message: ''
        };

        if (body.length === 8) {
            let bannedHeroes = body.filter(element => element.status == "banned").length;
            let hiddenHeroes = body.filter(element => element.status == "hidden").length;
        
            console.log("banned heroes: " + bannedHeroes);
            console.log("hidden heroes: " + hiddenHeroes);
            if (bannedHeroes === 2 && hiddenHeroes === 2) {
                let fileLength = this.saveSubmits(body);
                if (fileLength > 0) {
                    result.status = 200;
                    result.message = fileLength.toString();
                }
                else {
                    result.status = 400;
                    result.message = "Data could not be saved!";
                }
            } else {
                result.status = 400;
                result.message = "You must ban two (2) heroes!";
            }
        } else {
            result.status = 400;
            result.message = "The party must consist of eight (8) members!";
        }

        return result;
    }
    
    private hide(list: Hero[]): void {
        //pick 2 numbers
        let index = this.getRandomIndex(list.length);
        //hide indexes
        list[index[0]].status = "hidden";
        list[index[1]].status = "hidden";
    }
    
    private getRandomIndex(length: number): number[] {
        let num1 = Math.floor(Math.random()*length);
        let num2;
        do {
            num2 = Math.floor(Math.random()*length);
        } while (num2 == num1);
    
        return [num1, num2];
    }
    
    // This will handle the heroes array and save it into a json file.
    // In the case the submits.json file doesn't exist it will throw and exception
    // TODO: make the method generic to use with any file/object
    private saveSubmits(data: Hero[]): number {
        this.database.submits.push(data);
        console.log(this.database.submits);
        fs.writeFileSync(this.connectionString, JSON.stringify(this.database));

        return this.database.heroes.length;
    }
}
