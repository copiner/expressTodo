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
	console.log(req.query)
	data = data.filter(function(todo){
	    return todo.item !== req.query.item;
	});
	res.render('todo',{todos:data});
    })
    app.post('/todo',urlencodedParser,function(req,res){
	data.push(req.body);
	res.render('todo',{todos:data});	 
    })
/*    
    app.delete('/todo/:item',function(req,res){
        //req.params
	data = data.filter(function(todo){
	    return todo.item.replace(/ /g,'-') !== req.params.item;
	});
	res.render('todo',{todos:data});
    })
 */
    
}
/*
采用GET方式，那么action url中参数都会被丢弃，
提交时候只会把form中的数据拼接在url向服务器提交；
POST的方式则不会这样，它会按照action指定的url进行提交数据，
包含url后面跟着的参数和参数值。
*/
