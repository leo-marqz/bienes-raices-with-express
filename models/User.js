
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

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
},{
    hooks: {
        beforeCreate: async function(user){
            const salt = await bcrypt.genSalt(10); // Generate salt
            user.password = await bcrypt.hash(user.password, salt); // Hash password
        }
    },
    scopes: { // Query scopes
        excludeSensitiveUserInformation: {  // Scope name
            attributes: { exclude: ['password', 'token', 'confirmed', 'createdAt', 'updatedAt'] }
        }
    }
});

export default User;