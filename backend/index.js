const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());


// Usar las rutas
app.use('/api/auth', authRoutes); // Ahora las rutas serán /api/auth/login y /api/auth/registro

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor organizado corriendo en http://localhost:${PORT}`);
});