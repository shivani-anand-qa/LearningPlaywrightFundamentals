import { test, expect } from '@playwright/test';
//const userData = require('./293_Users.json');
//or
import userData from "./293_Users.json";
//or using file system
//const fs = require("fs");

test('Read data from json file', async ({ page }) => {
    console.log(userData.username);
    console.log(userData.password);

    //File system code
    // const fileData = fs.readFileSync("293_Users.json", "utf-8");
    // const user = JSON.parse(fileData);

});


