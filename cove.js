// =====================================================================
// FORT ROSS COVE, in plan. Every sounding, rock, buoy and bearing below
// is taken from George Davidson, PACIFIC COAST PILOT (1889), "Fort Ross
// Anchorage", pp. 256-257, with the chute detail confirmed by the NRHP
// doghole-ports MPDF and the vault gazetteer. Nothing here is invented;
// where a thing is a guess it says so.
//
// Davidson, verbatim in substance:
//  - "a small cove, broad open to the southwest swell, and only partially
//     protected from the northwest swell"
//  - the bluff "makes a sharp curve to the southward and westward for
//     one-quarter of a mile, and this affords a lee in the northwest
//     summer winds"                          <- the wind shadow, below
//  - "The three fathom curve keeps moderately close to the western
//     cliffs, being only about one hundred yards out"
//  - "Two mooring-buoys are laid in the cove in five and a half and eight
//     fathoms of water, whilst a third and outer buoy marks the sunken
//     rock, bare at low water ... three hundred and ten [yards] south
//     seventy degrees east from the end of the chute"
//  - "There is a depth of six or seven fathoms over rocky bottom between
//     this rock ... and the chute"; "ten fathoms just outside"
//  - "broken ground with as little as fourteen feet of water lies almost
//     north distant seventy-five yards from the same rock, and thence to
//     a point north-northeast from it there is a reef on which the swell
//     breaks in heavy weather"
//  - "A chute is built out to the east-southeast from the western cliffs
//     and projects over twelve feet of water, where a vessel of seventy-
//     five tons can lie BROADSIDE TO THE END OF THE CHUTE AND HEAD OUT;
//     she has to be moored by SIX LINES to buoys and shore fastenings"
//  - "A fresh-water stream enters at the eastern part of the cove where
//     there is a short, broad sand beach. There is a depth of twelve feet
//     of water close to this beach"
//  - the kelp-marked sunken rocks 360 yards S 26 W of the south-west
//     point of the cliff, "especially dangerous to sailing vessels
//     hugging the western point of the cove when coming in to the
//     anchorage with the usual northwest winds"
//  - Pinnacle Rocks, 35 ft high, one mile SE, a third of a mile off, with
//     Fort Ross Reef running in to the shore
//  - "Off Northwest Cape, the eddy inshore current generally sets to the
//     northward at from one quarter to one-half mile per hour ...
//     Sometimes this current is reversed in continued heavy northwesters"
//  - "There is room for two vessels in the cove at one time"
//  - "About sixty cargoes have been loaded here annually"
//
// UNITS: yards. x runs east, y runs south (so y is canvas-friendly).
// The origin is Davidson's own reference, the south-west point of the
// bluff on the west side of the cove.
// =====================================================================

export const YD_PER_NM = 2027;
export const KN = YD_PER_NM / 3600;          // 1 knot in yards per second

// ---------------------------------------------------------------- land
// The coast runs NW to SE with the land to the north-east; the cove bites
// into it and opens to the south-west, which is why the south-west swell
// walks straight in.
export const LAND = [
  [-1500, -1600], [2200, -1600],
  [2200, 900], [1750, 700], [1450, 480], [1180, 300], [980, 150], [820, 20],
  [700, -60],                       // the eighty-foot point, east limit of the cove
  [612, -150], [560, -236], [492, -292], [430, -330],
  [360, -372], [300, -400],         // the short broad sand beach, and the creek
  [232, -414], [168, -418], [110, -404],
  [62, -372], [34, -300], [18, -186], [6, -92], [0, 0],   // west cliffs to the SW point
  [-74, -52], [-168, -104], [-300, -176], [-470, -262],
  [-700, -372], [-1000, -500], [-1500, -720],
];

// ------------------------------------------------------------ features
export const CHUTE = {
  head: [34, -300],                 // on the cliff
  end:  [150, -250],                // "projects over twelve feet of water"
  apron: 38,                        // the swing apron, 100 ft = 33 yd, say 38
};

