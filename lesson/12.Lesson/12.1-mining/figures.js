/* Character-led SVG scenes for Aarav and Meera. */
const people = `
  <g stroke="#332b27" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M74 187v-27q0-27 28-27h24q28 0 28 27v27" fill="#e87549"/><path d="M92 139q11 12 23 0" fill="none"/><path d="M83 186v-19m61 19v-19" fill="none"/>
    <circle cx="114" cy="108" r="27" fill="#d9966d"/><path d="M88 106q1-29 29-29 22 0 27 23-12-7-19-18-9 14-36 16" fill="#332b27"/><path d="M103 111h1m20 0h1" fill="none" stroke-width="4"/><path d="M108 123q7 5 14 0" fill="none"/>
    <path d="M464 187v-28q0-26 27-26h25q26 0 26 26v28" fill="#538b8c"/><path d="M485 139q10 12 20 0" fill="none"/><circle cx="504" cy="108" r="27" fill="#a96f54"/><path d="M477 108q0-30 28-30 25 0 28 29l-9 29-8-7v-21q-16 0-28-13l-7 22" fill="#242326"/><path d="M494 111h1m19 0h1" fill="none" stroke-width="4"/><path d="M498 123q7 5 14 0" fill="none"/><path d="M472 151l-26-18m78 18 22-23" fill="none"/>
  </g>
`;

