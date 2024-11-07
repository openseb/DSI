![DSI](/dsi.png)
# Discord Stylesheet Injector

A lightweight tool that allows you to customize Discord's appearance with custom CSS. This injector automatically applies your CSS modifications to Discord's client and persists them across restarts.
This is not meant for BetterDiscord, this is a standalone code for vanilla Discord.
## Features

- 🎨 Inject custom CSS into Discord
- 🔄 Changes persist across Discord updates
- 🛡️ Automatic backup of original Discord files
- 💫 Includes a sample transparent theme

## Installation

1. Clone this repository:
```bash
git clone https://github.com/openseb/dsi
cd DSI
```
2. Install dependencies:
```bash
npm install
```
3. Run the injector:
```bash
node injectcss.js
```
4. Restart Discord to see the changes

## Usage

1. Modify the `custom.css` file with your desired CSS changes
2. Run the injector script
3. Restart Discord

The included sample theme provides a transparent Discord interface with blur effects. Feel free to modify it or replace it with your own CSS.

## ⚠️ Important Notes

- Always run the script with administrator privileges ( not required on some devices )
- Make sure Discord is installed in the default location
- Keep the `.backup` files that are created - they contain your original Discord configuration
- This tool modifies Discord's client files. While it creates backups, use at your own risk
- Some Discord updates might require re-running the injector

## Reverting Changes

To revert to the original Discord appearance:
1. Navigate to Discord's installation directory
2. Find the `index.js.backup` file in the core module
3. Remove the `index.js` file and rename `index.js.backup` to `index.js`
4. Restart Discord

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