// Davidson's two moorings, and his third (outer) buoy on the sunken rock
export const BUOYS = [
  { x: 250, y: -210, kind: "moor",  fathoms: 5.5 },
  { x: 330, y: -150, kind: "moor",  fathoms: 8 },
  { x: 441, y: -144, kind: "danger", note: "sunken rock, bare at low water" },
];

// shore fastenings: "metal eyebolts, ringbolts, and staples set in the
// cliffs and offshore rocks" (MPDF). Two on the cliff by the chute.
export const RINGBOLTS = [[52, -252], [26, -206]];

// the berth. Broadside to the end of the chute, head out.
export const BERTH = {
  x: 178, y: -214,
  heading: 202,                     // head out, to the SSW, ready to run
  tolPos: 26, tolHdg: 24, tolSpd: 0.5,
};

export const ROCKS = [
  // in the cove
  { x: 441, y: -144, r: 16, awash: true,  name: "the sunken rock" },
  { x: 441, y: -219, r: 20, awash: false, name: "broken ground, 14 ft" },
  { x: 468, y: -258, r: 18, awash: false, name: "the reef" },
  { x: 496, y: -296, r: 16, awash: false, name: "the reef" },
  // the trap on the way in, marked by kelp
  { x: -158, y: 323, r: 26, awash: false, name: "the kelp-marked rocks" },
  { x: -104, y: 366, r: 18, awash: false, name: "the kelp-marked rocks" },
  // the rock in the kelp field south-eastward of the cove
  { x: 693, y: 97, r: 20, awash: false, name: "the rock in the kelp" },
  // Pinnacle Rocks and Fort Ross Reef, a mile to the south-east
  { x: 1150, y: 760, r: 30, awash: false, high: 35, name: "the Pinnacle Rocks" },
  { x: 1216, y: 700, r: 22, awash: false, high: 35, name: "the Pinnacle Rocks" },
  { x: 1290, y: 620, r: 20, awash: true,  name: "Fort Ross Reef" },
  { x: 1352, y: 540, r: 18, awash: true,  name: "Fort Ross Reef" },
  // rocks close under the western shore
  { x: -246, y: -96, r: 14, awash: true, name: "rocks under the cape" },
  { x: -368, y: -160, r: 16, awash: true, name: "rocks under the cape" },
];

// Rocks close under the shore. Davidson does not chart every one of these:
// he says the coast is "bordered by rocks generally quite close under the
// shore", and off the Northwest Cape "rocks lie quite thick close under the
// shore". These are that, drawn in. They are hazards like any other.
export const SHORE_ROCKS = (() => {
  let s = 20260922;
  const rnd = () => (s = (s*1664525 + 1013904223) >>> 0) / 4294967296;
  const out = [];
  for (let i = 0; i < LAND.length; i++){
    const a = LAND[i], b = LAND[(i+1) % LAND.length];
    if (a[1] < -700 || b[1] < -700) continue;            // skip the inland edge
    const len = Math.hypot(b[0]-a[0], b[1]-a[1]);
    const n = Math.max(1, Math.floor(len / 46));
    for (let k = 0; k < n; k++){
      const f = (k + .2 + rnd()*.6) / n;
      const px = a[0] + (b[0]-a[0])*f, py = a[1] + (b[1]-a[1])*f;
      // push it out into the water, away from the land
      const nx = (b[1]-a[1])/len, ny = -(b[0]-a[0])/len;
      const off = 5 + rnd()*30;
      const x = px + nx*off, y = py + ny*off;
      if (onLand(x, y)) continue;
      out.push({ x, y, r: 2.6 + rnd()*9, awash: rnd() < .55, shore: true,
                 seal: rnd() < .13, seed: (rnd()*1e6)|0,
                 name: "rocks under the shore" });
    }
  }
  // outlying rocks and reef patches off the points, where they always are
  const OUTLIERS = [
    [-360, 40], [-470, 130], [-250, 180], [-560, -40], [-680, 60],
    [120, 210], [250, 300], [-60, 250], [420, 330], [560, 250],
    [760, 260], [880, 380], [1000, 470], [1120, 560], [-120, 120],
    [640, -20], [760, 60], [60, 330], [-300, 330], [340, 180],
    [-800, 180], [-900, 40], [-1050, 260], [-620, 300], [-430, 420],
    [180, 420], [520, 430], [700, 400], [860, 180], [980, 260],
    [1180, 700], [1300, 780], [1040, 660], [-180, 440], [60, 520],
    [430, 520], [-750, -120], [-540, -180], [590, -60], [520, -240],
  ];
  for (const [ox, oy] of OUTLIERS){
    const n = 4 + ((rnd()*6)|0);
    for (let k = 0; k < n; k++){
      const x = ox + (rnd()-.5)*70, y = oy + (rnd()-.5)*70;
      if (onLand(x, y)) continue;
      // Rocks belong near the shore and on the known reefs. Scattering them
      // through the open sea would be neither true nor playable: it would
      // leave no water to work in.
      if (distToShore(x, y) > 250) continue;
      out.push({ x, y, r: 3 + rnd()*11, awash: rnd() < .7, shore: true,
                 seal: rnd() < .10, seed: (rnd()*1e6)|0,
                 name: "an outlying rock" });
    }
  }
  return out;
})();

