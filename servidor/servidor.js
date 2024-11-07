const express = require('express');
const cors = require('cors');
const fs = require('fs');
const moment = require('moment-timezone');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/send-message', (req, res) => {
    const { mensaje } = req.body;

    fs.readFile('mensajes.json', 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).send('Error al leer el archivo de mensajes.');
        }

        const mensajes = data ? JSON.parse(data) : [];
        const timestamp = moment().tz("America/Guayaquil").format('YYYY-MM-DD HH:mm:ss'); 
        mensajes.push({ content: mensaje, timestamp: timestamp });

        fs.writeFile('mensajes.json', JSON.stringify(mensajes, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error al guardar el mensaje.');
            }
            res.status(201).send('Mensaje guardado.');
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
