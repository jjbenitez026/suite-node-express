import { userModel } from "../models/user.models.js";
import { pool } from "../database/connect.js";

const getAll = async (req, res) => {
  try {
    const { rows } = await userModel.findAll();
    console.log(rows);
    res.status(200).send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const createPersons = async (req, res) => {
  try {
    const user = req.body;
    const response = await userModel.createPersons(user);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const getByID = async (req, res) => {
  const userId = req.params.id;
  try {
    const query = 'SELECT * FROM persons WHERE id_user = $1';
    const result = await pool.query(query, [userId]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al buscar usuario por ID:', error);
    res.status(500).json({ error: 'No se pudo completar la búsqueda' });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { phone, password,email } = req.body;
  try {
    const query = 'UPDATE persons SET phone = $1, password = $2, email = $3 WHERE id_user = $4';
    await pool.query(query, [phone, password, email, userId]);

    res.json({ message: 'Información de usuario actualizada correctamente' });
  } catch (error) {
    console.error('Error al editar usuario por ID:', error);
    res.status(500).json({ error: 'No se pudo editar la información del usuario' });
  }
};

const deletUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const query = 'DELETE FROM persons WHERE id_user = $1';
    await pool.query(query, [userId]);

    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario por ID:', error);
    res.status(500).json({ error: 'No se pudo eliminar el usuario' });
  }
};

export const userController = {
  getAll,
  createPersons,
  getByID,
  updateUser,
  deletUser,
}