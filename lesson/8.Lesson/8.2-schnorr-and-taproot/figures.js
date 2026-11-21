/* Figures for this lesson. Read by lesson-engine.js through window.LESSON_ASSETS. */
window.LESSON_ASSETS = {
        balance: `<svg
              viewBox="0 0 580 170"
              role="img"
              aria-labelledby="balance-title balance-desc"
            >
              <title id="balance-title">The Schnorr verification equation</title>
              <desc id="balance-desc">
                The left side s times G must equal R plus e times P. The left
                side comes from the signature. The right side is built from
                public data only.
              </desc>
              <rect x="40" y="30" width="200" height="56" rx="6" fill="var(--bg)" stroke="var(--acc)" stroke-width="2" />
              <rect x="340" y="30" width="200" height="56" rx="6" fill="var(--bg)" stroke="var(--acc)" stroke-width="2" />
              <text x="140" y="64" text-anchor="middle" font-size="18">s · G</text>
              <text x="440" y="64" text-anchor="middle" font-size="18">R + e · P</text>
              <text class="accent" x="290" y="64" text-anchor="middle" font-size="26">=</text>
              <text x="140" y="110" text-anchor="middle">from the signature (s)</text>
              <text x="440" y="110" text-anchor="middle">from public data: R, P, message</text>
              <text x="290" y="150" text-anchor="middle">Equal sides mean a valid signature.</text>
            </svg>`,
        ring: `<svg
              viewBox="0 0 580 330"
              role="img"
              aria-labelledby="ring-title ring-desc"
            >
              <title id="ring-title">The toy group as a ring of 11 points</title>
              <desc id="ring-desc">
                Starting at 4 to the power 0 and going clockwise, the values are
                1, 4, 16, 18, 3, 12, 2, 8, 9, 13, 6. After 11 steps the ring
                returns to 1.
              </desc>
              <circle cx="290" cy="160" r="115" fill="none" stroke="var(--line)" stroke-width="2" />
              <circle cx="290" cy="45" r="5" fill="var(--bg)" stroke="var(--ink)" stroke-width="2" />
              <text x="290" y="13" text-anchor="middle">4<tspan dy="-5" font-size="10">0</tspan><tspan dy="5"> = 1</tspan></text>
              <circle cx="352.2" cy="63.3" r="5" fill="var(--bg)" stroke="var(--ink)" stroke-width="2" />
              <text x="372.2" y="37.1" text-anchor="middle">4<tspan dy="-5" font-size="10">1</tspan><tspan dy="5"> = 4</tspan></text>
              <circle cx="394.6" cy="112.2" r="5" fill="var(--bg)" stroke="var(--ink)" stroke-width="2" />
              <text x="428.3" y="101.9" text-anchor="middle">4<tspan dy="-5" font-size="10">2</tspan><tspan dy="5"> = 16</tspan></text>
              <circle cx="403.8" cy="176.4" r="5" fill="var(--bg)" stroke="var(--ink)" stroke-width="2" />
              <text x="440.5" y="186.6" text-anchor="middle">4<tspan dy="-5" font-size="10">3</tspan><tspan dy="5"> = 18</tspan></text>
              <circle cx="376.9" cy="235.3" r="5" fill="var(--bg)" stroke="var(--ink)" stroke-width="2" />
              <text x="404.9" y="264.5" text-anchor="middle">4<tspan dy="-5" font-size="10">4</tspan><tspan dy="5"> = 3</tspan></text>
              <circle cx="322.4" cy="270.3" r="5" fill="var(--bg)" stroke="var(--ink)" stroke-width="2" />
              <text x="332.8" y="310.8" text-anchor="middle">4<tspan dy="-5" font-size="10">5</tspan><tspan dy="5"> = 12</tspan></text>
              <circle cx="257.6" cy="270.3" r="5" fill="var(--bg)" stroke="var(--ink)" stroke-width="2" />
              <text x="247.2" y="310.8" text-anchor="middle">4<tspan dy="-5" font-size="10">6</tspan><tspan dy="5"> = 2</tspan></text>
              <circle cx="203.1" cy="235.3" r="5" fill="var(--bg)" stroke="var(--ink)" stroke-width="2" />
              <text x="175.1" y="264.5" text-anchor="middle">4<tspan dy="-5" font-size="10">7</tspan><tspan dy="5"> = 8</tspan></text>
              <circle cx="176.2" cy="176.4" r="5" fill="var(--bg)" stroke="var(--ink)" stroke-width="2" />
              <text x="139.5" y="186.6" text-anchor="middle">4<tspan dy="-5" font-size="10">8</tspan><tspan dy="5"> = 9</tspan></text>
              <circle cx="185.4" cy="112.2" r="5" fill="var(--bg)" stroke="var(--ink)" stroke-width="2" />
              <text x="151.7" y="101.9" text-anchor="middle">4<tspan dy="-5" font-size="10">9</tspan><tspan dy="5"> = 13</tspan></text>
              <circle cx="227.8" cy="63.3" r="5" fill="var(--bg)" stroke="var(--ink)" stroke-width="2" />
              <text x="207.8" y="37.1" text-anchor="middle">4<tspan dy="-5" font-size="10">10</tspan><tspan dy="5"> = 6</tspan></text>
              <text x="290" y="165" text-anchor="middle" class="accent">11 steps, then back to 1</text>
            </svg>`,
        flow: `<svg
              viewBox="0 0 580 260"
              role="img"
              aria-labelledby="flow-title flow-desc"
            >
              <title id="flow-title">Two signers become one signature</title>
              <desc id="flow-desc">
                Aarav and Meera each have a key and a nonce point. Their keys
                combine into one key and their nonces into one nonce. The chain
                sees one key and one signature.
              </desc>
              <rect x="40" y="16" width="200" height="48" rx="6" fill="var(--bg)" stroke="var(--line)" />
              <rect x="340" y="16" width="200" height="48" rx="6" fill="var(--bg)" stroke="var(--line)" />
              <text x="140" y="36" text-anchor="middle">Aarav: P_A = 18</text>
              <text x="140" y="54" text-anchor="middle">R_A = 16</text>
              <text x="440" y="36" text-anchor="middle">Meera: P_M = 8</text>
              <text x="440" y="54" text-anchor="middle">R_M = 12</text>
              <path d="M140 64L270 110M440 64L310 110" fill="none" stroke="var(--ink)" stroke-width="2" />
              <rect x="170" y="110" width="240" height="56" rx="6" fill="var(--soft)" stroke="var(--acc)" stroke-width="2" />
              <text x="290" y="134" text-anchor="middle">Combined: P = 6, R = 8</text>
              <text x="290" y="154" text-anchor="middle">(keys and nonces multiplied)</text>
              <path d="M290 166L290 196" fill="none" stroke="var(--ink)" stroke-width="2" />
              <rect x="110" y="196" width="360" height="48" rx="6" fill="var(--bg)" stroke="var(--acc)" stroke-width="2" />
              <text x="290" y="216" text-anchor="middle">On chain: one key (6)</text>
              <text x="290" y="234" text-anchor="middle">one signature (R = 8, s = 5)</text>
            </svg>`,
        lengths: `<svg
              viewBox="0 0 580 170"
              role="img"
              aria-labelledby="len-title len-desc"
            >
              <title id="len-title">DER versus BIP340 signature length</title>
              <desc id="len-desc">
                A DER-wrapped ECDSA signature is about 71 bytes. A BIP340
                Schnorr signature is exactly 64 bytes, split into R.x and s.
              </desc>
              <text x="40" y="26" text-anchor="start">DER-wrapped ECDSA (8.1): about 71 bytes</text>
              <rect x="40" y="36" width="426" height="34" rx="4" fill="var(--soft)" stroke="var(--line)" />
              <text x="40" y="98" text-anchor="start">BIP340 Schnorr: exactly 64 bytes</text>
              <rect x="40" y="108" width="192" height="34" rx="4" fill="var(--bg)" stroke="var(--acc)" stroke-width="2" />
              <rect x="232" y="108" width="192" height="34" rx="4" fill="var(--bg)" stroke="var(--ink)" stroke-width="2" />
              <text x="136" y="130" text-anchor="middle">R.x (32)</text>
              <text x="328" y="130" text-anchor="middle">s (32)</text>
            </svg>`,
        tree: `<svg
              viewBox="0 0 600 230"
              role="img"
              aria-labelledby="tree-title tree-desc"
            >
              <title id="tree-title">Taproot key and script tree</title>
              <desc id="tree-desc">
                An internal key and a committed script tree produce one output
                key. The script tree has several leaves.
              </desc>
              <rect
                x="225"
                y="14"
                width="150"
                height="42"
                rx="6"
                fill="var(--bg)"
                stroke="var(--acc)"
                stroke-width="2"
              />
              <text x="300" y="40" text-anchor="middle">Output key Q</text>
              <path
                d="M265 58L160 104M335 58L440 104"
                stroke="var(--ink)"
                stroke-width="2"
              />
              <rect
                x="85"
                y="104"
                width="150"
                height="42"
                rx="6"
                fill="var(--bg)"
                stroke="var(--line)"
              />
              <rect
                x="365"
                y="104"
                width="150"
                height="42"
                rx="6"
                fill="var(--bg)"
                stroke="var(--line)"
              />
              <text x="160" y="130" text-anchor="middle">Internal key P</text>
              <text x="440" y="130" text-anchor="middle">Script tree root</text>
              <path
                d="M400 148L345 184M480 148L530 184"
                stroke="var(--ink)"
                stroke-width="2"
              />
              <rect
                x="280"
                y="184"
                width="130"
                height="34"
                rx="6"
                fill="var(--bg)"
                stroke="var(--acc)"
              />
              <rect
                x="465"
                y="184"
                width="130"
                height="34"
                rx="6"
                fill="var(--bg)"
                stroke="var(--line)"
              />
              <text class="accent" x="345" y="206" text-anchor="middle">Used leaf A</text>
              <text x="530" y="206" text-anchor="middle">Unused leaf B</text>
            </svg>`,
};
