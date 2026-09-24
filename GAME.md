# DOGHOLE — the prototype

    python3 serve_nocache.py          # port 8913, do not use plain http.server
    open http://127.0.0.1:8913/index.html      title screen, Enter drops you into the cove
    open http://127.0.0.1:8913/play.html       straight to the game

Files: `play.html` (page, weather, phases, HUD, audio) · `cove.js` (the place)
· `vessel.js` (the ship) · `ship.js` (shared with the title screen, drawn in
the elevation inset) · `theme.m4a` (the same Bach cue).

---

## What the game is

You are master of a two-masted schooner of **seventy-five tons**, up from San
Francisco for a cargo of cordwood. Four phases, one continuous run:

1. **THE RUN IN.** Work her into Fort Ross Cove past the kelp-marked sunken
   rocks, the reef and the three-fathom line.
2. **THE MOOR.** Lie **broadside to the end of the chute and head out**, hold
   her there, and pass **six lines** to the buoys and the ringbolts.
3. **LOADING.** Hold the berth while the chute fills her. The sea gets up the
   whole time. Every cord is worth having and every cord makes her slower.
4. **THE RUN OUT.** Cast off and get clear, heavy, before the swell has you.

Controls: **left/right** helm · **up** make sail · **down** take in sail ·
**space** cast off · **Esc** back to the title screen.

---

## Why it plays like Lunar Lander

Lunar Lander is about fighting one invisible constant with a thrust you must
ration. Here the constant is **the tide**, and the three things that actually
wrecked these vessels are the three things the physics models:

1. **A rudder only bites with way on.** Lose your speed and you lose your
   steering. This is the whole difficulty of a doghole: you must arrive slowly
   enough not to hit anything and fast enough to still be able to steer.
2. **You cannot sail within about four points of the wind.** Caught in irons on
   a lee shore, nothing you press will save you.
3. **The cove has a lee.** Stand in under the west bluff in a north-wester and
   your sails go soft. Davidson says the bluff "affords a lee in the northwest
   summer winds", and that lee is modelled (`windShadow` in cove.js). It is why
   they warped in on lines rather than sailing in.

The tide is different every game: it sets north at a quarter to half a mile an
hour, **it turns during the game**, and it is sometimes reversed. You cannot
feel it. You only see it by watching the shore go by.

---

## Everything on the chart is sourced

George Davidson, *Pacific Coast Pilot* (1889), "Fort Ross Anchorage", is the
authority for nearly all of it, with the NRHP doghole-ports MPDF for how the
chutes and moorings worked. Full text of both is in the vault at
`07 Files/Raw/lumber-ports/`.

| In the game | The source |
|---|---|
| The berth: broadside to the chute's end, head out | "a vessel of seventy-five tons can lie broadside to the end of the chute and head out" |
| Six mooring lines | "she has to be moored by six lines to buoys and shore fastenings" |
| Two mooring buoys, at 5.5 and 8 fathoms | "Two mooring-buoys are laid in the cove in five and a half and eight fathoms" |
| A third, red, danger buoy | "a third and outer buoy marks the sunken rock, bare at low water" |
| 12 ft under the chute's end | "projects over twelve feet of water" |
| 6 to 7 fathoms between rock and chute; 10 just outside | Davidson's soundings, used as the control points of the depth field |
| The broken ground, 14 ft, and the reef running NNE | "broken ground with as little as fourteen feet ... thence to a point north-northeast from it there is a reef on which the swell breaks in heavy weather" |
| The kelp-marked rocks on the way in | "especially dangerous to sailing vessels hugging the western point of the cove when coming in to the anchorage with the usual northwest winds" |
| Pinnacle Rocks and Fort Ross Reef, to the south-east | "Pinnacle Rocks, having a height of thirty-five feet, lie one mile southeast from Fort Ross Cove and one-third of a mile off shore" |
| The short broad sand beach and its creek | "A fresh-water stream enters at the eastern part of the cove where there is a short, broad sand beach" |
| The swell walking in from the south-west | "broad open to the southwest swell, and only partially protected from the northwest swell" |
| The tide, its rate, and its reversal | "the eddy inshore current generally sets to the northward at from one quarter to one-half mile per hour ... Sometimes this current is reversed" |
| The vessel type | MPDF: "The small, wooden-hulled two-masted single-decked schooner of less than 200 tons burthen was well suited to the task" |
| Cargo: cordwood, not lumber | "Coasting vessels load fire-wood, tan-bark, redwood posts, farm produce" |
| The end card's sixty cargoes | "About sixty cargoes have been loaded here annually" |
| The chute: 180 ft trough, 100 ft swing apron | vault gazetteer, Fort Ross Cove entry (Dixon, 1867) |
| Log mooring buoys, not balls | MPDF: an anchor on the seafloor "with a log measuring as much as 50 ft long at the surface to hold up the chain" |
| Ringbolts in the rock | MPDF: "Metal eyebolts, ringbolts, and staples set in the cliffs and offshore rocks" |

