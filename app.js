const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 4000;
const DB_LOCAL_URL = 'mongodb://localhost/bloodgrid';

mongoose.connect(DB_LOCAL_URL, { useNewUrlParser: true });

let db = mongoose.connection;

if (!db) console.log('Error connecting to MongoDB');
else console.log('Connected to the db successfully');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT} `);
});
