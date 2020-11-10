const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

require('dotenv').config();

//create port
const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//mongoose connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Successfully connected to MongoDB');
})

app.use(passport.initialize())

require("./config/passport")(passport)

//routes
app.use('/users', require('./routes/users'));
app.use('/property', require('./routes/property'));

app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
})