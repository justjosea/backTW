const express = require('express');
const app = express()
const mongoose = require('mongoose');

const timelineRoute = require('./routes/timeline')
const tweetsRoutes = require('./routes/tweets')
const usersRoutes = require('./routes/users')

app.use(express.json());

mongoose.connect(
        "mongodb+srv://rootback:YPuJKnjzDoc52cDm@backtw.sll8h6g.mongodb.net/?retryWrites=true&w=majority"
        )
    .then(() => {
        console.log("Exito");
    })
    .catch((e) => {
        console.log(e)
        console.log("Jumbo")
    }) 

app.use("/Usuarios", usersRoutes)
app.use("/Publicaciones", tweetsRoutes)
app.use("/Home", timelineRoute)


app.listen(3000, () => {
        console.log('Servidor online');    
});