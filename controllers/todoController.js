
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

var mongoose = require('mongoose');
//Connext to the database mongodb://mongo:27017/todos
//process.env.CONNECTIONSTRING
console.log(process.env.CONNECTIONSTRING)
mongoose.connect('mongodb://mongo:27017/todos',{useNewUrlParser: true}).then(
    ()=>{
      console.log("connected to mongoDB")
    },
    (err)=>{
       console.log("err",err);
     });

var todoSchema = new mongoose.Schema({
    item:String
})

var Todo = mongoose.model('Todo',todoSchema);
/*
Todo.find({},function(err,data){
	if(err) return console.error(err);
	console.log(data);
});
*/
module.exports = function(app){
    //delete
    app.get('/todo',function(req,res){
    	if(req.query.item){
        	  //delete the requested item from mongodb
            Todo.deleteOne({item:req.query.item},function(err,data){
        	if(err) throw err;
		console.log(data);
        	res.render('todo',{todos:data});
		
            })
    	} else {
	    //show
	    Todo.find({},function(err,data){
		if(err) throw err;
		res.render('todo',{todos:data});
            })	

	}

    })
    //add
    app.post('/todo',urlencodedParser,function(req,res){
    	//get data from the view and add it to mongodb
    	Todo(req.body).save(function(err,data){
    	    if(err) throw err;
	    console.log(data);
            res.render('todo',{todos:data});
    	})

    })
}
