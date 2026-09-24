// =====================================================================
// THE GOLDEN GATE AND SAN FRANCISCO, 1905. The second half of the voyage:
// you have your cargo, now get it to market.
//
// WHY 1905 MATTERS, and what is deliberately absent:
//   - NO BRIDGE. The Golden Gate Bridge is 1937.
//   - NO MILE ROCKS LIGHT. It was built in 1906, so in 1905 Mile Rocks is
//     an unlit rock in the fairway, which is exactly why they built it:
//     the City of Rio de Janeiro was lost there in 1901 with 128 dead.
//   - ALCATRAZ still has its ORIGINAL 1854 lighthouse, the first on the
//     Pacific coast. The tower you see today is 1909.
//   - The waterfront is PRE-EARTHQUAKE. April 1906 has not happened.
//   - Fort Point is standing but quiet; the Endicott concrete batteries on
//     the bluffs above it have taken over its job.
//
// Positions are true, converted from latitude and longitude with Fort Point
// as the origin. The battery list is Aodhan's own verified inventory,
// `06 Main Notes/Research Projects/bay-coastal-defense/master-inventory.md`,
// filtered to what was actually armed or standing in 1905.
//
// Units: yards. x east, y south. Origin: Fort Point, 37.8106 N 122.4772 W.
// =====================================================================

const LAT0 = 37.8106, LON0 = -122.4772;
const YD_PER_DEG_LAT = 121620;                 // 60 nm x 2027 yd
const YD_PER_DEG_LON = 96100;                  // x cos(37.8)

// ⚠ DELIBERATE COMPRESSION, and it is large. Everything below sits at its
// true latitude and longitude and therefore in its true RELATIVE position:
// Fort Point faces Lime Point across the narrows, Alcatraz lies where
// Alcatraz lies, the Ferry Building is where you would find it. But the
// whole chart is scaled to THIRTY per cent, so the bay is a place you can
// cross rather than four and a half miles of empty water with a speck in
// it. This is a game map with the landmarks in the right relationship, not
// a chart you could navigate by. COMPRESS = 1 sails the real distances.
export const COMPRESS = .30;
export const ll = (lat, lon) => [ (lon - LON0) * YD_PER_DEG_LON * COMPRESS,
                                 -(lat - LAT0) * YD_PER_DEG_LAT * COMPRESS ];

// ------------------------------------------------------------ landmarks
export const LIGHTS = [
  { ...pt(37.8158, -122.5296), name: "Point Bonita",
    char: "fixed white", col: "#fff2d0", period: 0, range: 1500, h: 124,
    note: "1877, moved down to the point's tip because the 1855 light stood too high and was lost in the fog" },
  { ...pt(37.8256, -122.4786), name: "Lime Point",
    char: "fixed red", col: "#ff9a7a", period: 0, range: 900, h: 20,
    note: "fog signal 1883, light added 1900" },
  { ...pt(37.8106, -122.4772), name: "Fort Point",
    char: "fixed white", col: "#ffe8b8", period: 0, range: 700, h: 36,
    note: "1864, the third light on this spot, mounted on the fort itself" },
  { ...pt(37.8267, -122.4222), name: "Alcatraz",
    char: "occulting white", col: "#fff4dc", period: 4, range: 1200, h: 166,
    note: "1854, the FIRST lighthouse on the Pacific coast; replaced 1909" },
  { ...pt(37.8089, -122.3644), name: "Yerba Buena",
    char: "occulting white", col: "#fff4dc", period: 6, range: 1100, h: 95,
    note: "1875" },
];
function pt(lat, lon){ const [x,y] = ll(lat, lon); return { x, y }; }

