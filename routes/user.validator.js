import { body } from 'express-validator';
import { pool } from '../database/connect.js';
/*const isUniqueParam = async ( value) => {
    const query = 'SELECT * FROM persons WHERE phone = $1';
    const result = await pool.query(query, [value.trim()]);
    
    if (result.rowCount > 0) {
      return Promise.reject('El telefono ya está en uso');
    }
};*/
const isUniqueParam = (fieldName, columnName) => {
  return async (value) => {
    const query = `SELECT * FROM persons WHERE ${columnName} = $1`;
    const result = await pool.query(query, [value]);

    if (result.rowCount > 0) {
      return Promise.reject(`${fieldName} debe ser único`);
    }
  };
};

export const createValidators = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('El usuario debe tener al menos 3 caracteres'),
  body('email')
    .isEmail()
    .withMessage('El correo debe ser un email valido'),
  body('name')
    .not().isEmpty()
    .withMessage('El nombre es obligatorio'),
  body('last_name')
    .not().isEmpty()
    .withMessage('El Apellido es obligatorio'),
  body('phone')
    .not()
    .isEmpty()
    .withMessage('El Apellido es obligatorio')
    .custom(isUniqueParam('teléfono', 'phone')),
];