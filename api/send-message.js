const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests are allowed' });
    }

    try {
        await client.connect();
        const database = client.db('nombre_base_datos');
        const messages = database.collection('mensajes');
        
        const message = req.body;
        message.timestamp = new Date();

        await messages.insertOne(message);

        res.status(200).json({ message: 'Mensaje guardado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar el mensaje' });
    } finally {
        await client.close();
    }
};