// Armed or standing in 1905. Anything built later is not here.
export const BATTERIES = [
  // --- the Marin side: Fort Baker and Fort Barry
  { ...pt(37.827894, -122.481913), name: "Battery Spencer",  guns: "3 x 12-in", yr: "1897" },
  { ...pt(37.827316, -122.490256), name: "Battery Kirby",    guns: "2 x 12-in disappearing", yr: "1900" },
  { ...pt(37.827408, -122.485968), name: "Battery Wagner",   guns: "2 x 5-in", yr: "1901" },
  { ...pt(37.837204, -122.474492), name: "Battery Duncan",   guns: "2 x 8-in", yr: "1899" },
  { ...pt(37.835332, -122.473076), name: "Battery Cavallo",  guns: "3 x 8-in", yr: "1876" },
  { ...pt(37.833623, -122.473170), name: "Battery Yates",    guns: "6 x 3-in", yr: "guns 1905" },
  { ...pt(37.822020, -122.531395), name: "Battery Mendell",  guns: "2 x 12-in disappearing", yr: "1905" },
  { ...pt(37.825997, -122.529533), name: "Battery Alexander",guns: "8 x 12-in mortars", yr: "1903" },
  { ...pt(37.827311, -122.532127), name: "Battery Guthrie",  guns: "4 x 6-in", yr: "1905" },
  { ...pt(37.828202, -122.532461), name: "Battery O'Rorke",  guns: "4 x 3-in", yr: "1905" },
  { ...pt(37.82666,  -122.51833),  name: "Battery Rathbone", guns: "4 x 6-in", yr: "1905" },
  // --- the city side: Fort Winfield Scott and the Presidio bluffs
  { ...pt(37.803611, -122.477222), name: "Battery Godfrey",       guns: "3 x 12-in", yr: "1896" },
  { ...pt(37.805833, -122.476667), name: "Battery Marcus Miller", guns: "3 x 10-in disappearing", yr: "1898" },
  { ...pt(37.807171, -122.476635), name: "Battery Cranston",      guns: "2 x 10-in disappearing", yr: "1898" },
  { ...pt(37.808072, -122.476163), name: "Battery Lancaster",     guns: "3 x 12-in disappearing", yr: "1900" },
  { ...pt(37.804444, -122.476944), name: "Battery Boutelle",      guns: "3 x 5-in", yr: "1901" },
  { ...pt(37.799756, -122.477498), name: "Battery Saffold",       guns: "2 x 12-in", yr: "1897" },
  { ...pt(37.794017, -122.482608), name: "Battery Chamberlin",    guns: "4 x 6-in disappearing", yr: "1904" },
  { ...pt(37.798412, -122.480320), name: "Battery Crosby",        guns: "2 x 6-in disappearing", yr: "1900" },
  { ...pt(37.808,    -122.474),    name: "Battery East",          guns: "earthwork, 15-in Rodman", yr: "1873" },
  // Point San Jose, "Black Point", which is Fort Mason: an earthwork battery
  // commanding the Alcatraz passage, with its own Battery East and West.
  { ...pt(37.80680, -122.42720), name: "Black Point, Battery West", guns: "6 x 10-in Rodman", yr: "1864", earthwork: true },
  { ...pt(37.80600, -122.42520), name: "Black Point, Battery East", guns: "6 x 10-in Rodman", yr: "1864", earthwork: true },
];

export const FORT_POINT = pt(37.8106, -122.4772);
export const FERRY_BUILDING = pt(37.7955, -122.3937);
export const ALCATRAZ = pt(37.8267, -122.4222);
export const ANGEL_IS = pt(37.8608, -122.4322);
export const YERBA_BUENA = pt(37.8089, -122.3644);
export const FORT_MASON = pt(37.8065, -122.4265);
export const LIME_POINT = pt(37.8256, -122.4786);
export const PT_BONITA = pt(37.8158, -122.5296);

// where you are bound: the lumber wharves were north of the Ferry Building,
// on the Steuart Street front and round into Mission Bay. This is the
// Steuart Street lumber berth.
// Off the end of the piers, in the stream, not up on the Embarcadero:
// you lie off and warp in, as you did at Fort Ross.
export const BERTH = { ...pt(37.7975, -122.3925), hdg: 300, tol: 34 };
BERTH.x += 70; BERTH.y += 10;

// Five slips cut into the front of the Ferry Building. A boat lies in one
// with her bow to the building; you keep out of them.
// The slips are cut INTO the waterfront, with the building at their head.
// The mouth is the seaward end; `head` is the apron against the building.
// A boat runs in to `head`, lies there, and backs out past `mouth`.
// The slips open SEAWARD, which here is east of the building: the bay is on
// that side. Cutting them into the landward face put them in the city.
export const SLIPS = [-52, -26, 0, 26, 52].map((dy, i) => {
  const x = FERRY_BUILDING.x + 36, y = FERRY_BUILDING.y + dy;
  return { i, headX: x, mouthX: x + 68, y, len: 68, wide: 21 };
});

