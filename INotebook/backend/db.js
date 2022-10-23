const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&directConnection=true&ssl=false"

const connectToMongo = () =>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongoose succesfully")
    })
}

module.exports = connectToMongo