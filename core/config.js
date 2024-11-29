// config.js

import dotenv from "dotenv";

// Check if running in Node.js environment
const isNodeEnv = typeof window === 'undefined';

// For Node.js (backend), we use dotenv to load environment variables
if (isNodeEnv) {
    dotenv.config(); // Load `.env` file for Node.js
}

// Define your settings, and use process.env for backend, or fallback for frontend
const BASE_URL = isNodeEnv ? process.env.BASE_URL : import.meta.env.VITE_BASE_URL || 'https://flowx-backend.onrender.com/api/v1';

class Settings {
    constructor() {
        this.baseUrl = BASE_URL;
    }

    /**
   * Validate required settings and return them as an object.
   * Throws an error if required variables are missing.
   */
    static getValidatedSettings() {
        const baseUrl = BASE_URL;

        if (!baseUrl) {
            throw new Error("BASE_URL is required.");
        }

        return new Settings();
    }
}

// Get validated settings
const settings = Settings.getValidatedSettings();

export default settings;
