import mongoose from  "mongoose";
//step 1: connect the database
try{
    await mongoose.connect("mongodb://127.0.0.1/mongoose_database");
    mongoose.set("debug",true);
}catch(error){
    console.error(error);
    process.exit();
}

//step2: create schema
const userSchema = mongoose.Schema({
    name:{type: String, required: true},
    email:{type:String,required:true,unique:true},
    age: { type:Number , required: true,min:5},
    createdAt:{type:Date,default:Date.now()},
});

//step2 : creating model
const Users = mongoose.model("user",userSchema);

await Users.create({name:"Priti",age:20,email:"pritisharma@gmail.com"});

await mongoose.connection.close();

