const express = require('express');
const router = express.Router();

// Index route
router.get('/', (req, res) => {
    res.render('index/welcome');
});

// Dashboard Route
router.get('/dashboard', (req, res) => {
    res.send('Dashbord');
});

module.exports = router;