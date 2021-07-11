
const mongoose = require('mongoose');


const productShema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Product = mongoose.model('Product',productShema, 'products');

module.exports = Product;