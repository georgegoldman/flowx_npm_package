// Conditional imports based on environment
import crypto from "crypto";

let cryptoModule;

if (typeof window === 'undefined') {
    // In Node.js, use the built-in 'crypto' module
    cryptoModule = crypto;
} else {
    // In the browser, use the Web Crypto API available in modern browsers
    cryptoModule = {
        randomBytes: (size) => {
            return new Uint8Array(size).map(() => Math.floor(Math.random() * 256));
        },
        createHash: () => ({
            update: (data) => {
                // Browser-compatible hash function (simple)
                let hash = 0;
                for (let i = 0; i < data.length; i++) {
                    hash = (hash << 5) - hash + data.charCodeAt(i);
                }
                return {
                    digest: (type) => {
                        return hash.toString(16); // Return the hash as a hex string
                    }
                };
            }
        })
    };
}

class Transaction {
    constructor(senderWallet, receiveWallet, amount, stablecoin = 'USDT') {
        this.transactionId = this._generateTransactionId();
        this.senderWallet = senderWallet;
        this.receiveWallet = receiveWallet;
        this.amount = amount;
        this.stablecoin = stablecoin;
        this.status = 'pending'; // Default status
    }

    _generateTransactionId() {
        const randomData = cryptoModule.randomBytes(16);
        const transactionId = cryptoModule.createHash('sha256')
            .update(randomData.toString())
            .digest('hex')
            .substring(0, 64);

        return transactionId;
    }

    toString() {
        return `Transaction(transactionId='${this.transactionId}', senderWallet='${this.senderWallet}', receiverWallet='${this.receiveWallet}', amount=${this.amount}, status='${this.status}')`;
    }

    getTransactionStatus(txId) {
        console.log(`Fetching status for transaction: ${txId}`);
        return 'completed'; // Mock status
    }
}

class TransactionManager {
    constructor() {
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

export {
    Transaction,
    TransactionManager
}
