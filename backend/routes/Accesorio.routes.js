
//Express
const express = require('express');
//Mongodb 
const { MongoClient, ObjectId } = require('mongodb');
///
const moment = require('moment');

require('dotenv').config();

const router = express.Router();


const bases = process.env.DATA;
const nombrebase = 'motosDB';


router.get('/get', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Accesorios'); 
        const result = await collection.find().toArray(); 
        
        res.json({
            msg: "Obtener Accesorios.",
            result
        });
        
        client.close();
    } catch (error) {
        console.log(error, "Error en el endpoint GET '/get'.");
        res.status(500).json({ error: "Ocurrió un error en el servidor." });
    }
});

/* 
router.get('/enpo2', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('cita');
        const query = { cit_fecha: "14-09-2023" };
        const result = await collection
            .aggregate([
                {
                    $match: query
                },
                {
                    $lookup: {
                        from: 'usuario',
                        localField: 'cit_datosUsuario',
                        foreignField: '_id',
                        as: 'usuario'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        cit_fecha: 1,
                        'usuario.usu_nombre': 1,
                        'usuario.usu_segdo_nombre': 1,
                        'usuario.usu_primer_apellido': 1,
                        'usuario.usu_segdo_apellido': 1
                    }
                }
            ])
            .sort({ 'usuario.usu_nombre': 1 })
            .toArray();
J
        res.json({
            msg: "Obtener citas por fecha (fecha: 14-09-2023)(Se puede agregar alguna otra fecha) ordenando  de manera alfabética (primer nombre).",
            result
        });
    } catch (error) {
        console.log(error, "Error enpo2.");
    }
}); */


router.post('/post', async (req, res) => {
    try {


        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Accesorios');
        const newAccesorio = req.body;

        const result = await collection.insertOne(newAccesorio);

        res.json({
            msg: "Accesorio insertado correctamente.",
            result
        });

        client.close();
    } catch (error) {
        console.log(error, "Error al insertar accesorio.");
        res.status(500).json({ error: "Error al insertar accesorio" });
    }
});




router.put('/update/:id', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Accesorios');
        
        const accesorioId = req.params.id;
        const updatedAccesorioData = req.body;

        const result = await collection.updateOne(
            { _id: new ObjectID(accesorioId) },
            { $set: updatedAccesorioData }
        );

        res.json({
            msg: "Accesorio actualizado correctamente.",
            result
        });

        client.close();
    } catch (error) {
        console.log(error, "Error al actualizar accesorio.");
        res.status(500).json({ error: "Error al actualizar accesorio" });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('usuario');
        
        const userId = req.params.id;

        const result = await collection.deleteOne({ _id: new ObjectID(userId) });

        res.json({
            msg: "Usuario eliminado correctamente.",
            result
        });

        client.close();
    } catch (error) {
        console.log(error, "Error al eliminar usuario.");
    }
});


module.exports = router;