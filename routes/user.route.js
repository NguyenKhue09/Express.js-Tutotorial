const express = require('express');
const router = express.Router();
const validate  = require('../validate/user.validate');
const controller = require('../controllers/user.controller');
const multer = require('multer');

const upload = multer({ dest: './public/uploads' });

 
//  function middleware1(req,res,next){
//     console.log("middleware1");
//     next();
// };
//  function middleware2(req,res,next){
//     console.log('middleware2');
//     res.send('Hello');
// };

 //router.get('/test',middleware1,middleware2);

 router.get('/' ,controller.index);

 // express cookie
 router.get('/cookie', function(req,res,next) {
    res.cookie('user-id',12345);
    res.send('Hello');
 });


 router.get('/search', controller.search);

 router.get('/create',controller.create);

 router.get('/:id',controller.get);
 
 router.post('/create',
  upload.single('avatar'),
  validate.postCreate,
  controller.postCreate
);

 module.exports = router;