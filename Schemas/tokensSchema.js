const mongoose = require("mongoose");

const TXSchema = new mongoose.Schema({
    amount: String,
    from: String,
    to:String
});

const TXArrSchema = new mongoose.Schema({
 arrTXSchema: [TXSchema],
});

const tokenSchema = new mongoose.Schema({
    Blocks: [TXArrSchema],
},{ collection:'tokens'});


module.exports = mongoose.model("tokens", tokenSchema);