Two deliberate departures, both for play, both easy to undo:
- **Time runs at seven times life**, and she is faster and handier than the
  real thing: about nine knots flat out, and a hard-over turn of roughly
  forty-five degrees a second. A real loaded doghole schooner made five or
  six knots and took a while about everything. The knots in the HUD are true
  knots; it is the clock that is compressed. The difficulty is meant to come
  from the tide, the lee and the rocks, not from treacle.
- The cove's outline is drawn from Davidson's bearings and distances, not
  traced from a modern chart. It is the right shape and the right scale; it is
  not survey-accurate to the metre.

One correction to our own notes: the vault gazetteer says "3 mooring buoys".
Davidson says **two** moorings plus a third buoy on the sunken rock. The game
follows Davidson.

---

## The shore, the rocks and the wreck

The land is a place, not the edge of the playfield: ground and scrub, timber
thickening inland and thinning toward the cliff, the cliff face with gullies
cut into it, the road down the gully, the sand beach and its creek, the
stockade with its chapel and Orthodox cross, and at the chute head a working
yard: stacked cordwood, the tender's hut, the winch house, the bluff fence,
the stone wharf and Call's warehouse. Sizes are real: a cord is 4 by 4 by 8
feet, the stockade is about 300 by 250 feet, the hut is about 24 feet.

Rocks are dense now, because the coast is: Davidson has it "bordered by rocks
generally quite close under the shore", and off the Northwest Cape they "lie
quite thick close under the shore". Every one is a hazard. Some carry seals
hauled out. Three offshore rocks carry **iron** and your mooring lines run to
them by name, which is what the MPDF means by "eyebolts, ringbolts, and
staples set in the cliffs and offshore rocks".

The kelp is **bull kelp**, which is what grows here: a float at the surface
with blades streaming away downtide. It lies over with the set, so a kelp bed
is a tide gauge as well as a warning that there is rock underneath.

⚠ **The two coloured marks at the cove entrance are NOT documented.** Davidson
records three buoys at Fort Ross and no more: two moorings and the one on the
sunken rock. The entrance marks are a playing aid, standing where he puts
leading marks that were in fact ranges on the shore, not floating buoys.

When you lose her she breaks in two and goes down over seven seconds, with her
deckload and her timbers adrift on the set, before the card comes up. Enter
skips it.

## The San Francisco leg: `gate.html` + `gate.js`

⭐ **THE COVE IS FINISHED AND IS NOT TO BE CHANGED.** Aodhan's call, 2026-09-22:
"keep the Cove part exactly how it is, that's perfect." Work on the bay.

    open http://127.0.0.1:8913/gate.html          straight to the passage
    open http://127.0.0.1:8913/gate.html?cargo=52 with a given cargo

Revert points: `doghole-v1-cove-good` (cove only) and `doghole-v2-gate-good`
(everything, end of 2026-09-22).

