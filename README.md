# Combat Zones

Combat Zones is a Discord bot for running zone-based combat in D&D,
and is inspired by [Sly Flourish's article on the
subject](https://slyflourish.com/fate_style_zones_in_5e.html) and [his
more-specific article on running them in a text-based
fashion](https://slyflourish.com/text-based_battle_maps.html).

You can [invite Combat Zones to your Discord
server](https://discord.com/api/oauth2/authorize?client_id=905073567148965949&permissions=2147608576&redirect_uri=https%3A%2F%2Fdiscordapp.com%2Foauth2%2Fauthorize%3F%26client_id%3D905073567148965949%26scope%3Dbot&response_type=code&scope=applications.commands%20bot%20messages.read).

## Status

Combat Zones is in alpha and has known bugs. Development is ongoing.

## Usage

The bot responds to the `/combat` command. After the initial
interaction, the combat is printed. Future interactions update the
initial message.

## Options

__**Set a title**__

`new:` Start a new combat with the given title. **Specifying this
option begins a new combat and will delete existing combat details**.

e.g. `/combat new: Battle for Helm's Hold`

__**Add zones to a combat**__

`zones:` Followed by a list of zone names. Zone names including spaces
should be wrapped in double quotes.

e.g. `/combat zones: Balcony "Crumbling staircase" Laboratory`

__**Add or move combatants**__

`move:` Combatant name, followed by the index of the zone they are
moving to. Names including spaces should be wrapped in double
quotes. Players can add or move themselves by clicking the zone name
button.

e.g. `/combat move: "Scarred orc" 2 "Rust monster" 1 Bruenor 1`

__**Remove combatant**__

`remove:`

e.g. `/combat remove: "Scarred orc"`


__**Rename combatants**__

`rename:` Old name, then new name. Names including spaces should be
wrapped in double quotes.

e.g. `/combat rename: "Rust monster" "Limping rust monster"`