const blockContent = require("../Schemas/blockSchema");
const blockchainContent = require("../Schemas/blockchainSchema");
const tokenContent = require("../Schemas/tokensSchema");
const signatureContent = require("../Schemas/signatureSchema");
const transactionContent = require("../Schemas/transactionSchema");

const findBlockchainByIndex = async function(indexBlockchain) {
    const filter = { id: indexBlockchain };
    return await blockchainContent.findOne(filter);
};

const updateBlock = async function(block, id2) {
    const filter = { id: id2 };
    const update = {...block };
    const response = await blockContent.findOneAndUpdate(filter, update);
};

const updateBlockchain = async function(blockchain, id2) {
    const filter = { id: id2 };
    const update = {...blockchain };
    const response = await blockchainContent.findOneAndUpdate(filter, update);
};


const updateSignature = async function(signature, id2) {
    const filter = { id: id2 };
    const update = {...signature };
    const response = await signatureContent.findOneAndUpdate(filter, update);
};
const updateTransaction= async function(signature, id2) {
    const filter = { id: id2 };
    const update = {...signature };
    const response = await transactionContent.findOneAndUpdate(filter, update);
};

module.exports = { updateBlock, updateBlockchain, findBlockchainByIndex,updateSignature,updateTransaction};