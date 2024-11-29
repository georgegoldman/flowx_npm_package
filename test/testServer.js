// Detect the environment
const isNode = typeof window === 'undefined';

import Wallet from "../libs/wallet.js";
import Client from "../libs/client.js";

async function testClient() {
    // Ensure the modules are available before running the test
    if (!Client || !Wallet) {
        console.error('Client or Wallet module is not loaded correctly.');
        return;
    }

    const client = new Client('ab6d74b8d46d7f8952bad3f1e0388e41');

    console.log('Supported Currencies:', client.getSupportedCurrencies());

    // Authenticate
    await client.authenticate();

    if (client.authenticated) {
        // Create wallets
        const senderWallet = new Wallet();
        const receiverWallet = new Wallet();

        // Send a payment
        const transaction = client.sendPayment(senderWallet, receiverWallet, 100, 'USDT');
        console.log('Transaction:', transaction);

        // Check transaction status
        const status = client.getPaymentStatus(transaction.transactionId);
        console.log('Payment Status:', status);
    }
}

// Run the test function
testClient();
