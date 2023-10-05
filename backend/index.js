const express = require('express');
const app = express();

require('dotenv').config();

const routerAccesorio = require('./routes/Accesorio.routes.js');
const routerComentarios = require('./routes/Comentarios.routes.js');
const routerEspecificaciones = require('./routes/Especificaciones.routes.js');
const routerEventos = require('./routes/Eventos.routes.js');
const routerMarcas = require('./routes/Marcas.routes.js');
const routerMotos = require('./routes/Motos.routes.js');
const routerTalleresDeServicio = require('./routes/TalleresDeServicio.routes.js');
const routerVentas = require('./routes/Ventas.routes.js');


app.use('/Accesorio', routerAccesorio);
app.use('/Comentarios', routerComentarios);
app.use('/Especificaciones', routerEspecificaciones);
app.use('/Eventos', routerEventos);
app.use('/Marcas', routerMarcas);
app.use('/Motos', routerMotos);
app.use('/TalleresDeServicio', routerTalleresDeServicio);
app.use('/Ventas', routerVentas);


const port = process.env.PORT;

app.use(express.json());

app.listen(port, () => {
    console.log(`Al menos en este puerto: ${port} mira ese numerin.`);
})