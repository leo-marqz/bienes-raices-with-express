
import { Property, Category, Price } from "../models/index.js";

async function getProperties(req, res) {
    const properties = await Property.findAll({
        include: [
            {
                model: Category,
                as: "category"
            },
            {
                model: Price,
                as: "price"
            }
        ]
    });

    res.json({ properties });
}

async function getCategories(req, res) {
    res.json({ message: "GET categories" });
}


export {
    getProperties,
    getCategories
}