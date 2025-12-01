let mongoose = require("mongoose");
mongoose.connect("");
let userSchema = new mongoose.Schema({
    username :{type:String ,required:true,unique:true},  
    password :string
});

let userModel = mongoose.model("user",userSchema)

let gameSchema = mongoose.Schema({
    name:String,
    player1:{ref:"user" ,type: mongoose.Schema.Types.ObjectId ,required:true},
    player2:{ref:"user" ,type: mongoose.Schema.Types.ObjectId},
    moves:[{ x:Number,y:Number}]
})

let gameModel = mongoose.model("games",gameSchema)

module.exports={
    userModel,
    gameModel
}