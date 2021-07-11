
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var x = 1;
const userShema = new mongoose.Schema({

    email: String,
    password: String,
    name: String,
    avatar: String,
    phone: String,
    test: {
        type: Number,
        //set: tryGetter, // 1 document 
        // min: x,
        // validate: {
        //     validator: (v) => { 
        //         return v > x  ;
        //     },
        //     message: 'Test must be bigger than ' + x,
        // }

    }
}); 
const User = mongoose.model('User', userShema, 'users');

module.exports = {
    User,
    //setX,   
};  


// middleware 
// userShema.pre('save',(next) => {

//     this.test = this.test + 1;

//     next();
// })

// function tryGetter(v) {
 
//     // 1,2 lm tròn 1,5 
//     // 1.2 + 3;
//     return v + "thanh cong";
// };

// ghi đè cái field test
// thêm field vào trong model
// userShema.add({test: {
//     type: Number,
//     min: 2
// }});

// function setX(newX) {
//     x = newX;
// };
// const User = mongoose.model('User', userShema, 'users');

module.exports = {
    User,
    //setX,   
};  

//setX(2);