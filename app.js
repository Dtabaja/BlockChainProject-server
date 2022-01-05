const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// app config
const routerHash = require("./routes/hashRoute");
const routerBlock = require("./routes/blockRoute");
const routerBlockchain = require("./routes/blockchainRoute");
const routerKeys = require("./routes/keysRoute");
const routerSignature = require("./routes/signatureRoute");
const routerTransaction = require("./routes/transactionRoute");

app = express();
//determine whether it is safe to allow the cross-origin request
app.use(cors());

//translate the json that send from app
app.use(express.json({ limit: "50mb", extended: true}));
app.use(
    express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000})
);


//routers
app.use((req, res, next) => next(), routerHash);
app.use((req, res, next) => next(), routerBlock);
app.use((req, res, next) => next(), routerBlockchain);
app.use((req, res, next) => next(), routerKeys);
app.use((req, res, next) => next(), routerSignature);
app.use((req, res, next) => next(), routerTransaction);


const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://daniel:4HlUxcjEvfIhRRDT@cluster0.ozbgh.mongodb.net/blockProject?retryWrites=true&w=majority"
const client = new MongoClient(uri)
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
}).then(() => {
    console.log("successfully connected to DB:)");
}).catch(err => {
    console.log("Error", err.message);
});

app.listen(5000, () => console.log("Example app listening on port 5000!"));

  