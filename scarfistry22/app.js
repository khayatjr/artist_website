var express= require ("express");
var mongoose= require ("mongoose");
var Product= require("./products");
var Scarves= require("./scarves");
var Painting= require("./paintings");
var Species=require("./species");
var Cart= require("./cart");
var session=require("express-session");
var mongostore= require("connect-mongo")(session);
var flash = require('connect-flash');
var app= express();
var nodemailer = require('nodemailer');
var cart;
var arr=[];
var mongodb=require("mongodb");
var Order=require("./order")
app.use(flash());
app.use(express.static("public"));
//app.use(express.static("/public"));



var bodyparser= require("body-parser");

// mongodb://localhost:27017/scarfistry
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Youssef:q6lq677vzble1CNq@cluster0-ekeib.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });

  console.log("hey");


 app.get("/",function(req,res){
res.render("new_home.ejs");

	
});
 app.use(bodyparser.urlencoded({extended: true}));
app.use(session({secret:"secret",
	resave:false,
	saveUninitialized:false,
	// store: new mongostore({mongooseConnection: mongoose.connection}),
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
 app.get("/home",function(req,res){
	console.log("AYWAAAAA");
	res.render("new_home.ejs");
	
});

app.get("/contact",function(req,res){
	res.render("contact.ejs");
	
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
MongoClient.connect(uri, async function(err, db) {
  if (err) throw err;
  var dbo = db.db("scarfistry");
  let result = await dbo.collection("products").find();
   
   console.log(result.name);
     res.render("shirts.ejs",{products:result,totalQty:totalQty});
     
 
});
		
	

	
	
	

  // perform actions on the collection object
  
});

// mongoose.connect('mongodb://Youssef:q6lq677vzble1CNq@cluster0-ekeib.mongodb.net/test?retryWrites=true&w=majority',{
// 	useNewUrlParser:true,
// 	useCreateIndex:true

// 	}).then(() =>{
// 		console.log('DB connected');
// 	}).catch (err =>{
// 		console.log('Error:',err.message);
// 	});
// const UserSchema = new mongoose.Schema({F
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
    user: 'scarfistry@gmail.com',
    pass: 'M01098013054'
  }
});





app.post("/mail", function (req, res) {

	var mailOptions = {
  from:  'scarfistry@gmail.com',
  to: 'mai_naga@hotmail.com',
  subject: 'contact page',
  
  text: req.body.mssg +"\n"+"\n"+
  "From:"+" "+req.body.name +"\n"+"\n"+
   
  "Phone:"+" "+req.body.phone +"\n"+ "\n"+
  "Email:"+" "+req.body.email 
  
  
};

// 1. Set up your server to make calls to PayPal
// Add your client ID and secret
//     var PAYPAL_CLIENT = 'AWNpqdTIYEeLLEqj0GBzp1TvGwONMmOH0TYIs7B7qYZV78AFHgCKew3j8EHWv5ysKJ83tkz9QXh9JGla';
//     var PAYPAL_SECRET = 'EMME0oPHpFrC13vZ7e_4KovRriM13C3WMojwYJFX2OSCpzXMI_CB35IlUxVKklBHVBLjTUQ0IlMl1q3Y';

//   // Point your server to the PayPal API
//     var PAYPAL_ORDER_API = 'https://api.paypal.com/v2/checkout/orders/';
// // 1a. Import the SDK package
// const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

// 1b. Import the PayPal SDK client that was created in `Set up Server-Side SDK`.
/**
 *
 * PayPal HTTP client dependency
 */
// const payPalClient = require('../Common/payPalClient');

// 2. Set up your server to receive a call from the client
module.exports = async function handleRequest(req, res) {

  // 2a. Get the order ID from the request body
  const orderID = req.body.orderID;

  // 3. Call PayPal to get the transaction details
  let request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderID);

  let order;
  // try {
  //   order = await payPalClient.client().execute(request);
  // } catch (err) {

  //   // 4. Handle any errors from the call
  //   console.error(err);
  //   return res.send(500);
  // }

  // 5. Validate the transaction details are as expected
  // if (order.result.purchase_units[0].amount.value !== '220.00') {
  //   return res.send(400);
  // }

  // 6. Save the transaction in your database
  // await database.saveTransaction(orderID);

  // 7. Return a successful response to the client
  // return res.send(200);
}
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    req.flash('mssg','Thank your message is received successfully ');
  }
  
  res.redirect("/contact");
});
});

