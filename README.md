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

__*Add zones to a combat*__

`zones:` Followed by a list of zone names. Zone names including spaces
should be wrapped in double quotes.

e.g. `/combat zones: Balcony "Crumbling staircase" Laboratory`

__*Add or move combatants*__

`move:` Combatant name, followed by the index of the zone they are
moving to. Names including spaces should be wrapped in double
quotes. Players can add or move themselves by clicking the zone name
button.

e.g. `/combat move: "Scarred orc" 2 "Rust monster" 1 Bruenor 1`

__*Remove combatant*__

`remove:`

e.g. `/combat remove: "Scarred orc"`

__*Set a title*__

`title:`

e.g. `/combat title: Battle for Helm's Hold`

__*Rename combatants*__

`rename:` Old name, then new name. Names including spaces should be
wrapped in double quotes.

e.g. `/combat rename: "Rust monster" "Limping rust monster"`