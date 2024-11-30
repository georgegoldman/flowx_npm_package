import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import dotenv from "dotenv";


class SuiStableLiquidityPoolService {
    constructor() {
      this.client = new SuiClient({ 
        url: getFullnodeUrl(process.env.SUI_NETWORK || 'devnet') 
      });
  
      // Load keypair from environment or generate
      this.keypair = Ed25519Keypair.fromSecretKey(
        Buffer.from(process.env.PRIVATE_KEY || '', 'hex')
      );
  
      // Your deployed package ID
      this.packageId = process.env.PACKAGE_ID || '';
    }
  
    async createLiquidityPool(tokenXAmount, tokenYAmount, feeRate = 30) {
      const tx = new TransactionBlock();
  
      // Create coins for initial liquidity
      const [coinX] = tx.splitCoins(tx.gas, [tokenXAmount]);
      const [coinY] = tx.splitCoins(tx.gas, [tokenYAmount]);
  
      // Call Move function to create pool
      tx.moveCall({
        target: `${this.packageId}::stable_liquidity_pool::create_pool`,
        arguments: [coinX, coinY, tx.pure(feeRate)]
      });
  
      try {
        const result = await this.client.signAndExecuteTransactionBlock({
          signer: this.keypair,
          transactionBlock: tx
        });
        return result;
      } catch (error) {
        console.error('Pool creation failed:', error);
        throw error;
      }
    }
  
    async addLiquidity(poolAddress, tokenXAmount, tokenYAmount) {
      const tx = new TransactionBlock();
  
      const [coinX] = tx.splitCoins(tx.gas, [tokenXAmount]);
      const [coinY] = tx.splitCoins(tx.gas, [tokenYAmount]);
  
      tx.moveCall({
        target: `${this.packageId}::stable_liquidity_pool::add_liquidity`,
        arguments: [
          tx.object(poolAddress),
          coinX,
          coinY
        ]
      });
  
      try {
        const result = await this.client.signAndExecuteTransactionBlock({
          signer: this.keypair,
          transactionBlock: tx
        });
        return result;
      } catch (error) {
        console.error('Adding liquidity failed:', error);
        throw error;
      }
    }
  
    async stableSwap(poolAddress, inputTokenAmount, inputTokenType) {
      const tx = new TransactionBlock();
  
      const [inputCoin] = tx.splitCoins(tx.gas, [inputTokenAmount]);
  
      tx.moveCall({
        target: `${this.packageId}::stable_liquidity_pool::stable_swap`,
        arguments: [
          tx.object(poolAddress),
          inputCoin
        ]
      });
  
      try {
        const result = await this.client.signAndExecuteTransactionBlock({
          signer: this.keypair,
          transactionBlock: tx
        });
        return result;
      } catch (error) {
        console.error('Swap failed:', error);
        throw error;
      }
    }
  }
  
  // Example usage
  async function main() {
    const liquidityService = new SuiStableLiquidityPoolService();
  
    try {
      // Create a new liquidity pool
      const pool = await liquidityService.createLiquidityPool(
        1000,  // Initial X token amount
        1000,  // Initial Y token amount
        30     // Fee rate (0.3%)
      );
  
      // Add more liquidity
      const liquidityResult = await liquidityService.addLiquidity(
        pool.objectId,
        500,   // Additional X tokens
        500    // Additional Y tokens
      );
  
      // Perform a swap
      const swapResult = await liquidityService.stableSwap(
        pool.objectId,
        100,   // Swap amount
        'TokenX' // Input token type
      );
  
      console.log('Pool created:', pool);
      console.log('Liquidity added:', liquidityResult);
      console.log('Swap completed:', swapResult);
    } catch (error) {
      console.error('Operation failed:', error);
    }
  }

  export default SuiStableLiquidityPoolService;