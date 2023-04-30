const express = require("express")
const fs = require("fs")
const bodyParser = require("body-parser")
const REC_FILENAME = "receiver.csv"
const TRANS_FILENAME = "transmitter.csv"


const app = express()
var options = {
    inflate: true,
    limit: '100kb',
};

app.use (function(req, res, next) {
    var data='';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
       data += chunk;
    });

    req.on('end', function() {
        req.body = data;
        next();
    });
});
app.post("/rec", (req, res) => {
    console.log(req.body)
    console.log(req.query)
    fs.writeFileSync(REC_FILENAME, `${req.query["lat"]},${req.query["longitude"]},${req.query["time"]},${req.body}\n`)
})

app.listen(8000, () => { console.log("listening to 8080") })