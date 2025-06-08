const db = require('../config/db');

// const getUsers = async() =>{
//         const result = await db.query('SELECT * FROM user_auth');
//         return result.rows;
// }

const findUserByEmail = async (user_email) => {
        const result = await db.query('SELECT * FROM user_auth WHERE user_email = $1', [user_email]);
        return result.rows[0];
};

const createUser = async (user_name, user_password, user_email) => {
        const result = await db.query(
                'INSERT INTO user_auth (user_name, user_password, user_email) VALUES ($1, $2, $3) RETURNING *',
                [user_name, user_password, user_email]
        );
        return result.rows[0];
};

module.exports = { findUserByEmail, createUser }