// Two-masted lumber schooner, drawn to read as a SHIP at a glance:
// sheered hull, bowsprit and jibboom, transom stern, bulwark stanchions,
// deckhouse, two raked masts with topmasts, gaffs, booms, furled canvas,
// shrouds with ratlines, headstays, and a lashed deckload of redwood.
// Sits on a four-point moor, which is how a vessel lay in a doghole.

// opts.load  0..1  how much of the deckload is aboard (default 1, the title look)
// opts.moor  false  draw her without the moor, for the loading inset in play.html
export function drawSchooner(ctx, P, t, opts = {}) {
  const { X, Y, S, C } = P;
  const load = opts.load === undefined ? 1 : Math.max(0, Math.min(1, opts.load));
  const roll  = Math.sin(t * .58) * .026 + Math.sin(t * .29 + 1.1) * .013;
  const heave = Math.sin(t * .58 + .4) * 5;
  const cx = 828, cy = 576 + heave;
  const L = 186;                      // half-length of the hull

  ctx.save();
  ctx.translate(X(cx), Y(cy));
  ctx.rotate(roll);

  // ---------------------------------------------------------------- hull
  // sheer line: low amidships, rising to bow and stern
  const sheer = x => -7 - 9 * Math.pow(Math.abs(x) / L, 2.1);

  ctx.beginPath();
  ctx.moveTo(S(-L + 6), S(sheer(-L + 6)));            // stern head
  for (let x = -L + 6; x <= L - 4; x += 8)
    ctx.lineTo(S(x), S(sheer(x)));
  ctx.lineTo(S(L - 4), S(sheer(L - 4)));
  // stem: raked forward
  ctx.quadraticCurveTo(S(L + 14), S(2), S(L + 4), S(16));
  // bottom
  ctx.quadraticCurveTo(S(L * .55), S(29), S(0), S(30));
  ctx.quadraticCurveTo(S(-L * .6), S(29), S(-L - 2), S(17));
  // transom
  ctx.lineTo(S(-L - 6), S(sheer(-L + 6)));
  ctx.closePath();
  ctx.fillStyle = C.hull;
  ctx.fill();
  ctx.strokeStyle = "rgba(122,146,168,.55)";
  ctx.lineWidth = Math.max(1, S(1.3));
  ctx.stroke();

  // boot-top and sheer stripe
  ctx.strokeStyle = "#7d90a2";
  ctx.lineWidth = Math.max(1, S(2.4));
  ctx.beginPath();
  for (let x = -L; x <= L; x += 8) {
    const y = sheer(x) + 7;
    if (x === -L) ctx.moveTo(S(x), S(y)); else ctx.lineTo(S(x), S(y));
  }
  ctx.stroke();

  ctx.strokeStyle = "rgba(10,14,20,.75)";
  ctx.lineWidth = Math.max(1, S(3));
  ctx.beginPath();
  ctx.moveTo(S(-L - 2), S(19)); ctx.lineTo(S(L + 2), S(18));
  ctx.stroke();

  // ------------------------------------------------------- bulwarks etc
  ctx.fillStyle = C.hullTop;
  for (let x = -L + 10; x < L - 8; x += 13) {
    ctx.fillRect(S(x), S(sheer(x) - 7), S(3), S(8));   // stanchions
  }
  ctx.fillStyle = C.hull;
  ctx.fillRect(S(-L + 6), S(sheer(0) - 9), S(2 * L - 12), S(4));

  // --------------------------------------------------------- deck cargo
  // lumber stacked and lashed, the only warm mass in the frame
  const stack = [[-118, 236, 5], [-108, 212, 5], [-96, 186, 5], [-80, 150, 4]]
    .slice(0, Math.round(load * 4));
  stack.forEach(([sx, sw, sh], i) => {
    ctx.fillStyle = i % 2 ? C.timber : C.timberLit;
    ctx.fillRect(S(sx), S(sheer(0) - 13 - i * 6), S(sw), S(sh + 1));
    ctx.fillStyle = "rgba(10,14,20,.34)";
    ctx.fillRect(S(sx), S(sheer(0) - 13 - i * 6), S(sw), S(1.6));
  });
  // board ends catching light
  ctx.fillStyle = C.timberLit;
  for (let i = 0; i < stack.length; i++)
    ctx.fillRect(S(118 - i * 3), S(sheer(0) - 14 - i * 6), S(4), S(5));
  // lashings over the deckload
  ctx.strokeStyle = "rgba(12,16,22,.75)";
  ctx.lineWidth = Math.max(1, S(1.2));
  for (const lx of (stack.length ? [-92, -40, 14, 68] : [])) {
    ctx.beginPath();
    ctx.moveTo(S(lx), S(sheer(0) - 40));
    ctx.lineTo(S(lx + 5), S(sheer(0) + 2));
    ctx.stroke();
  }

  // ---------------------------------------------------------- deckhouse
  ctx.fillStyle = C.house;
  ctx.fillRect(S(-164), S(sheer(-150) - 22), S(46), S(16));
  ctx.fillStyle = C.houseRoof;
  ctx.fillRect(S(-167), S(sheer(-150) - 25), S(52), S(4));
  ctx.fillStyle = C.lamp;                                // lit window
  ctx.fillRect(S(-156), S(sheer(-150) - 18), S(6), S(6));
  ctx.fillRect(S(-140), S(sheer(-150) - 18), S(6), S(6));
  // stack
  ctx.fillStyle = C.house;
  ctx.fillRect(S(-128), S(sheer(-150) - 34), S(5), S(13));

  // ------------------------------------------------ bowsprit + headgear
  ctx.strokeStyle = C.spar;
  ctx.lineWidth = Math.max(1, S(3.2));
  ctx.beginPath();
  ctx.moveTo(S(L - 12), S(sheer(L - 12) - 2));
  ctx.lineTo(S(L + 78), S(-22));                         // bowsprit
  ctx.stroke();
  ctx.lineWidth = Math.max(1, S(1.4));
  ctx.beginPath();
  ctx.moveTo(S(L + 30), S(-10));                         // bobstay
  ctx.lineTo(S(L + 6), S(14));
  ctx.stroke();

  // ------------------------------------------------------------- masts
  // fore and main, raked aft, each with a topmast, gaff, boom, furled sail
  function mast(mx, h, gaffLen, boomLen) {
    const rake = h * .085;
    const tx = mx - rake, ty = -h;

    // lower mast + topmast
    ctx.strokeStyle = C.spar;
    ctx.lineWidth = Math.max(1, S(4));
    ctx.beginPath();
    ctx.moveTo(S(mx), S(sheer(mx) - 10));
    ctx.lineTo(S(tx), S(ty + h * .3));
    ctx.stroke();
    ctx.lineWidth = Math.max(1, S(2.4));
    ctx.beginPath();
    ctx.moveTo(S(tx), S(ty + h * .3));
    ctx.lineTo(S(tx - rake * .5), S(ty));
    ctx.stroke();

    // crosstrees
    ctx.lineWidth = Math.max(1, S(1.6));
    ctx.beginPath();
    ctx.moveTo(S(tx - 11), S(ty + h * .3));
    ctx.lineTo(S(tx + 11), S(ty + h * .31));
    ctx.stroke();

    // boom along the deck, with furled canvas bundled on it
    const by = sheer(mx) - 26;
    ctx.lineWidth = Math.max(1, S(3));
    ctx.beginPath();
    ctx.moveTo(S(mx - 4), S(by));
    ctx.lineTo(S(mx - boomLen), S(by + 5));
    ctx.stroke();
    ctx.fillStyle = C.canvas;
    ctx.beginPath();
    ctx.moveTo(S(mx - 8), S(by - 5));
    ctx.quadraticCurveTo(S(mx - boomLen * .5), S(by - 11),
                         S(mx - boomLen + 8), S(by + 1));
    ctx.quadraticCurveTo(S(mx - boomLen * .5), S(by + 2),
                         S(mx - 8), S(by + 2));
    ctx.closePath();
    ctx.fill();

    // gaff, peaked up the mast
    ctx.strokeStyle = C.spar;
    ctx.lineWidth = Math.max(1, S(2.2));
    ctx.beginPath();
    ctx.moveTo(S(mx - 3), S(by - 30));
    ctx.lineTo(S(mx - gaffLen), S(by - 54));
    ctx.stroke();

    // shrouds with ratlines, both sides
    ctx.strokeStyle = C.rig;
    ctx.lineWidth = Math.max(1, S(1));
    for (const side of [-1, 1]) {
      for (let k = 0; k < 3; k++) {
        const foot = mx + side * (16 + k * 9);
        ctx.beginPath();
        ctx.moveTo(S(foot), S(sheer(foot) - 8));
        ctx.lineTo(S(tx + side * 2), S(ty + h * .32));
        ctx.stroke();
      }
      // ratlines
      for (let r = .25; r < .95; r += .17) {
        const y0 = sheer(mx) - 8 + (ty + h * .32 - (sheer(mx) - 8)) * r;
        const x0 = mx + side * (16) + (tx - mx - side * 16) * r;
        const x1 = mx + side * (34) + (tx - mx - side * 34) * r;
        ctx.beginPath();
        ctx.moveTo(S(x0), S(y0)); ctx.lineTo(S(x1), S(y0));
        ctx.stroke();
      }
    }
    return { tx, ty };
  }

  const main = mast(-58, 176, 40, 108);
  const fore = mast(96, 158, 36, 92);

  // ------------------------------------------------------------ stays
  ctx.strokeStyle = C.rig;
  ctx.lineWidth = Math.max(1, S(1.2));
  ctx.beginPath();
  ctx.moveTo(S(fore.tx), S(fore.ty));                    // jibstay
  ctx.lineTo(S(L + 76), S(-21));
  ctx.moveTo(S(fore.tx), S(fore.ty + 30));               // forestay
  ctx.lineTo(S(L + 34), S(-8));
  ctx.moveTo(S(main.tx), S(main.ty));                    // triatic
  ctx.lineTo(S(fore.tx), S(fore.ty + 8));
  ctx.moveTo(S(main.tx), S(main.ty));                    // main backstay
  ctx.lineTo(S(-L - 4), S(sheer(-L + 6) - 4));
  ctx.stroke();

  // a lamp burning aft, the warm point in the picture
  ctx.save();
  ctx.globalAlpha = .85;
  const lg = ctx.createRadialGradient(S(-150), S(sheer(-150) - 30), 0,
                                      S(-150), S(sheer(-150) - 30), S(46));
  lg.addColorStop(0, "rgba(255,196,110,.85)");
  lg.addColorStop(1, "rgba(255,196,110,0)");
  ctx.fillStyle = lg;
  ctx.beginPath();
  ctx.arc(S(-150), S(sheer(-150) - 30), S(46), 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();

  // ------------------------------------------------ HOW SHE ACTUALLY LAY
  if (opts.moor === false) return;
  // Sourced, not invented. Fort Ross Cove: the 1867 trough chute reached out
  // over 12 ft of water and a vessel lay to SIX MOORING LINES; the cove had
  // THREE mooring buoys, in 5.5 and 8 fathoms (Davidson, 1889 Coast Pilot,
  // Fort Ross Anchorage, via the vault gazetteer).
  //
  // There is no wharf to tie to. Per the NRHP doghole MPDF: a four-point
  // system was common, lines running from the port and starboard bow and the
  // port and starboard quarters, and vessels were "secured by several
  // underwater anchors as well as with lines to shore to keep them in one
  // place" using "metal eyebolts, ringbolts, and staples set in the cliffs
  // and offshore rocks". A mooring was an anchor on the seafloor with its
  // chain held up by A FLOATING LOG as much as 50 ft long, which is why the
  // buoys here are drawn as logs and not as balls. Loading took days.
  ctx.save();

  // three buoys: two forward and offshore, one astern
  const buoys = [[cx + 258, cy + 20], [cx - 246, cy + 26], [cx - 120, cy + 64]];
  // shore ends: ringbolts leaded into the offshore rocks and the beach rocks
  const bolts = [[1052, 640], [1004, 672], [388, 678]];

  // six lines: bow pair, quarter pair, and two shore lines holding her off
  const lines = [
    [cx + L * .95, cy + 3, buoys[0][0], buoys[0][1]],
    [cx - L * .95, cy + 3, buoys[1][0], buoys[1][1]],
    [cx - L * .78, cy + 11, buoys[2][0], buoys[2][1]],
    [cx + L * .74, cy + 11, bolts[0][0], bolts[0][1]],
    [cx + L * .22, cy + 15, bolts[1][0], bolts[1][1]],
    [cx - L * .34, cy + 15, bolts[2][0], bolts[2][1]],
  ];
  ctx.strokeStyle = "rgba(214,206,186,.58)";
  ctx.lineWidth = Math.max(1, S(1.6));
  for (const [ax, ay, bx, by] of lines) {
    ctx.beginPath();
    ctx.moveTo(X(ax), Y(ay));
    // a mooring line is hove taut but still takes a little catenary
    ctx.quadraticCurveTo(X((ax + bx) / 2), Y((ay + by) / 2 + 9), X(bx), Y(by));
    ctx.stroke();
  }

  // the ringbolts themselves: iron leaded into the rock
  ctx.strokeStyle = "rgba(226,214,190,.5)";
  ctx.lineWidth = Math.max(1, S(1.4));
  for (const [bx, by] of bolts) {
    ctx.beginPath();
    ctx.arc(X(bx), Y(by), S(2.6), 0, Math.PI * 2);
    ctx.stroke();
  }

  // the buoys: floating logs, dark and wet, working in the swell
  for (let i = 0; i < buoys.length; i++) {
    const [bx, by] = buoys[i];
    const bob = Math.sin(t * .62 + i * 1.7) * 2.2;
    const tilt = Math.sin(t * .44 + i) * .08;
    ctx.save();
    ctx.translate(X(bx), Y(by + bob));
    ctx.rotate(tilt);
    ctx.fillStyle = "rgba(207,218,226,.30)";           // foam breaking on it
    ctx.beginPath();
    ctx.ellipse(0, S(3.5), S(26), S(4.5), 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#3a2c1d";                          // the log
    ctx.beginPath();
    if (ctx.roundRect) { ctx.roundRect(S(-21), S(-4), S(42), S(8), S(4)); }
    else { ctx.ellipse(0, 0, S(21), S(4), 0, 0, Math.PI * 2); }
    ctx.fill();
    ctx.fillStyle = "rgba(242,166,60,.30)";             // wet highlight
    ctx.fillRect(S(-17), S(-3), S(34), S(1.8));
    ctx.restore();
  }
  ctx.restore();

  // water working along the hull
  ctx.save();
  ctx.globalAlpha = .34 + .16 * Math.sin(t * 1.5);
  ctx.beginPath();
  ctx.ellipse(X(cx), Y(cy + 28), S(L * 1.06), S(9), 0, 0, Math.PI * 2);
  ctx.fillStyle = C.foam;
  ctx.fill();
  ctx.restore();
}
