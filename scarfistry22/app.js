var express= require ("express");
var mongoose= require ("mongoose");
var Product= require("./products");
var Scarves= require("./scarves");
var Cart= require("./cart");
var exphbs  = require('express-handlebars');
var session=require("express-session");
var mongostore= require("connect-mongo")(session);
const { check, validationResult } = require('express-validator/check');
var flash = require('connect-flash');
var app= express();
var nodemailer = require('nodemailer');
var cart;
var arr=[];
var Order=require("./order")
app.use(flash());
app.use(express.static("public"));
//app.use(express.static("/public"));


app.engine('.hbs', exphbs({extname: '.hbs',
							defaultView: 'default',
							layoutsDir: './views'
										}));
app.set('view engine', '.hbs');

var bodyparser= require("body-parser");
mongoose.connect('mongodb://localhost:27017/scarfistry',{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
// const UserSchema = new mongoose.Schema({
//     name :String
        
//     });
// var exm=mongoose.model("yalla",UserSchema);
// exm.create({name:"joe"},function(err,exm){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{console.log("done");
// }
// });
var len=0;
var transporter = nodemailer.createTransport({
  service: 'gmail',
    secure: false,
    requireTLS: true,
  auth: {
    user: 'khayatove@gmail.com',
    pass: 'Maradona10'
  }
});



app.use(bodyparser.urlencoded({extended: true}));
app.use(session({secret:"secret",
	resave:false,
	saveUninitialized:false,
	store: new mongostore({mongooseConnection: mongoose.connection}),
	cookie:{maxAge: 180*60*1000}	
}));
app.use(function(req,res,next){
	res.locals.session=req.session;
	next();
});
app.use(function(req, res, next){
  res.locals.messages = req.flash();
  next();
});
app.post("/mail", function (req, res) {

	var mailOptions = {
  from:  'khayatove@yahoo.com',
  to: 'khayatove@yahoo.com',
  subject: 'contact page',
  
  text: req.body.mssg +"\n"+"\n"+
  "From:"+" "+req.body.name +"\n"+"\n"+
   
  "Phone:"+" "+req.body.phone +"\n"+ "\n"+
  "Email:"+" "+req.body.email 
  
  
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    req.flash('success','Thank your message is sent successfully ');
  }
  
  res.redirect("/contact");
});
});

app.get("/",function(req,res){
	if(!req.session.cart){
			totalQty=0;
		}
		else{
			totalQty=req.session.cart.totalQty;
		}
	
	 // var cart= (req.session.cart ? req.session.cart.length :0);
	Scarves.find(function(err,docs){
	res.render("scarves.ejs",{scarves:docs,totalQty:totalQty});
	});

	
	
});
app.get("/remove/:id",function(req,res,next){

var productId=req.params.id;
console.log(productId);
cart=new Cart(req.session.cart? req.session.cart:{});
cart.removeItem(productId);
req.session.cart=cart;
res.redirect("/check");
 // res.render("checkout.ejs",{bag:cart.generateArray(),price:cart.totalPrice,size:arr});

});

	app.get("/tshirts",function(req,res){
		
		
		req.session.cart=cart;
		if(!req.session.cart){
			totalQty=0;
		}
		else{
			totalQty=req.session.cart.totalQty;
		}
	 // var cart= (req.session.cart ? req.session.cart.length :0);
	Product.find(function(err,docs){
	res.render("shirts.ejs",{products:docs,totalQty:totalQty});
	});
	});

	app.get("/scarves",function(req,res){
		if(!req.session.cart){
			totalQty=0;
		}
		else{
			totalQty=req.session.cart.totalQty;
		}
		
		req.session.cart=cart;
	 // var cart= (req.session.cart ? req.session.cart.length :0);
	Scarves.find(function(err,docs){
	res.render("scarves.ejs",{scarves:docs,totalQty:totalQty});
	});
	});
	var size;
app.post("/size/:id", function (req, res) {
	size=req.body.example;
	arr.push(size);
	console.log(size);

   var productId=req.params.id;
	cart= new Cart(req.session.cart ? req.session.cart :{});

	Product.findById(productId,function(err,product){
		if(err){
			return res.redirect("/check");
		}
		cart.add(product,product.name + size,size);
		req.session.cart=cart;
		console.log(req.session.cart.totalQty);
		console.log(product.name);
		Product.find(function(err,docs){

	res.redirect("/tshirts");
	});
		
		
	});
});




app.get("/check",function(req,res,next){
	if(!req.session.cart || req.session.cart.totalPrice==0){
		return res.render("checkout.ejs",{bag:null});
	}
	var bag= req.session.cart;

	  res.render("checkout.ejs",{bag:cart.generateArray(),price:cart.totalPrice,size:arr});

	
});
app.get("/home",function(req,res){
	res.render("new_home.ejs");
	
});

app.get("/contact",function(req,res){
	res.render("contact.ejs");
	
});


app.get("/add/:id",function(req,res){

	
	var productId=req.params.id;
	cart= new Cart(req.session.cart ? req.session.cart :{});

	Product.findById(productId,function(err,product){
		if(err){
			return res.redirect("/check");
		}
		cart.add(product,product.name+size);
		
	
	

	

		req.session.cart=cart;
		console.log(req.session.cart.totalQty);
		console.log(product.name);
		Product.find(function(err,docs){

	res.render("shirts.ejs",{products:docs,totalQty:req.session.cart.totalQty});
	});
		
		
	});

	
});

app.post("/order",function(req,res,next){
	var order=new Order({
		customer:req.body.name,
		order:cart,
		phone:req.body.phone,
		email:req.body.email,
		address:req.body.address,
		region:req.body.region,
		status:"pending"

	});
	order.save(function(err,result){
	req.flash('success','order placed successfully, you will be contacted soon ');
		var mailOptions = {
  from:  'khayatove@yahoo.com',
  to: 'khayatove@yahoo.com',
  subject: 'New order',
  
  text: "check the new order" +"\n"+"\n"+
  "From:"+" "+req.body.name +"\n"+"\n"+
   
  "Phone:"+" "+req.body.phone +"\n"+ "\n"+
  "Email:"+" "+req.body.email 
  
  
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    
  }
  
  
});

	req.session.cart=null;
	cart=null;
	res.redirect("/check");

	});
	

});
app.get("/addscarf/:id",function(req,res){


	var productId=req.params.id;
	 cart= new Cart(req.session.cart ? req.session.cart :{});

	Scarves.findById(productId,function(err,product){
		if(err){
			 return res.redirect("/check");
		}
		cart.add(product,product.name+"","");
		req.session.cart=cart;
		console.log(req.session.cart.totalQty);
		console.log(product.name);
		Scarves.find(function(err,docs){

	res.redirect("/");
	});
// 		res.render('shirts.ejs', {
//     	layout:false,
//     	session: req.session
// });
		
	});
	
});



app.listen(3000,function(){
	console.log("hii");
});