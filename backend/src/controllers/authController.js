const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registro = async (req, res) => {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) return res.status(400).json({ error: 'Faltan campos' });

    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const result = await User.create(nombre, email, hashedPwd);
        res.status(201).json({ message: 'Usuario creado', userId: result.insertId });
    } catch (err) {
        console.error("DETALLE DEL ERROR:", err);
        res.status(500).json({ error: 'Error al registrar' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await User.findByEmail(email);
        if (!usuario) return res.status(401).json({ error: 'Usuario no encontrado' });

        const passwordCorrecta = await bcrypt.compare(password, usuario.password_hash);
        if (!passwordCorrecta) return res.status(401).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            'TU_CLAVE_SECRETA_SUPER_SEGURA',
            { expiresIn: '1h' }
        );

        // MODIFICACIÓN: Ahora enviamos también el objeto con los datos del usuario
        res.json({ 
            message: 'Login exitoso', 
            token,
            usuario: {
                id: usuario.id,
                username: usuario.username // Asegúrate de que tu columna en la BD se llame 'username'
            }
        });
        
    } catch (err) {
        console.error("DETALLE DEL ERROR:", err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Actualizar el username de un usuario
exports.actualizarUsername = async (req, res) => {
    const { id } = req.params;      // Captura el ID desde la URL (gracias al :id de la ruta)
    const { username } = req.body;  // Captura el nuevo nombre desde el cuerpo

    if (!username) {
        return res.status(400).json({ error: 'El nombre de usuario es obligatorio' });
    }

    try {
        // Llamamos al método que acabamos de crear en el modelo User
        const result = await User.updateUsername(id, username);

        // Si "affectedRows" es 0, significa que ese ID no existía en la base de datos
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ message: 'Username actualizado con éxito', nuevoUsername: username });
    } catch (err) {
        console.error("ERROR AL ACTUALIZAR:", err);
        res.status(500).json({ error: 'Error al actualizar el perfil en el servidor' });
    }
};