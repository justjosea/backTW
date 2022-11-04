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
    const usuario = await Usuario.findByIdAndUpdate(req.body.id, req.body)
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

app.get('/:id/seguidores', async (req,res) => {

    let seguidores = await Usuario.findById(req.params.id,{followers:1, _id: 0})
    seguidores = seguidores.followers
    res.status(200).json(seguidores)
})


app.get('/:id/seguidos', async (req,res) => {

    let seguidos = await Usuario.findById(req.params.id,{following:1, _id: 0})
    seguidos = seguidos.following
    res.status(200).json(seguidos)
})

app.post('/seguir', async (req,res) => {
    
    let seguidos = await Usuario.findById(req.body.seguidor,{following: 1, _id: 0})
    let seguidores = await Usuario.findById(req.body.seguido, {followers: 1, _id: 0})
    seguidos = seguidos.following
    seguidores = seguidores.followers
    seguidos.push(req.body.seguido)
    seguidores.push(req.body.seguidor)
    const seguido = await Usuario.findByIdAndUpdate(req.body.seguido, {followers: seguidores})
    seguido.save()
    const seguidor = await Usuario.findByIdAndUpdate(req.body.seguidor, {following: seguidos})
    seguidor.save()
    res.status(200).json("Enlace seguido-seguidor creado exitosamente")
})

app.delete('/seguir',async (req,res) => {
    
    let seguidos = await Usuario.findById(req.body.seguidor,{following: 1, _id: 0})
    let seguidores = await Usuario.findById(req.body.seguido, {followers: 1, _id: 0})
    seguidos = seguidos.following.filter((e)=> e != req.body.seguido)
    seguidores = seguidores.followers.filter((e)=> e != req.body.seguidor)
    const seguido = await Usuario.findByIdAndUpdate(req.body.seguido, {followers: seguidores})
    seguido.save()
    const seguidor = await Usuario.findByIdAndUpdate(req.body.seguidor, {following: seguidos})
    seguidor.save()
    res.status(200).json("Enlace seguido-seguidor eliminado exitosamente")
    
} )

module.exports = app;