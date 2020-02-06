var mongoose= require("mongoose");
var Product= require("./products");
var Scarves=require("./Scarves");
var Paintings=require("./paintings");
console.log("ji");

mongoose.connect('mongodb://localhost:27017/scarfistry',{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})


var paintings=
[
	new Paintings({
	imagepath:"/i4.png",
	name:"The lady",
	price:12280,
	description:"Oil painting representing the beauty of Egypt"
}),

new Paintings({
	imagepath:"/i9.png",
	name:"Le visage",
	price:12280,
	description:"Charcoal painting reflecting the sorrow of loss"
}),

new Paintings({
	imagepath:"/i10.png",
	name:"Once upon a time",
	price:12280,
	description:"Ink sketch for the struggle of luck"
})
];





var products=
[
	new Product({
	imagepath:"/cart_ejs_folder/p2.png",
	name:"Tongues Tied",
	price:280
}),

new Product({
	imagepath:"/cart_ejs_folder/p3.png",
	name:"EL Mooled",
	price:280
}),

new Product({
	imagepath:"/cart_ejs_folder/p1.png",
	name:"The Temple",
	price:280
})
];

var scarves=
[
	new Scarves({
	imagepath:"/cart_ejs_folder/p4.png",
	name:"Sushi lover",
	price:680
}),

new Scarves({
	imagepath:"/cart_ejs_folder/p5.png",
	name:"Halloween",
	price:680
}),

new Scarves({
	imagepath:"/cart_ejs_folder/p6.png",
	name:"Portrait",
	price:680
})
];

var len =products.length;
var len2=scarves.length;

var done=0;
// for(var i=0;i<len2;i++){
// 	scarves[i].save(function(err,res){

// 	});
// }
for(var i=0;i<len;i++){
	paintings[i].save(function(err,res){
		console.log("hi");
		done++;
		if(done==len){
			console.log("exit");
			exit();
		}
	});
	function exit(){
		mongoose.disconnect();
	}
}