var mongoose = require("mongoose");
var schema= new mongoose.Schema({
	customer:{type:String},
	order:{type:Object},
	phone:{type:Number},
	email:{type:String},
	address:{type:String},
	region:{type:String},
	status:{type:String}
});
module.exports=mongoose.model("Order",schema);
