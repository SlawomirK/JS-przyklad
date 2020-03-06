const express = require('express');
const port = 3000;

const app = express();


//a
app.get('/hello', (req, res) => {
    res.send('hello world');

});

//b
app.set('view engine', 'hbs');
app.get('/form', (req, res) => {
    res.render('index');

});

//c
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/formdata', function (req, res) {
    var imie = req.body.d1;
    var nazwisko = req.body.d2;
    var tel = req.body.d3;
    console.log(req.body)
    res.render('index_c', {
        imie: imie,
        nazwisko: nazwisko,
        tel: tel
    });
});
//d
//w indeks.html enctype="application/json"

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(express.json());

app.set('view engine', 'hbs');
app.get('/jsonform', (req, res) => {
    res.render('index_jsonForm')
})
app.post('/jsondata', function (req, res) {
    var imie = req.body.imie;
    var nazwisko = req.body.nazwisko;
    var tel = req.body.tel;

    console.log(imie)
    console.log(nazwisko)
    console.log(tel)
    res.render('index_c.hbs', {
        imie: imie,
        nazwisko: nazwisko,
        tel: tel
    })

});



app.listen(port);
console.log("Server 7b pracuje na porcie " + port);