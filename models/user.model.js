
const mongoose = require('mongoose');



var x = 1;
const userShema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    avatar: String,
    phone: String,
    test: {
        type: Number,
        //set: tryGetter
        min: x,
        // validate: {

        //     validator: (v) => { 
        //         return  ;
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
userShema.pre('save',(next) => {

    this.test = this.test + 1;

    next();
})

// function tryGetter(name) {

//     return name + "thanh cong";
// };


// userShema.add({test: {
//     type: Number,
//     //set: tryGetter
//     min: 2
// }});

// function setX(newX) {
//     x = newX;
// };
// const User = mongoose.model('User', userShema, 'users');

// module.exports = {
//     User,
//     //setX,   
// };  