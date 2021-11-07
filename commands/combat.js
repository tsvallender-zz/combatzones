const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

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
		.setName('zone')
		.setDescription('Add zones to the combat')
		.addStringOption(option => option.setName('zones').setDescription('Zone names')))
	.addSubcommand(subcommand =>
	    subcommand
		.setName('party')
		.setDescription('Add party to combat')),
    async execute(interaction) {
	switch(interaction.options.getSubcommand()) {
	case "zone":
	    const zones = interaction.options.getString("zones");
	    if (zones) {
		await addZones(zones, interaction);
	    }
	    break;
	case "party":
	    await interaction.reply("Adding party to combat");
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
		.setCustomId('zone-' + index)
		.setLabel(value)
		.setStyle('PRIMARY'),
	);
    });
    
    interaction.reply({embeds: [embed], components: [row]});
}

function addPlayer(player, zone) {
    console.log(player + " in " + zone);
}
