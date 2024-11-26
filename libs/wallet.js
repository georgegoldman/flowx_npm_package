const crypto  = require("crypto");

// Define currencies (same structure as in Python)
class Wallet {
    constructor() {
        this.walletAddress = null;
        this._balance = 1000;
        this.currencyList = [
            "SUI/USDT", "SUI/USDC", "SUI/DAI", "SUI/BUSD", "SUI/EUROC",
            "BTC/USDT", "BTC/USDC", "BTC/DAI", "BTC/BUSD", "BTC/EUROC",
            "ETH/USDT", "ETH/USDC", "ETH/DAI", "ETH/BUSD", "ETH/EUROC",
            "XRP/USDT", "XRP/USDC", "XRP/DAI", "XRP/BUSD", "XRP/EUROC"
        ];
    }

    // Generate a unique wallet address
    static generateWalletAddress() {
        return '0x' + crypto.randomBytes(32).toString('hex');
    }

    // Fetch wallet balance (mock implementation)
    getWalletBalance(currency) {
        // In a real implementation, the balance could vary depending on the currency
        return this._balance
    }

    sendFund(transaction){
        if (this._balance >= (transaction.amount + transaction.transactionCharge)) {
            this._balance -= (transaction.amount + transaction.transactionCharge);
            transaction.status = "successful";
          } else {
            transaction.status = "unsuccessful";
          }
          return transaction;
    }
}

module.exports = Wallet;