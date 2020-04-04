var mongoose= require("mongoose");
var Product= require("./products");
var Scarves=require("./Scarves");
var Paintings=require("./paintings");
var Species=require("./species");
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
	description:"A piece that speaks of history people and an appreciation of Egypt\'s riches. A closer look reveals subtle details of intriguing elements as well as a myriad of textures. "
}),

new Paintings({
	imagepath:'/paintings/44.jpg',
	img2:"/paintings/44.jpg",
	zoom:"/paintings/zoom4.jpg",
	material:"mixed media on wood panel piece",
	name:"Al Amira Mariam",
	size:"150 x 120 cm ",
	price:7000,
	description:"h"
}),
new Paintings({
	imagepath:'/paintings/33.jpg',
	img2:"/paintings/3.jpg",
	zoom:"/paintings/zoom3.jpg",
	material:"Oil on canvas",
	name:"\"All for 30\"",
	size:"100 cm x 70 cm",
	price:8500,
	description:"The painting depicts a teenage boy at Cairos metro station. Dressed in a torn, worn out Gucci shirt & holding a basket full of expensive perfume, the boy represents the paradox that is Cairo\'s current state. "
}),

new Paintings({
	imagepath:'/paintings/22.jpg',
	img2:"/paintings/2.jpg",
	zoom:"/paintings/zoom2.jpg",
	material:"Oil on canvas ",
	name:"Ecstasy",
	size:"100 x 70 cm ",
	price:3500,
	description:"h"
}),

new Paintings({
	imagepath:'/paintings/55.jpg',
	img2:"/paintings/5.jpg",
	zoom:"/paintings/zoom5.jpg",
	material:"Oil on canvas",
	name:"Youth",
	size:"120 x 80 cm ",
	price:7000,
	description:"h"
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
	imagepath:"/sushi1.jpeg",
	image2:"/sushi2.jpg",
	name:"Sushi",
	price:550
}),

	

new Scarves({
	imagepath:"/traveler.jpeg",
	image2:"none",
	name:"The traveler",
	price:650
}),

new Scarves({
	imagepath:"/portrait1.jpeg",
	image2:"none",
	name:"Portrait",
	price:650
}),
new Scarves({
	imagepath:"/portrait2.jpeg",
	image2:"none",
	name:"Day dreamer",
	price:650
}),
new Scarves({
	imagepath:"/bee_eater1.jpeg",
	image2:"/bee_eater2.jpeg",
	name:"Bee eater",
	price:750
}),

new Scarves({
	imagepath:"/white_stroke1.jpg",
	image2:"/white_stroke2.jpeg",
	name:"White storke",
	price:650
}),

new Scarves({
	imagepath:"/egyptian_v1.jpeg",
	image2:"/egyptianv2.jpeg",
	name:"Egyptian vulture",
	price:650
})
];
var species=
[
	new Species({
	imagepath:"/bee_eater1.jpeg",
	image2:"/bee_eater2.jpeg",
	name:"Bee eater",
	price:750
}),

new Species({
	imagepath:"/white_stroke1.jpg",
	image2:"/white_stroke2.jpeg",
	name:"White storke",
	price:650
}),

new Species({
	imagepath:"/egyptian_v1.jpeg",
	image2:"/egyptian_v2.jpeg",
	name:"Egyptian vulture",
	price:650
})
];
var len =paintings.length;
var len2=scarves.length;
var len3=species.length;
var done=0;

async function run(){
await scarves[0].save();
await scarves[1].save();
await scarves[2].save();
await scarves[3].save();
await scarves[4].save();
await scarves[5].save();
await scarves[6].save();

}
run();
// for(var i=0;i<len2;i++){
// 	scarves[i].save(function(err,res){

// 	});
// }
// for(var i=0;i<len2;i++){
// 	scarves[i].save(function(err,res){
// 		console.log("hi");
// 		done++;
// 		if(done==len2){
// 			console.log("exit");
// 			exit();
// 		}
// 	});
// 	function exit(){
// 		mongoose.disconnect();
// 	}
// }