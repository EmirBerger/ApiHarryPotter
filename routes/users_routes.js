import express  from 'express';
const ruta = express.Router();
import verificarToken from '../middlewares/auth.js';
import { deleteUser, getUsers, getUser, registerUser, updateUser, loginUser } from '../controllers/users_controller.js';

ruta.get('/', getUsers);

ruta.get('/find/:userId', getUser);

ruta.post('/register', registerUser);

ruta.post('/login', loginUser);

ruta.put('/:email', updateUser);

ruta.delete('/:email', deleteUser);

export default ruta;