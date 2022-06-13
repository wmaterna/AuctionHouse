
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
var express = require("express")
const jwt = require('jsonwebtoken');
var app = express()
var md5 = require("md5")
var bodyParser = require("body-parser");
const db = require("./database.js");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotenv.config();





const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if(!token){
        res.send("No token, cannot authorize")
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err){
                res.json({auth: false, message: "No authentication"})
            } else {
                req.user_id = decoded.id;
                next();
            }
        })
    }
}



var HTTP_PORT = 8000 
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});


app.post("/api/user/register", (req, res, next) => {
    var errors=[]
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    const hashedPassword = bcrypt.hash(req.body.password, 10)
    var user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    }
    
    var sql ='INSERT INTO user (name, email, password) VALUES (?,?,?);'
    var params = [user.name, user.email, user.password]
    db.run(sql, params, function (err, result) {
       
        const id = this.lastID
        const accessToken = jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 3000})
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "auth": true,
            "message": "success",
            "data": result,
            "token": accessToken,
            "id" : this.lastID
        })
    });
});

app.post("/api/user/signin", (req, res, next) => {

    var errors=[]
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    var user = {
        email: req.body.email,
        password : req.body.password,
    }
    

    var sql ='select * from user WHERE email=?;'
    var params =[user.email]
    db.get(sql, params, (err, result) => {
        if(result){
        if (!bcrypt.compare(req.body.password, result.password)){
                    res.status(403).json({"error": "Wrong password", "auth": false})
                    return;
                }
        } else {
            res.status(400).json({"error": "No user found", "auth": false})
            return;
        }
        const id = result.user_id
        const accessToken = jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 3000})
        res.json({
            "auth": true,
            "message": "success",
            "token" : accessToken,
            "data": result,
            "id" : this.lastID
        })
    });
});

app.get("/api/arts/bulk_arts", verifyJWT, (req, res, next) => {
    var sql ='select * from art_piece;'
    var params = [];
    db.all(sql, params, function (err, result) {
        if (!result){
            res.status(400).json({"error": "No art pieces found", "auth": false})
            return;
        }
        res.json({
            "auth": true, 
            "message": "success",
            "data": result,
        })
    });
});




app.post("/api/arts/my-bets", verifyJWT, (req, res, next) => {
    var sql_bets ='SELECT DISTINCT art_piece.id_art, art_piece.title as TITLE, art_piece.author, art_piece.description, art_piece.url_link from art_piece INNER JOIN bet on bet.id_art = art_piece.id_art WHERE bet.user_id=?;'
    var params_bets = [req.body.user];
    var data = []
    db.all(sql_bets, [params_bets], function (err, arts) {
        if (!arts){
            res.status(400).json({"error": "No bets found"})
            return;
        }
        res.json({
            "message": "success", 
            "data": arts,
        })
        
    });
});



app.post("/api/arts/bet-price", verifyJWT, (req, res, next) => {
    var sql_bets ='SELECT MAX(price) as price from bet where id_art=? and user_id=?;'
    var params_bets = [req.body.art, req.body.user];
    db.all(sql_bets, [req.body.art, req.body.user], function (err, price) {
        if (!price){
            res.status(400).json({"error": "No bets found"})
            return;
        }
        res.json({
            "message": "success", 
            "data": price,
        })
        
    });
});

app.post("/api/arts/my-bet-best", verifyJWT, (req, res, next) => {
                    var sql ='SELECT MAX(price) as price, user_id FROM bet WHERE id_art=?;'
                        var params = [req.body.piece];
                        db.all(sql, [params], function (err, result) {
                            if (!result){
                                res.status(400).json({"error": "No bets found"})
                                return;
                            }
                            res.json({
                                "nmessage": "success", 
                                "data": result,
                            })
                        });
                    });


app.post("/api/make-bet", verifyJWT, (req, res, next) => {
        var data = {
            user: req.body.user,
            piece: req.body.piece,
            price: req.body.price,
        }
        var sqlInsert ='INSERT INTO bet(id_art, user_id, price) VALUES (?, ?, ?)';
        var insert_params = [data.piece, data.user, data.price];
        db.run(sqlInsert, insert_params, (err, row) => {
                                res.status(200).json({
                                    "message": "success",
                                    "data": row,
                                })
                                return
                            })
    });



app.use(function(req, res){
    res.status(404);
});