// Import statements
import axios from "axios";
import FlowxEnv from "./flowx.js"; // Your FlowxCLI class
import { Transaction, TransactionManager } from "./transaction.js"; // Transaction and TransactionManager classes
import Wallet from "./wallet.js"; // Your Wallet class
import settings from "../core/config.js"; // Settings file for shared configuration

// Check if we are in the Node.js or browser environment
const isNodeEnv = typeof window === 'undefined';

class Client {
    constructor(apiKey) {
        this.FlowxEnv = new FlowxEnv();
        this.apiKey = apiKey;
        this._baseUrl = settings.baseUrl; // Use base URL from settings
        this.authenticated = false;

        // Initialize HTTP client (axios)
        this.session = axios.create();

        // Attempt to authenticate on initialization
        this.authenticate();
    }

    async authenticate() {
        // Load environment variables for Node.js
        if (isNodeEnv) {
            this.FlowxEnv.loadFlowxEnv();
        }

        const authUrl = `${this._baseUrl}/verify-token/${this.apiKey}`;
        console.log(`Authenticating with URL: ${authUrl}`); // Debugging

        const headers = {
            Authorization: `Bearer ${this.FlowxEnv.getAccessToken()}`,
        };
        console.log(`Headers:`, headers); // Debugging

        try {
            const response = await this.session.get(authUrl, { headers });
            console.log(response.status); // Debugging

            if (response.status === 200) {
                this.authenticated = true;
                console.log('Authenticated successfully');
            } else {
                this.authenticated = false;
                console.log('Authentication failed 🌋 Please check your API-Token');
            }
        } catch (error) {
            this.authenticated = false;
            console.error('Authentication error:', error.message);
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

        if (index !== -1) {
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

export default Client;
