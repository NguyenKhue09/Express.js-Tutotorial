const { response } = require('express');
const express = require('express');
const bodyParser = require('body-parser'); 
const userRoute = require('./routes/user.route');


const app = express();
const port = 3000;

app.use(bodyParser.json());// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.set('view engine', 'pug');
app.set('views', './views');

app.get('/',(req,res) => {
    res.render('index', {
        name: 'Khue'
    });
 });
// gom tất cả các route của user vào trong 1 file 
app.use('/users',userRoute) ;
app.use(express.static('public'))
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
