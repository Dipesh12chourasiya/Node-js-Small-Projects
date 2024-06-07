const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function connectMongo(url){
    return mongoose
            .connect(url)
            .then(() => console.log("Mongo Connected"))
            .catch((e) => console.log("Error occured" + e))
}

module.exports = {
    connectMongo,
};