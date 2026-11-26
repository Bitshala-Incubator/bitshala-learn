const style = `<style>
  .lightning-svg text{font:15px system-ui,sans-serif;fill:#3c332d}
  .lightning-svg .title{font-size:20px;font-weight:650}
  .lightning-svg .label{font-size:13px;font-weight:700;letter-spacing:.04em}
  .lightning-svg .small{font-size:12px}
  .lightning-svg .muted{fill:#74695e}
  .lightning-svg .safe{fill:#267457}
</style>`;

const paymentRoute = `<svg class="lightning-svg" viewBox="0 0 760 340" preserveAspectRatio="xMidYMid meet" role="img" aria-label="A Lightning payment travels from Aarav through Meera to supplier Dev over two separate channels. Conditional HTLCs travel toward Dev; when Dev reveals the payment preimage, it returns through Meera to Aarav and fulfills the HTLCs. Each HTLC also has a timeout.">${style}
  <rect width="760" height="340" rx="16" fill="#f6ead6"/>
  <text x="380" y="34" text-anchor="middle" class="title">One payment, two channels, conditional hops</text>

  <g text-anchor="middle">
    <rect x="44" y="62" width="150" height="78" rx="13" fill="#fffaf1" stroke="#b7a98f" stroke-width="2"/>
    <text x="119" y="93" class="label">PAYER</text>
    <text x="119" y="120">Aarav</text>

    <rect x="305" y="62" width="150" height="78" rx="13" fill="#fffaf1" stroke="#b7a98f" stroke-width="2"/>
    <text x="380" y="93" class="label">FORWARDER</text>
    <text x="380" y="120">Meera</text>

    <rect x="566" y="62" width="150" height="78" rx="13" fill="#fffaf1" stroke="#b7a98f" stroke-width="2"/>
    <text x="641" y="93" class="label">PAYEE</text>
    <text x="641" y="120">Supplier Dev</text>
  </g>

  <rect x="211" y="83" width="81" height="36" rx="18" fill="#f5d077"/>
  <text x="251.5" y="106" text-anchor="middle" class="small">Channel A–M</text>
  <rect x="472" y="83" width="81" height="36" rx="18" fill="#f5d077"/>
  <text x="512.5" y="106" text-anchor="middle" class="small">Channel M–D</text>

  <text x="380" y="171" text-anchor="middle" class="small muted">HTLCs move toward the payee with a hash condition and staggered timeouts</text>
  <path d="M194 195h106m-9-8 9 8-9 8M455 195h106m-9-8 9 8-9 8" fill="none" stroke="#c18a2c" stroke-width="2.5"/>
  <text x="247" y="218" text-anchor="middle" class="small">HTLC 1</text>
  <text x="508" y="218" text-anchor="middle" class="small">HTLC 2</text>

  <text x="380" y="252" text-anchor="middle" class="small safe">Dev reveals the preimage; it travels back to Aarav</text>
  <path d="M566 274h-111m9-8-9 8 9 8M305 274H194m9-8-9 8 9 8" fill="none" stroke="#43836a" stroke-width="2.5"/>

  <rect x="98" y="300" width="564" height="27" rx="13.5" fill="#fffaf1"/>
  <text x="380" y="319" text-anchor="middle" class="small">Matching preimage fulfills the HTLCs; timeout lets an unresolved hop fail back.</text>
</svg>`;

window.LESSON_ASSETS = { paymentRoute };