// Rocks with iron in them. The MPDF: "Metal eyebolts, ringbolts, and staples
// set in the CLIFFS AND OFFSHORE ROCKS were used to secure mooring lines."
// These are the offshore ones, and your lines go to them by name.
export const MOORING_ROCKS = [
  { x: 96,  y: -196, name: "the ringbolt rock" },
  { x: 214, y: -282, name: "the north rock" },
  { x: 268, y: -160, name: "the outer rock" },
];

// SIX LINES, SIX PLACES. Davidson: "she has to be moored by six lines to
// buoys and shore fastenings." Each one goes somewhere you can see and name,
// in the order the crew would run them: head lines out first, then the
// quarters, then the shore fastenings that hold her off the rock.
export const FASTENINGS = [
  { kind: "buoy", x: 250, y: -210, name: "the inner mooring buoy, 5\u00bd fathoms" },
  { kind: "buoy", x: 330, y: -150, name: "the outer mooring buoy, 8 fathoms" },
  { kind: "iron", x: 268, y: -160, name: "the outer rock" },
  { kind: "iron", x: 214, y: -282, name: "the north rock" },
  { kind: "iron", x: 96,  y: -196, name: "the ringbolt rock" },
  { kind: "cliff", x: 52, y: -252, name: "the ringbolts in the cliff" },
];

// Marks laid at the entrance. NOTE: Davidson records only THREE buoys here,
// two moorings and the one on the sunken rock. These two outer marks are a
// playing aid, not a documented feature: they stand where he puts his
// leading marks, which were ranges on the shore, not floating buoys.
export const APPROACH_MARKS = [
  { x: 40,  y: 268, kind: "port" },
  { x: 318, y: 214, kind: "stbd" },
];

// an irregular outline per rock, so they read as stone and not as pebbles
export function rockShape(seed, r, n = 9){
  let s = (seed || 1) >>> 0;
  const rnd = () => (s = (s*1664525 + 1013904223) >>> 0) / 4294967296;
  const pts = [];
  for (let i = 0; i < n; i++){
    const a = i / n * Math.PI * 2;
    const rr = r * (.62 + rnd() * .66);
    pts.push([Math.cos(a)*rr, Math.sin(a)*rr*.82]);
  }
  return pts;
}

export const KELP = [
  [-158, 323], [-120, 350], [-190, 296], [-90, 380],
  [660, 130], [700, 100], [740, 150], [620, 170], [780, 120], [690, 60],
];

// soundings Davidson actually gives, in feet
const SOUNDINGS = [
  { x: 150, y: -250, ft: 12 },       // over the chute's end
  { x: 200, y: -382, ft: 12 },       // close to the sand beach
  { x: 250, y: -210, ft: 33 },       // 5.5 fathoms
  { x: 330, y: -150, ft: 48 },       // 8 fathoms
  { x: 300, y: -196, ft: 40 },       // 6 to 7 fathoms, rocky
  { x: 441, y: -219, ft: 14 },       // the broken ground
  { x: 500, y: 40,   ft: 60 },       // ten fathoms just outside
  { x: 60,  y: 120,  ft: 58 },
  { x: -300, y: 260, ft: 42 },
  { x: 900,  y: 420, ft: 52 },
  { x: 1300, y: 900, ft: 66 },
  { x: -700, y: 500, ft: 72 },
  { x: 120, y: -330, ft: 16 },
  { x: 560, y: -150, ft: 34 },
];