// The lumber wharf you are bound to, drawn as a wharf so you can see it.
// Your berth: a lumber wharf standing out from the seawall north of the
// Ferry Building, with the berth alongside its northern face.
export const WHARF = (() => {
  const root = ll(37.8014, -122.3992);            // where it meets the seawall
  return { x: root[0] - 52, y: root[1] - 8, len: 104, wide: 26, rootX: root[0], rootY: root[1] };
})();
BERTH.x = WHARF.x - 4; BERTH.y = WHARF.y - 28; BERTH.hdg = 300; BERTH.tol = 40;

// --------------------------------------------------------- the shoreline
// Simplified but scaled: every headland below sits where it really sits.
// ⚠ The first version of this cut the corner at Point Bonita and left
// Battery Mendell, Alexander, Guthrie and O'Rorke standing in the sea. The
// Bonita headland is a HOOK: the ocean coast runs north on its west side up
// to Rodeo Cove, the batteries of Fort Barry sit on the ridge between, and
// the point itself turns back south-east to the light. The outline now goes
// round the outside of them.
export const MARIN = [
  ...[[37.8000,-122.5620],[37.8120,-122.5520],[37.8200,-122.5490],  // the ocean side
      [37.8285,-122.5455],[37.8330,-122.5400],[37.8345,-122.5330],  // Rodeo Cove
      [37.8330,-122.5255],[37.8300,-122.5215],[37.8265,-122.5225],  // round the head
      [37.8225,-122.5262],[37.8190,-122.5288],                      // down the east side
      [37.8158,-122.5296],                                          // POINT BONITA
      [37.8205,-122.5245],[37.8232,-122.5170],[37.8262,-122.5070],  // Bonita Cove
      [37.8268,-122.4980],[37.8280,-122.4900],[37.8272,-122.4850],  // Kirby Cove
      [37.8262,-122.4800],[37.8256,-122.4786],                      // LIME POINT
      [37.8290,-122.4760],[37.8330,-122.4745],[37.8352,-122.4731],  // Horseshoe Cove
      [37.8380,-122.4760],[37.8430,-122.4800],[37.8500,-122.4830],  // Sausalito
      [37.8620,-122.4850],[37.8700,-122.5000],[37.8700,-122.5700]
     ].map(([a,b]) => ll(a,b)),
];
// West of Fort Point this is a rock coast. East of it, it is a city: Aquatic
// Park, then the SEAWALL, which is a straight built edge, and the piers stand
// out from it at right angles. A seawall does not wander.
export const CITY = [
  ...[[37.7820,-122.5200],[37.7870,-122.5140],[37.7929,-122.5107],  // Lands End, Mile Rock
      [37.7950,-122.5060],[37.7940,-122.4900],[37.7955,-122.4830],  // Baker Beach
      [37.8020,-122.4790],[37.8070,-122.4778],[37.8106,-122.4772],  // FORT POINT
      [37.8090,-122.4700],[37.8072,-122.4600],[37.8070,-122.4480],  // Presidio shore
      [37.8068,-122.4380],[37.8066,-122.4300],[37.8064,-122.4240],  // FORT MASON
      [37.8062,-122.4190],[37.8050,-122.4140],[37.8046,-122.4100],  // Aquatic Park
      [37.8042,-122.4062],[37.8030,-122.4022],[37.8014,-122.3992],  // the SEAWALL
      [37.7998,-122.3968],[37.7978,-122.3950],[37.7955,-122.3937],  // FERRY BUILDING
      [37.7928,-122.3922],[37.7898,-122.3906],[37.7864,-122.3892],
      [37.7820,-122.3884],[37.7760,-122.3906],[37.7700,-122.4000],
      [37.7700,-122.5200]
     ].map(([a,b]) => ll(a,b)),
];

// The seawall front, as a line: piers stand out from it and the Ferry
// Building sits at its middle, at the foot of Market Street.
export const SEAWALL = [[37.8046,-122.4100],[37.8042,-122.4062],
  [37.8030,-122.4022],[37.8014,-122.3992],[37.7998,-122.3968],
  [37.7978,-122.3950],[37.7955,-122.3937],[37.7928,-122.3922],
  [37.7898,-122.3906],[37.7864,-122.3892]].map(([a,b]) => ll(a,b));
