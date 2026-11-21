/* Figures for this lesson. Read by lesson-engine.js through window.LESSON_ASSETS. */
window.LESSON_ASSETS = {
        mesh: `<svg viewBox="0 0 580 240" role="img" aria-labelledby="mesh-title mesh-desc">
              <title id="mesh-title">A mesh of Bitcoin nodes</title>
              <desc id="mesh-desc">Six nodes labelled A to F, each linked to some of the others. Node A is highlighted. Every node can reach every other one by hopping through peers.</desc>
              <line x1="100" y1="120" x2="250" y2="50" stroke="var(--line)" stroke-width="2" />
              <line x1="100" y1="120" x2="280" y2="190" stroke="var(--line)" stroke-width="2" />
              <line x1="250" y1="50" x2="420" y2="90" stroke="var(--line)" stroke-width="2" />
              <line x1="280" y1="190" x2="420" y2="90" stroke="var(--line)" stroke-width="2" />
              <line x1="280" y1="190" x2="470" y2="200" stroke="var(--line)" stroke-width="2" />
              <line x1="420" y1="90" x2="540" y2="130" stroke="var(--line)" stroke-width="2" />
              <line x1="470" y1="200" x2="540" y2="130" stroke="var(--line)" stroke-width="2" />
              <circle cx="100" cy="120" r="26" fill="var(--acc)" stroke="var(--ink)" stroke-width="2" />
              <text x="100" y="127" text-anchor="middle" style="font:700 16px system-ui;fill:#fff">A</text>
              <circle cx="250" cy="50" r="22" fill="var(--bg)" stroke="var(--ink)" stroke-width="2" />
              <text x="250" y="57" text-anchor="middle" style="font:700 16px system-ui">B</text>
              <circle cx="280" cy="190" r="22" fill="var(--bg)" stroke="var(--ink)" stroke-width="2" />
              <text x="280" y="197" text-anchor="middle" style="font:700 16px system-ui">C</text>
              <circle cx="420" cy="90" r="22" fill="var(--bg)" stroke="var(--ink)" stroke-width="2" />
              <text x="420" y="97" text-anchor="middle" style="font:700 16px system-ui">D</text>
              <circle cx="470" cy="200" r="22" fill="var(--bg)" stroke="var(--ink)" stroke-width="2" />
              <text x="470" y="207" text-anchor="middle" style="font:700 16px system-ui">E</text>
              <circle cx="540" cy="130" r="22" fill="var(--bg)" stroke="var(--ink)" stroke-width="2" />
              <text x="540" y="137" text-anchor="middle" style="font:700 16px system-ui">F</text>
            </svg>`,
        direction: `<svg viewBox="0 0 580 200" role="img" aria-labelledby="dir-title dir-desc">
              <title id="dir-title">Outbound and inbound connections</title>
              <desc id="dir-desc">Your node sits in the middle. An outbound connection is one your node opened to a peer it chose. An inbound connection is one a peer opened to your node.</desc>
              <rect x="20" y="70" width="150" height="60" rx="6" fill="var(--soft)" stroke="var(--acc)" stroke-width="2" />
              <text x="95" y="96" text-anchor="middle" style="font-weight:700">Your node</text>
              <text x="95" y="116" text-anchor="middle" style="font-size:13px">your choice</text>
              <rect x="410" y="14" width="150" height="50" rx="6" fill="var(--bg)" stroke="var(--line)" />
              <text x="485" y="36" text-anchor="middle" style="font-size:13px">Peer you connected to</text>
              <text x="485" y="54" text-anchor="middle" style="font-size:13px;font-weight:700">outbound</text>
              <rect x="410" y="136" width="150" height="50" rx="6" fill="var(--bg)" stroke="var(--line)" />
              <text x="485" y="158" text-anchor="middle" style="font-size:13px">Peer that connected to you</text>
              <text x="485" y="176" text-anchor="middle" style="font-size:13px;font-weight:700">inbound</text>
              <path d="M170 92 L402 40" fill="none" stroke="var(--ink)" stroke-width="2" />
              <polygon points="410,38 400,36 402,46" fill="var(--ink)" />
              <path d="M410 160 L172 110" fill="none" stroke="var(--ink)" stroke-width="2" />
              <polygon points="170,108 176,116 180,108" fill="var(--ink)" />
            </svg>`,
};
