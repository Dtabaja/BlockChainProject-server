const express = require("express");
const router = express.Router();
const Signature = require("../signature");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const transactionContent = require("../Schemas/transactionSchema");
const {updateTransaction} = require("../updateToMongo/update");
const id = "transaction";
const SHA256 = require("crypto-js/sha256");



router.get("/transaction/initTransaction", async (req, res) => {
  const key = ec.genKeyPair();

  const privateKey = key.getPrivate("hex");
  const fromPublicKey = ec
    .keyFromPrivate(privateKey)
    .getPublic("hex")
    .toString();

  const toPublicKey = ec.genKeyPair().getPublic("hex");
  const message = ["20.00", fromPublicKey, toPublicKey];

  const signature = new Signature(
    JSON.stringify(message),
    privateKey,
    fromPublicKey,
    ""
  );

  const content = new transactionContent({
    ...signature,
    id: id,
  });
  content.save().catch(() => {
    updateTransaction(signature, id);
  });

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    message: message,
    prKey: signature.prKey,
  });
});

router.post("/transaction/getPublicKey", async (req, res) => {
  const privateKey = req.body.prKey;

  const publicKey = ec.keyFromPrivate(privateKey).getPublic("hex").toString();

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    puKey: publicKey,
  });
});

router.post("/transaction/sign", async (req, res) => {
  const message = req.body.message;
  const privateKey = req.body.prKey;
  const publicKey = ec.keyFromPrivate(privateKey).getPublic("hex").toString();

  const hashMsg = SHA256(JSON.stringify(message)).toString();
  const messageSign = ec
    .keyFromPrivate(privateKey)
    .sign(hashMsg, "base64")
    .toDER("hex");

  const signature = new Signature(
    JSON.stringify(message),
    privateKey,
    publicKey,
    messageSign
  );

  updateTransaction(signature, id);

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    puKey: publicKey,
    signature: messageSign,
  });
});
function verifySignatureTransaction(message, messageSign, publicKey) {
  let ifVerify;
  try {
    const hashMsg = SHA256(JSON.stringify(message)).toString();
    ifVerify = ec.keyFromPublic(publicKey, "hex").verify(hashMsg, messageSign);
  } catch (error) {
    ifVerify = false;
  }
  return ifVerify;
}



router.post("/transaction/verify", async (req, res) => {
  const message = req.body.message;
  const publicKey = req.body.puKey;
  const messageSign = req.body.signature;

  const ifVerify = verifySignatureTransaction(message, messageSign, publicKey);
  res.json({
    ifVerify: ifVerify,
    message: message,
    signature: messageSign,
  });
});



module.exports = router;
