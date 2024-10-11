
import { DataTypes } from "sequelize";
import database from "../configurations/database.js";

const Price = database.define('prices', {
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
});

export default Price;