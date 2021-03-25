
const mongoose = require('mongoose');


var x = 0;
const userShema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    avatar: String,
    phone: String,
    test: {
        type: Number,
        //set: tryGetter
        //min:0
        validate: {
            validator: (v) => { 
                return  v > x;
            },
            message: 'Test must be bigger than 0',
        }

    }
});  

// function tryGetter(name) {

//     return name + "thanh cong";
// };


// userShema.add({test: {
//     type: Number,
//     //set: tryGetter
//     min: 2
// }});

function setX(newX) {
    x = newX;
};
const User = mongoose.model('User', userShema, 'users');

module.exports = {
    User,
    setX,
};  