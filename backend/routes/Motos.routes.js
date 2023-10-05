const { MongoClient } = require('mongodb');
const express = require('express');
const router = express.Router();


router.get('/get', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('usuario');
        const result = await coll
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
        const collection = db.collection('usuario');
        const result = await collection.find().sort({ usu_nombre: 1 }).toArray();
        res.json({
            msg: "Obtener pacientes de manera alfabética (por primer nombre).",
            result
        });
        client.close();
    } catch (error) {
        console.log(error, "Error endpo1.");
    }
});

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

        res.json({
            msg: "Obtener citas por fecha (fecha: 14-09-2023)(Se puede agregar alguna otra fecha) ordenando  de manera alfabética (primer nombre).",
            result
        });
    } catch (error) {
        console.log(error, "Error enpo2.");
    }
});



router.post('/insert', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('usuario');
        const newUser = req.body;
        const result = await collection.insertOne(newUser);

        res.json({
            msg: "Usuario insertado correctamente.",
            result
        });

        client.close();
    } catch (error) {
        console.log(error, "Error al insertar usuario.");
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('usuario');
        
        const userId = req.params.id;
        const updatedUserData = req.body;

        const result = await collection.updateOne(
            { _id: new ObjectID(userId) },
            { $set: updatedUserData }
        );

        res.json({
            msg: "Usuario actualizado correctamente.",
            result
        });

        client.close();
    } catch (error) {
        console.log(error, "Error al actualizar usuario.");
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


module.exports = router;ection.find().sort({ usu_nombre: 1 }).toArray();
        res.json({
            msg: "Obtener pacientes de manera alfabética (por primer nombre).",
            result
        });
        client.close();
    } catch (error) {
        console.log(error, "Error endpo1.");
    }
});

router.post('/insert', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('usuario');
        const newUser = req.body;
        const result = await collection.insertOne(newUser);

        res.json({
            msg: "Usuario insertado correctamente.",
            result
        });

        client.close();
    } catch (error) {
        console.log(error, "Error al insertar usuario.");
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('usuario');
        
        const userId = req.params.id;
        const updatedUserData = req.body;

        const result = await collection.updateOne(
            { _id: new ObjectID(userId) },
            { $set: updatedUserData }
        );

        res.json({
            msg: "Usuario actualizado correctamente.",
            result
        });

        client.close();
    } catch (error) {
        console.log(error, "Error al actualizar usuario.");
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
