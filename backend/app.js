require('dotenv').config();

const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/animal', require('./routes/animal'));
app.use('/auth', require('./routes/auth'));
app.use('/fundacion', require('./routes/fundacion'));
app.use('/manada', require('./routes/manada'));
app.use('/usuario', require('./routes/usuario'));
app.use('/donacion', require('./routes/donacion'));
app.use('/reportes', require('./routes/report'));
app.use('/evidencia', require('./routes/evidencia'));
app.use('/cuenta', require('./routes/cuenta'));
app.use('/actualizacion', require('./routes/actualizacion'));
app.use('/notificacion', require('./routes/notificacion'));
app.use('/comision', require('./routes/comision'));

app.use('/paypal', require('./routes/paypal'));
app.use('/otros', require('./routes/otros'));

module.exports = app;
