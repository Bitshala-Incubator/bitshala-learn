/* Figures for this lesson. Read by lesson-engine.js through window.LESSON_ASSETS. */
window.LESSON_ASSETS = {
        hashflow: `<svg viewBox="0 0 580 130" role="img" aria-labelledby="hf-title hf-desc">
              <title id="hf-title">From header to block hash</title>
              <desc id="hf-desc">The 80-byte header goes into SHA-256, then SHA-256 again. The output is the block hash, shown as 000000000019d668 for the genesis block.</desc>
              <rect x="10" y="30" width="120" height="60" rx="6" fill="var(--bg)" stroke="var(--line)" />
              <text x="70" y="56" text-anchor="middle" style="font-size:13px">80-byte header</text>
              <text x="70" y="75" text-anchor="middle" style="font:12px ui-monospace,Consolas,monospace;fill:var(--mut)">version…nonce</text>
              <path d="M134 60 H154" fill="none" stroke="var(--ink)" stroke-width="2" />
              <polygon points="160,60 152,55 152,65" fill="var(--ink)" />
              <rect x="164" y="30" width="110" height="60" rx="6" fill="var(--bg)" stroke="var(--line)" />
              <text x="219" y="66" text-anchor="middle" style="font-size:13px">SHA-256</text>
              <path d="M278 60 H298" fill="none" stroke="var(--ink)" stroke-width="2" />
              <polygon points="304,60 296,55 296,65" fill="var(--ink)" />
              <rect x="308" y="30" width="110" height="60" rx="6" fill="var(--bg)" stroke="var(--line)" />
              <text x="363" y="66" text-anchor="middle" style="font-size:13px">SHA-256 again</text>
              <path d="M422 60 H442" fill="none" stroke="var(--ink)" stroke-width="2" />
              <polygon points="448,60 440,55 440,65" fill="var(--ink)" />
              <rect x="452" y="30" width="122" height="60" rx="6" fill="var(--soft)" stroke="var(--acc)" stroke-width="2" />
              <text x="513" y="56" text-anchor="middle" style="font-size:13px">Block hash</text>
              <text x="513" y="76" text-anchor="middle" style="font:12px ui-monospace,Consolas,monospace">000000000019d668…</text>
            </svg>`,
        merkle4: `<svg viewBox="0 0 580 240" role="img" aria-labelledby="m4-title m4-desc">
              <title id="m4-title">A Merkle tree over four transactions</title>
              <desc id="m4-desc">Transactions A, B, C and D are hashed in pairs into two hashes, which are hashed together into one Merkle root.</desc>
              <rect x="20" y="14" width="110" height="44" rx="6" fill="var(--bg)" stroke="var(--line)" />
              <text x="75" y="41" text-anchor="middle" style="font-size:14px">Tx A</text>
              <rect x="160" y="14" width="110" height="44" rx="6" fill="var(--bg)" stroke="var(--line)" />
              <text x="215" y="41" text-anchor="middle" style="font-size:14px">Tx B</text>
              <rect x="300" y="14" width="110" height="44" rx="6" fill="var(--bg)" stroke="var(--line)" />
              <text x="355" y="41" text-anchor="middle" style="font-size:14px">Tx C</text>
              <rect x="440" y="14" width="110" height="44" rx="6" fill="var(--bg)" stroke="var(--line)" />
              <text x="495" y="41" text-anchor="middle" style="font-size:14px">Tx D</text>
              <path d="M75 58 V80 H145 V100" fill="none" stroke="var(--ink)" stroke-width="2" />
              <path d="M215 58 V80 H145" fill="none" stroke="var(--ink)" stroke-width="2" />
              <path d="M355 58 V80 H425 V100" fill="none" stroke="var(--ink)" stroke-width="2" />
              <path d="M495 58 V80 H425" fill="none" stroke="var(--ink)" stroke-width="2" />
              <rect x="70" y="100" width="150" height="40" rx="6" fill="var(--bg)" stroke="var(--line)" />
              <text x="145" y="125" text-anchor="middle" style="font-size:14px">hash AB</text>
              <rect x="350" y="100" width="150" height="40" rx="6" fill="var(--bg)" stroke="var(--line)" />
              <text x="425" y="125" text-anchor="middle" style="font-size:14px">hash CD</text>
              <path d="M145 140 V162 H285 V180" fill="none" stroke="var(--ink)" stroke-width="2" />
              <path d="M425 140 V162 H285" fill="none" stroke="var(--ink)" stroke-width="2" />
              <rect x="195" y="180" width="180" height="46" rx="6" fill="var(--soft)" stroke="var(--acc)" stroke-width="2" />
              <text x="285" y="199" text-anchor="middle" style="font-size:13px">Merkle root</text>
              <text x="285" y="216" text-anchor="middle" style="font:12px ui-monospace,Consolas,monospace">in the header</text>
            </svg>`,
};