window.LESSON_ASSETS = {
  proofOfWork: `<svg class="mining-svg" viewBox="0 0 620 230" role="img" aria-label="Aarav tries nonce values at a mining console while Meera explains the target">
    <style>.mining-svg text{fill:#463b34;font-family:system-ui,sans-serif}.mining-svg .screen-line{fill:#cde9d9}.mining-svg .accent{fill:#e87549}</style>
    <rect width="620" height="230" rx="18" fill="#f5e8d4"/><path d="M20 188h580" stroke="#c9b99f" stroke-width="3"/>
    <g transform="translate(180 52)" stroke="#3e3530" stroke-width="2"><rect width="250" height="108" rx="12" fill="#fffaf1"/><rect x="14" y="14" width="222" height="58" rx="7" fill="#24323b"/><text class="screen-line" x="125" y="38" text-anchor="middle" stroke="none" font-size="13" font-family="monospace">nonce 41: hash too high</text><text class="screen-line" x="125" y="59" text-anchor="middle" stroke="none" font-size="12" font-family="monospace">nonce 42: retry</text><path d="M99 108h52v11H99z" fill="#b9aa93"/><path d="M77 122h96l13 10H64z" fill="#d4c5ad"/></g>
    <rect x="200" y="3" width="220" height="34" rx="13" fill="#fffaf1" stroke="#bcae98" stroke-width="1.5"/><text x="310" y="25" text-anchor="middle" stroke="none" font-size="12">Change the nonce, hash again</text>
    <g transform="translate(0 5)">${people}</g>
  </svg>`,
  rewardSplit: `<svg class="mining-svg" viewBox="0 0 620 230" role="img" aria-label="Meera shows Aarav the subsidy and fees claimed in a coinbase transaction">
    <style>.mining-svg text{fill:#463b34;font-family:system-ui,sans-serif}.mining-svg .accent{fill:#e87549}</style>
    <rect width="620" height="230" rx="18" fill="#f5e8d4"/><path d="M20 188h580" stroke="#c9b99f" stroke-width="3"/><g transform="translate(0 5)">${people}</g>
    <rect x="205" y="65" width="210" height="99" rx="14" fill="#fffaf1" stroke="#bcae98" stroke-width="1.5"/><text x="310" y="91" text-anchor="middle" fill="#50443d" stroke="none" font-size="12" font-weight="700">Miner's claim</text>
    <rect x="220" y="102" width="96" height="35" rx="8" fill="#f3cb75"/><text x="268" y="124" text-anchor="middle" fill="#463b34" stroke="none" font-size="12">Subsidy</text><text x="331" y="126" text-anchor="middle" fill="#e87549" stroke="none" font-size="19" font-weight="700">+</text><rect x="346" y="102" width="58" height="35" rx="8" fill="#91c5ad"/><text x="375" y="124" text-anchor="middle" fill="#263a35" stroke="none" font-size="11">Fees</text>
  </svg>`,
  difficultyAdjustment: `<svg class="mining-svg" viewBox="0 0 620 230" role="img" aria-label="Meera shows Aarav how the network adjusts the target after every 2,016 blocks">
    <style>.mining-svg text{fill:#463b34;font-family:system-ui,sans-serif}.mining-svg .accent{fill:#e87549}</style>
    <rect width="620" height="230" rx="18" fill="#f5e8d4"/><path d="M24 188h572" stroke="#c9b99f" stroke-width="3"/>
    <g transform="translate(0 4)">${people}</g>
    <rect x="190" y="25" width="240" height="126" rx="14" fill="#fffaf1" stroke="#bcae98" stroke-width="1.5"/>
    <text x="310" y="48" text-anchor="middle" font-size="14" font-weight="700">Every 2,016 blocks</text>
    <rect x="212" y="62" width="196" height="30" rx="8" fill="#f3cb75"/><text x="310" y="82" text-anchor="middle" font-size="12">Compare elapsed time</text>
    <path d="M310 93v12" stroke="#e87549" stroke-width="2.5"/><path d="M304 101l6 7 6-7" fill="#e87549"/>
    <rect x="212" y="111" width="196" height="28" rx="8" fill="#91c5ad"/><text x="310" y="130" text-anchor="middle" font-size="12">Set a new target</text>
    <text x="310" y="171" text-anchor="middle" font-size="12">Too fast? Harder. Too slow? Easier.</text>
  </svg>`,
  feeMarket: `<svg class="mining-svg" viewBox="0 0 620 250" role="img" aria-label="Transactions are ranked by fee rate and placed into a block with limited space">
    <style>.mining-svg text{fill:#463b34;font-family:system-ui,sans-serif}</style>
    <rect width="620" height="250" rx="18" fill="#f5e8d4"/><text x="310" y="28" text-anchor="middle" font-size="13" font-weight="700">Aarav sorts the waiting payments for Meera</text>
    <g stroke="#66574b" stroke-width="1.4"><rect x="37" y="74" width="170" height="30" rx="8" fill="#fffaf1"/><rect x="37" y="112" width="170" height="30" rx="8" fill="#fffaf1"/><rect x="37" y="150" width="170" height="30" rx="8" fill="#fffaf1"/><rect x="37" y="188" width="170" height="30" rx="8" fill="#fffaf1"/></g>
    <g fill="#463b34" stroke="none" font-size="12" text-anchor="middle"><text x="122" y="94">Payment A · 80 sat/vB</text><text x="122" y="132">Payment B · 42 sat/vB</text><text x="122" y="170">Payment C · 18 sat/vB</text><text x="122" y="208">Payment D · 5 sat/vB</text></g><path d="M218 89h44m-44 38h44m-44 38h44" stroke="#e87549" stroke-width="2.5"/>
    <path d="M274 60h303q11 0 11 11v136q0 11-11 11H274z" fill="#fffaf1" stroke="#66574b" stroke-width="1.5"/><text x="430" y="52" text-anchor="middle" fill="#50443d" stroke="none" font-size="12" font-weight="700">Candidate block</text>
    <rect x="295" y="74" width="260" height="30" rx="7" fill="#91c5ad"/><rect x="295" y="112" width="260" height="30" rx="7" fill="#a9c8ad"/><rect x="295" y="150" width="260" height="30" rx="7" fill="#f3cb75"/><g fill="#263a35" stroke="none" font-size="12"><text x="425" y="94" text-anchor="middle">A · strong fee rate</text><text x="425" y="132" text-anchor="middle">B · next best</text><text x="425" y="170" text-anchor="middle">C · if there is room</text></g>
  </svg>`
};