### What the leg is

**A visibility game, not a steering game.** You see a circle of water round
your own vessel and nothing else. Point Bonita throws a great pool, the other
lights smaller ones, the towns and the Ferry Building glow, and every vessel
carries her own lantern-pool, so another ship is a light before she is a hull
and by then she is close. Dodging what comes out of it is the game; the tide
is atmosphere. Done as a mask: an opaque drifting fog layer with holes punched
by `destination-out`, which gives hard-edged pools rather than a wash.

Phases: the Gate, inside, the city front, alongside. You discharge at the
Steuart Street lumber wharf.

### What is in it, and what is true

| | |
|---|---|
| Batteries | twenty, from Aodhan's own verified inventory, filtered to what stood in 1905, each drawing the number and kind of gun it carried. Mortar batteries have PITS, not barrels |
| Fort Mason | is Point San Jose, "Black Point": an earthwork with Battery East and Battery West, palisade along the bank, facing the water |
| Fort Point | the brick fort, with its 1864 light on the wall |
| Lights | Point Bonita (with its footbridge), Lime Point, Fort Point, Alcatraz, Yerba Buena, each with its own character |
| ⚠ NOT there | **the Golden Gate Bridge** (1937) · **Mile Rocks light** (1906, so the rocks are unlit and deadly) · **the 1909 Alcatraz tower** (she still has the original 1854 one, the first on the Pacific coast) |
| The waterfront | pre-earthquake. April 1906 has not happened |
| The city | blocks of 92 by 137 yards, which is what a San Francisco block is, laid out in lots so nothing overlaps; a seawall, piers at right angles to it with sheds, the 1898 Ferry Building with its arcade, clock tower and five slips |
| Traffic | ferries (the *Eureka* was here in 1905 under her first name, *Ukiah*), a white-hulled **protected cruiser modelled on USS OLYMPIA**, steam schooners, square-riggers under tow, scow schooners, tugs, and fifteen lying at anchor |
| The warship | **USS Olympia**, at Aodhan's direction: 344 feet on 53 of beam, so long and lean where a battleship is a block. Two TWIN 8-INCH TURRETS fore and aft, ten 5-inch in SPONSONS standing out from her sides, TWO FUNNELS CLOSE TOGETHER amidships, two military masts with fighting tops, a ram bow. The sponsons are what tell a cruiser from a battleship when you are looking straight down on her |
| ⚠ Olympia and the Fleet | Olympia herself was not at San Francisco in 1905, and the Great White Fleet is 1907-09 and did not reach the city until May 1908. But the TYPE is right for the bay and the year, and white hull with buff upperworks was the Navy scheme until 1909, so she looks the part honestly rather than by coincidence |

### The rules that keep it playable

- **The chart is compressed to 30 per cent** (`COMPRESS` in gate.js); light
  ranges scale with it. Landmarks keep their true relative positions. This is
  a game map, not a chart you could navigate by.
- **Vessels are drawn at true length in uncompressed units**, and so is every
  building, so ships and buildings are in correct proportion to each other.
  The cost is that only a handful of city blocks fit where forty belong.
- **The wind shifts but never traps you**: never inside fifty degrees of the
  course you actually need, which moves as you get on. The tide is capped
  near two knots. **T takes a tug**, which is what they did.
- **Land is solid**, and so is rock. **AI lanes are clipped** to keep a
  vessel's own length clear of both, and are sampled at 240 points to prove
  it. Anything lying at anchor on a foul berth is shifted to clear water.
- **Every fixed work ashore is settled onto land at load**, because a
  simplified coastline always leaves something on the wrong side.
- **The chart in the corner shows only CONTACTS you have seen**, and holds
  their last known position as it goes stale.
