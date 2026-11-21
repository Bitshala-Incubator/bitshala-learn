/* Figures for this lesson. Read by lesson-engine.js through window.LESSON_ASSETS. */
window.LESSON_ASSETS = {
        scatter: `<svg
              viewBox="0 0 600 366"
              role="img"
              aria-labelledby="scatter-title scatter-desc"
            >
              <title id="scatter-title">Fee against size for three transactions</title>
              <desc id="scatter-desc">
                Each dashed line is one fee rate. Tx A sits on the 5 sat/vB line,
                Tx B on the 8 sat/vB line and Tx C on the 6 sat/vB line.
              </desc>
              <line x1="60.0" y1="300.0" x2="510.0" y2="300.0" stroke="var(--ink)" stroke-width="1.5" />
              <line x1="60.0" y1="20" x2="60.0" y2="300.0" stroke="var(--ink)" stroke-width="1.5" />
              <text x="60.0" y="318" text-anchor="middle">0</text><text x="210.0" y="318" text-anchor="middle">100</text><text x="360.0" y="318" text-anchor="middle">200</text><text x="510.0" y="318" text-anchor="middle">300</text><text x="52" y="305.0" text-anchor="end">0</text><text x="52" y="193.0" text-anchor="end">1,000</text><text x="52" y="81.0" text-anchor="end">2,000</text><line x1="60.0" y1="300.0" x2="510.0" y2="132.0" stroke="var(--mut)" stroke-width="2" stroke-dasharray="6 5" opacity="0.7" /><line x1="60.0" y1="300.0" x2="510.0" y2="98.4" stroke="var(--mut)" stroke-width="2" stroke-dasharray="6 5" opacity="0.7" /><line x1="60.0" y1="300.0" x2="510.0" y2="31.2" stroke="var(--mut)" stroke-width="2" stroke-dasharray="6 5" opacity="0.7" /><circle cx="360.0" cy="188.0" r="6" fill="var(--bg)" stroke="var(--ink)" stroke-width="2.5" /><text x="376.0" y="218.0" paint-order="stroke" stroke="var(--soft)" stroke-width="5" stroke-linejoin="round"><tspan font-weight="700">Tx A · 5 sat/vB</tspan><tspan x="376.0" dy="18" font-size="14">1,000 sat · 200 vB</tspan></text><circle cx="435.0" cy="76.0" r="6" fill="var(--bg)" stroke="var(--acc)" stroke-width="2.5" /><text x="451.0" y="66.0" paint-order="stroke" stroke="var(--soft)" stroke-width="5" stroke-linejoin="round"><tspan font-weight="700">Tx B · 8 sat/vB</tspan><tspan x="451.0" dy="18" font-size="14">2,000 sat · 250 vB</tspan></text><circle cx="210.0" cy="232.8" r="6" fill="var(--bg)" stroke="var(--ink)" stroke-width="2.5" /><text x="226.0" y="262.8" paint-order="stroke" stroke="var(--soft)" stroke-width="5" stroke-linejoin="round"><tspan font-weight="700">Tx C · 6 sat/vB</tspan><tspan x="226.0" dy="18" font-size="14">600 sat · 100 vB</tspan></text>
              <text x="300" y="336" text-anchor="middle">vsize (vB)</text>
              <text x="66" y="14">fee (sat)</text>
              <text x="60" y="357" class="accent" font-size="13">Dashed lines:</text>
              <line x1="200" y1="352" x2="226" y2="352" stroke="var(--mut)" stroke-width="2" stroke-dasharray="6 5" opacity="0.7" /><text x="234" y="357">5 sat/vB</text><line x1="320" y1="352" x2="346" y2="352" stroke="var(--mut)" stroke-width="2" stroke-dasharray="6 5" opacity="0.7" /><text x="354" y="357">6 sat/vB</text><line x1="440" y1="352" x2="466" y2="352" stroke="var(--mut)" stroke-width="2" stroke-dasharray="6 5" opacity="0.7" /><text x="474" y="357">8 sat/vB</text>
            </svg>`,
        queue: `<svg
              viewBox="0 0 580 200"
              role="img"
              aria-labelledby="queue-title queue-desc"
            >
              <title id="queue-title">The mempool queue and the block limit</title>
              <desc id="queue-desc">
                Transactions sorted by fee rate, with widths set by vsize. The
                first three fit in a 1,000 vB block. The rest wait.
              </desc>
              <line x1="340" y1="48" x2="340" y2="150" stroke="var(--acc)" stroke-width="2" stroke-dasharray="6 4" />
              <rect x="40.0" y="70" width="120.0" height="70" rx="4" fill="var(--soft)" stroke="var(--acc)" stroke-width="2" /><text x="100.0" y="100" text-anchor="middle">T1</text><text x="100.0" y="124" text-anchor="middle">10/vB</text><rect x="160.0" y="70" width="90.0" height="70" rx="4" fill="var(--soft)" stroke="var(--acc)" stroke-width="2" /><text x="205.0" y="100" text-anchor="middle">T3</text><text x="205.0" y="124" text-anchor="middle">8/vB</text><rect x="250.0" y="70" width="75.0" height="70" rx="4" fill="var(--soft)" stroke="var(--acc)" stroke-width="2" /><text x="287.5" y="100" text-anchor="middle">T2</text><text x="287.5" y="124" text-anchor="middle">6/vB</text><rect x="325.0" y="70" width="60.0" height="70" rx="4" fill="var(--bg)" stroke="var(--line)" stroke-dasharray="5 4" /><text x="355.0" y="100" text-anchor="middle">T5</text><text x="355.0" y="124" text-anchor="middle">6/vB</text><rect x="385.0" y="70" width="45.0" height="70" rx="4" fill="var(--bg)" stroke="var(--line)" stroke-dasharray="5 4" /><text x="407.5" y="100" text-anchor="middle">T6</text><text x="407.5" y="124" text-anchor="middle">4/vB</text><rect x="430.0" y="70" width="90.0" height="70" rx="4" fill="var(--bg)" stroke="var(--line)" stroke-dasharray="5 4" /><text x="475.0" y="100" text-anchor="middle">T4</text><text x="475.0" y="124" text-anchor="middle">3/vB</text>
              <text x="340" y="40" text-anchor="middle" class="accent">block full at 1,000 vB</text>
              <text x="150" y="172" text-anchor="middle">in the block</text>
              <text x="450" y="172" text-anchor="middle">waits for the next block</text>
            </svg>`,
        fee: `<svg
              viewBox="0 0 580 200"
              role="img"
              aria-labelledby="fee-title fee-desc"
            >
              <title id="fee-title">Inputs, outputs and the fee</title>
              <desc id="fee-desc">
                Inputs total 100,000 sat. Outputs total 98,500 sat. The
                difference of 1,500 sat is the fee paid to the miner.
              </desc>
              <rect x="20" y="40" width="150" height="100" rx="6" fill="var(--bg)" stroke="var(--line)" />
              <text x="95" y="84" text-anchor="middle">Inputs</text>
              <text x="95" y="110" text-anchor="middle">100,000 sat</text>
              <path d="M170 90H205" fill="none" stroke="var(--ink)" stroke-width="2" />
              <polygon points="205,84 215,90 205,96" fill="var(--ink)" />
              <rect x="215" y="40" width="130" height="100" rx="6" fill="var(--soft)" stroke="var(--ink)" />
              <text x="280" y="84" text-anchor="middle">Transaction</text>
              <text x="280" y="110" text-anchor="middle">fee = in − out</text>
              <path d="M345 50H380" fill="none" stroke="var(--ink)" stroke-width="2" />
              <polygon points="380,44 390,50 380,56" fill="var(--ink)" />
              <rect x="390" y="25" width="175" height="50" rx="6" fill="var(--bg)" stroke="var(--line)" />
              <text x="477" y="55" text-anchor="middle">Outputs 98,500 sat</text>
              <path d="M345 140H380" fill="none" stroke="var(--acc)" stroke-width="2" stroke-dasharray="4 4" />
              <polygon points="380,134 390,140 380,146" fill="var(--acc)" />
              <rect x="390" y="115" width="175" height="50" rx="6" fill="var(--soft)" stroke="var(--acc)" stroke-width="2" />
              <text class="accent" x="477" y="145" text-anchor="middle">Fee 1,500 sat</text>
              <text x="290" y="188" text-anchor="middle">The fee is never written down. It is the gap.</text>
            </svg>`,
        bars: `<svg
              viewBox="0 0 580 230"
              role="img"
              aria-labelledby="bars-title bars-desc"
            >
              <title id="bars-title">Fee rates of three transactions</title>
              <desc id="bars-desc">
                Tx A pays 5 sat per vbyte, Tx B pays 8 sat per vbyte and Tx C
                pays 2 sat per vbyte.
              </desc>
              <line x1="80" y1="180" x2="520" y2="180" stroke="var(--ink)" stroke-width="2" />
              <rect x="100" y="110" width="110" height="70" rx="4" fill="var(--soft)" stroke="var(--line)" />
              <text x="155" y="102" text-anchor="middle">5 sat/vB</text>
              <text x="155" y="206" text-anchor="middle">Tx A</text>
              <rect x="235" y="68" width="110" height="112" rx="4" fill="var(--soft)" stroke="var(--acc)" stroke-width="2" />
              <text class="accent" x="290" y="60" text-anchor="middle">8 sat/vB</text>
              <text x="290" y="206" text-anchor="middle">Tx B</text>
              <rect x="370" y="152" width="110" height="28" rx="4" fill="var(--soft)" stroke="var(--line)" />
              <text x="425" y="144" text-anchor="middle">2 sat/vB</text>
              <text x="425" y="206" text-anchor="middle">Tx C</text>
            </svg>`,
};
