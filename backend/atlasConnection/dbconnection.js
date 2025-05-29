import mongoose from "mongoose";
function condb (){
    console.log("el")
     mongoose.connect(process.env.MONGO_ATLAS_URL).then((data)=>{
        console.log("mongoose connect to mongodb")
    }).catch((error)=>{
        console.log( "heloerror",error)
    })  
}

export default condb 
