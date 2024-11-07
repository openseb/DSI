const fs = require('fs');
const path = require('path');

// Path to Discord's main module
const discordPath = path.join(process.env.LOCALAPPDATA, 'Discord');
const cssPath = path.join(__dirname, 'custom.css');

// Function to find Discord's module
function findDiscordModule() {
    const appDirs = fs.readdirSync(discordPath).filter(dir => dir.startsWith('app-'));
    if (!appDirs.length) return null;
    // Get the latest version
    return path.join(discordPath, appDirs[appDirs.length - 1], 'modules', 'discord_desktop_core-1', 'discord_desktop_core');
}

// Function to inject our CSS
function injectCSS() {
    const modulePath = findDiscordModule();
    if (!modulePath) {
        console.error('Discord installation not found!');
        return;
    }

    const indexPath = path.join(modulePath, 'index.js');
    
    // Create custom CSS file if it doesn't exist
    if (!fs.existsSync(cssPath)) {
        fs.writeFileSync(cssPath, '/* Add your custom CSS here */');
    }

    // Read the custom CSS
    const customCSS = fs.readFileSync(cssPath, 'utf-8');
    
    // Injection code
    const injection = `
        module.exports = require('./core.asar');
        const electron = require('electron');
        const fs = require('fs');
        
        electron.app.on('browser-window-created', (event, window) => {
            window.webContents.on('dom-ready', () => {
                window.webContents.executeJavaScript(\`
                    (() => {
                        const style = document.createElement('style');
                        style.textContent = \\\`${customCSS}\\\`;
                        document.head.appendChild(style);
                    })();
                \`);
            });
        });
    `;

    // Backup original file
    if (!fs.existsSync(`${indexPath}.backup`)) {
        fs.copyFileSync(indexPath, `${indexPath}.backup`);
    }

    // Write the modified index.js
    fs.writeFileSync(indexPath, injection);

    console.log('CSS injection successful! Restart Discord to see changes.');
}

// Run the injector
try {
    injectCSS();
} catch (error) {
    console.error('Error:', error.message);
    console.error('Make sure Discord is installed and you have administrator privileges.');
}
