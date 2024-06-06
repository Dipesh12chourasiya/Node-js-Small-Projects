const mongoose = require('mongoose');

async function connectTOMongoDB(url){
    return mongoose.connect(url).then(()=>{
        console.log("MongoDB Connected");
    }).catch(()=>{
        console.log("Error occured");
    })
}

module.exports = {
    connectTOMongoDB ,
}