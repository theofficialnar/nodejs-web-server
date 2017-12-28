const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//use port 3000 locally
const port = process.env.PORT || 3000;
var app = express();

//set up partials directory
hbs.registerPartials(__dirname + '/views/partials');

//set express view engine to handlebars
app.set('view engine', 'hbs');

//express middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.error('Unable to append to server.log');
        }
    });
    next();
});

//maintenance middleware - uncomment to disable
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle : 'Site Under Maintenance',
//         welcomeMsg : 'We\'ll be right back!'
//     });
// });

app.use(express.static(__dirname + '/public'));

//set up helper to be used on the templates
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

//method that takes arguments
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//route handler
app.get('/', (req, res) => {

    res.render('homepage.hbs', {
        pageTitle : 'Home Page',
        welcomeMsg : 'Welcome to the fucking home page.'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage : 'Requested URL does not exist.'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle : 'Projects Page',
        welcomeMsg : 'Welcome to the projects page.'
    });
});

//port
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});