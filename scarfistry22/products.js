var mongoose = require("mongoose");
var schema= new mongoose.Schema({
	imagepath:{type:String},
	img2:{type:String},
	name:{type:String},
	price:{type:Number}
});
module.exports=mongoose.model("Product",schema);
