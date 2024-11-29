// Detect the environment
const isNode = typeof window === 'undefined';

import Wallet from "./libs/wallet.js";
import Client from "./libs/client.js";

// Create an object to hold the exports
const exportedModules = { Wallet, Client };

// For Node.js, use CommonJS export
if (isNode) {
    module.exports = exportedModules;
} else {
    // For the browser, use ES module export
    window.Wallet = Wallet;
    window.Client = Client;
}
