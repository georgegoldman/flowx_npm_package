const dotenv = require("dotenv");

// Load `.env` file and environment variables
dotenv.config({path: '.env',encoding: 'utf-8'});

class Settings {
    constructor() {
        this.baseUrl = process.env.BASE_URL; // Fetch `BASE_URL` from the `.env` file
    }

    /**
   * Validate required settings and return them as an object.
   * Throws an error if required variables are missing.
   */
    static getValidatedSettings() {
        const baseUrl = process.env.BASE_URL;

        if (!baseUrl) {
        throw new Error("BASE_URL is required in the environment variables.");
        }

        return new Settings();
    }
}

const settings = Settings.getValidatedSettings()

module.exports = settings;