// Decorative hero illustration: Wii U-style tile grid with one card "grown" on hover.
const TILES = [
  { x: 0,   y: 0,   kind: 'pane' },
  { x: 88,  y: 0,   kind: 'tint' },
  { x: 176, y: 0,   kind: 'big'  },
  { x: 352, y: 0,   kind: 'pane' },
  { x: 0,   y: 88,  kind: 'ink'  },
  { x: 88,  y: 88,  kind: 'pane' },
  { x: 352, y: 88,  kind: 'pane' },
  { x: 0,   y: 176, kind: 'pane' },
  { x: 88,  y: 176, kind: 'pane' },
  { x: 176, y: 176, kind: 'pane' },
  { x: 264, y: 176, kind: 'tint' },
  { x: 352, y: 176, kind: 'deep' },
]

const FILL = {
  pane: 'fill-surface-raised stroke-line [stroke-width:2]',
  tint: 'fill-accent-tint',
  ink: 'fill-ink',
  deep: 'fill-accent-deep',
}

const tileMotion =
  'animate-pop-in [transform-box:fill-box] origin-center transition-transform duration-300 ' +
  'ease-[cubic-bezier(0.42,0,0.15,1.32)] hover:scale-[1.08] motion-reduce:animate-none motion-reduce:transition-none motion-reduce:hover:scale-100'

function HeroTiles() {
  return (
    <svg
      viewBox="0 0 424 248"
      aria-hidden="true"
      className="w-full max-w-[280px] md:max-w-[424px] h-auto overflow-visible"
    >
      {/* pulsing red glow behind the big tile, same rhythm as the project cards */}
      <rect x="196" y="20" width="120" height="120" rx="15"
        className="fill-accent [filter:blur(18px)] opacity-10 animate-pulse-glow motion-reduce:animate-none" />
      {TILES.map((t, i) =>
        t.kind === 'big' ? (
          <g key={i} className={tileMotion} style={{ animationDelay: `${i * 60}ms` }}>
            <rect x={t.x} y={t.y} width="160" height="160" rx="15" className="fill-accent" />
            {/* gloss: the top of the pane catches the light */}
            <rect x={t.x + 8} y={t.y + 6} width="144" height="64" rx="15" className="fill-gloss pointer-events-none" />
          </g>
        ) : (
          <rect key={i} x={t.x} y={t.y} width="72" height="72" rx="15"
            className={`${FILL[t.kind]} ${tileMotion}`} style={{ animationDelay: `${i * 60}ms` }} />
        )
      )}
    </svg>
  )
}

export default HeroTiles
