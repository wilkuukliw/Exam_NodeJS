
const router = require('express').Router();
//const User = require('../models/User.js');

router.get('/setsessionvalue', (req, res) => {
    req.session.myValue = req.sessionID; // take the value from the request and dynamically set it here
    return res.send({ response: "SessionID is set to " + req.sessionID });
});

router.get('/getsessionvalue', (req, res) => {
    return res.send({ response: req.sessionID });
});

module.exports = router;