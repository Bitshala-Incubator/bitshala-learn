/* Figures for this lesson. Read by lesson-engine.js through window.LESSON_ASSETS. */
window.LESSON_ASSETS = {
  chain: `<svg viewBox="0 0 580 200" role="img" aria-labelledby="chain-title chain-desc">
              <title id="chain-title">Three real blocks linked by previous-block hashes</title>
              <desc id="chain-desc">Block 0, block 1 and block 2. Each block stores the hash of the block before it, shown by arrows pointing backwards.</desc>
              <rect x="10" y="24" width="160" height="150" rx="6" fill="var(--bg)" stroke="var(--line)" stroke-width="1.5" />
              <text x="90" y="52" text-anchor="middle" style="font-weight:700">Block 0</text>
              <text x="90" y="72" text-anchor="middle" style="font-size:13px">height 0 · genesis</text>
              <text x="90" y="98" text-anchor="middle" style="font:12px ui-monospace,Consolas,monospace;fill:var(--mut)">hash</text>
              <text x="90" y="116" text-anchor="middle" style="font:13px ui-monospace,Consolas,monospace">000000000019d668…</text>
              <text x="90" y="142" text-anchor="middle" style="font:12px ui-monospace,Consolas,monospace;fill:var(--mut)">previous</text>
              <text x="90" y="160" text-anchor="middle" style="font-size:13px">none (first block)</text>
              <rect x="210" y="24" width="160" height="150" rx="6" fill="var(--bg)" stroke="var(--line)" stroke-width="1.5" />
              <text x="290" y="52" text-anchor="middle" style="font-weight:700">Block 1</text>
              <text x="290" y="72" text-anchor="middle" style="font-size:13px">height 1</text>
              <text x="290" y="98" text-anchor="middle" style="font:12px ui-monospace,Consolas,monospace;fill:var(--mut)">hash</text>
              <text x="290" y="116" text-anchor="middle" style="font:13px ui-monospace,Consolas,monospace">00000000839a8e68…</text>
              <text x="290" y="142" text-anchor="middle" style="font:12px ui-monospace,Consolas,monospace;fill:var(--mut)">previous</text>
              <text x="290" y="160" text-anchor="middle" style="font:13px ui-monospace,Consolas,monospace">000000000019d668…</text>
              <rect x="410" y="24" width="160" height="150" rx="6" fill="var(--soft)" stroke="var(--acc)" stroke-width="2" />
              <text x="490" y="52" text-anchor="middle" style="font-weight:700">Block 2</text>
              <text x="490" y="72" text-anchor="middle" style="font-size:13px">height 2</text>
              <text x="490" y="98" text-anchor="middle" style="font:12px ui-monospace,Consolas,monospace;fill:var(--mut)">hash</text>
              <text x="490" y="116" text-anchor="middle" style="font:13px ui-monospace,Consolas,monospace">000000006a625f06…</text>
              <text x="490" y="142" text-anchor="middle" style="font:12px ui-monospace,Consolas,monospace;fill:var(--mut)">previous</text>
              <text x="490" y="160" text-anchor="middle" style="font:13px ui-monospace,Consolas,monospace">00000000839a8e68…</text>
              <path d="M210 96 H180" fill="none" stroke="var(--ink)" stroke-width="2" />
              <polygon points="170,96 180,90 180,102" fill="var(--ink)" />
              <path d="M410 96 H380" fill="none" stroke="var(--ink)" stroke-width="2" />
              <polygon points="370,96 380,90 380,102" fill="var(--ink)" />
            </svg>`,
  header: `<svg viewBox="0 0 580 175" role="img" aria-labelledby="header-title header-desc">
              <title id="header-title">The six fields of the genesis block header</title>
              <desc id="header-desc">The genesis block header has six fields: version, previous block hash, Merkle root, time, bits and nonce. Real values are shown.</desc>
              <rect x="6" y="18" width="88" height="124" rx="4" fill="var(--bg)" stroke="var(--line)" />
              <text x="50" y="44" text-anchor="middle" style="font:700 13px system-ui">Version</text>
              <text x="50" y="72" text-anchor="middle" style="font:13px ui-monospace,Consolas,monospace">1</text>
              <text x="50" y="126" text-anchor="middle" style="font-size:13px">4 bytes</text>
              <rect x="102" y="18" width="88" height="124" rx="4" fill="var(--bg)" stroke="var(--line)" />
              <text x="146" y="44" text-anchor="middle" style="font:700 13px system-ui">Previous</text>
              <text x="146" y="72" text-anchor="middle" style="font:13px ui-monospace,Consolas,monospace">0000…0000</text>
              <text x="146" y="126" text-anchor="middle" style="font-size:13px">32 bytes</text>
              <rect x="198" y="18" width="88" height="124" rx="4" fill="var(--soft)" stroke="var(--acc)" stroke-width="2" />
              <text x="242" y="44" text-anchor="middle" style="font:700 13px system-ui">Merkle root</text>
              <text x="242" y="72" text-anchor="middle" style="font:13px ui-monospace,Consolas,monospace">4a5e1e4b…</text>
              <text x="242" y="126" text-anchor="middle" style="font-size:13px">32 bytes</text>
              <rect x="294" y="18" width="88" height="124" rx="4" fill="var(--bg)" stroke="var(--line)" />
              <text x="338" y="44" text-anchor="middle" style="font:700 13px system-ui">Time</text>
              <text x="338" y="72" text-anchor="middle" style="font:13px ui-monospace,Consolas,monospace">1231006505</text>
              <text x="338" y="126" text-anchor="middle" style="font-size:13px">4 bytes</text>
              <rect x="390" y="18" width="88" height="124" rx="4" fill="var(--bg)" stroke="var(--line)" />
              <text x="434" y="44" text-anchor="middle" style="font:700 13px system-ui">Bits</text>
              <text x="434" y="72" text-anchor="middle" style="font:13px ui-monospace,Consolas,monospace">0x1d00ffff</text>
              <text x="434" y="126" text-anchor="middle" style="font-size:13px">4 bytes</text>
              <rect x="486" y="18" width="88" height="124" rx="4" fill="var(--bg)" stroke="var(--line)" />
              <text x="530" y="44" text-anchor="middle" style="font:700 13px system-ui">Nonce</text>
              <text x="530" y="72" text-anchor="middle" style="font:13px ui-monospace,Consolas,monospace">2083236893</text>
              <text x="530" y="126" text-anchor="middle" style="font-size:13px">4 bytes</text>
              <a href="https://mempool.space/block/000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f" target="_blank" rel="noopener noreferrer"><text x="290" y="164" text-anchor="middle" class="accent">Read these fields on the genesis block page</text></a>
            </svg>`,
  merkle: `<svg viewBox="0 0 580 230" role="img" aria-labelledby="merkle-title merkle-desc">
              <title id="merkle-title">Block 170 Merkle root from two transaction IDs</title>
              <desc id="merkle-desc">Two txids, b1fea524 and f4184fc5, are hashed as a pair. The result is the Merkle root stored in the block header: 7dac2c56.</desc>
              <rect x="20" y="14" width="240" height="56" rx="6" fill="var(--bg)" stroke="var(--line)" />
              <text x="140" y="36" text-anchor="middle" style="font-size:13px">Txid 1 · coinbase</text>
              <text x="140" y="58" text-anchor="middle" style="font:13px ui-monospace,Consolas,monospace">b1fea52486ce0c62…</text>
              <rect x="320" y="14" width="240" height="56" rx="6" fill="var(--bg)" stroke="var(--line)" />
              <text x="440" y="36" text-anchor="middle" style="font-size:13px">Txid 2 · first payment</text>
              <text x="440" y="58" text-anchor="middle" style="font:13px ui-monospace,Consolas,monospace">f4184fc596403b9d…</text>
              <path d="M140 70 V92 H290 V106" fill="none" stroke="var(--ink)" stroke-width="2" />
              <path d="M440 70 V92 H290" fill="none" stroke="var(--ink)" stroke-width="2" />
              <rect x="170" y="106" width="240" height="40" rx="6" fill="var(--bg)" stroke="var(--line)" />
              <text x="290" y="131" text-anchor="middle">Hash the pair, twice</text>
              <path d="M290 146 V168" fill="none" stroke="var(--ink)" stroke-width="2" />
              <polygon points="285,166 290,176 295,166" fill="var(--ink)" />
              <rect x="110" y="176" width="360" height="46" rx="6" fill="var(--soft)" stroke="var(--acc)" stroke-width="2" />
              <text x="290" y="194" text-anchor="middle" style="font-size:13px">Merkle root, stored in the header</text>
              <text x="290" y="213" text-anchor="middle" style="font:13px ui-monospace,Consolas,monospace">7dac2c5666815c17…</text>
            </svg>`,
};
