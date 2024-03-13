import { pool } from "../database/connect.js";

const findAll = async () => {
    const result = await pool.query("SELECT * FROM persons");
    return (result);
};

const createPersons = async (user) => {
    const query = 'INSERT INTO persons (username, name, last_name, phone, password, verification_code, email) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    const {rows} =await pool.query(query,[user.username, user.name, user.last_name, user.phone, user.password, user.verification_code, user.email]);
    return rows[0];
}

export const userModel = {
    findAll,
    createPersons,
};