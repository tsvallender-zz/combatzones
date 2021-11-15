# Combat Zones

Combat Zones is a Discord bot for running zone-based combat in D&D,
and is inspired by [Sly Flourish's article on the
subject](https://slyflourish.com/fate_style_zones_in_5e.html) and [his
more-specific article on running them in a text-based
fashion](https://slyflourish.com/text-based_battle_maps.html).

## Status

Combat Zones is in alpha and has known bugs. Development is ongoing.

## Usage

The bot responds to the `/combat` command. After the initial
interaction, the combat is printed. Future interactions update the
initial message.

## Options

`zones:` Followed by a list of zone names. Zone names including spaces
should be wrapped in double quotes.

`move:` Combatant name, followed by the index of the zone they are
moving to. Names including spaces should be wrapped in double quotes.

`remove:` Remove the given combatant.

`title:` Set the title of the combat.