const SHA256 = require("crypto-js/sha256");
const Difficulty = 4
class CryptoBlock {
  constructor(
    index,
    timestamp,
    data,
    precedingHash = "",
    nonce = 0,
    hash = false,
    isMine = true
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.precedingHash = precedingHash;
    this.nonce = nonce;
    this.hash = hash ? hash : this.computeHash();
    this.isMine = isMine;
  }
  computeHash() {
    return SHA256(
      this.index +
        this.precedingHash +
        //this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }
  mineBlock(difficulty) {
    let computeMoreThanOne = false;
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.computeHash();
      computeMoreThanOne = true;
    }
    this.isMine = true;
    return computeMoreThanOne;
  }

  checkIfBlockMine() {
    const copyBlock = new CryptoBlock(
      this.index,
      "01/08/2020",
      this.data,
      this.precedingHash,
      this.nonce
    );
    copyBlock.mineBlock(Difficulty);
    if (copyBlock.hash == this.computeHash()) {
      this.isMine = true;
    } else {
      this.isMine = false;
    }
  }
}

module.exports = CryptoBlock;
