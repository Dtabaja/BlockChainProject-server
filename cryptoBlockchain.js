const CryptoBlock = require("./block");
const Difficulty = 4
class CryptoBlockchain {
    constructor() {
        this.blockchain = [this.startGenesisBlock()];
    }

    startGenesisBlock() {
        const firstBlock = new CryptoBlock("1", "01/08/2020", "", "0");
        firstBlock.mineBlock(4);
        return firstBlock;
    }

    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

    addNewBlock(newBlock) {
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.mineBlock(Difficulty);
        this.blockchain.push(newBlock);
    }

    changeBlockchain(newBlock) {
        this.blockchain[newBlock.numBlock].data = newBlock.data;
        this.blockchain[newBlock.numBlock].index = newBlock.index;
        this.blockchain[newBlock.numBlock].nonce = newBlock.nonce;
        let stopCheckIfMine = false;

        for (let i = newBlock.numBlock; i < this.blockchain.length; i++) {
            if (i === 0) {
                this.blockchain[i].precedingHash = "0";
                this.blockchain[i].hash = this.blockchain[i].computeHash();
            } else {
                this.blockchain[i].precedingHash = this.blockchain[i - 1].hash;
                this.blockchain[i].hash = this.blockchain[i].computeHash();
            }
            if (!stopCheckIfMine) {
                this.blockchain[i].checkIfBlockMine();
                if (!this.blockchain[i].isMine) stopCheckIfMine = true;
            } else {
                this.blockchain[i].isMine = false;
            }
        }
    }

    mineBlockchain(newBlock) {
        //this.blockchain[newBlock.numBlock].data = newBlock.data;
        //this.blockchain[newBlock.numBlock].index = newBlock.index;
        this.blockchain[newBlock.numBlock].nonce = 0;
        const computeMoreThanOne = this.blockchain[newBlock.numBlock].mineBlock(4);
        if (!computeMoreThanOne) {
            this.blockchain[newBlock.numBlock].nonce = newBlock.nonce;
        }

        for (let i = newBlock.numBlock + 1; i < this.blockchain.length; i++) {
            this.blockchain[i].precedingHash = this.blockchain[i - 1].hash;
            this.blockchain[i].hash = this.blockchain[i].computeHash();
            this.blockchain[i].checkIfBlockMine();
        }
    }
}

module.exports = CryptoBlockchain;