// The islands as outlines, not ellipses. Angel Island in particular is not
// round: it has Point Stuart on the west, Point Knox on the south-west,
// Point Blunt at the south-east corner, Quarry Point to the north-east, and
// Ayala Cove bitten into the north shore.
export const ISLANDS = [
  { name: "Alcatraz", c: ALCATRAZ, poly: [
      [37.8279,-122.4245],[37.8274,-122.4222],[37.8266,-122.4205],
      [37.8256,-122.4204],[37.8251,-122.4220],[37.8256,-122.4243],
      [37.8266,-122.4256],[37.8275,-122.4256],
    ].map(([a,b]) => ll(a,b)) },
  { name: "Angel Island", c: ANGEL_IS, poly: [
      [37.8695,-122.4310],                    // Point Campbell, the north end
      [37.8683,-122.4252],[37.8655,-122.4196],
      [37.8628,-122.4172],                    // Quarry Point
      [37.8580,-122.4166],[37.8540,-122.4176],
      [37.8515,-122.4198],                    // Point Blunt
      [37.8506,-122.4248],[37.8516,-122.4302],
      [37.8545,-122.4358],                    // Point Knox
      [37.8578,-122.4404],
      [37.8612,-122.4424],                    // Point Stuart
      [37.8648,-122.4408],
      [37.8664,-122.4372],[37.8676,-122.4352], // Ayala Cove, bitten in
      [37.8688,-122.4338],
    ].map(([a,b]) => ll(a,b)) },
  { name: "Yerba Buena", c: YERBA_BUENA, poly: [
      [37.8112,-122.3668],[37.8106,-122.3626],[37.8088,-122.3606],
      [37.8068,-122.3614],[37.8060,-122.3646],[37.8070,-122.3678],
      [37.8092,-122.3686],
    ].map(([a,b]) => ll(a,b)) },
];

// Rocks along both shores. Same reasoning as the cove: the coast is bordered
// by rock, and in a fog the first you know of the shore is the water breaking
// on it.
// Is this point ashore? Needed here so the rocks can be placed in the WATER
// rather than trusting which way round a shoreline segment happens to run.
function inRing(x, y, pts, closeTo){
  const all = pts.concat(closeTo);
  let inside = false;
  for (let i = 0, j = all.length - 1; i < all.length; j = i++){
    const xi = all[i][0], yi = all[i][1], xj = all[j][0], yj = all[j][1];
    if ((yi > y) !== (yj > y) && x < (xj-xi)*(y-yi)/(yj-yi) + xi) inside = !inside;
  }
  return inside;
}
export function landAt(x, y){
  if (inRing(x, y, MARIN, [[-9000,-14000],[14000,-14000]])) return true;
  if (inRing(x, y, CITY,  [[14000,14000],[-9000,14000]]))   return true;
  for (const is of ISLANDS){
    let inside = false;
    const P = is.poly;
    for (let i = 0, j = P.length-1; i < P.length; j = i++){
      if ((P[i][1] > y) !== (P[j][1] > y) &&
          x < (P[j][0]-P[i][0])*(y-P[i][1])/(P[j][1]-P[i][1]) + P[i][0]) inside = !inside;
    }
    if (inside) return true;
  }
  return false;
}

export const SHORE_ROCKS = (() => {
  let s = 19050422;
  const rnd = () => (s = (s*1664525 + 1013904223) >>> 0) / 4294967296;
  const out = [];
  // ⚠ The city front from Fort Point round to south of the Ferry Building is
  // BUILT: seawall, piers, slips. There is no rock in it. Rock belongs on the
  // Marin shore and on the ocean side of the city, west of Fort Point.
  const FORT_POINT_X = ll(37.8106, -122.4772)[0];
  for (const line of [MARIN, CITY]){
    for (let i = 0; i < line.length - 1; i++){
      const a = line[i], b = line[i+1];
      if (line === CITY && (a[0] > FORT_POINT_X - 40 || b[0] > FORT_POINT_X - 40)) continue;
      const len = Math.hypot(b[0]-a[0], b[1]-a[1]);
      const n = Math.max(1, Math.floor(len / 26));
      const nx = (b[1]-a[1])/len, ny = -(b[0]-a[0])/len;
      for (let k = 0; k < n; k++){
        const f = (k + .2 + rnd()*.6) / n;
        const px = a[0] + (b[0]-a[0])*f, py = a[1] + (b[1]-a[1])*f;
        const want = 10 + rnd()*26;          // how far off the beach it lies
        // Which way is the water? Try one side, and if that is land try the
        // other. Assuming a side by which polyline it came from put half of
        // them up on the shore.
        let bx = px + nx*want, by = py + ny*want;
        if (landAt(bx, by)){ bx = px - nx*want; by = py - ny*want; }
        if (landAt(bx, by)) continue;        // a cleft too narrow for a rock
        // and walk it out until it is properly afloat, not half buried
        let tries = 0;
        while (landAt(bx, by) && tries++ < 8){ bx += nx*6; by += ny*6; }
        out.push({ x: bx, y: by, r: 3 + rnd()*9, awash: rnd() < .6,
                   seed: (rnd()*1e6)|0, name: "rocks under the shore" });
      }
    }
  }
  return out;
})();

