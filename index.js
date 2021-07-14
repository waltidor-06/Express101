const http = require("http");//

const hostname = "127.0.0.1";//sets up IP address as host
const port = 3000;//port set to 3000

const express = require("express");//uses express, in fact requires it
const app = express();

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const server = http.createServer(app);//creates server using express
const db = require("./db");//passes data from db.js 

app.get("/", (req, res) => {//any request for the homepage will display Hello from Express!
  res.render('home', {
    partials: {
        head: '/partials/head'
    }
});
});

app.get("/friends", (req, res) => {
  res.render('friends-list', {
    locals: {
        friends: db,
        path: req.path
    }
});
});

app.get('/friends/:handle', (req, res) => {
    const {handle} = req.params;
    const friend = db.find(f => f.handle === handle);
    if (friend) {
      res.render('friend', {
            locals: {
                friend
            }
        });
    } else {
        res.status(404)    
           .send(`no friend with handle ${handle}`);
    }
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
