var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        db.run(`CREATE TABLE if not exists user (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, 
            email TEXT UNIQUE, 
            password TEXT
            )`,
        (err) => {
            if (err) {
                console.log("Create user table error:")
                console.error(err.message)
            }else{
                console.log("Table user successfully created")
            }
        });  
    }
});

db.run(    
    `CREATE TABLE if not exists art_piece (
        id_art INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT, 
        author TEXT,
        description TEXT, 
        url_link TEXT
        )`,
                (err) => {
                    if(err){
                        console.log(
                            "Create art_piece table error: "
                        )
                        console.error(err.message)
                    } else {
                        console.log("Table art_piece successfully created")
                    }
                });

db.run(
    `CREATE TABLE if not exists bet (
        id_bet INTEGER PRIMARY KEY AUTOINCREMENT,
        id_art INTEGER,
        user_id INTEGER,
        price INTEGER,
        FOREIGN KEY(user_id) REFERENCES user(user_id),
        FOREIGN KEY(id_art) REFERENCES art_piece(id_art)
        )`,
        (err) => {
            if(err){
                console.log(
                    "Create bet table error: "
                )
                console.error(err.message)
            } else {
                console.log("Table bet successfully created")
            }
        });


module.exports = db
