const db = require('../db');
const shortid = require('shortid');


module.exports.index = (req,res) => {
    res.render('users/index', {
        users: db.get('users').value()   
    });  
};

module.exports.search = (req,res) => {
    // https://viblo.asia/p/nodejs-bai-4-query-parameters-bWrZn63QZxw
    var q= req.query.q;
    var matchedUsers = db.get('users').value().filter(user =>{
        return  user.name.indexOf(q) !== -1;
    });

    res.render('users/index',{
          users: matchedUsers
    });
    console.log(req.query);

};

module.exports.create = (req,res) => {
    console.log(req.cookies); // in ra undefined de doc dc thi phai dung middleware cookie-parser
    res.render('users/create');
};

module.exports.get = (req,res) => {
    // https://expressjs.com/en/guide/routing.html
    const id= req.params.id;
    const user = db.get('users').find({ id: id }).value();
    res.render('users/view',{
        user: user
    });
 }; 

module.exports.postCreate = (req,res) => {
    //https://viblo.asia/p/day-du-lieu-da-nhap-len-html-su-dung-body-parser-gAm5yG1VZdb
    req.body.id = shortid.generate();
    // truyền biến đi qua middleware nhờ local storage
    console.log(res.locals.success);
    // lưu đường dẫn tới ảnh vào trong db
    req.body.avatar = req.file.path.slice(7);

    db.get('users').push(req.body).write();
    res.redirect('/users');

}