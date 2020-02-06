var mongoose = require("mongoose");
var schema= new mongoose.Schema({
	imagepath:{type:String},
	name:{type:String},
	price:{type:Number},
	description:{type:String}
});
module.exports=mongoose.model("Painting",schema);