- **`** is dev mode: no wind, no tide, nothing can hurt you, four times her
  speed.

## Sound

| | |
|---|---|
| `theme.m4a` | the Bach, looping. Everywhere. **This is the only music that plays** |
| `bell.m4a` | a buoy bell, **both legs**, only when you are within hearing of a buoy, at 26 to 60 second intervals. A 5.6 s cut from Aodhan's recording, taken at the strongest strike |
| `foghorn.m4a` | **the bay only.** In 1905 Point Bonita, Lime Point, Fort Point and Alcatraz all had fog signals, and in a fog they were the only thing telling you where the land was. ⚠ **KEPT RARE on purpose**: the first inside half a minute, then one every one to two minutes, quieter the further you are from whichever station sounded it. A real signal sounded every thirty seconds, but at that rate it becomes wallpaper and stops meaning anything, so this is a deliberate departure |
| `rope.m4a` | **a line parting**, in the cove. Sounds the instant a mooring goes, and again when the last of them lets her away. The source had 1.47 s of silence in front of the snap, which had to come off: a line parting has to be instant or it does not read as one |
| `thunder-near.m4a` / `thunder-far.m4a` | **two clips cut from one recording of Aodhan's.** The crack at 2.0 s with its roll away is the near strike; the softer roll later in the same file is a strike further off. Both in the cove AND on the title screen, and both arrive AFTER the flash: a quarter of a second for a near one, up to five for a far one |
| synthesised | **everything else, built in the page out of noise and oscillators**, so the game owns it outright: the sea bed · **a bundle running down the chute** (a rush that builds as it picks up speed, with the boards rattling under it) and **fetching up aboard** · **making sail** (the halyard through the blocks, the cloth, the sheave squealing) · **a line made fast** (the rope running, then brought up solid) · **the wreck** (a low boom, then her timbers splintering for a second or two) |

**M mutes everything**, in both legs.

⚠ All three recordings are QUIET as supplied (the bell measured rms .035).
Each is gained up and soft-limited on the way in, so the body comes up without
squashing the strike. If a new clip cannot be heard, that is the first thing
to check. `window.__sfx` sounds every one of them on demand, so they can be judged one
at a time: `__sfx.ring() .snap() .chute() .land() .thunder() .sail() .line()
.crash()`.

## Getting about

| key | |
|---|---|
| `=` | **skip the cove** and go straight to the San Francisco leg. From the cove she takes whatever cargo she has aboard, or a part cargo of 42 if you have not loaded yet; from the title screen it is 42 |
| `Esc` | back to the title screen, from either leg |
| `M` | mute everything |
| `` ` `` | dev mode, in the bay: no wind, no tide, nothing can hurt you, four times her speed |

## Re-rendering the music

⚠ **`theme2.m4a` is NOT used.** A second verse with the stops drawn out was
tried on 2026-09-22 and Aodhan took it straight back out: the theme loops, and
that is how it stays unless he asks again. The file and the switches below are
kept so it can be reconsidered without redoing the work, but nothing in the
game references it.


    cd ~/passion-organ
    python3 scripts/render_midi.py                                  # first verse
    HOLD=2.4 SWELL=1.0 OUTTAG=_ii python3 scripts/render_midi.py    # second

`HOLD` stretches every note. `SWELL` from 0 to 1 opens the box: more reed,
more weight in the inner parts and the pedal, a brighter cutoff, the 16 ft and
the mixture, and more of the building in the sound.

⚠ **Loudness will not tell you whether SWELL worked**: the master is
normalised, so a fuller registration comes back at the same level. Judge it on
BRIGHTNESS and on what is happening below 160 Hz. The first attempt at this
used level alone and moved the brightness by three per cent, which is nothing.
Drawing more RANKS is what makes a second verse sound bigger.

## Dev hooks

`window.__dev` in the console: `.berth()` puts her in the berth, `.put(x,y,hdg)`
anywhere, `.cargo(n)`, `.wind(fromDeg, kn)`, `.ship`, `.env`, `.phase`.

---

## Where to take it next

