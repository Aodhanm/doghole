// =====================================================================
// The vessel: a two-masted lumber schooner of about seventy-five tons.
//
// Seventy-five tons is not a guess. Davidson, on this exact berth: "a
// vessel of seventy-five tons can lie broadside to the end of the chute
// and head out". The MPDF adds the type: "The small, wooden-hulled
// two-masted single-decked schooner of less than 200 tons burthen was
// well suited to the task ... Its size, wide beam, maneuverability, and
// shallow draft made it handy", fore-and-aft rigged to use the onshore
// winds, and built of Douglas fir.
//
// The physics is Lunar Lander's problem turned on its side. Instead of
// gravity there is a current that sets you down on the rocks, and the
// three things that actually killed these vessels are all modelled:
//   1. A RUDDER ONLY BITES WITH WAY ON. Lose your speed and you lose
//      your steering, which is the whole difficulty of a doghole.
//   2. YOU CANNOT SAIL WITHIN ABOUT 45 DEGREES OF THE WIND. Get caught
//      in irons on a lee shore and nothing you press will save you.
//   3. THE COVE HAS A LEE. Standing in under the west bluff in a north-
//      wester your sails go soft (see windShadow in cove.js), which is
//      why they warped in on lines rather than sailed in.
// =====================================================================
import { KN, depthAt, windShadow } from "./cove.js";

export const CAPACITY = 60;          // cords of wood, a full deckload

export function makeVessel(x, y, hdgDeg) {
  return {
    x, y,
    hdg: hdgDeg * Math.PI / 180,     // 0 = north, clockwise
    vx: 0, vy: 0, omega: 0,
    helm: 0, canvas: .5,
    cargo: 0, damage: 0, moored: false, lines: 0,
    heel: 0, surge: 0,
    // derived, filled by step(); seeded so the HUD can draw before the
    // first tick without reading undefined
    underKeel: 0, draftFt: 5.4, speedKn: 0, throughKn: 0, driveNow: 0,
    inIrons: false, becalmed: false, boomSide: 1,
  };
}

export const norm = a => {           // wrap to -PI..PI
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
};
export const degOf = r => ((r * 180 / Math.PI) % 360 + 360) % 360;

// ------------------------------------------------------------- physics
// Tuned for play, not for naval architecture. A real loaded doghole
// schooner made five or six knots; this one will do nine and answers her
// helm like a yacht, because a game you cannot feel yourself moving in is
// not a game. The difficulty is meant to come from the tide, the lee and
// the rocks, not from treacle.
const SAIL = 1.55;      // drive under full canvas in a whole-sail breeze
const K_FWD = .055;     // fore and aft resistance -> about 9 kn flat out
const K_LAT = 1.05;     // athwartships resistance: the keel
// With time compressed seven times, full helm at .26 span her round at
// about a hundred degrees a second, which is a spin, not a ship. This puts
// a hard-over turn at roughly 45 degrees a second: quick to answer, still
// something you have to think ahead of.
const RUD = .105;       // rudder authority, scaled by way through water
const YAW_DAMP = .95;
const LEEWAY = .30;     // how much of the drive goes sideways, to leeward

