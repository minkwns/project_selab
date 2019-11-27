var express = require('express');
var app = express();
var path = require('path');
var XLSX = require('xlsx');
var server = require('http').createServer(app);
var mysql = require('mysql');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
<<<<<<< HEAD

app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

//localhost:3000
app.listen(3000, function (){
    console.log('Example app listening on port 3000!');
});
=======
var multer = require('multer');
var upload = multer({ dest: 'public/uploads' })
var mime = require('mime');
var util = require('util');
//session
app.use(session({
    secret: 'sid',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    },
}));

<<<<<<< HEAD
//connect Database
=======
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery

//localhost:3000
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

var mysql = require('mysql');

>>>>>>> 4a15bb01ba0da4f720dbe9ece71d44e546debd18
var connection = mysql.createConnection({
    multipleStatements: true,
    host: 'localhost',
    user: 'root',
    post: 3000,
    password: '',
    database: 'selab',
    multipleStatements: true
});

<<<<<<< HEAD
connection.connect(function (err){
    if(err){
=======
connection.connect(function (err) {
    if (err) {
>>>>>>> 4a15bb01ba0da4f720dbe9ece71d44e546debd18
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Success DB connection');
});

<<<<<<< HEAD
=======

>>>>>>> 4a15bb01ba0da4f720dbe9ece71d44e546debd18
//Excel file
fs.exists(__dirname + '/public/resources/score.xlsx', function (exists) {
    if (exists) {
        console.log("exists");
        var score_data = XLSX.readFile(__dirname + '/public/resources/score.xlsx');
        var sheet_name_list = score_data.SheetNames;
        var scores = XLSX.utils.sheet_to_json(score_data.Sheets[sheet_name_list[0]]);
<<<<<<< HEAD

        for (var i = 0; i < scores.length; i++) {
            var studentid = scores[i]["studentid"];
            var score = scores[i]["score"];
            var rank = scores[i]["rank"];
=======

        connection.query("DELETE FROM score");

        for (var i = 0; i < scores.length; i++) {
            var studentid = scores[i]["studentid"];
            var midterm = scores[i]["midterm"];
            var finalterm = scores[i]["finalterm"];
            var project = scores[i]["project"];
            var attendance = scores[i]["attendance"];

            connection.query("INSERT INTO score VALUES(?,?,?)", [studentid, score, rank]);
        }

            connection.query("INSERT INTO score VALUES(?,?,?,?,?)", [studentid, midterm, finalterm, project, attendance]);
        }
>>>>>>> 4a15bb01ba0da4f720dbe9ece71d44e546debd18
    }
    else {
        console.log("no exists");
    }
});

// get html(rendering)
<<<<<<< HEAD
app.get('/', function (req, res){
=======
app.get('/', function (req, res) {
>>>>>>> 4a15bb01ba0da4f720dbe9ece71d44e546debd18
    if (req.session.user) {
        res.render('index.ejs', {
            logined: req.session.user.logined,
            user_name: req.session.user.user_name
        });
    }
    else {
        res.render('index.ejs', {
            logined: false,
            user_name: " "
        });
    }
});

app.get('/login', function (req, res) {
    res.render('login.ejs', { data: true });
});

app.get('/register', function (req, res) {
    res.render('register.ejs', { alert: false });
});

<<<<<<< HEAD
app.get('/members', function(req, res){
=======
app.get('/members', function (req, res) {
>>>>>>> 4a15bb01ba0da4f720dbe9ece71d44e546debd18
    if (req.session.user) {
        res.render('members.ejs', {
            logined: req.session.user.logined,
            user_name: req.session.user.user_name
        });
    }
    else {
        res.render('members.ejs', {
            logined: false,
            user_name: " "
        });
    }
});

<<<<<<< HEAD
app.get('/research', function(req, res){
=======
app.get('/research', function (req, res) {
>>>>>>> 4a15bb01ba0da4f720dbe9ece71d44e546debd18
    if (req.session.user) {
        res.render('research.ejs', {
            logined: req.session.user.logined,
            user_name: req.session.user.user_name
        });
    }
    else {
        res.render('research.ejs', {
            logined: false,
            user_name: " "
        });
    }
});

app.get('/notice', function (req, res) {
    var sql = 'SELECT * FROM notice';
    connection.query(sql, function (error, results, fields) {
        if (req.session.user) {
            res.render('notice.ejs', {
                logined: req.session.user.logined,
                user_name: req.session.user.user_name,
                results
            });
        }
        else {
            res.render('notice.ejs', {
                logined: false,
                user_name: " ",
                results
            });
        }
    });
});

app.get('/notice_insert', function (req, res) {
    if (req.session.user) {
        res.render('notice_insert.ejs', {
            logined: req.session.user.logined,
            user_name: req.session.user.user_name
        });
    }
    else {
        res.redirect('/login');
    }
});

app.get('/notice/:notice_id', function (req, res) {
    var notice_id = req.url.split("/")[2];
    var sql1 = 'SELECT * FROM notice WHERE notice_id = ?; ';
    var sql2 = 'SELECT * FROM comment WHERE notice_id = ?; ';

    connection.query('UPDATE notice SET view = view + 1 WHERE notice_id = ?', [notice_id]);
    connection.query(sql1 + sql2, [notice_id, notice_id], function (error, results, fields) {
        results1 = results[0];
        results2 = results[1];
        if (req.session.user) {
            res.render('notice_id.ejs', {
                logined: req.session.user.logined,
                user_name: req.session.user.user_name,
                results1,
                results2,
                notice_id
            });
        }
        else {
            res.render('notice_id.ejs', {
                logined: false,
                user_name: " ",
                results1,
                results2,
                notice_id
            });
        }
    })
});

<<<<<<< HEAD
app.get('/score', function(req, res){
    if(req.session.user){
        res.render('score.ejs', {
            alert : false,
            rank : null,
            score : null
        });
    }
    else{
=======

app.get('/download/:file_name', function (req, res) {
    var file_name = req.params.file_name;
    var sql = 'SELECT * FROM notice WHERE file_name = ?';

    connection.query(sql, [file_name], function (error, results, fields) {
        var file = __dirname + "/public/uploads/" + results[0].file_name;
        mimetype = mime.lookup(results[0].file_originalname);
        res.setHeader('Content-disposition', 'attachment; filename=' + results[0].file_originalname);
        res.setHeader('Content-type', mimetype);
        var filestream = fs.createReadStream(file);
        filestream.pipe(res);


    })
});

app.get('/score', function (req, res) {
    if (req.session.user) {
        res.render('score.ejs', {
            alert: false,
            results: false,
            user_name: req.session.user.user_name
        });
    }
    else {
>>>>>>> 4a15bb01ba0da4f720dbe9ece71d44e546debd18
        res.redirect('/login');
    }
});

// post html
<<<<<<< HEAD
app.post('/notice_insert', function(req, res){
=======
app.post('/notice_insert', upload.single('profile'), function (req, res) {
>>>>>>> 4a15bb01ba0da4f720dbe9ece71d44e546debd18
    var title = req.body.title;
    var content = req.body.content;
    var writer_name = req.session.user.user_name;
    var file_originalname = req.file.originalname;
    var file_name = req.file.filename;

    var sql = 'INSERT INTO notice(title, content, writer_name,file_originalname,file_name) VALUES (?,?,?,?,?)';
    connection.query(sql, [title, content, writer_name, file_originalname, file_name], function (error, results, fields) {
        res.redirect('/notice');
    });
});

app.post('/notice/:notice_id', function (req, res) {
    if (req.session.user) {
        var notice_id = req.url.split("/")[2];
        var comment = req.body.comment;
        var writer_name = req.session.user.user_name;
        var sql = `INSERT INTO comment(notice_id, comment, writer_name) VALUES (?,?,?) ;`
        connection.query(sql, [notice_id, comment, writer_name], function (error, results, fields) {
            res.redirect(`/notice/${notice_id}`);
        });
    }
    else {
        res.render('login.ejs');
    }
});

app.post('/', function (req, res) {
    var user_id = req.body.user_id;
    var user_password = req.body.user_password;

    var sql = 'SELECT * FROM user_info WHERE user_id = ?';
    connection.query(sql, [user_id], function (error, results, fields) {
        if (results.length == 0) {
            res.render('login.ejs', { alert: true });
        } else {
            var db_pwd = results[0].user_password;

            if (user_password == db_pwd) {
                //session
                req.session.user = {
                    logined: true,
                    user_name: results[0].user_name
                }

                res.render('index.ejs', {
                    logined: req.session.user.logined,
                    user_name: req.session.user.user_name
                });
            }
            else {
                res.render('login.ejs', { alert: true });
            }
        }
    });
})

app.post('/register', function (req, res) {
    var user_name = req.body.user_name;
    var studentid = req.body.studentid;
    var user_id = req.body.user_id;
    var user_password = req.body.user_password;
    var pwdconf = req.body.pwdconf;
<<<<<<< HEAD
    
    if(user_password !== pwdconf){
=======

    if (user_password !== pwdconf) {
>>>>>>> 4a15bb01ba0da4f720dbe9ece71d44e546debd18
        res.redirect('/register');
    }
    else {
        var sql = 'SELECT * FROM user_info WHERE user_name = ?';
        connection.query(sql, [user_name], function (error, results, fields) {
            if (results.length == 0) {
                connection.query("INSERT INTO user_info VALUES(?,?,?,?)", [user_name, studentid, user_id, user_password], function () {
                    res.redirect('/login');
                });
            }
            else {
                res.render("register.ejs", { alert: true });
            }
<<<<<<< HEAD
        }); 
    }
});

app.post('/score', function(req, res){
    var studentid = req.body.studentid;
    var sql = 'SELECT * FROM score WHERE studentid = ?';
    connection.query(sql, [studentid], function(error, results, fields){
            if(results.length > 0){
                console.log(results);
                score = results[0].score;
                rank = results[0].rank;
                res.render('score.ejs', {
                    alert : true,
                    score,
                    rank
                });
            }
            else{
                res.render('score.ejs', {
                    alert : false,
                    score,
                    rank
                });
            }
        
=======
        });
    }
});

app.post('/score', function (req, res) {
    var studentid = req.body.studentid;
    var user_name = req.session.user.user_name;
    connection.query('SELECT studentid FROM user_info WHERE user_name=?', [user_name], function (error, results, fields) {
        if (results[0].studentid != studentid) {
            res.render('score.ejs',
                {
                    alert: true,
                    results: false,
                    user_name: req.session.user.user_name
                })
        }
        else {
            var sql = 'SELECT * FROM score WHERE studentid = ?; SELECT midterm FROM score; SELECT finalterm FROM score; SELECT project FROM score; SELECT attendance FROM score';
            connection.query(sql, [studentid], function (error, results, fields) {
                if (results[0].length > 0) {

                    res.render('score.ejs', {
                        alert: false,
                        results: results[0],
                        midterm: results[1],
                        finalterm: results[2],
                        project: results[3],
                        attendance: results[4],

                        length: results[1].length,
                        user_name: req.session.user.user_name

                    });
                }
                else {
                    res.render('score.ejs', {
                        alert: true,
                        results: false,
                        user_name: req.session.user.user_name
                    });
                }
            });
        }
        else {
            res.render('score.ejs', {
                alert: true,
                results: false,
                user_name: req.session.user.user_name
            });
        }
>>>>>>> 4a15bb01ba0da4f720dbe9ece71d44e546debd18
    });
});