require('dotenv').config();

const mongoose = require('mongoose');

const username = process.env.USERNAME;
const secret = process.env.SECRET;
const dbname = process.env.DBNAME

const url = `mongodb+srv://${username}:${secret}@graduationproject.mr5uk.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.connect(url)

