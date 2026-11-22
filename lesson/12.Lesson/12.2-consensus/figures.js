/* Case-study illustrations for Aarav's payment and the rules around it. */
const figureStyle = `<style>.case-svg text{font:13px system-ui,sans-serif;fill:#3c332d}.case-svg .small{font-size:11px}.case-svg .green{fill:#347b59}.case-svg .red{fill:#b23d35}.case-svg .orange{fill:#c85b31}.case-svg .label{font-size:13px;font-weight:650;letter-spacing:0;text-transform:none}</style>`;
const person = (x, y, name, shirt, skin) => `<g stroke="#3b332d" stroke-width="1.5" stroke-linejoin="round"><circle cx="${x}" cy="${y}" r="12" fill="${skin}"/><path d="M${x-18} ${y+34}v-10q0-12 18-12t18 12v10z" fill="${shirt}"/><path d="M${x-5} ${y}h.1m10 0h.1" stroke-width="2.5"/><path d="M${x-4} ${y+6}q4 3 8 0" fill="none"/></g><text x="${x}" y="${y+49}" text-anchor="middle" class="small">${name}</text>`;

window.LESSON_ASSETS = {
  validationCheckpoint: `<svg class="case-svg" viewBox="0 0 640 270" role="img" aria-label="Block 74638 passes proof of work but fails a transaction value check at Meera's checkpoint">
    ${figureStyle}<rect width="640" height="270" rx="16" fill="#f6ead6"/>
    <text x="320" y="28" text-anchor="middle" class="label">Meera's block checkpoint</text>
    <rect x="22" y="68" width="145" height="106" rx="12" fill="#fffaf1" stroke="#74695e" stroke-width="1.5"/>
    <path d="M68 68v-10q0-8 8-8h37q8 0 8 8v10" fill="none" stroke="#74695e" stroke-width="3"/>
    <text x="94" y="102" text-anchor="middle" class="label">Block 74,638</text><text x="94" y="124" text-anchor="middle" class="small">proof of work</text><rect x="43" y="137" width="102" height="24" rx="12" fill="#dceee3"/><text x="94" y="154" text-anchor="middle" class="small green label">PASS</text>
    <path d="M176 120h22m-7-6 7 6-7 6" fill="none" stroke="#c85b31" stroke-width="2.5"/>
    <rect x="205" y="68" width="126" height="106" rx="10" fill="#fffaf1" stroke="#74695e" stroke-width="1.5"/><text x="268" y="96" text-anchor="middle" class="label">Value check</text><text x="268" y="119" text-anchor="middle" class="small">outputs within</text><text x="268" y="135" text-anchor="middle" class="small">the money limit?</text><rect x="238" y="143" width="60" height="22" rx="11" fill="#f6dedb"/><text x="268" y="159" text-anchor="middle" class="small red label">FAIL</text>
    <path d="M340 120h20m-7-6 7 6-7 6" fill="none" stroke="#c85b31" stroke-width="2.5"/>
    <rect x="368" y="68" width="110" height="106" rx="10" fill="#fffaf1" stroke="#74695e" stroke-width="1.5"/><text x="423" y="100" text-anchor="middle" class="label">Scripts</text><text x="423" y="121" text-anchor="middle" class="small">signatures</text><text x="423" y="138" text-anchor="middle" class="small">and spends</text>
    <rect x="496" y="68" width="122" height="106" rx="10" fill="#fffaf1" stroke="#74695e" stroke-width="1.5"/><text x="557" y="100" text-anchor="middle" class="label">Coinbase</text><text x="557" y="121" text-anchor="middle" class="small">subsidy plus</text><text x="557" y="138" text-anchor="middle" class="small">fees only</text>
    <rect x="202" y="191" width="276" height="30" rx="8" fill="#f6dedb"/><text x="340" y="211" text-anchor="middle" class="small red label">The node rejects the whole block</text>
    ${person(90, 213, "Aarav", "#e87549", "#d9966d")}${person(550, 213, "Meera", "#538b8c", "#a96f54")}
  </svg>`,

  confirmationScale: `<svg class="case-svg" viewBox="0 0 640 330" role="img" aria-label="A balance scale compares two branches. Branch A has four blocks and work four and contains Aarav's payment. Branch B has two blocks and work six, so it is heavier">
    ${figureStyle}<rect width="640" height="330" rx="16" fill="#f6ead6"/><text x="320" y="32" text-anchor="middle" class="label">Which branch does Meera follow?</text>
    <path d="M220 91l200 22" stroke="#74695e" stroke-width="6" stroke-linecap="round"/><circle cx="320" cy="102" r="9" fill="#e87549" stroke="#3b332d" stroke-width="2"/><path d="M320 111l-24 96h48z" fill="#cbb89a" stroke="#74695e" stroke-width="1.5"/>
    <path d="M220 91v54m200-32v53" stroke="#74695e" stroke-width="2"/><path d="M180 145h80l-11 17h-58zM380 166h80l-11 17h-58z" fill="#fffaf1" stroke="#74695e" stroke-width="1.5"/>
    <g fill="#e9c979" stroke="#74695e" stroke-width="1.3"><rect x="185" y="116" width="16" height="27" rx="3"/><rect x="203" y="116" width="16" height="27" rx="3"/><rect x="221" y="116" width="16" height="27" rx="3"/><rect x="239" y="116" width="16" height="27" rx="3"/></g>
    <g fill="#d66c3c" stroke="#74695e" stroke-width="1.4"><rect x="388" y="136" width="32" height="28" rx="4"/><rect x="424" y="136" width="32" height="28" rx="4"/></g>
    <rect x="135" y="220" width="175" height="78" rx="9" fill="#fffaf1" stroke="#d66c3c" stroke-width="1.5"/><rect x="330" y="220" width="175" height="78" rx="9" fill="#fffaf1" stroke="#74695e" stroke-width="1.5"/>
    <text x="222" y="243" text-anchor="middle" class="label">Branch A</text><text x="222" y="263" text-anchor="middle" class="small">4 blocks, work 4</text><text x="222" y="283" text-anchor="middle" class="small orange">Aarav's payment included</text>
    <text x="417" y="243" text-anchor="middle" class="label">Branch B</text><text x="417" y="263" text-anchor="middle" class="small">2 blocks, work 6</text><text x="417" y="283" text-anchor="middle" class="small">More accumulated work</text>
    ${person(70, 254, "Aarav", "#e87549", "#d9966d")}${person(570, 254, "Meera", "#538b8c", "#a96f54")}
  </svg>`,

  poolThreshold: `<svg class="case-svg" viewBox="0 0 640 260" role="img" aria-label="A hash-score number line shows the easier pool target and the harder Bitcoin network target">
    ${figureStyle}<rect width="640" height="260" rx="16" fill="#f6ead6"/><text x="320" y="27" text-anchor="middle" class="label">A lower hash score is better</text>
    <rect x="48" y="92" width="86" height="38" rx="8" fill="#dceee3"/><rect x="134" y="92" width="301" height="38" fill="#f4dfac"/><rect x="435" y="92" width="157" height="38" rx="8" fill="#f6dedb"/>
    <path d="M48 111h544" stroke="#3b332d" stroke-width="2"/><path d="M48 104v14m86-23v56m301-56v56m157-23v14" stroke="#3b332d" stroke-width="1.5"/>
    <circle cx="65" cy="111" r="6" fill="#43836a"/><circle cx="79" cy="111" r="5" fill="#43836a"/><circle cx="94" cy="111" r="5" fill="#43836a"/><circle cx="108" cy="111" r="5" fill="#43836a"/>
    <circle cx="168" cy="111" r="5" fill="#d66c3c"/><circle cx="206" cy="111" r="5" fill="#d66c3c"/><circle cx="250" cy="111" r="5" fill="#d66c3c"/><circle cx="292" cy="111" r="5" fill="#d66c3c"/><circle cx="344" cy="111" r="5" fill="#d66c3c"/><circle cx="391" cy="111" r="5" fill="#d66c3c"/>
    <text x="48" y="77" class="small">0</text><text x="134" y="77" text-anchor="middle" class="small">Network target</text><text x="435" y="77" text-anchor="middle" class="small">Pool target</text><text x="592" y="77" text-anchor="end" class="small">100</text>
    <text x="91" y="154" text-anchor="middle" class="small green label">Block candidate</text><text x="284" y="154" text-anchor="middle" class="small orange label">Pool share only</text><text x="513" y="154" text-anchor="middle" class="small red label">No share</text>
    <text x="320" y="192" text-anchor="middle" class="small">Every network-valid hash also meets the pool's easier target.</text>
    ${person(90, 205, "Aarav", "#e87549", "#d9966d")}${person(550, 205, "Meera", "#538b8c", "#a96f54")}
  </svg>`,

  nodeCourt: `<svg class="case-svg" viewBox="0 0 640 285" role="img" aria-label="Aarav brings the same block to five nodes; each node checks its own rules and rejects the overclaim despite high hash-power backing">
    ${figureStyle}<rect width="640" height="285" rx="16" fill="#f6ead6"/><text x="320" y="25" text-anchor="middle" class="label">One block. Five independent rule checks.</text>
    <rect x="16" y="82" width="130" height="85" rx="12" fill="#fffaf1" stroke="#74695e" stroke-width="1.5"/><text x="81" y="109" text-anchor="middle" class="label">Candidate block</text><text x="81" y="130" text-anchor="middle" class="small">90% hash power</text><text x="81" y="149" text-anchor="middle" class="small red">coinbase overclaim</text>
    <path d="M146 124h28m-7-6 7 6-7 6M174 55v138M174 55h21m-7-6 7 6-7 6M174 90h21m-7-6 7 6-7 6M174 125h21m-7-6 7 6-7 6M174 160h21m-7-6 7 6-7 6M174 193h21m-7-6 7 6-7 6" fill="none" stroke="#d66c3c" stroke-width="2"/>
    <g stroke="#74695e" stroke-width="1.3"><rect x="201" y="39" width="118" height="34" rx="8" fill="#fffaf1"/><rect x="201" y="74" width="118" height="34" rx="8" fill="#fffaf1"/><rect x="201" y="109" width="118" height="34" rx="8" fill="#fffaf1"/><rect x="201" y="144" width="118" height="34" rx="8" fill="#fffaf1"/><rect x="201" y="179" width="118" height="34" rx="8" fill="#fffaf1"/></g>
    <g text-anchor="middle"><text x="260" y="61">Node A</text><text x="260" y="96">Node B</text><text x="260" y="131">Node C</text><text x="260" y="166">Node D</text><text x="260" y="201">Meera's node</text></g>
    <g><rect x="352" y="39" width="115" height="34" rx="17" fill="#f6dedb"/><rect x="352" y="74" width="115" height="34" rx="17" fill="#f6dedb"/><rect x="352" y="109" width="115" height="34" rx="17" fill="#f6dedb"/><rect x="352" y="144" width="115" height="34" rx="17" fill="#f6dedb"/><rect x="352" y="179" width="115" height="34" rx="17" fill="#f6dedb"/></g>
    <g text-anchor="middle" class="red label"><text x="409" y="61">REJECT</text><text x="409" y="96">REJECT</text><text x="409" y="131">REJECT</text><text x="409" y="166">REJECT</text><text x="409" y="201">REJECT</text></g>
    <text x="537" y="91" text-anchor="middle" class="small">Extra hash power</text><text x="537" y="108" text-anchor="middle" class="small">does not change</text><text x="537" y="125" text-anchor="middle" class="small">the subsidy rule.</text>
    ${person(81, 230, "Aarav", "#e87549", "#d9966d")}
  </svg>`,

  softForkMap: `<svg class="case-svg" viewBox="0 0 640 280" role="img" aria-label="Nested rule sets show blocks valid under both old and new rules inside, blocks valid only under old rules in the surrounding ring, and invalid blocks outside">
    ${figureStyle}<rect width="640" height="280" rx="16" fill="#f6ead6"/><text x="320" y="26" text-anchor="middle" class="label">A soft fork narrows the valid-block set</text>
    <ellipse cx="278" cy="148" rx="228" ry="105" fill="#fffaf1" stroke="#74695e" stroke-width="2"/><text x="278" y="59" text-anchor="middle" class="label">Valid under old rules</text>
    <ellipse cx="255" cy="157" rx="126" ry="67" fill="#dceee3" stroke="#43836a" stroke-width="2"/><text x="255" y="111" text-anchor="middle" class="small green label">Valid under new rules too</text>
    <rect x="173" y="137" width="164" height="38" rx="8" fill="#fffaf1" stroke="#43836a"/><text x="255" y="161" text-anchor="middle" class="small">Block follows both</text>
    <rect x="372" y="123" width="112" height="48" rx="8" fill="#f4dfac" stroke="#c58c2e"/><text x="428" y="143" text-anchor="middle" class="small">Old-only</text><text x="428" y="159" text-anchor="middle" class="small">block</text>
    <rect x="500" y="102" width="116" height="55" rx="8" fill="#f6dedb" stroke="#b23d35"/><text x="558" y="125" text-anchor="middle" class="small red">Invalid under</text><text x="558" y="142" text-anchor="middle" class="small red">both rule sets</text>
    <text x="319" y="265" text-anchor="middle" class="small">Old nodes can follow the inner region, but cannot enforce its new boundary.</text>
    ${person(74, 218, "Aarav", "#e87549", "#d9966d")}${person(574, 218, "Meera", "#538b8c", "#a96f54")}
  </svg>`,

  forkTimeline: `<svg class="case-svg" viewBox="0 0 720 650" role="img" aria-label="Two timelines compare the temporary 2013 split that returned to one chain and the Bitcoin Cash split in 2017, where the same example block gets different verdicts under Bitcoin and Bitcoin Cash rules">
    ${figureStyle}<style>.case-svg .panel-title{font-size:18px;font-weight:700;letter-spacing:0;text-transform:none}.case-svg .detail{font-size:14px}.case-svg .verdict{font-size:13px;font-weight:700;letter-spacing:0;text-transform:none}</style>
    <rect x="8" y="8" width="704" height="270" rx="14" fill="#fffaf1" stroke="#d8cbb5"/><rect x="8" y="288" width="704" height="354" rx="14" fill="#fffaf1" stroke="#d8cbb5"/>

    <text x="30" y="40" class="panel-title">2013: temporary split, one chain restored</text>
    <text x="30" y="63" class="detail">Two software versions disagreed about block 225,430.</text>
    <text x="200" y="140" text-anchor="middle" class="label">Block 225,430</text><path d="M200 145v11" fill="none" stroke="#74695e" stroke-width="1.5"/>
    <path d="M30 164h170" fill="none" stroke="#74695e" stroke-width="4"/><g fill="#cbb89a" stroke="#74695e" stroke-width="1.5"><rect x="52" y="153" width="26" height="22" rx="3"/><rect x="94" y="153" width="26" height="22" rx="3"/><rect x="136" y="153" width="26" height="22" rx="3"/></g>
    <circle cx="200" cy="164" r="8" fill="#c85b31" stroke="#3b332d" stroke-width="1.5"/>
    <text x="310" y="91" class="detail">Version 0.8 accepts the block</text>
    <path d="M208 164C270 164 255 116 320 116h198" fill="none" stroke="#998f80" stroke-width="4" stroke-dasharray="9 7"/>
    <g fill="#fffaf1" stroke="#998f80" stroke-width="2" stroke-dasharray="5 4"><rect x="348" y="104" width="27" height="24" rx="3"/><rect x="394" y="104" width="27" height="24" rx="3"/><rect x="440" y="104" width="27" height="24" rx="3"/></g>
    <text x="535" y="121" class="verdict red">ABANDONED</text>
    <text x="310" y="196" class="detail green">Version 0.7 rejects it and keeps building</text>
    <path d="M208 164C270 164 255 218 320 218h338m-10-7 10 7-10 7" fill="none" stroke="#43836a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="#43836a"><rect x="352" y="206" width="28" height="24" rx="3"/><rect x="398" y="206" width="28" height="24" rx="3"/><rect x="444" y="206" width="28" height="24" rx="3"/><rect x="490" y="206" width="28" height="24" rx="3"/></g>
    <text x="30" y="258" class="detail">Large pools switched back to version 0.7, restoring one compatible chain.</text>

    <text x="30" y="323" class="panel-title">2017: Bitcoin and Bitcoin Cash keep separate histories</text>
    <text x="30" y="347" class="detail">One example 2 MB block. Two rule sets. Different verdicts.</text>
    <text x="30" y="397" class="detail">Last shared block</text><text x="30" y="418" class="detail">478,558</text><path d="M178 426l20 27" fill="none" stroke="#74695e" stroke-width="1.5"/>
    <path d="M30 463h174" fill="none" stroke="#74695e" stroke-width="4"/><g fill="#cbb89a" stroke="#74695e" stroke-width="1.5"><rect x="53" y="452" width="27" height="22" rx="3"/><rect x="98" y="452" width="27" height="22" rx="3"/><rect x="143" y="452" width="27" height="22" rx="3"/></g>
    <circle cx="204" cy="463" r="8" fill="#c85b31" stroke="#3b332d" stroke-width="1.5"/>
    <path d="M212 463C250 463 245 400 286 400M510 400h112m-9-7 9 7-9 7" fill="none" stroke="#43836a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M212 463C250 463 245 526 286 526M510 526h112m-9-7 9 7-9 7" fill="none" stroke="#d66c3c" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="286" y="372" width="224" height="56" rx="8" fill="#fffaf1" stroke="#43836a" stroke-width="1.5"/><text x="398" y="394" text-anchor="middle" class="label green">Bitcoin rules</text><text x="398" y="416" text-anchor="middle" class="verdict red">2 MB block: REJECTED</text>
    <rect x="286" y="498" width="224" height="56" rx="8" fill="#fffaf1" stroke="#d66c3c" stroke-width="1.5"/><text x="398" y="520" text-anchor="middle" class="label orange">Bitcoin Cash rules</text><text x="398" y="542" text-anchor="middle" class="verdict orange">Same block: ACCEPTED</text>
    ${person(670, 383, "Aarav", "#e87549", "#d9966d")}${person(670, 509, "Meera", "#538b8c", "#a96f54")}
    <text x="670" y="449" text-anchor="middle" class="small">Bitcoin node</text><text x="670" y="575" text-anchor="middle" class="small">Bitcoin Cash node</text>
    <rect x="118" y="578" width="484" height="42" rx="9" fill="#fffaf1" stroke="#74695e" stroke-width="1.3"/><text x="360" y="604" text-anchor="middle" class="detail">Meera: same candidate, different rules, different verdict.</text>
  </svg>`
};



