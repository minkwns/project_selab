var express = require('express');
var app = express();
var path = require('path');
var XLSX = require('xlsx');
var server = require('http').createServer(app);
var mysql = require('mysql');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var multer = require('multer');
var upload = multer({
    dest: 'public/uploads'
})
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
    }
})
var upload = multer({ storage: storage })
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

app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery

//localhost:3000
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

var mysql = require('mysql');

var connection = mysql.createConnection({
    multipleStatements: true,
    host: 'localhost',
    user: 'root',
    post: 3000,
    password: '',
    database: 'selab',
    multipleStatements: true
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Success DB connection');
});


//Excel file


// get html(rendering)
app.get('/', function (req, res) {

    if (req.session.user) {
        res.render('index.ejs', {
            logined: req.session.user.logined,
            user_name: req.session.user.user_name,
            user_email: req.session.user.user_email
        });
    } else {
        res.render('index.ejs', {
            logined: false,
            user_name: " ",
            user_email:" "
            
        });
    }
});

app.get('/login', function (req, res) {
    res.render('login.ejs', {
        data: true
    });
});

app.get('/register', function (req, res) {
    res.render('register.ejs', {
        alert: false
    });
});

app.get('/members', function (req, res) {
    if (req.session.user) {
        res.render('members.ejs', {
            logined: req.session.user.logined,
            user_name: req.session.user.user_name
        });
    } else {
        res.render('members.ejs', {
            logined: false,
            user_name: " "
        });
    }
});

app.get('/research', function (req, res) {
    if (req.session.user) {
        res.render('research.ejs', {
            logined: req.session.user.logined,
            user_name: req.session.user.user_name
        });
    } else {
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
        } else {
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
    } else {
        res.redirect('/login');
    }
});

app.get('/notice/:notice_id', function (req, res) {
    var notice_id = req.url.split("/")[2];
    var sql1 = 'SELECT * FROM notice WHERE notice_id = ?; ';
    var sql2 = 'SELECT * FROM comment WHERE notice_id = ? order by seq, comment_id '

    connection.query('UPDATE notice SET view = view + 1 WHERE notice_id = ?', [notice_id]);
    connection.query(sql1 + sql2, [notice_id, notice_id], function (error, results, fields) {
        results1 = results[0];
        results2 = results[1];
        var length = results[1].length;
        if (req.session.user) {
            res.render('notice_id.ejs', {
                logined: req.session.user.logined,
                user_name: req.session.user.user_name,
                results1,
                results2,
                notice_id,
                length: length
            });
        } else {
            res.render('notice_id.ejs', {
                logined: false,
                user_name: " ",
                results1,
                results2,
                notice_id,
                length: length
            });
        }
    })
});

app.get('/publications',function(req, res){
    if (req.session.user) {
        res.render('publications.ejs', {
            logined: req.session.user.logined,
            user_name: req.session.user.user_name
        });
    } else {
        res.render('publications.ejs', {
            logined: false,
            user_name: " "
        });
    }
})

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
    } else {
        res.redirect('/login');
    }
});

app.get('/courses', function (req, res) {
    if (req.session.user) {
        res.render('courses.ejs', {
            logined: req.session.user.logined,
            user_name: req.session.user.user_name,
            studentid: req.session.user.studentid
        });
    } else {
        res.render('courses.ejs', {
            logined: false,
            user_name: " ",
            studentid: " "
        });
    }
})

// post html
app.post('/notice_insert', upload.single('profile'), function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var writer_name = req.session.user.user_name;
    var file = req.file;
    var file_name = null;
    var file_originalname = null;
    if (file != null) {
        file_name = file.filename;
        file_originalname = file.originalname;
    }
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

        //대댓글이 달릴때
        if (comment == "") {
            var reply = req.body.reply;
            var index = 0;
            var reply_notnull = false;
            //대댓글이 처음 달릴때는 스트링으로 전달돼서 객체로 바꿔주는 과정.
            if (typeof (reply) == 'string' && reply != "") {
                var obj = JSON.parse(`{"0":"${reply}"}`);
                reply = obj;
                reply_notnull = true;
            }
            for (let i = 0; i < reply.length; i++) {
                if (reply[i] != '') {
                    index = i;
                    reply_notnull = true;
                }
            }
            if (reply_notnull) {
                var sql_seq = 'select * from comment WHERE group_no = ?';
                var seq = 0;
                connection.query(sql_seq, [index], function (error, results, fields) {
                    seq = index + 1;
                    var sql = 'INSERT INTO comment(notice_id,group_no, comment, writer_name, seq) VALUES(?,?,?,?,?);'
                    connection.query(sql, [notice_id, index, reply[index], req.session.user.user_name, seq], function (error, results, fields) {
                        res.redirect(`/notice/${notice_id}`);
                    })
                })
            }
            //대댓글 댓글 아무것도 달리지 않았을때
            else {
                res.redirect(`/notice/${notice_id}`);
            }
        }

        //일반 댓글이 달릴때
        else {
            var sql_seq = 'select * from comment where isnull(group_no) AND notice_id = ?;'
            connection.query(sql_seq, [notice_id], function (error, results, fields) {
                (results.length == 0 ? seq = 0 : seq = results[results.length - 1].seq);
                var sql = `INSERT INTO comment(notice_id, comment, writer_name,seq) VALUES (?,?,?,?) ;`
                connection.query(sql, [notice_id, comment, writer_name, seq + 1], function (error, results, fields) {
                    res.redirect(`/notice/${notice_id}`);
                });
            })
        }
    } else {
        res.render('login.ejs');
    }
});

