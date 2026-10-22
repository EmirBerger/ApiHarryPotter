import Users from '../models/users_model.js';
import bcrypt from "bcrypt";
import 'dotenv/config'
import jwt  from 'jsonwebtoken';

const getUsers = async (req, res) =>{
    try{
        let usuarios = await Users.find();
        res.json(usuarios)
    }catch(err ) {
        res.status(400).json(
            {
                err
            }
        )
    }
}

const getUser = async (req, res) =>{
    try{
        let usuario = await Users.find({_id: req.params.userId});
        res.json(usuario)
    }catch(err ) {
        res.status(400).json(
            {
                err
            }
        )
    }
}

const registerUser = async (req, res) =>{
    try {
    let body = req.body;
    const existingUser = await Users.findOne({ email: body.email });
    if (existingUser) {
        return res.status(400).json({ error: 'El correo electrónico ya está en uso.' });
    }

    let usuario = new Users({
        email       : body.email,
        name      : body.name,
        username      : body.username,
        password    : await bcrypt.hashSync( body.password, 10 )
    });
    let savedUser = await usuario.save();

    res.json({
        user: savedUser,
        })
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const updateUser = async (req, res) =>{
    let usuario = await Users.updateOne({"email": req.params.email}, {
        $set: {
            name: req.body.name,
            password: req.body.password
        }
    });
    usuario.then(valor => {
        res.json({
            valor
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    });
}

const deleteUser = async (req, res) =>{
    let usuario = await Users.updateOne({"email": req.params.email}, {
        $set: {
            estado: false
        }
    }, {new: true});
    usuario.then(valor => {
        res.json({
            usuario: valor
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    });
}

const loginUser = async (req, res) =>{
    Users.findOne({email: req.body.email})
    .then(datos => {
            if(datos){
                const passwordValido = bcrypt.compareSync(req.body.password, datos.password);
                if(!passwordValido) return res.status(400).json({error:'ok', msj:'Usuario o contraseña incorrecta.'})
                const jwToken = jwt.sign({
                    usuario: {_id: datos._id, name: datos.name, username: datos.username, email: datos.email}
                  }, process.env.SEED, { expiresIn: process.env.EXPIRATION });
                res.json({
                    usuario:{
                        _id:datos._id,
                        name:datos.name,
                        username:datos.username,
                        email:datos.email
                    },
                    jwToken
                });
            }else{
                res.status(400).json({
                    error:'ok',
                    msj:'Usuario o contraseña incorrecta.'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                error:'ok',
                msj:'Error en el servicio' + err
            })
        })
}

export {
    getUsers,
    getUser,
    registerUser,
    updateUser,
    deleteUser,
    loginUser
  };