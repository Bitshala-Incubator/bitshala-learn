const style = `<style>
  .wallet-svg text{font:15px system-ui,sans-serif;fill:#3c332d}
  .wallet-svg .title{font-size:20px;font-weight:650}
  .wallet-svg .label{font-size:14px;font-weight:700;letter-spacing:.04em}
  .wallet-svg .small{font-size:13px}
  .wallet-svg .muted{fill:#74695e}
  .wallet-svg .safe{fill:#267457}
</style>`;

const threshold = `<svg class="wallet-svg" viewBox="0 0 760 300" preserveAspectRatio="xMidYMid meet" role="img" aria-label="A 2-of-3 multisignature wallet has three independent signer keys. Any two keys can authorize a payment; one key alone cannot.">${style}
  <rect width="760" height="300" rx="16" fill="#f6ead6"/>
  <text x="380" y="36" text-anchor="middle" class="title">A 2-of-3 multisignature wallet</text>
  <g text-anchor="middle">
    <rect x="54" y="76" width="190" height="112" rx="14" fill="#fffaf1" stroke="#b7a98f" stroke-width="2"/>
    <text x="149" y="108" class="label">SIGNER A</text>
    <text x="149" y="141">Aarav</text>
    <text x="149" y="165" class="small muted">separate key</text>

    <rect x="285" y="76" width="190" height="112" rx="14" fill="#fffaf1" stroke="#b7a98f" stroke-width="2"/>
    <text x="380" y="108" class="label">SIGNER B</text>
    <text x="380" y="141">Meera</text>
    <text x="380" y="165" class="small muted">separate key</text>

    <rect x="516" y="76" width="190" height="112" rx="14" fill="#fffaf1" stroke="#b7a98f" stroke-width="2"/>
    <text x="611" y="108" class="label">SIGNER C</text>
    <text x="611" y="141">Independent cosigner</text>
    <text x="611" y="165" class="small muted">separate key</text>
  </g>
  <rect x="164" y="218" width="432" height="48" rx="24" fill="#e3f0e8"/>
  <text x="380" y="248" text-anchor="middle" class="safe">Any 2 of these 3 keys must sign a spend.</text>
</svg>`;

window.LESSON_ASSETS = { threshold };
