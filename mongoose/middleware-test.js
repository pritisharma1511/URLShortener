import mongoose from  "mongoose";
//step 1: connect the database
try{
    await mongoose.connect("mongodb://127.0.0.1/mongoose_database");
    mongoose.set("debug",true);
}catch(error){
    console.error(error);
    process.exit();
}