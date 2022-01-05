const express = require("express");
const router = express.Router();
const CryptoBlock = require("../block");


router.post("/hash", (req, res) => {
  const data = req.body.data;
  const block = new CryptoBlock(0, 0, data);
  const hash = block.hash;
  
  res.header("Access-Control-Allow-Origin", "*");
  res.send(hash);
});

module.exports = router;
