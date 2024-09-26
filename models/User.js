
import { DataTypes } from "sequelize";
import database from "../configurations/database.js";

const User = database.define('users', {
    name: {
        type: DataTypes.STRING, // VARCHAR(255)
        allowNull: false // NOT NULL
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING
    },
    confirmed: {
        type: DataTypes.BOOLEAN, // TINYINT(1)
        defaultValue: false // DEFAULT 0
    }
});

export default User;