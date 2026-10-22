import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import personajes from "./routes/personajes.js";
import actores from "./routes/actores.js";
import users from "./routes/users_routes.js";
import auth from "./routes/auth.js";
import path from 'path';
import "dotenv/config";

// 127.0.0.1
mongoose.connect('mongodb://localhost:27017/potter', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
    console.log('Conectado con la DB')
})
.catch(() =>{
    console.log('Error al conectar con la DB')
})
const app = express();
const port = process.env.PORT || 3002;
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/personajes', personajes);
app.use('/actores', actores);
app.use('/users', users);
app.use('/auth', auth);

app.get('/', (req, res) =>{
    res.sendFile("./html/index.html", {root: __dirname});
})

app.listen(port ,()=>{
    console.log('server running...')
})