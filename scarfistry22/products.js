var mongoose = require("mongoose");
var schema= new mongoose.Schema({
	imagepath:{type:String},
	name:{type:String},
	price:{type:Number}
});
module.exports=mongoose.model("Product",schema);
