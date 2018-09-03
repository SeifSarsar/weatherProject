var express = require('express');
var app = express();
var port = 3000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//connect server to the web app
mongoose.connect("mongodb://localhost:27017/WeatherAppDB",{ useNewUrlParser: true });

var commentSchema = new mongoose.Schema ({
    user: String,
    text: String,
    review: Number
});

var Comment = mongoose.model("comments", commentSchema);
app.use(bodyParser.json())

app.get('/home',function (req,res){
    Comment.find(function(err,comments){
        res.json(comments);
    })   
});
app.post('/home',function (req,res){
    if (req.body._id){
        //Remove
         var commentToDelete = new Comment({
                _id : req.body._id,
                user : req.body.user,
                text : req.body.text,
                review : req.body.review
        });
        
        commentToDelete.remove(function(err){
            if (err){
                console.log("Could not remove this comment.")
            }
            else{
                console.log("Comment successfully removed.") 
            }
        });
    }
    else {
        //save
        var newComment = new Comment({
                user : req.body.user,
                text : req.body.text,
                review : req.body.review
        });
    
        newComment.save(function(err){
            if (err){
                console.log("Could not save new comment.")
            }
            else{
                console.log("New comment successfully saved.") 
            }
        });
    }
    
        

   
});

app.use(express.static(__dirname));

app.listen(port, () => {
 console.log("Server listening on port " + port);
});