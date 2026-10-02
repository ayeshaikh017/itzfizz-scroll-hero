/**
 * Inline SVG sports car — no external assets, so the demo never breaks.
 * Wheels carry the `.wheel` class so GSAP can spin them with scroll.
 */
export default function Car() {
  return (
    <svg
      viewBox="0 0 620 200"
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label="Stylised sports car driving across the screen"
    >
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9ff6b" />
          <stop offset="1" stopColor="#7fb800" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b2330" />
          <stop offset="1" stopColor="#3b4a60" />
        </linearGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff7c2" stopOpacity="0.6" />
          <stop offset="1" stopColor="#fff7c2" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="shadow">
          <stop offset="0" stopColor="#000" stopOpacity="0.6" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* headlight beam */}
      <polygon className="beam" points="588,128 1250,40 1250,215 588,150" fill="url(#beam)" />

      {/* ground shadow */}
      <ellipse cx="310" cy="198" rx="290" ry="10" fill="url(#shadow)" />

      {/* body */}
      <path
        d="M30 150 L34 118 Q40 104 80 100 L150 94 L196 62 Q232 42 300 42 L384 44 Q424 52 452 88 L520 98 Q574 108 580 138 L580 152 Z"
        fill="url(#body)"
      />
      {/* windows */}
      <path d="M208 72 L242 54 L300 52 L300 90 L198 90 Z" fill="url(#glass)" />
      <path d="M312 52 L378 54 Q406 62 428 90 L312 90 Z" fill="url(#glass)" />
      {/* body line + details */}
      <path d="M60 118 L560 120" stroke="#5a8300" strokeWidth="2" opacity=".5" />
      <rect x="318" y="104" width="34" height="5" rx="2.5" fill="#5a8300" opacity=".7" />
      {/* lights */}
      <ellipse cx="572" cy="124" rx="9" ry="6" fill="#fffbe0" />
      <rect x="30" y="118" width="12" height="8" rx="3" fill="#ff3b3b" />

      {/* wheel arches */}
      <circle cx="140" cy="158" r="44" fill="#0a0b0f" />
      <circle cx="470" cy="158" r="44" fill="#0a0b0f" />

      {/* wheels */}
      {[140, 470].map((cx) => (
        <g key={cx} className="wheel">
          <circle cx={cx} cy="158" r="36" fill="#15171d" />
          <circle cx={cx} cy="158" r="26" fill="#2b2f3a" />
          <circle cx={cx} cy="158" r="7" fill="#c6ff3d" />
          {[0, 72, 144, 216, 288].map((a) => (
            <rect
              key={a}
              x={cx - 2.5}
              y="134"
              width="5"
              height="17"
              rx="2"
              fill="#9aa3b5"
              transform={`rotate(${a} ${cx} 158)`}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}
