// Frontend and backend compatibility
import dotenv from 'dotenv';
import os from "os";
import path from "path";
import fs from "fs"

// Check if we are in a Node.js environment
const isNodeEnv = typeof window === 'undefined';

class FlowxEnv {
    constructor() {
        // Only use Node.js specific logic in Node environment
        if (isNodeEnv) {
            this.homeDir = os.homedir(); // Get the user's home directory
            this.filePath = path.join(this.homeDir, '.flowx'); // Full path to the .flowx file
        } else {
            // In the browser, we can't access the home directory or files
            this.filePath = null; // No file path in the browser
        }
    }

    loadFlowxEnv() {
        // In the browser, just load environment variables at build-time
        if (!isNodeEnv) {
            // Here, we'll assume that `VITE_` prefixed environment variables are injected at build time (using Vite)
            const flowxAccessToken = import.meta.env.VITE_ACCESS_TOKEN;
            if (flowxAccessToken) {
                process.env.access_token = flowxAccessToken;
            } else {
                console.warn('Access token is missing in browser environment.');
            }
            return;
        }

        // In Node.js, check if the .flowx file exists and load it
        if (fs.existsSync(this.filePath)) {
            dotenv.config({ path: this.filePath }); // Load environment variables from the .flowx file
        } else {
            console.warn(`File ${this.filePath} does not exist.`);
        }
    }

    getAccessToken() {
        // Retrieve the 'access_token' from the environment variables
        return process.env.access_token;
    }
}

export default FlowxEnv;
