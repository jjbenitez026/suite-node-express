import { userModel } from "../models/user.models.js";

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
}
export const userController = {
    getAll,
    createPersons,
}