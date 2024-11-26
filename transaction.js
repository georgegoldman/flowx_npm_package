const crypto = require("crypto")

class Transaction {
    constructor(senderWallet, recieveWallet, amount, stablecoin = 'USDT') {
        this.transactionId = this._generateTransactionId();
    }

    _generateTransactionId(){
        const randomData = crypto.randomBytes(16);
        const transactionId = crypto.createHash('sha256')
        .update(randomData)
        .digest("hex")
        .substring(0, 64);

        return transactionId;
    }

    toString() {
        return `Transaction(transactionId='${this.transactionId}', senderWallet='${this.senderWallet}', receiverWallet='${this.receiverWallet}', amount=${this.amount}, status='${this.status}')`;
    }

    getTransactionStatus(txId) {
        console.log(`Fetching status for transaction: ${txId}`);
        return 'completed'; // Mock status
    }
}

class TransactionManager {
    constructor(){
        this._transactions = []; // A list of Transaction objects
    }

    createTransaction(senderWallet, receiverWallet, amount, stablecoin = 'USDT') {
        const transaction = new Transaction(senderWallet, receiverWallet, amount, stablecoin);
        this.addTransaction(transaction);
        return transaction;
    }

    addTransaction(transaction) {
        if (!(transaction instanceof Transaction)) {
            throw new Error("Only instances of the Transaction class can be added.");
        }
        this._transactions.push(transaction);
    }

    listTransaction() {
        return this._transactions;
    }
}

// Export the classes

module.exports = {
    Transaction,
    TransactionManager
}