const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config()
const cors = require('cors');


require('./dataBaseConnection');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const Routes = require('./routes')

app.use('/api/v1', Routes)

app.set('port', process.env.PORT || 3001)

app.use(morgan('dev'));

app.use(function (req, res, next) {   
    res.status(404).json({ mensaje: 'ERROR: 404 not found index' })
})

app.listen(app.get('port'), () => console.log(`Escuchando http://localhost:${app.get('port')}`))