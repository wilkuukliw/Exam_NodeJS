const router = require("express").Router();
const path = require('path'); // joins the specified paths into one
const User = require('../models/User.js');
const bcrypt = require('bcrypt'); // blowish crypter :) to encrypt/hash password
const saltRounds = 12;  

//We need to now handle the POST request, basically what happens here is when the client enters their details in the login form and clicks the submit button, 
//the form data will be sent to the server, and with that data our login script will check in our database's accounts table to see if the details are correct.



router.get('/login', (req, res) => {
    return res.sendFile(path.join(__dirname, '../public/account/login.html'));
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {
        const userFound = await User.query().select().where('username', username);
        if (userFound.length === 0) {
            return res.status(400).send({ response: "User does not exist" });
        } 

        const match = await bcrypt.compare(password, userFound[0].password);
        if(match) {
            //Make session on success
            req.session.username = username;
            req.session.user = {id: userFound[0].id}
            return res.redirect("/");
        }
    } catch(error) {
        return res.status(500).send({ response: "Something went wrong with the database" });
    }

    return res.status(400).send({ response: "Incorrect password" });
});

//If the result returned from the table exists we create two session variables, one to determine if the client is logged in and the other will be their username.
//Stored in cookies. Entirely live on the server. 

router.get('/signup', (req, res) => {
    return res.sendFile(path.join(__dirname, '../public/account/signup.html'));
});

router.post("/signup", async (req, res) => {   // async (promise)
 
    // fields required: username, password, repeat password
    const { username, password, passwordRepeat } = req.body;

    const isPasswordTheSame = password == passwordRepeat;

    if (username && password && isPasswordTheSame) {
        // password requirements
        if (password.length < 8) {
            return res.status(400).send({ response: "Password does not fulfill the requirements" });
        } else {
            try {
                
                const userFound = await User.query().select().where({ 'username': username }).limit(1);
                if (userFound.length > 0) {
                    return res.status(400).send({ response: "User already exists" });
            } else {

                const hashedPassword = await bcrypt.hash(password, saltRounds);
                
                const createdUser = await User.query().insert({

                    username,
                    password: hashedPassword,
                });

                return res.send({ response: `User has been created with the username ${createdUser.username} You can now log in` });
            }

            } catch (error) {
                return res.status(500).send({ response: "Something went wrong with the database" });
            }

        }

    //If no results are returned we send to the client an error message, this message will let the client know they've entered the wrong details.

    } else if (password && passwordRepeat && !isPasswordTheSame) {
        return res.status(400).send({ response: "Passwords do not match. Fields: password and passwordRepeat" });
    } else {
        return res.status(404).send({ response: "Missing fields: username, password, passwordRepeat" });
    }
    
});

router.get("/logout", (req, res) => {   
    req.session.destroy((error) => {
        if(error) {
            return res.send({ response: "Something went wrong: ", error })
        }
        return res.redirect("/login");
    });
});   

module.exports = router;