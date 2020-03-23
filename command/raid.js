const MongoClient = require('mongodb').MongoClient;  
const url = 'mongodb://localhost:27017';


module.exports.creaRaid = (message) => {

    const splitMessage = message.content.split(' ');

    if(splitMessage[1] == undefined)
    {
        message.channel.send('Informazioni mancantri');
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
        
    }
   

};


module.exports.partecipa = (message) => {

    const id = message.mentions.users.array()[0].id;
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
    });  
};