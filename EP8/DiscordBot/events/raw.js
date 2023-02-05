const { manager } = require("..");
const client = require("..");

client.on("raw", (raw) => {
    manager.updateVoiceState(raw);
})