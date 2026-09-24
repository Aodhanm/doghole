# DOGHOLE

A game about California's **doghole ports** — the tiny, half-sheltered coves on
the Sonoma and Mendocino coast where schooners loaded redwood off chutes run
out from the cliff. The name is the lumbermen's own: barely room for a dog to
turn around.

**Play:** https://aodhanm.github.io/doghole/

Two legs, both sailed rather than steered:

1. **Fort Ross Cove.** Work a seventy-five-ton schooner in past the kelp-marked
   sunken rocks, moor her broadside to the chute and head out, warp her into
   the berth on lines passed to named fastenings ashore, take the cargo down
   the chute, and get out.
2. **The Golden Gate, 1905.** Run up to San Francisco in fog. Point Bonita
   burning, Fort Point and the batteries on the bluff, no bridge and there
   never was one here yet. The danger is not the steering — it is what looms
   out of the fog, and the chart only shows what you have actually spotted.

## Keys

| | |
|---|---|
| `←` `→` | helm |
| `↑` `↓` | make and shorten sail |
| `space` | pass a line to a fastening |
| `=` | skip the cove and go straight to the bay |
| `M` | mute |
| `` ` `` | dev mode |

## Accuracy

The cove is laid out from George Davidson's *Pacific Coast Pilot* (1889) —
the soundings, the three-fathom line, the danger buoy, the berth. The Gate is
built from coordinates: Point Bonita, Lime Point, Fort Point, Alcatraz, Angel
Island, the Ferry Building, and every battery on both sides with its armament
and date. Warships are modelled on USS *Olympia*. The rigging, the warping and
the chute are how the trade was actually worked.

It is a prototype and still being built.

## Files

`index.html` title screen · `play.html` the cove · `gate.html` the bay ·
`cove.js` Fort Ross Cove · `gate.js` the Golden Gate · `vessel.js` the ship's
sailing model · `ship.js` the ship drawn in elevation · `serve_nocache.py` a
local server, because Chrome caches ES modules hard.

Run it locally with any static server from this directory.

## Credits

Music is J. S. Bach, rendered to organ from a MIDI encoding. Sound effects are
recorded foghorn, buoy bell, rope and thunder, with the rest synthesised in the
browser.
