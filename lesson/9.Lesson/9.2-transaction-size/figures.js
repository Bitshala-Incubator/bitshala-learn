/* Figures for this lesson. Read by lesson-engine.js through window.LESSON_ASSETS. */
window.LESSON_ASSETS = {
  bytes: `<svg
              viewBox="0 0 580 200"
              role="img"
              aria-labelledby="bytes-title bytes-desc"
            >
              <title id="bytes-title">Working out the vbytes of Tx 2</title>
              <desc id="bytes-desc">
                Tx 2 has 200 non-witness bytes, each worth 4 weight units, and 110
                witness bytes, each worth 1. The weight is 910, so the vbytes are
                910 divided by 4, rounded up to 228.
              </desc>
              <rect x="40" y="30" width="330" height="48" rx="6" fill="var(--bg)" stroke="var(--ink)" stroke-width="1.5" />
              <text x="205" y="60" text-anchor="middle" font-weight="700">200 non-witness bytes</text>
              <rect x="376" y="30" width="164" height="48" rx="6" fill="var(--soft)" stroke="var(--acc)" stroke-width="2" />
              <text x="458" y="60" text-anchor="middle" font-weight="700">110 witness bytes</text>
              <text x="205" y="104" text-anchor="middle">× 4 = 800 weight units</text>
              <text x="458" y="104" text-anchor="middle">× 1 = 110 weight units</text>
              <text x="290" y="148" text-anchor="middle" font-weight="700">800 + 110 = 910 weight units</text>
              <text x="290" y="180" text-anchor="middle" class="accent">910 ÷ 4 = 227.5, rounded up to 228 vB</text>
            </svg>`,
};
