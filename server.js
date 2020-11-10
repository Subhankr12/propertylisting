const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

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
mongoose.connect(uri || 'mongodb+srv://subhankr12:hogrider123@property.ilgmd.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Successfully connected to MongoDB');
})

app.use(passport.initialize())

require("./config/passport")(passport)

//routes
app.use('/users', require('./routes/users'));
app.use('/property', require('./routes/property'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
})