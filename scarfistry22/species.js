var mongoose = require("mongoose");
var schema= new mongoose.Schema({
	imagepath:{type:String},
	image2:{type:String},
	name:{type:String},
	price:{type:Number}
});
module.exports=mongoose.model("Species",schema);