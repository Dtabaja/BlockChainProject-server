const express = require("express");
const router = express.Router();
const Signature = require("../signature");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const signatureContent = require("../Schemas/signatureSchema");
const {updateSignature} = require("../updateToMongo/update");

const id = "keys";
let key;
router.get("/keys/initKeys", async (req, res) => {
  const key = ec.genKeyPair();
  const signature = new Signature(
    "",
    key.getPrivate("hex"),
    key.getPublic("hex"),
    ""
  );

  const content = new signatureContent({
    ...signature,
    id: id,
  });
  content.save().catch(() => {
    updateSignature(signature, id);
  });

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    prKey: signature.prKey,
    puKey: signature.puKey,
  });
});

router.post("/keys/publicKey", async (req, res) => {
  const privateKey = req.body.prKey;
  const publicKey = ec.keyFromPrivate(privateKey).getPublic("hex").toString();

  const signature = new Signature("", privateKey, publicKey, "");

  updateSignature(signature, id);

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    prKey: privateKey,
    puKey: publicKey,
  });
});
module.exports = router;
