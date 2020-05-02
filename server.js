const express = require("express");
const server = express();
const body_parser = require("body-parser");
//const roter = express.Router();

//const http = require('http');

// parse JSON (application/json content-type)
server.use(body_parser.json());

const port = 4000;
//const httpport=8080;
// << db setup >>
const db = require("./db");
const dbName = "Amruta";
const collectionName = "Book";

//  db init
db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
    // get all items
    dbCollection.find().toArray(function(err, result) {
        if (err) throw err;
          console.log(result);
    });



    server.post("/mlist", (request, response) => {
    const bookname = request.body;
    dbCollection.insertOne(bookname, (error, result) => { // callback of insertOne
        if (error) throw error;
        // return updated list
        dbCollection.find().toArray((_error, _result) => { // callback of find
            if (_error) throw _error;
            response.json(_result);
          //  res.redirect('/mlist');
        });
    });
});


    // db CRUD routes
  server.get("/mlist/:id", (request, response) => {
    const bookname = request.params.id;

    dbCollection.findOne({ id: bookname }, (error, result) => {
        if (error) throw error;
        // return item
        response.json(result);
        //res.render('db.js', {list: result})
    });
});

}, function(err) { // failureCallback
    throw (err);
});



//server.listen(3000, function() {
  //console.log("server start at port 4000"); // The server object listens on port 3000


server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
