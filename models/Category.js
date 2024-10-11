
import { DataTypes } from "sequelize";
import database from "../configurations/database.js";

const Category = database.define('categories', {
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
});

export default Category;