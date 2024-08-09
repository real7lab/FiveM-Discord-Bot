const { loadFiles } = require('./loadFiles');
const path = require('path');

async function loadCommands(client) {
  await client.commands.clear();
  const CommandsArray = [];
  const commandStatuses = []; 
  const Files = await loadFiles(path.resolve(__dirname, './commands'));

  Files.forEach((file) => {
    try {
      const Command = require(file);
      const CommandName = Command.data.name;
      client.commands.set(CommandName, Command);
      CommandsArray.push(Command.data.toJSON());
      commandStatuses.push({ Command: CommandName, Status: 'Activated' }); 
    } catch (error) {
      console.error(`Error loading command file ${file}:`, error);
    }
  });

  await client.application.commands.set(CommandsArray);
  console.log("Commands Successfully Initialized");
}

module.exports = { loadCommands };
