require('dotenv').config();
const express = require('express');
const sesison = require('express-session');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;

// databse connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});
// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    sesison({
        secret: 'my secret key',
        saveUninitialized: true,
        resave: false 
    })
)
app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

app.use(express.static('uploads'));

app.set('view engine', 'ejs');

// router prefix
app.use('/', require('./routes/routes'));

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})