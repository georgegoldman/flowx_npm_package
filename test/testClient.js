import Client from '../libs/client.js';
import Wallet from '../libs/wallet.js';

async function testClient() {
    try {
        // Create an instance of the Client with a mock user ID or token
        const client = new Client('ab6d74b8d46d7f8952bad3f1e0388e41');

        console.log('Supported Currencies:', client.getSupportedCurrencies());

        // Authenticate
        await client.authenticate();

        if (client.authenticated) {
            console.log('Authentication successful.');

            // Create wallets for sender and receiver
            const senderWallet = new Wallet();
            const receiverWallet = new Wallet();

            // Send a payment (mock transaction)
            const transaction = client.sendPayment(senderWallet, receiverWallet, 100, 'USDT');
            console.log('Transaction:', transaction);

            // Check the transaction status
            const status = client.getPaymentStatus(transaction.transactionId);
            console.log('Payment Status:', status);

        } else {
            console.log('Authentication failed.');
        }

    } catch (error) {
        console.error('Error during testClient execution:', error);
    }
}

// Run the test function
testClient();
