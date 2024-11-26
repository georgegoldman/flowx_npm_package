# FlowX NPM Package
About FlowX is designed to empower developers building financial solutions by offering a protocol for efficient, low-cost cross-border payments using stablecoins. FlowX will help developers solve real-world issues in African financial systems, such as high remittance costs, limited liquidity, and currency volatility.

## Features
- Create and manage wallets
- Perform secure transactions
- Fetch and verify supported currencies
- Authenticate with APIs using tokens
- Flexible configuration via .env file

## Installation
Install the package via npm:
```
npm install flowx-npm-package
```

## Usage
### Importing the Package
```
const { Wallet, Client } = require('flowx-npm-package');
```

### Wallet
Create a Wallet
```
const balance = wallet.getWalletBalance('USDT');
console.log(`Wallet balance: ${balance}`);
```
Get Wallet Balance
```
const balance = wallet.getWalletBalance('USDT');
console.log(`Wallet balance: ${balance}`);
```
Send Funds
```
const Transaction = require('flowx-npm-package/lib/transaction'); // Assuming Transaction is defined in the package
const senderWallet = new Wallet();
const receiverWallet = new Wallet();

const transaction = new Transaction(senderWallet, receiverWallet, 100, 'USDT');
const result = senderWallet.sendFund(transaction);
console.log(`Transaction status: ${result.status}`);
```
### Client
Initialize the Client
```
const client = new Client('your_api_key');
```
### Authenticate
Authentication happens automatically during client initialization. You can verify it:
```
if (client.authenticated) {
    console.log('Authentication successful!');
} else {
    console.log('Authentication failed!');
}
```
Fetch Supported Currencies
```
const supportedCurrencies = client.getSupportedCurrencies();
console.log(supportedCurrencies);
```
Send Payment
```
const senderWallet = new Wallet();
const receiverWallet = new Wallet();
const transaction = client.sendPayment(senderWallet, receiverWallet, 50, 'USDT');
console.log(`Transaction ID: ${transaction.transaction_id}`);
console.log(`Transaction Status: ${transaction.status}`);
```
Check Payment Status
```
const status = client.getPaymentStatus('transaction_id_here');
console.log(`Payment status: ${status}`);
```
___
## Configuration
Use a ```.env``` file to manage sensitive environment variables. Add the following key-value pairs to your ```.env``` file:
```
ACCESS_TOKEN=your_access_token
BASE_URL=https://api.your-service.com
```
___
## File Structure
```
flowx-npm-package/
├── lib/                   # Library files
│   ├── wallet.js          # Wallet implementation
│   ├── client.js          # Client implementation
│   ├── transaction.js     # Transaction manager
├── index.js               # Entry point
├── package.json           # NPM metadata
├── .env                   # Environment variables
├── README.md              # Documentation
```
## Contributing
We welcome contributions! Please fork the repository, create a feature branch, and submit a pull request.