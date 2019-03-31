var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

var mongoose = require('mongoose');

//Connext to the database
mongoose.connect('mongodb://test:test......../todo');

var todoSchema = new mongoose.Schema({
    item:String
})

var Todo = mongoose.model('Todo',todoSchema);

/*
var itemOne = Todo({item:'buy flowers}).save(function(err){
  if(err) throw err;
  console.log('item saved');
})

*/

/*
var data = [{
    item:"get milk",
},{
    item:"walk dog",
},{
    item:"diary food",
}];

*/

module.exports = function(app){
    app.get('/todo',function(req,res){
	if(req.query.item){
    	  //delete the requested item from mongodb
    	  Todo.find({item:req.query.item}).remove(function(err,data){
    	    if(err) throw err;
    	    res.render('todo',{todos:data});	        	    
          })	    
	} else {
          //get data from mongodb and pass it to view
    	  Todo.find({},function(err,data){
    	    if(err) throw err;
    	    res.render('todo',{todos:data});	    
    	  })
	}


    })
    app.post('/todo',urlencodedParser,function(req,res){
	//get data from the view and add it to mongodb
	var newTodo = Todo(req.body).save(function(err,data){
	    if(err) throw err;	
            res.render('todo',{todos:data});	     
	})

    })
}
