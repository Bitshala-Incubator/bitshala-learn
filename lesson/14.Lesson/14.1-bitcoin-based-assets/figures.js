const style = `<style>
  .asset-svg text{font:15px system-ui,sans-serif;fill:#3c332d}
  .asset-svg .title{font-size:20px;font-weight:650}
  .asset-svg .label{font-size:13px;font-weight:700;letter-spacing:.04em}
  .asset-svg .small{font-size:13px}
  .asset-svg .muted{fill:#74695e}
  .asset-svg .safe{fill:#267457}
</style>`;

const validationFlow = `<svg class="asset-svg" viewBox="0 0 760 320" preserveAspectRatio="xMidYMid meet" role="img" aria-label="The sender shares asset proof data with the recipient, who validates the asset protocol history. Bitcoin records a commitment and validates its own transaction rules; Bitcoin nodes do not validate the full asset proof.">${style}
  <rect width="760" height="320" rx="16" fill="#f6ead6"/>
  <text x="380" y="36" text-anchor="middle" class="title">Two validation jobs, two kinds of data</text>

  <rect x="34" y="64" width="692" height="116" rx="14" fill="#fffaf1" stroke="#b7a98f" stroke-width="2"/>
  <text x="58" y="92" class="label">ASSET DATA · SHARED OFF-CHAIN</text>
  <rect x="58" y="110" width="144" height="48" rx="9" fill="#f5d077"/>
  <text x="130" y="140" text-anchor="middle">Sender</text>
  <path d="M216 134h114m-9-8 9 8-9 8" fill="none" stroke="#74695e" stroke-width="2"/>
  <text x="273" y="120" text-anchor="middle" class="small muted">proof + history</text>
  <rect x="330" y="110" width="366" height="48" rx="9" fill="#e3f0e8"/>
  <text x="513" y="130" text-anchor="middle">Recipient's client checks protocol rules</text>
  <text x="513" y="149" text-anchor="middle" class="small muted">and validates the asset history it receives.</text>

  <path d="M380 181v26m-7-8 7 8 7-8" fill="none" stroke="#43836a" stroke-width="2"/>
  <text x="396" y="199" class="small muted">commitment anchors the transfer</text>

  <rect x="34" y="214" width="692" height="78" rx="14" fill="#fffaf1" stroke="#b7a98f" stroke-width="2"/>
  <text x="58" y="242" class="label">BITCOIN · PUBLIC TRANSACTION</text>
  <text x="58" y="269">Nodes validate Bitcoin rules and the committed transaction.</text>
  <text x="58" y="287" class="small muted">They do not validate the full asset proof or its protocol-specific meaning.</text>
</svg>`;

window.LESSON_ASSETS = { validationFlow };
