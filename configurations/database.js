import { Sequelize } from "sequelize";
import dotenv from "dotenv";

//leomarqz
dotenv.config({ 
    path: '.env'
});

// db name, db user, db password and other options
const database = new Sequelize(
    process.env.MYSQL_DB_NAME, 
    process.env.MYSQL_USER, 
    process.env.MYSQL_PASSWORD, 
    {
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || 3306,
        dialect: 'mysql',
        define: {
            timestamps: true // this adds createdAt and updatedAt columns to the tables
        },
        pool: {
            max: 5, // maximum number of connections
            min: 0, // minimum number of connections
            acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
            idle: 10000 // maximum time, in milliseconds, that a connection can be idle before being released
        },
        // operatorsAliases: false // this is to avoid deprecation warning
});

export default database;