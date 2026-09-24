#!/bin/bash
# Publish the game. The SOURCE OF TRUTH is ~/passion-organ/titlescreen; this
# repo is a copy, so edit there and run this, or the two silently drift.
#
# Deliberately NOT published: reference/ (third-party Fort Ross photographs)
# and theme2.m4a (the louder second-verse render, reverted).
set -e
SRC=~/passion-organ/titlescreen
DST="$(cd "$(dirname "$0")" && pwd)"

for f in index.html play.html gate.html cove.js gate.js ship.js vessel.js \
         serve_nocache.py GAME.md \
         theme.m4a bell.m4a foghorn.m4a rope.m4a thunder-far.m4a thunder-near.m4a; do
  cp "$SRC/$f" "$DST/$f"
done

cd "$DST"
if git diff --quiet && git diff --cached --quiet; then
  echo "nothing changed"; exit 0
fi
git --no-pager diff --stat
git add -A
git commit -m "${1:-Update from ~/passion-organ/titlescreen}"
git push origin main
echo
echo "pushed. Pages takes a minute; then check:"
echo "  https://aodhanm.github.io/doghole/"
