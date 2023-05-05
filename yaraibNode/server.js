const express = require("express");
const app = express();
const bp = require("body-parser");
var mysql = require("mysql");
var cors = require("cors");

app.use(cors());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "webdblab2",
});

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


app.get("/data/:id/:myname/:age/:del/:ins/:oiname/:oiage", function (req, res) {
 
  var fnamee = req.params.myname;
  var fnameesq = mysql.escape(fnamee);

  var oiname = req.params.oiname;
  var uinameesq = mysql.escape(oiname);

  var oiage = req.params.oiage;
  var uiage = mysql.escape(oiage);

var ins = req.params.ins;
  


  var id = req.params.id;
  var del = req.params.del;
  
  var age = req.params.age;
  var ins = req.params.ins;

  if (uinameesq != 0 && uiage != 0 && del == 0 && ins==1)
    var sql0 = `insert into labtbl6 (fname,age)values(${uinameesq},${uiage})`;
  else var sql0 = "SELECT * FROM labtbl6";

  con.query(sql0, function (err, data, fields) {
    if (err) throw err;
  });
  
  
  // var flg = req.params.flg;
  // var bn='yaraib';

  // if (flg==1&&fnameesq!=0&&id!=0)
  //   var sql1 =
  //     `update labtbl6 set fname = ${bn} where id =${id}`;
  // else var sql1 = "SELECT * FROM labtbl6";
if(id!=0 && fnameesq!='' && age!='' && del==0)
var sql10=`update labtbl6 set fname=${fnameesq}, age=${age} where id=${id}`;
else
var sql10=`SELECT * FROM labtbl6`;

con.query(sql10, function (err, data, fields) {
  if (err) throw err;
});

if(id!=0 && del!=0 )
var sql1=`delete from labtbl6 where id=${id}`;
else
var sql1=`SELECT * FROM labtbl6`;



  con.query(sql1, function (err, data, fields) {
    if (err) throw err;
  });

  var sql=`SELECT * FROM labtbl6`;

  con.query("SELECT * FROM labtbl6", function (err, data, fields) {
    if (err) throw err;
    res.send({ userData: data });
  });
});


con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(2001);
