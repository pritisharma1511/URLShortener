import mongoose from  "mongoose";
//step 1: connect the database
try{
    await mongoose.connect("mongo://localhost:27017/mongoose_database");
    mongoose.set("debug",true);
}catch{
    console.error(error);
    process.exit();
}

//step2: create schema
const userSchema = mongoose.Schema({
    name:{type: String, required: true},
    email:{type:String,required:true,unique:true},
    age: { type:Number , required: true,min:5},
    createdAt:{type:Date,default:Date.now()},
})

