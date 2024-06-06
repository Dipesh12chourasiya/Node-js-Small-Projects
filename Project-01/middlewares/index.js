const fs = require("fs");


function logReqRes(filename){
    return (req,res,next)=>{
        fs.appendFile(filename, `\n${req.method}: request` , (err,data)=>{
            next();
        }
        );
    };
}

module.exports = {
    logReqRes,
}