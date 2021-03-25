//const db = require('../db');

const Product = require('../models/product.model');

module.exports.index = async (req,res) => {

    // const page = parseInt(req.query.page) || 1 ;
    // const perPage = 8;
    // const start = (page-1) * perPage;
    // const end = page * perPage;
    // res.render('products/index', {
    //     products : db.get('Products').value().slice(start,end)
    // });  

   var products = await Product.find();
    res.render('products/index', {
            products: products  
    });

};