export function step(v, env, dt) {
  const load = v.cargo / CAPACITY;
  const mass = 1 + load * 1.05;               // she gets sluggish as she fills
  const draft = 5.4 + 3.4 * load;             // feet

  const fx = Math.sin(v.hdg), fy = -Math.cos(v.hdg);   // ahead
  const sx = Math.cos(v.hdg), sy = Math.sin(v.hdg);    // to starboard

  // --- water-relative velocity. You drift with the tide and cannot feel
  //     it; only a transit on the shore tells you it is happening.
  const wx = v.vx - env.curX, wy = v.vy - env.curY;
  const fwd = wx * fx + wy * fy;
  const lat = wx * sx + wy * sy;

  // --- wind, and the lee of the bluff
  const shade = windShadow(v.x, v.y, env.windFrom);
  const wind = env.windKn * (1 - shade);
  const awa = norm(v.hdg - env.windFrom * Math.PI / 180);
  const a = Math.abs(awa) * 180 / Math.PI;
  // a fore-and-aft rigged schooner will not lie closer than about four
  // points, but once she is off the wind she moves: close-hauled is still
  // most of her speed, and she is fastest with the wind on the quarter.
  let curve;
  if (a < 40) curve = 0;                                   // in irons
  else if (a < 70)  curve = .38 + .50 * (a - 40) / 30;
  else if (a < 115) curve = .88 + .12 * (a - 70) / 45;
  else curve = 1 - .32 * ((a - 115) / 65);
  const drive = SAIL * v.canvas * curve * (wind / 14);

  let ax = 0, ay = 0;
  ax += drive * fx; ay += drive * fy;
  // sideways push while she is driving, biggest with the wind on the beam
  const lee = drive * LEEWAY * Math.sin(awa) * -1;
  ax += lee * sx; ay += lee * sy;

  // --- resistance
  const dF = -K_FWD * fwd * Math.abs(fwd);
  const dL = -K_LAT * lat * Math.abs(lat);
  ax += dF * fx + dL * sx;
  ay += dF * fy + dL * sy;

  // --- swell: the south-west swell walks straight into this cove
  const sw = env.swellDir * Math.PI / 180;
  const surge = Math.sin(env.t * env.swellRate) * env.swell;
  v.surge = surge;
  ax += -Math.sin(sw) * surge * .55;
  ay += Math.cos(sw) * surge * .55;

  // Lines out. This is how she was actually berthed: you get her near, you
  // pass a line, and the crew heaves her in. Each line pulls harder.
  if (v.warp && v.lines > 0) {
    const k = v.lines;
    ax += (v.warp.x - v.x) * .0062 * k;
    ay += (v.warp.y - v.y) * .0062 * k;
    ax -= v.vx * .34 * k;  ay -= v.vy * .34 * k;
  }
  if (v.moored) {                               // lines hold her, mostly
    const hold = .12 + .16 * v.lines;
    ax -= v.vx * hold * 9; ay -= v.vy * hold * 9;
  }

  v.vx += ax / mass * dt;  v.vy += ay / mass * dt;

  // --- helm. No way through the water, no steering. This is the point.
  const speed = Math.hypot(wx, wy);
  // She steers properly from about two knots, but never goes completely
  // dead: a schooner with sternway still has some steerage, and a game in
  // which the helm does nothing at all just feels broken.
  const bite = .22 + .78 * Math.min(1, speed / (2.0 * KN));
  let tq = RUD * v.helm * bite * (fwd < 0 ? -1 : 1);
  tq -= norm(awa) * drive * .015;               // weather helm: she rounds up
                                                // (light: enough to feel, not
                                                // enough to round her up into
                                                // irons while you watch)
  tq -= v.omega * YAW_DAMP;
  if (v.warp && v.lines > 0) {                 // and they swing her head round
    tq += norm(v.warp.hdg - v.hdg) * .034 * v.lines - v.omega * .42 * v.lines;
  }
  if (v.moored) tq -= v.omega * 3.2;
  v.omega += tq / mass * dt;
  v.hdg = norm(v.hdg + v.omega * dt);

  v.x += (v.vx + env.curX) * dt;
  v.y += (v.vy + env.curY) * dt;

  v.heel += (Math.abs(lee) * 2.4 + surge * .3 - v.heel) * dt * 2;

  // --- soundings
  const ft = depthAt(v.x, v.y);
  v.underKeel = ft - draft;
  v.draftFt = draft;
  v.speedKn = Math.hypot(v.vx, v.vy) / KN;
  v.throughKn = speed / KN;
  v.driveNow = drive;
  v.boomSide = awa > 0 ? -1 : 1;              // the boom goes to leeward
  v.inIrons = curve === 0 && v.canvas > .05;
  v.becalmed = shade > .45;
  return v;
}