app.post('/', function (req, res) {
    var user_id = req.body.user_id;
    var user_password = req.body.user_password;

    var sql = 'SELECT * FROM user_info WHERE user_id = ?';
    connection.query(sql, [user_id], function (error, results, fields) {
        if (results.length == 0) {
            res.render('login.ejs', {
                alert: true
            });
        } else {
            var db_pwd = results[0].user_password;

            if (user_password == db_pwd) {
                //session
                req.session.user = {
                    logined: true,
                    user_name: results[0].user_name,
                    user_email: results[0].user_id,
                    studentid: results[0].studentid
                }
                res.render('index.ejs', {
                    logined: req.session.user.logined,
                    user_name: req.session.user.user_name,
                    user_email: req.session.user.user_email,
                    studentid: req.session.user.studentid
                });
            } else {
                res.render('login.ejs', {
                    alert: true
                });
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

    if (user_password !== pwdconf) {
        res.redirect('/register');
    } else {
        var sql = 'SELECT * FROM user_info WHERE user_name = ?';
        connection.query(sql, [user_name], function (error, results, fields) {
            if (results.length == 0) {
                connection.query("INSERT INTO user_info VALUES(?,?,?,?)", [user_name, studentid, user_id, user_password], function () {
                    res.redirect('/login');
                });
            } else {
                res.render("register.ejs", {
                    alert: true
                });
            }
        });
    }
});

app.post('/score', function (req, res) {
    var studentid = req.body.studentid;
    var user_name = req.session.user.user_name;
    var course = req.body.course;
    var score = 'score'.concat("_", course)
    connection.query('SELECT studentid FROM user_info WHERE user_name=?', [user_name], function (error, results, fields) {
        if (results[0].studentid != studentid) {
            res.render('score.ejs', {
                alert: 1,
                results: false,
                user_name: req.session.user.user_name
            })
        } else {
            var sql = 'SELECT * FROM '.concat(score ,' WHERE studentid = ?; SELECT midterm FROM '.concat(score,' ; SELECT finalterm FROM '.concat(score+' ; SELECT project FROM '.concat(score +' ; SELECT attendance FROM '.concat(score,"" )))));            connection.query(sql, [studentid], function (error, results, fields) {
                if (typeof results !== "undefined") {
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
                } else {
                    res.render('score.ejs', {
                        alert: 2,
                        results: false,
                        user_name: req.session.user.user_name
                    });
                }
            }else{
                res.render('score.ejs', {
                    alert: 3,
                    results: false,
                    user_name: req.session.user.user_name
                });
            }
            });
        }
    })
});

app.post('/courses', upload.single('profile'), function (req, res) {
    var courses = req.body.courses;
    var file = req.file;

    var file_name = null;
    if (file != null) {
        file_name = file.filename;

        var sql1 = 'select course from course_score';
        connection.query(sql1, function (error, results, fields) {
            for (let i = 0; i < results.length; i++) {
                if (results[i].course == courses) {
                    connection.query('delete from course_score where course = ?;', [courses]);
                }
            };
            var score = 'score'.concat("_", courses)
            connection.query('INSERT INTO course_score VALUES (?,?)', [courses, file_name]);
            var sqlcre = 'create table if not exists '.concat(score, '(studentid int(10) not null primary key,midterm int(10),finalterm int(10),project int(10),attendance int(10))')
            connection.query(sqlcre, [score], function (error, resultscre, fields) { });
            console.log("exists");
            var score_data = XLSX.readFile(__dirname + '/public/uploads/' + file_name);
            var sheet_name_list = score_data.SheetNames;
            var scores = XLSX.utils.sheet_to_json(score_data.Sheets[sheet_name_list[0]]);

            connection.query("delete from ".concat(score, ""));


            for (var i = 0; i < scores.length; i++) {
                var studentid = scores[i]["studentid"];
                var midterm = scores[i]["midterm"];
                var finalterm = scores[i]["finalterm"];
                var project = scores[i]["project"];
                var attendance = scores[i]["attendance"];

                connection.query("INSERT INTO ".concat(score, " VALUES(?,?,?,?,?)"), [studentid, midterm, finalterm, project, attendance]);
            }
        });
    }
    res.redirect('/courses');
});



app.get('/logout', function (req, res) {
    req.session.destroy();
    res.clearCookie();
    console.log('logout complete!');
    res.redirect('/');

});
