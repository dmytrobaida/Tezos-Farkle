mkdir build
ligo compile contract src/counter.jsligo --entry-point main > build/counter.tz
ligo compile storage src/counter.jsligo 0 --entry-point main