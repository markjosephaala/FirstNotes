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
    }
};

module.exports = User;