const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes');


const app = express();

mongoose.connect("mongodb+srv://iagobrayham:iagobrayham@cluster0-h2jsn.mongodb.net/semana09?retryWrites=true&w=majority",
{useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());
app.use(routes);

//req.query = query params - filtros
//req.params = route params - edicao ou delete


app.listen(3333);