// ------------------------------------------------------- geometry help
function segDist(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const L2 = dx*dx + dy*dy || 1;
  let t = ((px-ax)*dx + (py-ay)*dy) / L2;
  t = Math.max(0, Math.min(1, t));
  const qx = ax + t*dx, qy = ay + t*dy;
  return Math.hypot(px-qx, py-qy);
}
export function distToShore(x, y) {
  let m = 1e9;
  for (let i = 0; i < LAND.length; i++) {
    const a = LAND[i], b = LAND[(i+1) % LAND.length];
    m = Math.min(m, segDist(x, y, a[0], a[1], b[0], b[1]));
  }
  return m;
}
export function onLand(x, y) {              // ray cast
  let inside = false;
  for (let i = 0, j = LAND.length - 1; i < LAND.length; j = i++) {
    const [xi, yi] = LAND[i], [xj, yj] = LAND[j];
    if ((yi > y) !== (yj > y) &&
        x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

// --------------------------------------------------------- depth grid
// Inverse-distance over Davidson's soundings, then clipped by how far off
// the beach you are, so the water shoals properly at every shore.
const G = { x0: -1500, y0: -700, x1: 2200, y1: 1400, cell: 14 };
G.nx = Math.ceil((G.x1 - G.x0) / G.cell);
G.ny = Math.ceil((G.y1 - G.y0) / G.cell);
const grid = new Float32Array(G.nx * G.ny);

(function buildDepth() {
  for (let j = 0; j < G.ny; j++) {
    for (let i = 0; i < G.nx; i++) {
      const x = G.x0 + i * G.cell, y = G.y0 + j * G.cell;
      let num = 0, den = 0;
      for (const s of SOUNDINGS) {
        const d2 = Math.max(60, (x-s.x)**2 + (y-s.y)**2);
        const w = 1 / (d2 * d2 ** .12);
        num += w * s.ft; den += w;
      }
      const idw = num / den;
      const ds = distToShore(x, y);
      let ft = Math.min(idw, ds * .92);
      if (onLand(x, y)) ft = -4;
      grid[j * G.nx + i] = ft;
    }
  }
})();

export function depthAt(x, y) {
  const fx = (x - G.x0) / G.cell, fy = (y - G.y0) / G.cell;
  const i = Math.max(0, Math.min(G.nx - 2, Math.floor(fx)));
  const j = Math.max(0, Math.min(G.ny - 2, Math.floor(fy)));
  const tx = Math.max(0, Math.min(1, fx - i)), ty = Math.max(0, Math.min(1, fy - j));
  const a = grid[j*G.nx + i],     b = grid[j*G.nx + i+1];
  const c = grid[(j+1)*G.nx + i], d = grid[(j+1)*G.nx + i+1];
  return (a*(1-tx) + b*tx) * (1-ty) + (c*(1-tx) + d*tx) * ty;
}

// ------------------------------------------------------- wind shadow
// "the bluff ... affords a lee in the northwest summer winds". Stand in
// under the west cliff with the wind in the north-west and your sails go
// soft, which is exactly why they warped in on lines instead of sailing.
export function windShadow(x, y, windFromDeg) {
  const r = (windFromDeg) * Math.PI / 180;
  const ux = -Math.sin(r), uy = Math.cos(r);       // downwind unit vector
  let shade = 0;
  for (let i = 0; i < LAND.length; i++) {
    const a = LAND[i];
    // only the cove's own west bluff and the cape cast a usable lee
    if (a[0] > 120 || a[1] > 40) continue;
    const dx = x - a[0], dy = y - a[1];
    const along = dx * ux + dy * uy;               // distance downwind of it
    if (along < 0 || along > 300) continue;
    const across = Math.abs(dx * uy - dy * ux);
    if (across > 130) continue;
    const s = (1 - along / 300) * (1 - across / 130);
    shade = Math.max(shade, s);
  }
  return Math.min(.85, shade);
}
