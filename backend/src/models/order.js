const mongoose=require ('mongoose')

var OrderSchema= new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },
        order_data:{
            type:Array,
            required:true
        }
  
   

})

  var Orderdb=mongoose.model('OrderDB',OrderSchema)

  module.exports=Orderdb;