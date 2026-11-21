/* Figures for this lesson. Read by lesson-engine.js through window.LESSON_ASSETS. */
window.LESSON_ASSETS = {
        hop: `<svg viewBox="0 0 580 240" role="img" aria-labelledby="hop-title hop-desc">
              <title id="hop-title">One hop of a transaction between two peers</title>
              <desc id="hop-desc">Node A sends inv to node B. B replies with getdata. A then sends the full tx. Three messages for one hop.</desc>
              <rect x="40" y="14" width="160" height="40" rx="6" fill="var(--soft)" stroke="var(--acc)" stroke-width="2" />
              <text x="120" y="39" text-anchor="middle" style="font-weight:700">Node A</text>
              <rect x="380" y="14" width="160" height="40" rx="6" fill="var(--bg)" stroke="var(--line)" />
              <text x="460" y="39" text-anchor="middle" style="font-weight:700">Node B</text>
              <path d="M120 54 V222" fill="none" stroke="var(--line)" stroke-width="2" stroke-dasharray="6 6" />
              <path d="M460 54 V222" fill="none" stroke="var(--line)" stroke-width="2" stroke-dasharray="6 6" />
              <path d="M120 80 H452" fill="none" stroke="var(--ink)" stroke-width="2" />
              <polygon points="460,80 450,75 450,85" fill="var(--ink)" />
              <text x="290" y="72" text-anchor="middle" style="font:13px ui-monospace,Consolas,monospace">1. inv: I have txid X</text>
              <path d="M460 132 H128" fill="none" stroke="var(--ink)" stroke-width="2" />
              <polygon points="120,132 130,127 130,137" fill="var(--ink)" />
              <text x="290" y="124" text-anchor="middle" style="font:13px ui-monospace,Consolas,monospace">2. getdata: send me X</text>
              <path d="M120 184 H452" fill="none" stroke="var(--acc)" stroke-width="2" />
              <polygon points="460,184 450,179 450,189" fill="var(--acc)" />
              <text x="290" y="176" text-anchor="middle" style="font:13px ui-monospace,Consolas,monospace">3. tx: full transaction X</text>
              <text x="290" y="226" text-anchor="middle" class="accent">Announce, request, then send</text>
            </svg>`,
};
