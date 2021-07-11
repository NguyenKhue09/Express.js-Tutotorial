const { set } = require('../db');
const db = require('../db');
//const shortid = require('shortid');

// lấy model
var {User, setX} = require('../models/user.model');

// setX(2);

async function getAllUser() {

    const allUser = await User.find({});

    return allUser;
}

module.exports.index = async (req,res) => {
    // res.render('users/index', {
    //     users: db.get('users').value()   
    // });  

    // lấy từ db mongo local
    // product tương tự

    //const users = await User.find();
    const users = await getAllUser();
    
    //await del();
    //console.log(await update());
    res.render('users/index', {
        users: users 
    });

};

async function del() {

    const id = '605766753de9d71b144d0cde'
    const deletedUser =  await User.findOneAndDelete(
        {_id: id},
        (err,docs) => {

            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted User : ", docs);
            }
        }
    );

    return deletedUser;
}
(async () => {

    const id = '605766753de9d71b144d0cde'
    const updateUser =  await User.findOneAndUpdate(
        {_id: id},
        {name: 'newUpdatetest+++'},
        {new: true} 
    );

    console.log( updateUser );
})();

module.exports.search = async (req,res) => {
    // https://viblo.asia/p/nodejs-bai-4-query-parameters-bWrZn63QZxw
    var q= req.query.q;
    // var matchedUsers = db.get('users').value().filter(user =>{
    //     return  user.name.indexOf(q) !== -1;
    // });
    // const id = '605766753de9d71b144d0cde'
    // const deletedUser =  await User.findOneAndUpdate(
    //     {_id: id},
    //     {name: 'newUpdate'},
    //     {new: true} 
    // );

    const matchedUsers = await User.find({ name: { $regex: new RegExp(".*" + q + ".*", "i")}}); 



    res.render('users/index',{
        users: matchedUsers
    });

    //console.log(req.query);

};

module.exports.create = (req,res) => {
    //console.log(req.cookies); // in ra undefined de doc dc thi phai dung middleware cookie-parser

    res.render('users/create');
};

module.exports.get = async (req,res) => {
    // https://expressjs.com/en/guide/routing.html
    // setX(2);
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
    //setX(1);
    req.body.avatar = req.file.path.split('\\').slice(1).join('/');

    //db.get('users').push(req.body).write();

    // thêm mới 1 user
    const newUser = new User(req.body);
         newUser.save((err) => {
        if(err) console.log(err);
    });

        
//     let numberofUser = 0;
//     User.count({},(err,count) => {

//         if(err) return handleError(err);
//         numberofUser = count;
//         console.log("số lượng user : " + count);
//     });
//    // console.log("số lượng user : " + numberofUser);
    res.redirect('/users');

};








































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

    //check();

    // async function test() {

    //     const x = await User.estimatedDocumentCount({}).distinct('name');

    //     return x;
    // }
    ( async  () =>  {
        const value = await User.estimatedDocumentCount({}).distinct('name');
        console.log(value.length);
    })()
    //get();
    // distinct('name',(err,value) => {
        
    //     console.log("test : " + value.length);
    // });
    // .count((err,count) => {

    //     console.log('Number of exec name : '+ count);
    // });
    // async function takeList() {

    //     const list = await User.find({}).select('name phone');
    //     console.log(list);
    // }
    //takeList();

    // async function takeOne() {

    //     const list = await User.find({});
    //     console.log(list[0]);
    // }

    //takeOne();


    // async function updateOne() {
        
    //     const id = "60601a435f673609b8f5b933";
    //     const update = await User.findOneAndUpdate({_id: id }, { $inc: {'test': 1}}, (err) => {

    //         if(!err) console.log("thanh cong!");

    //         console.log("that bai!");
    //     })
    // }

    // updateOne();