It is short and it is easy. The loop works; there is not enough of it, and
nothing in it can really hurt you yet. Ranked by what would add most for the
least new machinery.

### 1. Make the sea the enemy it was (deepens what exists, no new systems)
- **TIDE HEIGHT, not just set.** Davidson's sunken rock is "BARE AT LOW
  WATER", the chute projects over "twelve feet of water", and there is "a
  depth of twelve feet close to this beach". So the whole cove is only a
  fathom or two of margin, and the tide moves it. At low water the berth gets
  thin and rocks that were covered come bare. One number, enormous effect.
- **The loading is a holding action you can lose.** Right now the sea gets up
  gently and lines part at random. It should be a decision: every cord is
  money, the swell is rising, and you choose when to stop. Push too long and
  you part your moorings and go ashore, which is how they were lost.
- **A wind that shifts, and a southeaster that comes on.** The cove is open
  to the south-west and only partly protected from the north-west. A shift
  while you are moored means casting off in a hurry or riding it out to the
  south-east buoy, which is what Davidson says they did in winter.
- **The lead line.** Sound by hand, get a depth and a bottom. "By the mark,
  five." It is the period instrument and it makes the depth field playable
  rather than a number in the corner.
- **Fog.** This coast is famous for it. Navigate by the chute's lamp, the
  sound of surf on the rocks, and the lead.

### 2. The nine landings are nine levels (content, reusing everything)
The title screen already names them and they are already researched:
- **Hardscratch / Signal Port** - a chute 200 yards long off an 80-foot
  cliff, eight vessels a month. A straightforward second port.
- **Nip and Tuck** - a trough chute off a 75-foot cliff, six vessels in the
  whole of 1883. The schooner *Caroline Medau* wrecked under it in 1881.
- **Rough and Ready** - on the most exposed rock in the cove; the sea took
  the chute three times.
- **Mal Paso** - a slot seventy yards wide, ONE eighty-ton vessel at a time,
  "a dangerous-looking place". A precision level.
- **Iversen's** - vessels lay stern-in in 17 feet moored to the rocks, and
  ran for Havens Anchorage when the south-west swell came in. A level you
  are meant to abandon.
- **Uncle Abe's** - pulled down before the 1889 survey reached it. A level
  about arriving too late.
- **Devilbliss** - nobody now knows where on the coast it stood. A level with
  a blank chart, where finding it is the game.
- **Bromley Gulch** - built in 1884 and never once used, because nobody set
  the moorings. **A level that cannot be completed**, and should be the last
  one.

### 3. A voyage and a season (the layer above)
- The run to San Francisco and back: the north-west wind, the inshore
  current, Point Reyes, the Farallones. Cargo pays: Mendocino lumber sold in
  San Francisco at twenty dollars a thousand feet rough, thirty dressed
  (Cronise 1868).
- A season of it. Fort Ross loaded **about sixty cargoes a year**. Weather
  worsens into winter. Repairs, and a better vessel if you earn her.
- Cargo types, which Davidson lists for this cove: firewood, tanbark,
  redwood posts, farm produce, passengers. Different stowage, different money.

### 4. The loading itself, properly
- **The clapper** at the chute's end regulating the flow, and the rule that
  lumber was NOT sent down one piece at a time: they filled the whole apron
  "reducing the likelihood of a timber racing down and injuring the men at
  the other end". Get the rhythm wrong and you hurt somebody.
- **The wire chute**, which is a different game: a traveler running down as
  much as 800 feet of wire from a platform on the bluff, hauled back by a
  falling counterweight. Fort Ross had one from about 1901.
- **The breeches buoy**, for getting men between ship and shore.

### 5. Set pieces that actually happened here
- The coastal steamer **Pomona** wrecked in this cove in 1908 and is still
  in it; the schooner **J. Eppinger** wrecked into the Call wharf in 1901 and
  destroyed it. T.P.H. Whitelaw, the salvor, worked both coasts and also
  maintained the chute owners' mooring anchors and chains.
