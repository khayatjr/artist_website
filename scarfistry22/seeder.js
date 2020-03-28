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
	imagepath:'/paintings/11.jpg',
	img2:"/paintings/1.jpeg",
	zoom:"/paintings/zoom1.jpg",
	material:"mixed media on wood panel ",
	name:"Guardian of the legacy",
	size:"120 x 100 cm",
	price:6000,
	description:"A piece that speaks of history people and an appreciation of Egypts riches A closer look reveals subtle details of intriguing elements as well as a myriad of textures "
}),

new Paintings({
	imagepath:'/paintings/22.jpg',
	img2:"/paintings/2.jpg",
	zoom:"/paintings/zoom2.jpg",
	material:"mixed media on wood panel piece",
	name:"Al Amira Mariam",
	size:"150 x 120 cm ",
	price:7000,
	description:" "
}),
new Paintings({
	imagepath:'/paintings/33.jpg',
	img2:"/paintings/3.jpg",
	zoom:"/paintings/zoom3.jpg",
	material:"Oil on canvas",
	name:"\"All for 30\"",
	size:"100 cm x 70 cm",
	price:8500,
	description:"The painting depicts a teenage boy at Cairos metro station. Dressed in a torn, worn out Gucci shirt & holding a basket full of expensive perfume, the boy represents the paradox that is Cairos current state. "
}),

new Paintings({
	imagepath:'/paintings/44.jpg',
	img2:"/paintings/44.jpg",
	zoom:"/paintings/zoom4.jpg",
	material:"Oil on canvas ",
	name:"Ecstasy ",
	size:"100 x 70 cm ",
	price:3500,
	description:" h"
}),

new Paintings({
	imagepath:'/paintings/55.jpg',
	img2:"/paintings/5.jpg",
	zoom:"/paintings/zoom5.jpg",
	material:"Oil on canvas",
	name:"Youth",
	size:"120 x 80 cm ",
	price:7000,
	description:"h "
})
];





var products=
[
	new Product({
	imagepath:"/shirts_pics/11.jpg",
	img2:"/shirts_pics/12.jpeg",
	name:"Tongue-tied",
	price:350
}),

new Product({
	imagepath:"/shirts_pics/21.jpg",
	img2:"/shirts_pics/22.jpg",
	name:"EL Mooled",
	price:350
}),

new Product({
	imagepath:"/shirts_pics/31.jpg",
	img2:"/shirts_pics/32.jpeg",
	name:"The Temple",
	price:350
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

var len =paintings.length;
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