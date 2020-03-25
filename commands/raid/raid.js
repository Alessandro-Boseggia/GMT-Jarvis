const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB;

module.exports = {
    name: 'crea-raid',
    aliases: ['raid'],
    category: 'raid',
    description: 'Commando per la creazione di un raid in gioco',
    usage: '[mode, data, start, end]',
    run: async (client, message, args) => {
        const today = new Date();
        let mode = 'normale';
        let data = today.toLocaleDateString();
        let start = today.toLocaleTimeString();
        let end = null;

        if (args.length > 0) {
            console.log(args);
            // recupero i dati
            args.forEach(arg => {
                arg = arg.trim().split('=');
                if (arg.length > 1) {
                    eval(arg[0] + '=' + '\'' + arg[1] + '\'');
                }
            });
            // invio la risposta
            console.log(mode, start, data, end);
            // TODO salvare su database e poi su esito positivo restituire il risultato
            await message.channel.send(`:trophy: Sessione raid ${mode} il ${data} dalle ${start} alle ${end}.`);
        } else {
            console.log('Mancano informazioni per la creazione del raid.');
            await message.channel.send('Mancano informazioni per il completamento della richiesta.');
        }
    },
};


// gmt$crea-raid normale 24/03/2020 21:00/23:00
// module.exports.creaRaid = (args) => {

    /* if(splitMessage[1] == undefined)
    {
        message.channel.send('Informazioni mancanti');
    }
    else
    {
        message.channel.send(`richiesta di: ${message.author.username} \n` + `tipo raid: ${splitMessage[1]} \n` + `inizio raid: ${splitMessage[2]} \n` + `fine raid: ${splitMessage[3]} \n` + 'partecipanti: \n' + message.author.username).then(msg => {

            MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
                console.log(err);
                const dbo = db.db('ActivityBot');
                dbo.collection('raid').insertOne({ id: msg.id, author: [message.author.id, message.author.username], start: splitMessage[2], finish: splitMessage[3], user: 1 }).then(result => db.close).catch(e => console.log(e));
            });

        });

    }*/

// };


// module.exports.partecipa = (message) => {

    /* const id = message.mentions.users.array()[0].id;
    const username = message.mentions.users.array()[0].username;

    MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {

        const dbo = db.db('ActivityBot');

        dbo.collection('raid').findOne({ author: [id, username] }).then(result => {

            message.channel.messages.fetch().then(msg => {
                const coso = msg.find(key => key.id === result.id);
                let raidMessage = coso.content;

                raidMessage += '\n' + message.author.username + '\n';
                coso.edit(raidMessage);
            });

            const v = result.user + 1;
            dbo.collection('raid').updateOne({ id: result.id }, { $set: { user: v } });
            db.close;
        })
        .catch(err => console.log(err));
    });*/
// };