// app.get("/",function(req,res){
// res.render("new_home.ejs");
	
// });
app.get("/remove/:id",function(req,res,next){

var productId=req.params.id;
console.log(productId);
cart=new Cart(req.session.cart? req.session.cart:{});
cart.removeItem(productId);
req.session.cart=cart;
res.redirect("/check");
 // res.render("checkout.ejs",{bag:cart.generateArray(),price:cart.totalPrice,size:arr});

});

app.get("/admin",function(req,res,next){

Order.find(function(err,docs){
	res.render("admin.ejs",{orders:docs});
	});
 // res.render("checkout.ejs",{bag:cart.generateArray(),price:cart.totalPrice,size:arr});

});



	

	app.get("/paintings",function(req,res){
		
		
		req.session.cart=cart;
		if(!req.session.cart){
			totalQty=0;
		}
		else{
			totalQty=req.session.cart.totalQty;
		}
	 // var cart= (req.session.cart ? req.session.cart.length :0);
	

	Painting.find(function(err,docs){
	res.render("paintings.ejs",{paintings:docs,totalQty:totalQty,bag:cart});
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
	 
	 // var docs2 = Species.find();
	
	
	Scarves.find(function(err,doc){
		 

	res.render("scarves.ejs",{scarves:doc,totalQty:totalQty});
	});
	
// async function run (res) {
//   var resulting = await Scarves.find();
//    var resulting2 = await Species.find();
//    res.render("scarves.ejs",{scarves:resulting,species:resulting2,totalQty:totalQty});
//    };
// run(res);


	
	
	

	
	
	});
	var size;
	var coloring;
app.post("/size/:id", function (req, res) {
	size=req.body.example;
	coloring=req.body.coloring;
	arr.push(size);
	console.log(size);

   var productId=req.params.id;
	cart= new Cart(req.session.cart ? req.session.cart :{});

	Product.findById(productId,function(err,product){
		if(err){
			return res.redirect("/check");
		}
		cart.add(product,product.name + size + coloring,size,coloring);
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


app.get("/customise",function(req,res){
	res.render("customise.ejs");
	
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
  from:  'scarfistry@gmail.com',
  to: 'mai_naga@hotmail.com',
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



app.post("/custom",function(req,res,next){
	
	
		var mailOptions = {
  from:  'scarfistry@gmail.com',
  to: 'mai_naga@hotmail.com',
  subject: 'Custom order',
  // attachments:req.body.upload,
  	

 
    
  
  text: "check the new order" +"\n"+"\n"+
  "From:"+" "+req.body.name +"\n"+"\n"+
   
  "Phone:"+" "+req.body.phone +"\n"+ "\n"+
  "order:"+" "+req.body.order 
  
  
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    req.flash('sent','order placed successfully, you will be contacted soon ');
    
  }
  
  res.redirect("/customise");

});

	
	

});
app.post("/addscarf/:id",function(req,res){


	var productId=req.params.id;
	 cart= new Cart(req.session.cart ? req.session.cart :{});

	Scarves.findById(productId,function(err,product){
		if(err){
			 return res.redirect("/check");
		}
		cart.add(product,product.name+"","","");
		req.session.cart=cart;
		console.log(req.session.cart.totalQty);
		console.log(product.name);
		Scarves.find(function(err,docs){

	res.redirect("/scarves");
	});
// 		res.render('shirts.ejs', {
//     	layout:false,
//     	session: req.session
// });
		
	});
	
});





app.get("/addpaint/:id",function(req,res){


	var productId=req.params.id;
	 cart= new Cart(req.session.cart ? req.session.cart :{});

	Painting.findById(productId,function(err,product){
		if(err){
			 return res.redirect("/check");
		}
		cart.add(product,product.name+"","","");

		req.session.cart=cart;
		console.log(req.session.cart.totalQty);
		console.log(product.name);
		Painting.find(function(err,docs){

	res.redirect("/paintings");
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

