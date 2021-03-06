const express = require("express"); //web app framework    
const app = express();
const server = require('http').createServer(app);
const credentials = require("./config/mysqlCredentials");
const io = require('socket.io')(server);
const helmet = require('helmet');
const session = require('express-session');  //keep track of users logged in and authorisation

global.__basedir = __dirname;

app.use(express.json());
app.use(express.static('.'));  //configure express to integrate stylesheets into the app
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({extended: false}));
app.use(helmet());

app.use(session({
    secret: require('./config/mysqlCredentials.js').sessionSecret,  //  used to determine if the user is logged-in
    resave: false,   //save to seession store?
    saveUninitialized: true
}));

const fs = require('fs');

const navbarPage = fs.readFileSync("public/navbar/navbar.html", "utf8");
const indexPage = fs.readFileSync("public/index/index.html", "utf8");
const footerPage = fs.readFileSync("public/footer/footer.html", "utf8");
const imagesPage = fs.readFileSync("public/images/images.html", "utf8");
const uploadPage = fs.readFileSync("public/upload/upload.html", "utf8");
const contactPage = fs.readFileSync("public/contact-form/sendMail.html", "utf8");
const chatPage = fs.readFileSync("public/chat/chat.html", "utf8");
const weatherPage = fs.readFileSync("public/weather-api/weather.html", "utf8")

app.get("/", (req,res) => {
    return res.send(navbarPage + indexPage + footerPage);
});

app.get("/upload", (req,res) => {
    if(req.session.user) {
        return res.send(navbarPage + uploadPage + footerPage);
    } else {
        return res.redirect('/login');
    }
});

app.get("/sendMail", (req,res) => {
    if(req.session.user) {
        return res.send(navbarPage + contactPage + footerPage);
    } else {
        return res.redirect('/login');
    }
});

app.get("/images", (req,res) => {
    if(req.session.user) {
        return res.send(navbarPage + imagesPage + footerPage);
    } else {
        return res.redirect('/login');
    }
 });

app.get("/chat", (req,res) => {
    return res.send(chatPage);
});

app.get("/weather", (req,res) => {
    return res.send(weatherPage);
});


const authRoute = require('./routes/auth.js');
const uploadRoute = require('./routes/upload.js');
const contactRoute = require('./routes/contact.js');
const usersRoute = require('./routes/users.js');

app.use(authRoute); 
app.use(uploadRoute);
app.use(contactRoute);
app.use(usersRoute);   // REST for the user model


// objection + knex

const { Model } = require('objection');  // used to create an extra abstraction layer to make objects with. built on an SQL query builder - knex
const Knex = require('knex');   //capital letter cause this is a library
const knexFile = require('./knexfile.js')

const knex = Knex(knexFile.development); // connection from knexfile

Model.knex(knex); // objects now aware of the connection. built in method. 


const PORT = 5002;

server.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running remotely on port ", PORT, "please visit http://ec2-35-153-78-103.compute-1.amazonaws.com:5002/")
});

// socket

io.on('connection', socket => { 
    console.log("Socket joined", socket.id);


   socket.on("Hi!", ({ talk }) => {
       // sends out to all the clients
         io.emit("User said", { talk });

        }); 

         socket.on('disconnect', () => {
         console.log("Socket left", socket.id);
    });
});

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: credentials.host,
    database: credentials.database,
    user:     credentials.user,
    password: credentials.password,
    port: credentials.port,
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to AWS RDS database.');
});

connection.end();