// ----------------------------------------------------------- the dangers
export const HAZARDS = [
  { ...pt(37.7929, -122.5107), r: 70, name: "MILE ROCKS",
    note: "unlit until 1906. The City of Rio de Janeiro struck here in 1901 and 128 were lost." },
  { ...pt(37.7938, -122.5060), r: 40, name: "Mile Rocks, the lesser" },
  { ...pt(37.8146, -122.5330), r: 60, name: "the rocks off Point Bonita" },
  { ...pt(37.8175, -122.5270), r: 45, name: "Bonita Cove rocks" },
  { ...pt(37.8250, -122.4800), r: 50, name: "the rocks under Lime Point" },
  { ...pt(37.8110, -122.4800), r: 45, name: "Fort Point Rock" },
  { ...pt(37.8213, -122.4660), r: 55, name: "Harding Rock" },
  { ...pt(37.8188, -122.4500), r: 50, name: "Shag Rocks" },
  { ...pt(37.8090, -122.4890), r: 48, name: "the Presidio shoal" },
];

// ------------------------------------------------------------- traffic
// The main obstacle in the city is not rock, it is other vessels. In 1905
// the bay ferries ran all day between the Ferry Building and Oakland,
// Alameda, Sausalito and Tiburon, and they did not give way to a schooner.
// WHAT IS ON THE WATER IN 1905, and every one of these is a real class of
// vessel that was here that year:
//
//  FERRY. The Southern Pacific boats ran all day and did not give way to a
//    schooner. The one everybody knows is the EUREKA at the Maritime Park,
//    and she was here in 1905 under her first name, UKIAH (1890); she was
//    rebuilt and renamed Eureka in 1922. The BERKELEY (1898), also at the
//    Park, was the first double-ended propeller ferry on the coast.
//  WARSHIP: a PROTECTED CRUISER, modelled on USS OLYMPIA at Aodhan's
//    direction. ⚠ Olympia herself was not in San Francisco in 1905, and the
//    Great White Fleet is 1907-09 and did not reach the city until May 1908.
//    But the TYPE is right for the bay and the year, and the white hull with
//    buff upperworks was the standard US Navy scheme until 1909, so she
//    looks the part honestly rather than by coincidence.
//  STEAM SCHOONER. The lumber trade's own vessel, house and engine aft.
//  SQUARE-RIGGER IN TOW. Cape Horn grain ships and the Alaska Packers'
//    fleet, towed in and out by tugs.
//  SCOW SCHOONER. The flat-bottomed bay workhorse, hay and brick and sand.
//  TUG. Everywhere, and fast.
// Lanes are POLYLINES now, not straight lines between two points. A ferry
// leaves her slip heading EAST, out along the slip's own axis, gets into the
// fairway clear of the piers, and only then turns for Oakland or Sausalito.
// Running her diagonally out of a slip put her straight through the building.
const F = FERRY_BUILDING;
export const LANES = [
  { kind: "ferry", name: "the Oakland boat", n: 4, speed: 13, len: 78, slip: 0,
    pts: [ {x:F.x+40,y:F.y-52}, {x:F.x+140,y:F.y-52}, {x:F.x+260,y:F.y-30},
           pt(37.7950,-122.3300) ] },
  { kind: "ferry", name: "the Sausalito boat", n: 3, speed: 12, len: 70, slip: 1,
    pts: [ {x:F.x+40,y:F.y-26}, {x:F.x+150,y:F.y-26}, {x:F.x+280,y:F.y-140},
           pt(37.8200,-122.4150), pt(37.8560,-122.4790) ] },
  { kind: "ferry", name: "the Tiburon boat", n: 2, speed: 12, len: 66, slip: 2,
    pts: [ {x:F.x+40,y:F.y}, {x:F.x+150,y:F.y}, {x:F.x+300,y:F.y-190},
           pt(37.8380,-122.4100), pt(37.8730,-122.4460) ] },
  // ⚠ Modelled on USS OLYMPIA, the protected cruiser: 344 feet on 53 of beam,
  // which is 115 yards by 18 and a ratio of six and a half to one, far leaner
  // than the pre-dreadnought that used to be here. Two TWIN 8-INCH TURRETS
  // fore and aft, ten 5-inch in broadside sponsons, TWO FUNNELS CLOSE
  // TOGETHER amidships, two military masts with fighting tops, a ram bow, and
  // the white hull with buff upperworks that the Navy wore until 1909.
  { kind: "cruiser", name: "a protected cruiser of the Pacific squadron", n: 2,
    speed: 9, len: 115,
    pts: [ pt(37.8210,-122.4760), pt(37.8190,-122.4420), pt(37.8120,-122.4120),
           pt(37.8060,-122.3990) ] },
  { kind: "steamer", name: "a coasting steamer", n: 3, speed: 10, len: 92,
    pts: [ pt(37.8300,-122.5400), pt(37.8190,-122.4800), pt(37.8110,-122.4300),
           pt(37.8050,-122.4010) ] },
  { kind: "schooner", name: "a steam schooner", n: 4, speed: 8, len: 66,
    pts: [ pt(37.8240,-122.5200), pt(37.8160,-122.4700), pt(37.8090,-122.4260),
           pt(37.8058,-122.4035) ] },
  { kind: "square", name: "a deepwaterman under tow", n: 2, speed: 5, len: 128,
    pts: [ pt(37.8055,-122.5320), pt(37.8140,-122.4800), pt(37.8140,-122.4400),
           pt(37.8125,-122.4210) ] },
  { kind: "scow", name: "a hay scow", n: 4, speed: 5, len: 34,
    pts: [ pt(37.8600,-122.4300), pt(37.8300,-122.4180), pt(37.8080,-122.4020),
           {x:F.x+210,y:F.y+90} ] },
  { kind: "tug", name: "a tug", n: 5, speed: 11, len: 30,
    pts: [ pt(37.8130,-122.4500), pt(37.8090,-122.4200), {x:F.x+240,y:F.y+40} ] },
  { kind: "steamer", name: "a bay steamer", n: 1, speed: 9, len: 74,
    pts: [ pt(37.8480,-122.4200), pt(37.8220,-122.4120), pt(37.8072,-122.3985) ] },
];

