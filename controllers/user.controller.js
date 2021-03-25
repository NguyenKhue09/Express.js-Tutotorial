const { set } = require('../db');
const db = require('../db');
//const shortid = require('shortid');

// lấy model
var {User, setX} = require('../models/user.model');


module.exports.index = async (req,res) => {
    // res.render('users/index', {
    //     users: db.get('users').value()   
    // });  

    // lấy từ db mongo local
    // product tương tự

    const users = await User.find();
    res.render('users/index', {
        users: users 
    });

};

module.exports.search = async (req,res) => {
    // https://viblo.asia/p/nodejs-bai-4-query-parameters-bWrZn63QZxw
    var q= req.query.q;
    // var matchedUsers = db.get('users').value().filter(user =>{
    //     return  user.name.indexOf(q) !== -1;
    // });
    const id = '605766753de9d71b144d0cdb'
    const deletedUser =  User.findByIdAndDelete(id);
    User = deletedUser;
    //console.log(deletedUser);

    const matchedUsers = await User.find({ name: { $regex: new RegExp(".*" + q + ".*", "i")}});



    res.render('users/index',{
        users: matchedUsers
    });

    console.log(req.query);

};

module.exports.create = (req,res) => {
    console.log(req.cookies); // in ra undefined de doc dc thi phai dung middleware cookie-parser

    res.render('users/create');
};

module.exports.get = async (req,res) => {
    // https://expressjs.com/en/guide/routing.html
    const id= req.params.id;
    // const user = db.get('users').find({ id: id }).value();
    const user = await User.findById(id);
    res.render('users/view',{
        user: user
    });
 }; 

module.exports.postCreate = (req,res) => {
    //https://viblo.asia/p/day-du-lieu-da-nhap-len-html-su-dung-body-parser-gAm5yG1VZdb
    //req.body.id = shortid.generate();
    // truyền biến đi qua middleware nhờ local storage
    //console.log(res.locals.success);
    // lưu đường dẫn tới ảnh vào trong db
    setX(1);
    req.body.avatar = req.file.path.split('\\').slice(1).join('/');

    //db.get('users').push(req.body).write();

    // thêm mới 1 user
    const newUser = new User(req.body);
         newUser.save((err) => {
        if(err) console.log(err.errors['test'].message);
    });
//     let numberofUser = 0;
//     User.count({},(err,count) => {

//         if(err) return handleError(err);
//         numberofUser = count;
//         console.log("số lượng user : " + count);
//     });
//    // console.log("số lượng user : " + numberofUser);
    res.redirect('/users');

}

    // var numberofDocs;
    // User.count({}, setNumberofDocuments);
    // var setNumberofDocuments = (err,count) => {

    //     if(err) return handleError(err);
    //     numberofDocs = count;
    // };
    // function getNumberofDocs(){
    //     return numberofDocs;
    // };
    // var number = getNumberofDocs();
    // console.log("số lượng user : " +  number);
    
    async function counter() {
        const docCount = await User.estimatedDocumentCount({});
        return docCount;
    }
    async function check() {
        const a = await counter();
        console.log(a);
    }

    check();