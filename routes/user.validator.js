import { body } from 'express-validator';
import { pool } from '../database/connect.js';

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
    .not().isEmpty()
    .withMessage('El Telefono es obligatorio')
    .custom(isUniqueParam('teléfono', 'phone')),
  body('password')
    .not().isEmpty()
    .withMessage('El Password es obligatorio'),
  body('verification_code')
    .not().isEmpty()
    .withMessage('El Codigo es obligatorio'),
  body('email')
    .not().isEmpty()
    .withMessage('El correo es obligatorio')
    .custom(isUniqueParam('correo', 'email')),
    
];
