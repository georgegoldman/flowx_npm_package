const axios = require("axios");
const FlowxEnv = require("./flowx"); // Placeholder for your FlowxCLI class
const { Transaction, TransactionManager } = require("../transaction"); // Placeholder for your TransactionManager and Transaction classes
const Wallet = require("./wallet"); // placeholder for your wallet class
const settings = require("../core/config"); // Placeholder for your settings file

class Client {
    constructor(apiKey) {
        this.FlowxEnv = new FlowxEnv();
        this.apiKey = apiKey;
        this._baseUrl = settings.baseUrl;
        this.authenticated = false;

        // Initiliazed HTTP client (axios)
        this.session = axios.create();

        // attempt to authenticate on intializaton
        this.authenticate();
    }

    async authenticate() {
        // Load environment variables
        this.FlowxEnv.loadFlowxEnv();

        const authUrl = `${this._baseUrl}/verify-token/${this.apiKey}`;
        console.log(`Authenticating with URL: ${authUrl}`); // debuging

        const headers = {
            Authorization: `Bearer ${this.FlowxEnv.getAccessToken()}`,
        }
        console.log(`Headers:`, headers) // Debuging

        try {
            const response = await this.session.get(authUrl, {headers});
            console.log(response.status); // Debugging
            

            if (response.status == 200){
                this.authenticated = true;
                console.log('Authenticated successfully');
            } else {
                this.authenticated = false;
                console.log('Authenticating failed 🌋 please check your API-Token');
            }
        } catch (error) {
            this.authenticated = false;
            console.error('Authentication error:', error.message)
        }
    }

    getSupportedCurrencies() {
        const supportedCurrencies = {
          stablecoins: ['USDT', 'USDC', 'DAI', 'BUSD', 'EUROC'],
          africanFiat: ['NGN', 'KES', 'ZAR', 'GHS', 'TZS', 'UGX'],
          globalFiat: ['USD', 'EUR', 'GBP'],
          cryptocurrencies: ['SUI', 'BTC', 'ETH', 'XRP'],
        };
        return JSON.stringify(supportedCurrencies);
    }

    sendPayment(senderWallet, recieveWallet, amount, stablecoin) {
        const transactionManager = new TransactionManager();
        const newTransaction = transactionManager.createTransaction(
            senderWallet,
            recieveWallet,
            amount,
            stablecoin
        );

        const wallet = new Wallet();
        wallet.sendFund(newTransaction);

        // Update the transaction in the list
        const transactions = transactionManager.listTransaction();
        const index = transactions.findIndex(
            (tx) => tx.transactionId == newTransaction.transactionId
        );

        if (index != -1) {
            transactions[index] = newTransaction;
        }

        return newTransaction;
    }

    getPaymentStatus(paymentId) {
        const transactionManager = new TransactionManager();
        const newTransaction = transactionManager.createTransaction(
            Wallet.generateWalletAddress(),
            Wallet.generateWalletAddress(),
            10,
            'USDT'
        );
        newTransaction.transactionId = paymentId;

        const wallet = new Wallet();
        wallet.sendFund(newTransaction);


        // Find and return the transaction status
        const transaction = transactionManager
        .listTransaction()
        .find((tx) => tx.transactionId == paymentId);

        return transaction ? transaction.status : 'Transaction does not exist';
    }
}

module.exports = Client;