let mongoose=require("mongoose")

const BlogSchema=mongoose.Schema({
    title:{type:String,required:true},
    data:{ type : String ,required : true },
    createdAt: { type: Date, default: Date.now() }
})

const Blog=mongoose.model("blog",BlogSchema)


module.exports=Blog