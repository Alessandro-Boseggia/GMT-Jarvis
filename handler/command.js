const { readdirSync } = require('fs');

const ascii = require('ascii-table');

const table = new ascii().setHeading('Command', 'Load Status');

module.exports = (client) => {
    // leggo tutti i comandi nella sottocartella
    readdirSync('./commands/').forEach(dir => {
        // filtro solo quelli con estensioni .js
        const commands = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));
        // aggiungo i comandi alla collection e se non lo trovo evito di bloccare il codice
        // per errore ma lo specifico nella tabella
        for (const file of commands) {
            const pull = require(`../commands/${dir}/${file}`);

            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, '❌ -> manca qualcosa??');
            }
            // leggo gli alias previsti dal comando
            if (pull.aliases && Array.isArray(pull)) {
                pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
            }
        }
    });
    // Log della tabella
    console.log(table.toString());
};

/**
 * Layout di base per i comandi
 * module.exports = {
 *  name: "Nome comando",
 *  aliases: ["array", "degli", "aliases"]
 *  category: "Nome categoria",
 *  description: "Descrizione comando"
 *  usage: "[args input]",
 *  run: (client, message, args) => {
 *      Codice da eseguire
 *  }
 * }
 */