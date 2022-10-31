const express = require('express');
const app = express();
const Usuario = require("../models/usuarioM")


app.get('/', async (req,res) => {
    const usuario = await Usuario.find()
    res.status(200).json(usuario)
})

app.post('/', async (req,res) => {
    const usuario = new Usuario(req.body);
    await usuario.save()
    res.status(200).json("Usuario creado")
})

app.put('/', async (req, res)=>{
    const filter = {
        name: req.body.name
    }
    const usuario = await Usuario.findOneAndUpdate(filter, req.body)
    await usuario.save()
    res.status(200).json("Usuario actualizado")
})

app.delete('/', async (req, res)=> {
   Usuario.findByIdAndDelete(req.body.id, function (err, docs) {
    if (err){
        res.status(400).json(err)
    }
    else{
        res.status(200).json("Usuario eliminado " + docs)
    }
});
})


module.exports = app;