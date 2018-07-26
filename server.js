const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');

app.use(express.static(__dirname + "/public"));

app.use((req,res,next) =>{
    var now = new Date().toTimeString();
    var mes = `${now}: ${req.method} ${req.url} `;
    fs.appendFile('server.log',mes + '\n');
    next();

});

hbs.registerHelper('year',() =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamit',(text) =>{
    return text.toUpperCase();
});


app.get('/',(requestAnimationFrame,res) => {
    res.send('Home Page');
});

app.get('/about',(req,res) => {
   res.render('about.hbs',{
       pageTitle:'About Page'
   });

});

app.listen(3000, () =>{
  console.log("Listening at port 3000");
});