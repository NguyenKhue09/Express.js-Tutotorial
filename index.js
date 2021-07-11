require('dotenv').config();

const { response } = require('express');
const express = require('express');
const bodyParser = require('body-parser'); 
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const cartRoute = require('./routes/cart.route');
const productRoute = require('./routes/product.route');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const authMiddleware = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');



const app = express();
const port = 3000;

app.use(bodyParser.json());// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET)); // chuỗi đầu vào ngẫu nhiên dành cho signed cookie

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/',(req,res) => {
    res.render('index', {
        name: 'Khue'
    });
 });

// gom tất cả các route của user vào trong 1 file.
// có middleware auth.. để ngăn khi chưa login thì phải chuyển tới trang login rồi ms sang được trang khác.
// chức năng phụ là truyền thêm user đăng nhập để hiện tên lên nav-bar.
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth',authRoute);
app.use('/products', productRoute);
app.use('/cart',cartRoute);
app.use(sessionMiddleware); // nếu để dưới dòng 42 thì ko hoạt động


app.use(express.static('public'));

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
