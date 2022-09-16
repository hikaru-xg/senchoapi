var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql2')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var samples = require('./routes/samples');
var hike = require('./routes/hike');

var app = express();
app.get('/hikes', hike.index);
app.get('/add_hike', hike.add_hike);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/samples', samples);   

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const connection = mysql.createConnection({
  host:'localhost',
  user:'testUser001',
  password:'testtesttest',
  database:'react_test'
})

app.use(bodyParser.json());

app.get("/list", (req, res) => {
    connection.query(
        'SELECT * FROM `record`',
        function(err, result, fields){
            if(err){
                console.log('Unnable to connect mysql')
                throw err;
            }
            res.json(result);
        }
    );
    console.log('Mysql Connection succeeded!')
})


app.get('/selectRecord/:senario_name', (req, res) => {
    const senario_name = req.params.senario_name;
    const selectSql = "SELECT * FROM record_all WHERE senario_name = ?"
    connection.query(selectSql,[senario_name],(err, result) => {
        if (err) throw err;
        res.json(result);
    })
});

app.post('/insertRecord', (req, res) => {
    console.log(req.body.insert);
    const {user_name, changed_state, record_time, senario_id, senario_name} = req.body.insert;
    connection.query("INSERT INTO record_all VALUES(NULL, ?, ?, ?, ?, ?)",
    [user_name, changed_state, record_time, senario_id, senario_name], (err, result) => {
        if (err) throw err;
        res.json(result);
    })
});

app.post('/insertSenario', (req, res) => {
    console.log(req.body.insert);
    const {senario_master_id, senario_name, test_date} = req.body.insert;

    connection.query("INSERT INTO senario VALUES(NULL, ?, ?, ?, NULL, NULL)",
    [senario_name, senario_master_id, test_date], (err, result) => {
        if (err) throw err;
        res.json(result);
    })
});

app.post('/selectSenario', (req, res) => {
    const test_date = req.body.select.test_date;
    console.log(test_date);
    connection.query("SELECT senario_name, senario_master_id FROM senario WHERE test_date = ?",
    [test_date], (err, result) => {
        if (err) throw err;
        res.json(result);
    })
});

app.listen(port, () => {
    console.log(`listening on *:${port}`);
})

module.exports = app;