// ------------------------------------------------------------ drawing
// Same flat-vector language as the title screen: hard edges, saturated
// on dark, amber the only warm colour in the frame.
export function drawVessel(ctx, T, v, t, C) {
  const L = 28, B = 8.6;                    // 85 ft by 26 ft, in yards
  ctx.save();
  ctx.translate(T.X(v.x), T.Y(v.y));
  ctx.rotate(v.hdg);
  const S = T.S;

  // Water working round her. This must NOT look like her sails: the canvas
  // is a flat pale grey wedge, so the water is the opposite of that, a dark
  // torn-up patch with a few bright specks in it, and it moves.
  const sp = Math.min(1, v.speedKn / 6);
  if (sp > .05) {
    const wob = Math.sin(t * 3.1) * .4, wob2 = Math.sin(t * 2.3 + 1.1) * .5;

    // turbulence astern: DARKER than the sea, not paler
    ctx.globalAlpha = .18 + sp * .3;
    ctx.fillStyle = "#0c161d";
    ctx.beginPath();
    ctx.ellipse(S(wob2), S(L * .58 + sp * 4), S(B * .34 + sp), S(L * .1 + sp * 5),
                0, 0, Math.PI * 2);
    ctx.fill();

    // a thin, bright, moving lip of foam at the stem and along her run
    ctx.globalAlpha = .30 + sp * .45;
    ctx.strokeStyle = "#e8f4fb";
    ctx.lineWidth = Math.max(1, S(.55));
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(S(side * B * .06), S(-L * .49));
      ctx.quadraticCurveTo(S(side * (B * .5 + sp * 1.6 + wob)), S(-L * .3),
                           S(side * (B * .56 + sp * 2)), S(-L * .08));
      ctx.stroke();
    }
    // specks of broken water, skipping about, so it never sits still
    ctx.fillStyle = "#dff0fa";
    for (let i = 0; i < 7; i++) {
      const ph = t * 2.2 + i * 1.9;
      const sx2 = Math.sin(ph) * B * .5;
      const sy2 = L * .52 + ((i * 2.3 + t * 9) % 12);
      ctx.globalAlpha = (.5 - (sy2 - L * .52) / 24) * (.3 + sp * .6);
      if (ctx.globalAlpha <= 0) continue;
      ctx.fillRect(S(sx2), S(sy2), Math.max(1, S(.7)), Math.max(1, S(.7)));
    }
    ctx.globalAlpha = 1;
  }

  const hull = (inset, col) => {
    const b = B / 2 - inset, l = L / 2 - inset;
    ctx.beginPath();
    ctx.moveTo(0, S(-l - 2.2));                       // stem
    ctx.bezierCurveTo(S(b * .85), S(-l * .55), S(b), S(0), S(b * .9), S(l * .62));
    ctx.lineTo(S(b * .72), S(l));                     // transom corner
    ctx.lineTo(S(-b * .72), S(l));
    ctx.lineTo(S(-b * .9), S(l * .62));
    ctx.bezierCurveTo(S(-b), S(0), S(-b * .85), S(-l * .55), 0, S(-l - 2.2));
    ctx.closePath();
    ctx.fillStyle = col; ctx.fill();
  };
  hull(0, "#0d131a");                                  // hull, from above
  hull(.9, "#1b242e");                                 // inside the bulwarks

  // deckload, growing forward from the mainmast as she loads
  const frac = v.cargo / CAPACITY;
  if (frac > .01) {
    const rows = Math.max(1, Math.round(frac * 7));
    for (let i = 0; i < rows; i++) {
      ctx.fillStyle = i % 2 ? C.timber : C.timberLit;
      const yy = -L * .32 + i * (L * .78 / 7);
      ctx.fillRect(S(-B * .36), S(yy), S(B * .72), S(L * .78 / 7 - .35));
    }
  }

  // ------------------------------------------------------ deck and rig
  // A two-masted fore-and-aft schooner, seen from above:
  //   BOWSPRIT forward, carrying two headsails (jib and staysail)
  //   FOREMAST forward, with the FORESAIL: the smaller of the two
  //   MAINMAST aft, with the MAINSAIL: the bigger one, and the one that
  //   drives her. Both booms swing out to leeward, which is the side away
  //   from the wind, so you can read your own point of sail off her.
  const bowY = -L * .5;

  // bowsprit and jibboom
  ctx.strokeStyle = "#2a2118"; ctx.lineWidth = Math.max(1, S(.9));
  ctx.beginPath(); ctx.moveTo(0, S(bowY)); ctx.lineTo(0, S(bowY - L * .3)); ctx.stroke();

  // windlass forward, main hatch, deckhouse and wheel aft
  ctx.fillStyle = "#2b3742";
  ctx.fillRect(S(-B * .22), S(bowY + L * .10), S(B * .44), S(L * .045));
  ctx.fillStyle = "#151d25";
  ctx.fillRect(S(-B * .26), S(-L * .04), S(B * .52), S(L * .16));
  ctx.fillStyle = "#212c36";
  ctx.fillRect(S(-B * .3), S(L * .24), S(B * .6), S(L * .19));
  ctx.fillStyle = "rgba(255,196,110,.55)";
  ctx.fillRect(S(-B * .09), S(L * .31), S(B * .18), S(L * .05));
  ctx.strokeStyle = "#3a2c1d"; ctx.lineWidth = Math.max(1, S(.7));
  ctx.beginPath(); ctx.arc(0, S(L * .455), S(1.5), 0, Math.PI * 2); ctx.stroke();

  // the ship's boat, stowed on the after house
  ctx.fillStyle = "#2f3b46";
  ctx.beginPath();
  ctx.ellipse(S(B * .19), S(L * .30), S(.9), S(2.4), 0, 0, Math.PI * 2);
  ctx.fill();

  // rudder
  ctx.strokeStyle = "#1b242c"; ctx.lineWidth = Math.max(1, S(1.1));
  ctx.beginPath();
  ctx.moveTo(0, S(L * .5)); ctx.lineTo(S(v.helm * 2.2), S(L * .5 + 3.4));
  ctx.stroke();

  // two men at the rail, because scale is easier to read with people in it
  ctx.fillStyle = "#0a0e14";
  ctx.beginPath(); ctx.arc(S(-B * .3), S(L * .18), S(.55), 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(S(B * .28), S(-L * .05), S(.55), 0, Math.PI*2); ctx.fill();

  const boom = v.boomSide || 1;
  const drawing = Math.min(1, (v.driveNow || 0) / .55);
  const set = v.canvas;

  // the two masts
  ctx.fillStyle = "#3a2c1d";
  for (const my of [-L * .20, L * .10]) {
    ctx.beginPath(); ctx.arc(0, S(my), S(1.0), 0, Math.PI * 2); ctx.fill();
  }

  if (set > .04) {
    // MAINSAIL, aft and bigger; FORESAIL, forward and smaller
    const sails = [
      { my: L * .10, len: L * .46, out: B * 1.9, name: "main" },
      { my: -L * .20, len: L * .34, out: B * 1.5, name: "fore" },
    ];
    for (const s of sails) {
      const bx = boom * s.out * (.35 + .65 * set), by = s.my + s.len;
      ctx.strokeStyle = "#2a2118"; ctx.lineWidth = Math.max(1, S(1.0));
      ctx.beginPath(); ctx.moveTo(0, S(s.my)); ctx.lineTo(S(bx), S(by)); ctx.stroke();
      ctx.globalAlpha = .16 + .40 * set * (.35 + .65 * drawing);
      ctx.fillStyle = "#8d97a2";
      ctx.beginPath();
      ctx.moveTo(0, S(s.my));
      ctx.quadraticCurveTo(S(bx * (.55 + .35 * drawing)), S(s.my + s.len * .42),
                           S(bx), S(by));
      ctx.lineTo(0, S(by));
      ctx.closePath(); ctx.fill();
      ctx.globalAlpha = 1;
    }
    // the two headsails, jib and staysail, set on the bowsprit
    for (const [f, lenf] of [[.30, .26], [.16, .17]]) {
      ctx.globalAlpha = .14 + .34 * set * (.35 + .65 * drawing);
      ctx.fillStyle = "#98a3ae";
      ctx.beginPath();
      ctx.moveTo(0, S(bowY - L * f));
      ctx.quadraticCurveTo(S(boom * B * .7), S(bowY + L * lenf * .4),
                           S(boom * B * .95), S(bowY + L * lenf));
      ctx.lineTo(0, S(bowY + L * lenf * .1));
      ctx.closePath(); ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
  ctx.restore();
}
