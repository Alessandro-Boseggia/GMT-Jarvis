const Discord = require('discord.js');
const raid = require('./command/raid.js');
const client = new Discord.Client();


client.once('ready', () => {
	console.log('Ready!');
});


client.on('message', message => {

    // if (!message.content.startsWith('!') || message.author.bot) return;

    if (message.content.startsWith('!coso'))
    {
        message.channel.send('ciao').then(msg => {
            console.log(msg.id);
        });
        
        // console.log(message.channel.messages.);

        // console.log(message.guild);
        // console.log(message.member.roles.cache.some(role => role.name === 'Coso'));
        // console.log(message.guild.ownerID);
    }

	if (message.content.startsWith('!raid') && message.channel.name === 'richiesta-raid')
	{
       raid.creaRaid(message);
    }

    if (message.content.startsWith('!parte') && message.channel.name === 'richiesta-raid')
	{
       raid.partecipa(message);
    }
    
    if (message.content === '!clear')
    {
        message.channel.messages.fetch().then(msg => {
            msg.forEach(m => {
                m.delete();
            });
        });
    }

    if(message.content === '!test')
    {
        
        message.channel.messages.fetch().then(msg => {
            const coso = msg.find(key => key.id === '690853335808606209');
            let raidMessage = coso.content;
            raidMessage += '\n' + message.author.username + '\n';
            coso.edit(raidMessage);
        });
    }
});

client.login('NjkwNDkwNzIzMzU4NzM2NDE0.XnSMCg.YaXicMIt9C5eT8jxHXzYp9MtwBE');
