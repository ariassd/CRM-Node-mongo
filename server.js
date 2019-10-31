const express = require('express');
const Config = require('config')
const app = express();
const PORT = Config.get("App.webserver.port");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect(Config.get("MongoDB.connectionString"));
mongoose.connection.once('open',() => console.log('Connected to DB!'))
const Company = require('./Company.js');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("static"))


app.post('/api/company', (req, res) => {
    //console.log("received request to create new company");
    //console.log(req.body);
    if (!req.body || !req.body.name) return res.status(400).send("You need to at least send a name");
    let companyInstace = new Company(req.body);
    companyInstace.save()
        .catch(err => {
            //console.log(err.toString());
            res.status(500).send("");
        }).then(dbres => {
            //console.log(dbres);
            res.json(dbres);
        });
});

/*
fetch("api/company", {
    method: "POST", 
    body: JSON.stringify({name:"Company 1", status:"new"}),
    headers: {"Content-Type": "application/json" }
})
*/

app.get('/api/company', (req, res) => {
    Company.find()
    .catch(err => {
        //console.log(err.toString());
        res.status(500).send(err.toString());
    })
    .then (dbres => {
        //console.log(dbres);
        res.json(dbres);
    }); 
});

app.delete('/api/company/:id', (req, res) => {
    let idToDelete = req.params.id;
    Company.findByIdAndRemove(idToDelete)
    .catch(err => {
        //console.log(err.toString());
        res.status(500).send(err.toString());
    })
    .then (dbres => {
        //console.log(dbres);
        if (dbres) res.json(dbres);
        else res.status(404).send("ID doesn't exist");
    }); 
});

app.put('/api/company/:id', (req, res) => {
    
    let idToUpdate = req.params.id

    if (!req.body || !req.body.name) return res.status(400).send("You need to at least send a name");
    
    Company.findByIdAndUpdate(idToUpdate, req.body)
    .catch(err => {
        //console.log(err.toString());
        res.status(500).send(err.toString());
    })
    .then (dbres => {
        //console.log(dbres);
        res.json(dbres);
    }); 
});

/*
app.get('/', function(req, res) {
    res.sendFile(`${__dirname}/static/index.html`)
});= 
*/
 
app.listen(PORT, () => {
    console.log(`Server ${process.env.NODE_ENV || "development"} listening on port ${ PORT}`);
});

