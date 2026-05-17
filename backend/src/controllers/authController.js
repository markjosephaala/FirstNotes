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

        res.json({ message: 'Login exitoso', token });
    } catch (err) {
        console.error("DETALLE DEL ERROR:", err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};