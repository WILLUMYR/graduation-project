const express = require('express');
const router = express.Router();

router.get('/psychologists', (req, res) => { });

router.post('/psychologists', (req, res) => res.send('information recieved!'));

router.put('/psychologists', (req, res) => { });

router.delete('/psychologists', (req, res) => { });

module.exports = router;
