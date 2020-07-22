const router = require('express').Router();
const { Psychologists } = require('../models/Psychologists');

router.get('/', async (req, res, next) => { });

router.post('/', async (req, res, next) => res.send('information recieved!'));

router.put('/', async (req, res, next) => { });


module.exports = router;
