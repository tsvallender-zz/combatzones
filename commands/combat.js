const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

let row = new MessageActionRow();

let embed = new MessageEmbed()
    .setTitle('Combat!')
let lastMessage = null;
let zones = [];
let locations = {}; // dictionary of username -> zones index

module.exports = {
    data: new SlashCommandBuilder()
	.setName('combat')
	.setDescription('Starts a combat')
	.addStringOption(option =>
	    option.setName('zones').setDescription('Zone names to add'))
	.addStringOption(option =>
	    option.setName('new').setDescription('Combat title'))
	.addStringOption(option =>
	    option.setName('move').setDescription('Creature and zone number'))
	.addStringOption(option =>
	    option.setName('remove').setDescription('Remove combatant'))
	.addStringOption(option =>
	    option.setName('rename').setDescription('Rename a combatant')),
    async execute(interaction) {
	const t = interaction.options.getString("new");
	if (t) {
	    await newCombat(t);
	}
	const z = interaction.options.getString("zones");
	if (z) {
	    await addZones(z, interaction);
	}
	const m = interaction.options.getString("move");
	if (m) {
	    move(m);
	}
	const r = interaction.options.getString("remove");
	if (r) {
	    remove(r);
	}
	const re = interaction.options.getString("rename");
	if (re) {
	    rename(re);
	}

	printCombat();
	if (lastMessage == null) {
	    if (row.components.length > 0) {
		await interaction.reply({embeds: [embed], components: [row]});
	    } else {
		await interaction.reply({embeds: [embed]});
	    }
	    lastMessage = await interaction.fetchReply();
	} else {
	    if (row.components.length > 0) {
		lastMessage.edit({embeds: [embed], components: [row]});
	    } else {
		lastMessage.edit({embeds: [embed]});
	    }
	    await interaction.reply("Combat updated");
	    await interaction.deleteReply();
	}
    },
    addPlayer
};

function newCombat(t) {
    lastMessage = null;
    embed.setTitle(t);
    zones = [];
    locations = {};
    row = new MessageActionRow();
}

function addZones(newZones, interaction) {
    var myRegexp = /[^\s"]+|"([^"]*)"/gi;
    let end = zones.length;
    
    do {
	//Each call to exec returns the next regex match as an array
	var match = myRegexp.exec(newZones);
	if (match != null)
	{
            //Index 1 in the array is the captured group if it exists
            //Index 0 is the matched text, which we use if no captured group exists
            zones.push(match[1] ? match[1] : match[0]);
	}
    } while (match != null);

    for (let i = end; i < zones.length; i++) {
	row.addComponents(
	    new MessageButton()
		.setCustomId(i.toString())
		.setLabel(zones[i])
		.setStyle('PRIMARY'),
	);
    }
}

async function addPlayer(interaction, zone) {
    await interaction.guild.members.fetch(interaction.user.id).then(member => {
	locations[member['nickname']] = interaction.customId;
    });
    printCombat();
    lastMessage.edit({embeds: [embed]});
}

async function printCombat() {
    let title = embed.title;

    embed = new MessageEmbed();
    embed
	.setTitle(title)
        .setColor('#0099ff');

    zones.forEach(function c(value, index) {
	let characters = '';
	let c = 0;
	for (const key in locations) {
	    if(parseInt(locations[key]) === index) {
		if (c++ > 0) {
		    characters += ', ';
		}
		characters += key;
	    }
	}
	let title = '__' + (index + 1).toString() + ': ' + value + '__';
	if (characters) {
	    embed.addField(title, characters);
	} else {
	    embed.addField(title, 'No combatants');
	}
    });
}

function move(m) {
    var myRegexp = /[^\s"]+|"([^"]*)"/gi;
    let input = [];
    do {
	//Each call to exec returns the next regex match as an array
	var match = myRegexp.exec(m);
	if (match != null)
	{
            //Index 1 in the array is the captured group if it exists
            //Index 0 is the matched text, which we use if no captured group exists
            input.push(match[1] ? match[1] : match[0]);
	}
    } while (match != null);

    for(let i = 0; i < input.length; i++) {
	let creature = input[i];
	let zone = input[++i] - 1;

	locations[creature] = zone;
    }
}
	
function remove(r) {
    delete locations[r];
}

function rename(re) {
    var myRegexp = /[^\s"]+|"([^"]*)"/gi;
    let names = [];
    do {
	var match = myRegexp.exec(re);

	if (match != null) {
	    names.push(match[1] ? match[1] : match[0]);
	}
    } while (match != null);

    for (let i = 0; i < names.length; i++) {
	let oldName = names[i];
	let newName = names[++i];
	
	console.log("old: " + oldName + " new: " + newName);
	locations[newName] = locations[oldName];
	delete locations[oldName];
    }
}
