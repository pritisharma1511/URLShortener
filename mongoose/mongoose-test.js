import mongoose from  "mongoose";

try{
    await mongoose.connect("mongo://localhost:27017/mongoose_database");
    mongoose.set("debug",true);
}catch{
    console.error(error);
    process.exit();
}