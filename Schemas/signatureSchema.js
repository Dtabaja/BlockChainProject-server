const mongoose = require("mongoose");

const SignatureSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false,
        unique: true,
    },
    message: {
        type: String,
        required: false,
        unique: true,
    },
    prKey: {
        type: String,
        required: false,
    },
    puKey: {
        type: String,
        require: false,
    },
    signature: {
        type: String,
        require: false,
    },
      isVerify: {
        type: Boolean,
        require: false,
    },
});

module.exports = mongoose.model("signatureContent", SignatureSchema);