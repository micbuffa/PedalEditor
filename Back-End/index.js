const express = require('express');
let fs = require('fs');
var bodyParser = require('body-parser')
var cors = require('cors'); 

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.send('Hello world!');
});

app.get('/pedals', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.json(JSON.parse(fs.readFileSync('./saves.json','utf8')));
});

app.post('/pedals', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let id;
    let pedals = JSON.parse(fs.readFileSync('./saves.json','utf8'));
    let i = 0;
    
    for(; i < pedals.length; i++) {
        if(pedals[i].id === req.body.id) {
            pedals[i] = req.body;
            id = pedals[i].id;
            break;
        }
    }

    if(i == pedals.length) {
        id = Date.now();
        req.body.id = id;
        pedals.push(req.body);
    }
    
    console.log(pedals);

    fs.writeFile('./saves.json', JSON.stringify(pedals), err => {
        if(err) {
            res.error('An error occured saving the pedal.');
        } else {
            res.json({message: 'Pedal savec successfully!', id: id});
        }
    });

});

app.post('/generate', function(req, res) {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    fs.writeFile('./functionalPedal.html', req.body.generated, err => {
        if(err) {
            res.error('An error occured saving the funcitonal pedal.');
        } else {
            res.json({message: 'Functional pedal generated successfully!'});
        }
    });

});

app.listen(3000, function() {
    console.log('Listening on port 3000!');
});