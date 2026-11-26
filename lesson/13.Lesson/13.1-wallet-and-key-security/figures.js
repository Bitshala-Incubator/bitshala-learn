const style = `<style>
  .wallet-svg text{font:15px system-ui,sans-serif;fill:#3c332d}
  .wallet-svg .title{font-size:20px;font-weight:650}
  .wallet-svg .label{font-size:14px;font-weight:700;letter-spacing:.04em}
  .wallet-svg .small{font-size:13px}
  .wallet-svg .muted{fill:#74695e}
  .wallet-svg .safe{fill:#267457}
  .wallet-svg .alert{fill:#a9442c}
  @media(prefers-reduced-motion:reduce){.wallet-svg animate,.wallet-svg animateMotion{display:none}}
</style>`;
const SVG = { width: 760, height: 350, centerX: 380 };
const PEOPLE_LAYOUT = { centerOffset: 235 };
const RECOVERY_LAYOUT = {
  message: { x: SVG.centerX - 160, y: 68, width: 320, height: 70 },
  keyboard: { x: SVG.centerX - 135, y: 187, width: 270, height: 48 },
  device: { x: SVG.centerX - 56, y: 153, width: 112, height: 67 },
  note: { x: SVG.centerX + 91, y: 202, width: 26, height: 27, labelY: 251 },
};
const scene = (title, content, label) => `<svg class="wallet-svg" viewBox="0 0 ${SVG.width} ${SVG.height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${label}">${style}<rect width="${SVG.width}" height="${SVG.height}" rx="16" fill="#f6ead6"/><text x="${SVG.centerX}" y="34" text-anchor="middle" class="title">${title}</text>${content}</svg>`;
const person = (x, name, skin, shirt) => `<g stroke="#3c332d" stroke-width="3" stroke-linejoin="round"><circle cx="${x}" cy="165" r="27" fill="${skin}"/><path d="M${x - 37} 274v-35q0-28 37-28t37 28v35z" fill="${shirt}"/><text x="${x}" y="300" text-anchor="middle" stroke="none" fill="#3c332d" font="14px system-ui">${name}</text></g>`;
const people = (rightName = "Meera") => `<g>${person(SVG.centerX - PEOPLE_LAYOUT.centerOffset, "Aarav", "#d9936b", "#e8794d")}${person(SVG.centerX + PEOPLE_LAYOUT.centerOffset, rightName, "#9c684f", "#558c8e")}</g>`;
window.LESSON_ASSETS = {
  keyRoles: scene("At the shop counter", `${people("Customer")}
    <path d="M197 220h365m-8-7 8 7-8 7" fill="none" stroke="#c18a2c" stroke-width="2.5"/>
    <text x="380" y="214" text-anchor="middle" class="small">Aarav shares the receiving address</text>
    <path d="M563 260H198m8-7-8 7 8 7" fill="none" stroke="#43836a" stroke-width="2.5"/>
    <text x="380" y="255" text-anchor="middle" class="small safe">Customer sends a signed payment</text>
    <rect x="97" y="311" width="566" height="28" rx="14" fill="#fffaf1"/>
    <text x="380" y="330" text-anchor="middle" class="small muted">The address is shareable. The signing key stays with Aarav; the signature travels with the payment.</text>`, "Aarav shares a receiving address with a customer. The customer sends a signed payment; Aarav's signing key stays private while the signature travels with the payment."),
  walletLayers: scene("Meera finds the note under the keyboard", `${people()}
    <rect x="${RECOVERY_LAYOUT.keyboard.x}" y="${RECOVERY_LAYOUT.keyboard.y}" width="${RECOVERY_LAYOUT.keyboard.width}" height="${RECOVERY_LAYOUT.keyboard.height}" rx="7" fill="#d7c9ad" stroke="#74695e" stroke-width="2"/>
    <rect x="${RECOVERY_LAYOUT.device.x}" y="${RECOVERY_LAYOUT.device.y}" width="${RECOVERY_LAYOUT.device.width}" height="${RECOVERY_LAYOUT.device.height}" rx="9" fill="#e5ebe8" stroke="#3c332d" stroke-width="3"/>
    <path d="m${RECOVERY_LAYOUT.device.x + 22} ${RECOVERY_LAYOUT.device.y + 8} 36 49m0-49-36 49" stroke="#c85b31" stroke-width="3"/>
    <path d="M${RECOVERY_LAYOUT.note.x} ${RECOVERY_LAYOUT.note.y}h${RECOVERY_LAYOUT.note.width}v${RECOVERY_LAYOUT.note.height}h-${RECOVERY_LAYOUT.note.width}z" fill="#fffaf1" stroke="#c85b31" stroke-width="2"/>
    <path d="M${RECOVERY_LAYOUT.note.x + 6} ${RECOVERY_LAYOUT.note.y + 7}h14m-14 6h14m-14 6h10" stroke="#74695e"/>
    <text x="${RECOVERY_LAYOUT.note.x + RECOVERY_LAYOUT.note.width / 2}" y="${RECOVERY_LAYOUT.note.labelY}" text-anchor="middle" class="small alert">backup note</text>
    <rect x="${RECOVERY_LAYOUT.message.x}" y="${RECOVERY_LAYOUT.message.y}" width="${RECOVERY_LAYOUT.message.width}" height="${RECOVERY_LAYOUT.message.height}" rx="14" fill="#fffaf1" stroke="#b7a98f" stroke-width="2"/>
    <text x="380" y="96" text-anchor="middle" class="small">“Someone could have copied it.”</text>
    <text x="380" y="117" text-anchor="middle" class="small muted">A broken device can be restored.</text>
    <text x="380" y="132" text-anchor="middle" class="small muted">Exposed words need fresh keys.</text>`, "Meera discovers a potentially exposed wallet backup under a shared shop keyboard beside Aarav's broken phone."),
  phoneVsLeak: scene("A broken phone is not a leaked key", `${people()}
    <rect x="267" y="94" width="226" height="88" rx="17" fill="#fffaf1" stroke="#b7a98f" stroke-width="2"/><text x="380" y="121" text-anchor="middle" class="label">UNKNOWN SUPPORT MESSAGE</text><text x="380" y="148" text-anchor="middle" class="small">“Send your recovery words</text><text x="380" y="168" text-anchor="middle" class="small">and we can restore it.”</text>
    <path d="M252 136h-44" stroke="#c85b31" stroke-width="3"/><path d="m214 128-9 8 9 8" fill="none" stroke="#c85b31" stroke-width="3"/>
    <path d="M508 136h43" stroke="#43836a" stroke-width="3"/><path d="m543 128 9 8-9 8" fill="none" stroke="#43836a" stroke-width="3"/>
    <rect x="314" y="198" width="132" height="28" rx="14" fill="#e3f0e8"/><text x="380" y="217" text-anchor="middle" class="small safe">Meera says: stop</text>
    <text x="380" y="254" text-anchor="middle" class="small">Private backup: restore with trusted software.</text><text x="380" y="276" text-anchor="middle" class="small alert">Words exposed: create fresh keys and move funds.</text>`, "Aarav faces an unsolicited wallet-support message while Meera warns him not to share recovery words. A broken device can be restored privately; exposed words require new keys."),
  signingPath: `<svg class="wallet-svg signing-path" viewBox="0 0 760 360" role="img" aria-label="Aarav compares the hardware signer with Meera's invoice. The computer may alter a payment draft, so he verifies the recipient, amount, fee, and change on the signer before approving.">${style}<rect width="760" height="360" rx="16" fill="#f6ead6"/><text x="380" y="34" text-anchor="middle" class="title">Aarav checks before he pays</text>
    <path d="M72 224h616" stroke="#b7a98f" stroke-width="5"/>
    <rect x="45" y="78" width="178" height="118" rx="16" fill="#fffaf1" stroke="#b7a98f" stroke-width="2"/><text x="134" y="105" text-anchor="middle" class="label">MEERA'S INVOICE</text><text x="134" y="136" text-anchor="middle">Supplier address</text><text x="134" y="160" text-anchor="middle">Amount and fee limit</text>
    <rect x="291" y="78" width="178" height="118" rx="16" fill="#fff5eb" stroke="#c85b31" stroke-width="2"/><text x="380" y="105" text-anchor="middle" class="label alert">CONNECTED COMPUTER</text><rect x="336" y="119" width="88" height="50" rx="5" fill="#e1e6e4" stroke="#3c332d" stroke-width="2"/><path d="M380 169v8m-23 0h46" stroke="#3c332d" stroke-width="2"/><text x="380" y="190" text-anchor="middle" class="small alert">draft may be changed</text>
    <rect x="537" y="78" width="178" height="118" rx="16" fill="#f1f7f2" stroke="#43836a" stroke-width="2"/><text x="626" y="105" text-anchor="middle" class="label safe">HARDWARE SIGNER</text><rect x="593" y="119" width="66" height="43" rx="8" fill="#fffaf1" stroke="#43836a" stroke-width="2"/><rect x="600" y="126" width="52" height="26" rx="3" fill="#dcebe4"/><text x="626" y="190" text-anchor="middle" class="small safe">Aarav checks here</text>
    <path d="M223 137h67m-10-8 10 8-10 8M469 137h67m-10-8 10 8-10 8" fill="none" stroke="#74695e" stroke-width="2.5"/>
    <circle class="flow-pulse" r="5" fill="#c85b31"><animateMotion dur="2s" repeatCount="indefinite" path="M224 137H289"/></circle><circle class="flow-pulse" r="5" fill="#43836a"><animateMotion begin="1s" dur="2s" repeatCount="indefinite" path="M470 137H535"/></circle>
    <rect x="210" y="253" width="340" height="57" rx="15" fill="#fffaf1" stroke="#b7a98f" stroke-width="2"/><text x="380" y="278" text-anchor="middle" class="label">COMPARE WITH THE TRUSTED INVOICE</text><text x="380" y="299" text-anchor="middle" class="small">recipient · amount · fee · change</text>
    <path d="M626 196v34H550" fill="none" stroke="#43836a" stroke-width="2.5"/><text x="380" y="341" text-anchor="middle" class="small muted">The signer protects the key; Aarav decides whether this is the right payment.</text></svg>`
};
