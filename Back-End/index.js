const express = require('express');
let fs = require('fs');
var bodyParser = require('body-parser')
var cors = require('cors'); 

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/', function(req, res) {
    res.send('Hello world!');
});

app.get('/pedals', function(req, res) {
    res.json(JSON.parse(fs.readFileSync('./saves.json','utf8')));
});

app.get('/previews/knobs', function(req, res) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    fs.readdir('../Front-End/img/knobs2', (err, files) => {
        let filesUrl = 'http://localhost:8887/img/knobs2/';
        
        response = {
            filesUrl,
            files
        };

        res.json(response);
    });
});

app.get('/previews/sliders', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    fs.readdir('../Front-End/img/sliders', (err, files) => {
        let filesUrl = 'https://localhost:8887/img/sliders/';

        response = {
            filesUrl,
            files
        };

        res.json(response);
    });
});

app.get('/previews/icons', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    fs.readdir('../Front-End/img/icons', (err, files) => {
        let filesUrl = 'http://localhost:8887/img/icons/';

        response = {
            filesUrl,
            files
        };

        res.json(response);
    })
})


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
    
    fs.writeFile('./main.html', req.body.generated, err => {
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