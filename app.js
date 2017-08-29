	import http from 'http';
	import express from 'express';
	import bodyParser from 'body-parser';
	import mongoose from 'mongoose';
	let Schema = mongoose.Schema;
	let app = express();
	let db = 'mongodb://localhost:27017/test';/*providing port number to local host*/
	mongoose.connect(db);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	/*defining schema*/
	let mySchema = new Schema({
		name:String,
		city:String,
		designation:String
	},{collection:"roots"});
	let Employee=mongoose.model('roots',mySchema);
	/*defining method to retrieve values from data*/
	app.get('/employee',(req,res)=>{
		console.log('database require for employee');
		Employee.find({})
		.exec((err,employees)=>{
			if(err){
				res.send('error occured')
			}
			else{
				console.log(employees);
				res.json(employees);
			}
			
		})
	});
	/*defining method to add values to data*/
	app.post('/insert', (req, res, next)=>{
		Employee.insertMany({
			"name":req.body.name,
			"city":req.body.city,
			"designation":req.body.designation
		},(err,user)=>{
			if(err)
				console.log(err);
			else
			{
				console.log(user);
				res.json({user:user});
			}
		})
	});
	/*defining method to update values in data*/
	app.put('/updates/:name',(req,res,next)=>{
		Employee.findOneAndUpdate({
			"name":req.params.name
		},
		{$set:{city:req.body.city}
	},(err,data)=>{
		if(err)
			console.log(err);
		else{
			console.log(data);
			res.json(data);
		}
	})
	});
	/*defining method to delete values from data*/
	app.delete('/deletes',(req,res,next)=>{
		Employee.remove({
			city:req.body.city
		},(err,data)=>{
			if(err)
				console.log(err);
			else{
				console.log(data);
				res.json(data);
			}
		})
	});
	//app.listen(port,()=>{
		//console.log('app listening on port'+port);
	//});
	http.createServer(app).listen(8080,'127.0.0.1');
	console.log('Server running at http://127.0.0.1:8080/');
