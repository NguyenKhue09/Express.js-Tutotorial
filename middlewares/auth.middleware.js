const db = require('../db')
module.exports.requireAuth = (req,res,next) => {
   // console.log(req.signedCookies.userId);
   // express signedCookies -> tăng sự bảo mật
    if(!req.signedCookies.userId) {
        res.redirect('auth/login');
        return;
    }

    const user = db.get('users').find({ id: req.signedCookies.userId }).value();

    if(!user) {
        res.redirect('auth/login');
        return;
    }
    // nó dc truyền qua tất cả các route vì nó protect tất cả route user
    res.locals.user = user;
    next();
};  