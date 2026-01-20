# Discord FiveM Bot

## Overview

**Discord FiveM Bot** is a Node.js bot designed for Discord to interact with a FiveM server. It provides two main commands:
- `/info` - Retrieves detailed information about player profiles.
- `/status` - Displays the current status of the FiveM server.

### Developed by

- **real7lab**
- [Discord Server](https://discord.gg/FzCpzcRnrz)

## Features

- Retrieves player profile information using player ID or Discord ID.
- Displays the current status of the FiveM server, including online players and server status.
- Clear and detailed error messages.

## Installation

### Prerequisites

- Node.js (v16 or later)
- npm (Node Package Manager)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/real7lab/FiveM-Discord-Bot.git
   cd FiveM-Discord-Bot
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Your Bot**

   Edit the `config.json` file with your bot and FiveM server details:
   ```json
   {
       "token": "YOUR_BOT_TOKEN",
       "clientid": "YOUR_CLIENT_ID",
       "ipserver": "YOUR_FIVEM_SERVER_IP",
       "endpointserver": "http://{ipserver}:30120/players.json"
   }
   ```

   - `token`: Your Discord bot token (obtainable from the [Discord Developer Portal](https://discord.com/developers/applications)).
   - `clientid`: Your bot's client ID.
   - `ipserver`: The IP address of your FiveM server.
   - `endpointserver`: The endpoint to retrieve player data from the FiveM server. (Don't touch it)

4. **Run the Bot**

   ```bash
   node index.js
   ```

## Configuration

### `config.json`

This file contains the following keys:
- `token`: Your Discord bot token.
- `clientid`: Your bot's client ID.
- `ipserver`: The IP address of your FiveM server.
- `endpointserver`: The URL endpoint for retrieving player data.

## Usage

1. **Launch the Bot**: Run `node index.js` in your terminal.
2. **Use the Commands**:
   - `/info [id] [discord_id]`: Provides detailed information about a specific player. You can use either a player ID or a Discord ID.
   - `/status`: Displays the current status of the FiveM server, including online player count and server status.

## Error Handling

The bot handles errors with clear and detailed messages in the Discord channel. Check the error messages if something isn't working as expected.

## Troubleshooting

- **Error: `ID` not found**: Ensure that the player ID or Discord ID is correct and that the player is currently online.
- **Error: Request Failed**: Verify that the FiveM server is active and that the endpoint is configured correctly.

## License

This project is developed by [real7lab](https://discord.gg/visionn).

For more details, please visit our [official Discord server](https://discord.gg/visionn).
