import mongoose from  "mongoose";
//step 1: connect the database
try{
    await mongoose.connect("mongodb://127.0.0.1/mongoose_middleware");
    mongoose.set("debug",true);
}catch(error){
    console.error(error);
    process.exit();
}
const userSchema = mongoose.Schema({
    name:{type: String, required: true},
    email:{type:String,required:true,unique:true},
    age: { type:Number , required: true,min:5},
    // createdAt:{type:Date,default:Date.now()},
    // updateAt:{type:Date,default:Date.now()},
},
{
    timestamps : true,
}
);


// userSchema.pre(["updateOne","findOneAndUpdate","updateMany"],
//     function(next){
//     this.set({updateAt:Date.now()});
//     next();
// });

const Users = mongoose.model("user",userSchema);

// await Users.create({name:"Priti",age:20,email:"pritisharma@gmail.com"});

await Users.updateOne({email:"pritisharma@gmail.com"},{$set:{age:33}});
await mongoose.connection.close();

