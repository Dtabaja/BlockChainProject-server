const express = require("express");
const router = express.Router();
const CryptoBlock = require("../block");
const CryptoBlockchain = require("../cryptoBlockchain");
const blockchainContent = require("../Schemas/blockchainSchema");
const {updateBlockchain} = require("../updateToMongo/update");
const typeOfId = "blockchain";
const arrBlockchain = []; //array of all blockchain
const difficulty = 4;
const tokenSchema =  require("../Schemas/tokensSchema");
const coinBaseSchema =  require("../Schemas/coinBaseSchema");



const initBlockchain = () => {
  const blockchain = new CryptoBlockchain();
  let block;
  for (let i = 2; i <4; i++) {
    block = new CryptoBlock(i + "", "01/08/2020", "");
    blockchain.addNewBlock(block);
  }
  return blockchain;
};

const initBlockchainArr = (index) => {
  arrBlockchain[index] = initBlockchain();
};

router.get("/blockchain/initBlockchain", (req, res) => {
  const index = req.query.indexBlockchain;
  initBlockchainArr(req.query.indexBlockchain);

  const cur_blockchain = arrBlockchain[index]; //current blockchain

  const content = new blockchainContent({
    ...cur_blockchain,
    id: typeOfId + index,
  });
  content.save().catch(() => {
    updateBlockchain(cur_blockchain, typeOfId + index);
  });

  res.send(arrBlockchain[index]);
});

router.post("/blockchain/getBlockchain", (req, res) => {
  const newBlock = req.body.newBlock;
  const indexBlockchain = req.body.indexBlockchain;
  const cur_blockchain = arrBlockchain[indexBlockchain];
   
  cur_blockchain.changeBlockchain(newBlock);

    (cur_blockchain, typeOfId + indexBlockchain);

  res.send(cur_blockchain);
});

router.post("/blockchain/mine", (req, res) => {
  const indexBlockchain = req.body.indexBlockchain;
  const newBlock = req.body.newBlock;
  arrBlockchain[indexBlockchain].mineBlockchain(newBlock);

  const cur_blockchain = arrBlockchain[indexBlockchain];
  updateBlockchain(cur_blockchain, typeOfId + indexBlockchain);

  res.send(arrBlockchain[indexBlockchain]);
});
const initWithTX = (initData) => {
const blockchain = new CryptoBlockchain();
  let block;

 // console.log("im hereeeee " + initData["Blocks"]["arrTXSchema"])
 // console.log(initData[0].Blocks[0])
  // we change data so we need compute mine block on the init
  //console.log(initData[0].Blocks[0].arrTXSchema)
  blockchain.blockchain[0].data = initData[0].Blocks[0].arrTXSchema;
  blockchain.blockchain[0].nonce = 0;
  blockchain.blockchain[0].hash = blockchain.blockchain[0].computeHash();
  blockchain.blockchain[0].mineBlock(difficulty);

  for (let i = 1; i <3; i++) {
   // console.log( initData[0].Blocks[i].arrTXSchema)
      block = new CryptoBlock(
      i+1 + "",
      "01/08/2020",
      initData[0].Blocks[i].arrTXSchema
    );
    blockchain.addNewBlock(block);
   
  }
  return blockchain;
};

const initBlockchainArrTX = (initData, index) => {
  arrBlockchain[index] = initWithTX(initData);
};

//need to replace data
router.get("/blockchain/initBlockchainCoinbase",async (req, res) => {
  const index = req.query.indexBlockchain;
  var coinBase =  await coinBaseSchema.find({})
  initBlockchainArrTX(coinBase, index);

  const cur_blockchain = arrBlockchain[index]; //current blockchain

  const content = new blockchainContent({
    ...cur_blockchain,
    id: typeOfId + index,
  });
  content.save().catch(() => {
    updateBlockchain(cur_blockchain, typeOfId + index);
  });

  res.send(arrBlockchain[index]);
});

router.get("/blockchain/initBlockchainToken", async (req, res) => {
  const index = req.query.indexBlockchain;
  var tokens =  await tokenSchema.find({})
 // console.log(tokens[0].Blocks[0].arrTXSchema[0])
 // const myObjStr = JSON.stringify(tokens);
  //console.log(myObjStr.Blocks)
 initBlockchainArrTX(tokens, index);
  
//  if (tokens) {
//         res.json(tokens);
//     } else {
//         res.sendStatus(400);
//     }
  const cur_blockchain = arrBlockchain[index]; //current blockchain

  const content = new blockchainContent({
    ...cur_blockchain,
    id: typeOfId + index,
  });
  content.save().catch(() => {
    updateBlockchain(cur_blockchain, typeOfId + index);
  });

  res.send(arrBlockchain[index]);
});

module.exports = router;
