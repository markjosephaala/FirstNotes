const db = require('../config/db');

const User = {
    findByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    },
    create: async (username, email, passwordHash) => {
        const [result] = await db.query(
            'INSERT INTO usuarios (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, passwordHash]
        );
        return result;
    },
    updateUsername: async (id, username) => {
        const [result] = await db.query(
            'UPDATE usuarios SET username = ? WHERE id = ?',
            [username, id]
        );
        return result; // Devolvemos el resultado que contiene affectedRows
    }
};

module.exports = User;