const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { getUser } = require('../index.js');

const row = new MessageActionRow();

let embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Combat!')

let zones = [];
let locations = {}; // dictionary of username -> zones index

module.exports = {
    data: new SlashCommandBuilder()
	.setName('combat')
	.setDescription('Starts a combat')
	.addSubcommand(subcommand =>
	    subcommand
		.setName('print')
		.setDescription('Prints combat'))
	.addSubcommand(subcommand =>
	    subcommand
		.setName('zone')
		.setDescription('Add zones to the combat')
		.addStringOption(option =>
		    option.setName('zones').setDescription('Zone names').setRequired(true)))
	.addSubcommand(subcommand =>
	    subcommand
		.setName('party')
		.setDescription('Add party to combat'))
	.addSubcommand(subcommand =>
	    subcommand
		.setName('title')
		.setDescription('Set combat name')
		.addStringOption(option =>
		    option.setName('title').setDescription('Combat title').setRequired(true))),
    async execute(interaction) {
	switch(interaction.options.getSubcommand()) {
	case "print":
	    printCombat(interaction);
	    await interaction.reply({embeds: [embed], components: [row]});
	    break;
	case "zone":
	    const z = interaction.options.getString("zones");
	    await addZones(z, interaction);
	    break;
	case "party":
	    await interaction.reply("Adding party to combat");
	    break;
	case "title":
	    embed.setTitle(interaction.options.getString("title"));
	    await interaction.reply({content: 'Title set to ' + embed.title, ephemeral: true});
	    break;
	}
    },
    addPlayer
};

function addZones(newZones, interaction) {
    var myRegexp = /[^\s"]+|"([^"]*)"/gi;
     
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

    zones.forEach(function c(value, index) {
	row.addComponents(
	    new MessageButton()
		.setCustomId(index.toString())
		.setLabel(value)
		.setStyle('PRIMARY'),
	);
    });
    
    interaction.reply({embeds: [embed], components: [row]});
}

function addPlayer(interaction, zone) {
    interaction.guild.members.fetch(interaction.user.id).then(member => {
	locations[member['nickname']] = interaction.customId;
    });
}

async function printCombat(interaction) {
    let title = embed.title;
    embed = new MessageEmbed();
    embed.setTitle(title);
    zones.forEach(function c(value, index) {
	let characters = '';
	for (const key in locations) {
	    if(parseInt(locations[key]) === index) {
		characters += key + ', ';
	    }
	}
	if (characters) {
	    embed.addField(value, characters);
	} else {
	    embed.addField(value, 'No characters here');
	}
    });
}

