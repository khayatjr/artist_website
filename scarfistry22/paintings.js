var mongoose = require("mongoose");
var schema= new mongoose.Schema({
	imagepath:{type:String},
	img2:{type:String},
	zoom:{type:String},
	material:{type:String},
	name:{type:String},
	size:{type:String},
	price:{type:Number},
	description:{type:String}
});
module.exports=mongoose.model("Painting",schema);
