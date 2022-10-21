const express = require('express');
const app = express()

const followersRoutes = require('./routes/followers')
const tweetsRoutes = require('./routes/tweets')
const usersRoutes = require('./routes/users')

app.use("/Usuarios", usersRoutes)
app.use("/Publicaciones", tweetsRoutes)
app.use("/Seguidores", followersRoutes)


app.listen(3000, () => {
        console.log('Servidor online');    
});