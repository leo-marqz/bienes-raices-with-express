import User from './User.js';
import Property from './Property.js';
import Category from './Category.js';
import Price from './Price.js';

//Associations between models (tables)
Property.belongsTo(User, {foreignKey: 'user_id'});
Property.belongsTo(Category, {foreignKey: 'category_id'});
Property.belongsTo(Price, {foreignKey: 'price_id'});


export {
    User,
    Property,
    Category,
    Price
}