
import categories from "./seedCategory.js";
import prices from "./seedPrice.js";

import database from "../configurations/database.js";

import Category from "../models/Category.js";
import Price from "../models/Price.js";

const importDataAsync = async () => {
    try{

        //Authenticate connection
        await database.authenticate();

        //Generate columns
        await database.sync();

        //Insert data
        // await Category.bulkCreate(categories);
        // await Price.bulkCreate(prices);
        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(prices)
        ]);

        console.log('Data imported! ------------------------------------');
        process.exit();

    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

const destroyDataAsync = async () => {
    try{
        await database.authenticate();
        await database.sync();
        await Promise.all([
            Category.destroy({where: {}, truncate: true}),
            Price.destroy({where: {}, truncate: true})
        ]);

        console.log('Data destroyed! ------------------------------------');
        process.exit();

    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

const clearDatabaseAsync = async ()=>{
    try{
        await database.authenticate();
        await database.sync({force: true});
        console.log('Database cleared! ------------------------------------');
        process.exit();

    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

if(process.argv[2] === '-i'){
    importDataAsync(); //
}

if(process.argv[2] === '-d'){
    destroyDataAsync();
}

if(process.argv[2] === '-c'){
    clearDatabaseAsync();
}