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
npm install flowx_npm_package
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
**Fetch Supported Currencies**
```
const supportedCurrencies = client.getSupportedCurrencies();
console.log(supportedCurrencies);
```
**Send Payment**
```
const senderWallet = new Wallet();
const receiverWallet = new Wallet();
const transaction = client.sendPayment(senderWallet, receiverWallet, 50, 'USDT');
console.log(`Transaction ID: ${transaction.transaction_id}`);
console.log(`Transaction Status: ${transaction.status}`);
```
**Check Payment Status**
```
const status = client.getPaymentStatus('transaction_id_here');
console.log(`Payment status: ${status}`);
```

**Create Liquidity Pool** <br>
Creating a liquidity pool involves calling the Move function create_pool. This operation will initialize the pool with two tokens and a specified fee rate.

Example: Create Liquidity Pool

```
const tokenXAmount = 1000;
const tokenYAmount = 1000;
const feeRate = 30;  // Fee rate (e.g., 30 basis points)

const createPool = async () => {
  const pool = await liquidityService.createLiquidityPool(tokenXAmount, tokenYAmount, feeRate);
  console.log('Liquidity Pool Created:', pool);
};
createPool();

```

This will:

- Create a pool using tokenXAmount and tokenYAmount for the two assets.
- Set the feeRate for transactions within the pool.
___

**Add Liquidity**
<br>
After creating a liquidity pool, you can add more liquidity to it. Use the addLiquidity function to provide more tokens to the pool.
<br>
Example: Add Liquidity
```
const poolAddress = 'your_pool_address_here';  // Replace with actual pool address
const inputTokenAmount = 100;  // Amount of the token to swap
const inputTokenType = 'TokenX';  // The type of token being swapped (e.g., 'TokenX' or 'TokenY')

const stableSwap = async () => {
  const result = await liquidityService.stableSwap(poolAddress, inputTokenAmount, inputTokenType);
  console.log('Swap Completed:', result);
};
stableSwap();
```
This will:
- Perform a swap of inputTokenAmount of inputTokenType (either 'TokenX' or 'TokenY') within the liquidity pool.

**Check Liquidity Pool Status** <br>
You can check the status of a liquidity pool to see the current reserves, fee rate, and other important details.
<br>
Example: Check Pool Status
```
const poolAddress = 'your_pool_address_here';  // Replace with actual pool address

const checkPoolStatus = async () => {
  const status = await liquidityService.getPoolStatus(poolAddress);
  console.log('Pool Status:', status);
};
checkPoolStatus();
```
This will:
- Retrieve and display the current status of the liquidity pool, including reserves and other relevant data.

**Get Transaction Status**
<br>
To check the status of any transaction (such as creating a pool, adding liquidity, or performing a swap), you can retrieve the transaction status using the transaction ID.
<br>
Example: Get Transaction Status
```
const transactionId = 'your_transaction_id_here';  // Replace with actual transaction ID

const checkTransactionStatus = async () => {
  const status = await client.getTransactionStatus(transactionId);
  console.log(`Transaction Status: ${status}`);
};
checkTransactionStatus();

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