
class Signature {
    constructor(message, prKey, puKey, signature, isVerify) {
        this.message = message;
        this.prKey = prKey;
        this.puKey = puKey;
        this.signature = signature;
        this.isVerify = isVerify; 
    }

}

module.exports = Signature;