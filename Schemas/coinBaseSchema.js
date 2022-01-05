const mongoose = require("mongoose");

const TXSchema = new mongoose.Schema({
    amount: String,
    from: String,
    to:String
});

const TXArrSchema = new mongoose.Schema({
 arrTXSchema: [TXSchema],
});

const coinBaseSchema = new mongoose.Schema({
    Blocks: [TXArrSchema],
},{ collection:'coinbase'});


module.exports = mongoose.model("coinbase", coinBaseSchema);