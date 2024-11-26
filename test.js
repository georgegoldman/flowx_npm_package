const Client = require('./libs/client');

async function testClient() {
    const client = new Client('ab6d74b8d46d7f8952bad3f1e0388e41')

    console.log('Supported Currencies:', client.getSupportedCurrencies())

     // Authenticate
    await client.authenticate();

    if (client.authenticated) {
        // Create wallets
        const senderWallet = new (require('./libs/wallet'))();
        const receiverWallet = new (require('./libs/wallet'))();

        // Send a payment
        const transaction = client.sendPayment(senderWallet, receiverWallet, 100, 'USDT');
        console.log('Transaction:', transaction);

        // Check transaction status
        const status = client.getPaymentStatus(transaction.transactionId);
        console.log('Payment Status:', status);
    }
}

testClient()