const fs = require("fs")
const path = require("path")
const dotenv = require("dotenv");
const os = require("os")

class FlowxEnv {
    constructor() {
        this.homeDir = os.homedir(); // Get the user's home directory
        this.filePath = path.join(this.homeDir, '.flowx'); // Full path to the .flowx file
    }

    loadFlowxEnv() {
        // Check if the .flowx file exists
        if (fs.existsSync(this.filePath)){
            dotenv.config({path: this.filePath}); // load variables from the .flowx file
        } else {
            console.warn(`File ${this.filePath} does not exist.`)
        }
    }

    getAccessToken() {
        // Retrieve the 'access_token' from the environment variables
        return process.env.ACCESS_TOKEN;
    }
}

module.exports = FlowxEnv;