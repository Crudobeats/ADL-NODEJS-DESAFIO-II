const fs = require('fs');
const express = require('express');
//Aparecía un error CORS (Cross-Origin Resource Sharing), por lo que buscando apareció está solución de importar la librería y se solucionaba
const cors = require('cors');
//
const app = express();

// Inicialización de CORS//
app.use(cors());
// Inicialización de CORS//

app.listen(3000, () => {
  console.log("Servidor en funcionamiento!");
});

app.use(express.json());

// Resto del código...

app.post('/canciones', (req, res) => {
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))
    canciones.push(cancion)
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('Canción Inscrita Correctamente')
});

app.get('/canciones', (req, res) => {
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))
    res.json(canciones);
});

app.delete('/canciones/:id', (req, res) => {
    const { id } = req.params;
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))
    const index = canciones.findIndex(i => i.id == id);
    canciones.splice(index, 1);
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
    res.send('Canción Eliminada Correctamente');
});

app.put('/canciones/:id', (req, res) => {
    const cancion = req.body;
    const { id } = req.params;
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'));
    const index = canciones.findIndex(i => i.id == id);
    canciones [index] = cancion;
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
    res.send('Canción Actualizada Correctamente');
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
  // Nueva ruta para manejar /home
  app.get('/home', (req, res) => {
    res.send('¡Bienvenido a la página de inicio!');
  });