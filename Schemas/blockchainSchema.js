const mongoose = require("mongoose");
const blockContent = require("./blockSchema");

const blockchainSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false,
        unique: true,
    },
    blockchain: {
        type: Array,
        required: false,
    },
});

module.exports = mongoose.model("blockchainContent", blockchainSchema);