// Vessels lying at anchor in the stream, which you must go round.
export const ANCHORED = [
  pt(37.8090, -122.4230), pt(37.8110, -122.4180), pt(37.8060, -122.4120),
  pt(37.8130, -122.4090), pt(37.8030, -122.4030), pt(37.8150, -122.4300),
  pt(37.8180, -122.4160), pt(37.8000, -122.4000), pt(37.8160, -122.4250),
  pt(37.8200, -122.4110), pt(37.8075, -122.4060), pt(37.8115, -122.3990),
  pt(37.8210, -122.4350), pt(37.8045, -122.4180), pt(37.8140, -122.4420),
];

// Buildings. Not every one of these is individually documented; they are
// the right KINDS of thing in the right places: the city front, the
// Presidio, Fort Mason, the Alcatraz works, Sausalito on the Marin shore.
export const BUILDINGS = [
  { ...pt(37.8072, -122.4285), w: 70, h: 40, name: "Fort Mason" },
  { ...pt(37.7975, -122.4790), w: 70, h: 40, name: "the Presidio" },
  { ...pt(37.7995, -122.4600), w: 60, h: 36, name: "" },
  { ...pt(37.8020, -122.4450), w: 54, h: 34, name: "" },
  { ...pt(37.8030, -122.4320), w: 46, h: 30, name: "" },
  { ...pt(37.8045, -122.4150), w: 64, h: 38, name: "" },
  { ...pt(37.8020, -122.4080), w: 58, h: 34, name: "" },
  { ...pt(37.7995, -122.4020), w: 66, h: 40, name: "" },
  { ...pt(37.8500, -122.4830), w: 56, h: 34, name: "Sausalito" },
  { ...pt(37.8560, -122.4820), w: 44, h: 28, name: "" },
  { ...pt(37.8330, -122.4740), w: 40, h: 26, name: "Fort Baker" },
  { ...pt(37.8267, -122.4222), w: 52, h: 26, name: "" },
];
