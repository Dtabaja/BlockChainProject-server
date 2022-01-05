const express = require("express");
const router = express.Router();
const blockContent = require("../Schemas/blockSchema");
const CryptoBlock = require("../block");
const { updateBlock } = require("../updateToMongo/update");

let block;
const difficulty = 4;
const id = "block";

router.get("/block/initBlock", async (req, res) => {
  const index = "1";
  const block = new CryptoBlock(index, Date.now(), "");
  block.mineBlock(difficulty);
  const content = new blockContent({
    ...block, 
    id: id,
  });
  content.save().catch(() => {
    updateBlock(block, id);
  });

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    index: block.index,
    nonce: block.nonce,
    data: block.data,
    hash: block.hash,
    isMine: block.isMine,
  });
});

router.post("/block/getBlock", async (req, res) => {
  const index = req.body.index;
  const data = req.body.data;
  const nonce = req.body.nonce;
  block = new CryptoBlock(index + "", Date.now(), data, "", nonce);
  block.checkIfBlockMine();

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    index: block.index,
    nonce: block.nonce,
    data: block.data,
    hash: block.hash,
    isMine: block.isMine,
  });
});

router.post("/block/mine", async (req, res) => {
  const index = req.body.index;
  const data = req.body.data;
  block = new CryptoBlock(index + "", Date.now(), data);
  block.mineBlock(difficulty);

  updateBlock(block, id);

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    index: block.index,
    nonce: block.nonce,
    data: block.data,
    hash: block.hash,
    isMine: block.isMine,
  });
});

module.exports = router;
