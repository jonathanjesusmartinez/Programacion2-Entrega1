const express = require('express');
const { isNotLoggedIn } = require('../lib/auth');
const router = express.Router();

router.get('/', isNotLoggedIn, async(req,res) => {
    res.render('inicio');
});

module.exports = router;
