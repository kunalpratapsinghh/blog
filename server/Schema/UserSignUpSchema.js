let mongoose=require("mongoose")

const UserSignUpSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{ type : String , unique : true, required : true },
    mobile:{type:Number,required:true},
    password:{type:String,required:true}
})

const UserSignUp=mongoose.model("usersignup",UserSignUpSchema)


module.exports=UserSignUp