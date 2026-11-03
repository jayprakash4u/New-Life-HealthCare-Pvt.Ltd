import type { CareIconName } from './care-icon';

// Native SVG scenes stay sharp at every dropdown size and need no image requests.
export function CareIllustration({ kind }: { kind: CareIconName }) {
  return (
    <svg
      viewBox="0 0 320 240"
      className="h-auto w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="166" cy="118" r="95" className="fill-soft" />
      <path d="M35 210h250" className="stroke-line" strokeWidth="1.5" />
      <g
        className="stroke-muted"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {kind === 'digestive' && (
          <>
            <path
              d="M135 44v50c0 29 27 39 47 28 37-20 66 5 66 40 0 35-28 56-64 56-35 0-45-35-71-35-18 0-27 18-27 35M110 44v66c0 28 18 53 45 62"
              fill="#fff"
            />
            <path
              d="M183 145c17-9 35 0 35 18"
              className="stroke-action"
              strokeWidth="2"
            />
          </>
        )}
        {kind === 'consultation' && (
          <>
            <rect x="180" y="37" width="65" height="64" rx="3" fill="#fff" />
            <path d="M212 47v44m-22-22h44" stroke="#d8eee8" strokeWidth="8" />
            <path d="M171 156v-33c0-25 57-25 57 0v36" fill="#fff" />
            <circle cx="200" cy="91" r="19" fill="#fff" />
            <path
              d="M182 88c1-25 36-26 37 0-10-2-20-6-26-14-2 7-6 12-11 14Z"
              fill="#14776e"
            />
            <path d="m191 111 9 15 9-15m-9 15v31m-14-40v22c0 11 13 11 13 0v-19" />
            <circle cx="200" cy="139" r="3" fill="#d8eee8" />
            <path d="M66 188v-36c0-27 51-27 51 0v36" fill="#26998d" />
            <circle cx="91" cy="113" r="20" fill="#fff" />
            <path
              d="M72 107c0-23 37-26 39-1-14 0-21-9-24-12-4 8-9 11-15 13Z"
              fill="#14776e"
            />
            <path d="M115 158h126v12H115z" fill="#fff" />
            <path d="M132 170v40m94-40v40M63 188h56m-51 0v22m43-22v22" />
            <rect
              x="140"
              y="139"
              width="29"
              height="17"
              rx="2"
              fill="#eaf6f3"
            />
            <path d="M146 146h16m-16 5h10" />
          </>
        )}
        {kind === 'family' && (
          <>
            <path d="M72 207v-57c0-36 61-36 61 0v57" fill="#fff" />
            <circle cx="102" cy="102" r="23" fill="#fff" />
            <path
              d="M79 101c-6-38 52-36 47 0-13-2-27-11-30-18-3 10-10 15-17 18Z"
              fill="#14776e"
            />
            <path d="M185 207v-62c0-33 62-33 62 0v62" fill="#26998d" />
            <circle cx="216" cy="98" r="23" fill="#fff" />
            <path
              d="M192 95c-2-32 51-35 49 1-13-1-29-7-34-16-3 7-7 12-15 15Z"
              fill="#14776e"
            />
            <path d="M129 208v-35c0-27 55-27 55 0v35" fill="#fff" />
            <circle cx="156" cy="144" r="19" fill="#fff" />
            <path
              d="M137 141c-1-28 41-26 39 1-10-1-21-7-25-13-3 6-7 10-14 12Z"
              fill="#14776e"
            />
            <path d="m143 170 13 10 13-10M91 151v42m137-47v48" />
            <path
              d="M146 60c-19-12-9-27 2-19l8 7 8-7c12-8 22 7 3 19l-11 8-10-8Z"
              fill="#fff"
            />
          </>
        )}
        {kind === 'gynecology' && (
          <>
            <path d="M70 115V80c0-41 65-41 65 0v35" fill="#14776e" />
            <circle cx="102" cy="81" r="23" fill="#fff" />
            <path
              d="M78 76c1-31 50-31 49 1-15-2-28-12-33-21-3 10-8 16-16 20Z"
              fill="#14776e"
            />
            <path d="M57 207v-56c0-42 90-42 90 0v56" fill="#fff" />
            <path d="m89 115 13 20 14-20m-14 20v72M75 148v35l27 11m28-46v35l-26 11" />
            <rect x="164" y="67" width="99" height="133" rx="4" fill="#fff" />
            <rect x="190" y="57" width="47" height="18" rx="3" fill="#d8eee8" />
            <path
              d="M210 122c-8-20-30-21-30-5 0 11 14 13 20 3m19 2c8-20 30-21 30-5 0 11-14 13-20 3m-29 0c0 23 6 34 15 34s15-11 15-34m-15 34v23m-10-8h20"
              stroke="#c8758e"
            />
            <circle cx="72" cy="58" r="11" fill="#d8eee8" />
            <path d="M66 58h12m-6-6v12" />
          </>
        )}
        {kind === 'senior' && (
          <>
            <path d="M67 208v-52c0-40 83-40 83 0v52" fill="#fff" />
            <path d="m94 126 15 16 14-16m-14 16v66M84 164v22l39 8" />
            <circle cx="108" cy="96" r="27" fill="#fff" />
            <path
              d="M82 90c-2-35 55-36 53 0l-14-12-12 9-15-8-12 11Z"
              fill="#b5bfc5"
              stroke="#778393"
            />
            <rect x="86" y="94" width="18" height="11" rx="3" />
            <rect x="111" y="94" width="18" height="11" rx="3" />
            <path d="M104 98h7m-10 18c5 4 10 4 15 0" />
            <path d="M151 208v-44a9 9 0 0 1 18 0v44" />
            <rect x="185" y="67" width="77" height="125" rx="4" fill="#fff" />
            <rect x="203" y="58" width="41" height="17" rx="3" fill="#d8eee8" />
            <path d="M200 112h12l7-15 9 30 8-15h12m-48 35h46m-46 16h33" />
            <path
              d="M227 46c-11-8-5-18 2-13l6 5 5-5c8-5 14 5 2 13l-7 5-8-5Z"
              fill="#26998d"
            />
          </>
        )}
        {kind === 'heart' && (
          <>
            <rect x="58" y="54" width="200" height="128" rx="5" fill="#fff" />
            <rect x="70" y="66" width="176" height="97" rx="2" fill="#eaf6f3" />
            <path d="M81 120h37l14-29 18 54 18-69 18 44h47" strokeWidth="2" />
            <path d="M144 182v20m31-20v20m-47 7h63" />
            <path
              d="M188 65c-17-10-7-24 2-17l7 6 7-6c10-7 20 7 3 17l-10 7-9-7Z"
              fill="#26998d"
            />
            <rect x="48" y="164" width="37" height="45" rx="4" fill="#fff" />
            <path d="M54 157h25v10H54z" fill="#26998d" />
            <path d="M60 187h13m-6-6v12" />
            <circle cx="230" cy="188" r="19" fill="#d8eee8" />
            <path d="M230 175v13l8 4" />
          </>
        )}
        {kind === 'hearing' && (
          <>
            <path
              d="M108 106c0-64 103-68 103 0 0 41-40 44-40 75a25 25 0 0 1-50 0"
              fill="#fff"
            />
            <path d="M132 104c0-34 55-38 55 0 0 20-30 24-30 44m-17-39c12-14 29-4 19 10" />
            <path d="M230 81c16 18 16 40 0 58m17-74c27 28 27 61 0 90" />
            <circle cx="91" cy="181" r="20" fill="#26998d" />
            <path d="M81 181h20m-10-10v20" stroke="#fff" />
            <path d="M66 89h18m-9-9v18" stroke="#b2d9cf" />
            <circle cx="213" cy="47" r="5" fill="#fff" />
          </>
        )}
        {kind === 'screening' && (
          <>
            <rect x="175" y="46" width="104" height="73" rx="4" fill="#fff" />
            <rect x="183" y="54" width="88" height="55" rx="2" fill="#eaf6f3" />
            <path
              d="M195 99c10-29 37-33 63-8m-60 1c12-19 34-22 54-8m-24 35v15m-17 0h35"
              stroke="#778393"
            />
            <path d="M77 115V80c0-42 64-43 64 0v35" fill="#14776e" />
            <circle cx="109" cy="80" r="23" fill="#fff" />
            <path
              d="M85 75c2-31 49-32 49 2-15-2-29-12-33-21-3 9-9 15-16 19Z"
              fill="#14776e"
            />
            <path d="M62 207v-57c0-43 94-43 94 0v57" fill="#f8e8ee" />
            <path d="m94 113 15 19 15-19M79 151v29l29 12m32-41v29l-31 12" />
            <path
              d="M202 195 235 140c17-28 9-42-7-42s-24 14-7 42l33 55"
              stroke="#c8758e"
              strokeWidth="12"
              strokeLinecap="butt"
            />
            <path
              d="m208 185 20-34m-7-12 27 46"
              stroke="#a95472"
              strokeWidth="1.2"
            />
          </>
        )}
        {kind === 'ultrasound' && (
          <>
            <rect x="64" y="42" width="164" height="114" rx="3" fill="#fff" />
            <rect x="75" y="53" width="142" height="90" rx="2" fill="#eaf6f3" />
            <path
              d="M98 122c20-58 65-58 96 0m-76 0c13-33 40-33 57 0m-42-43 11 43 17-43"
              className="stroke-action"
            />
            <path d="M137 156v25m25-25v25M106 181h87m-44 0v28m-41 0h83M228 93h17c31 0 31 83 8 83" />
            <rect x="244" y="166" width="22" height="43" rx="4" fill="#fff" />
            <path d="M249 181h12" className="stroke-action" />
          </>
        )}
        {kind === 'lab' && (
          <>
            <rect x="154" y="51" width="116" height="96" rx="4" fill="#fff" />
            <rect x="164" y="61" width="96" height="72" rx="2" fill="#eaf6f3" />
            <path
              d="M177 116c14-41 43-38 68-7m-67-1c13-26 38-29 63-7m-34 46v16m-19 0h38"
              stroke="#778393"
            />
            <path
              d="M83 65h43m-33 0v60l-37 63c-7 12 0 21 12 21h72c12 0 19-9 12-21l-37-63V65"
              fill="#fff"
            />
            <path
              d="M73 166h63l18 31c2 7-5 12-14 12H68c-11 0-17-7-12-16l17-27Z"
              fill="#26998d"
            />
            <circle cx="92" cy="183" r="4" fill="#fff" />
            <circle cx="116" cy="193" r="3" fill="#fff" />
            <rect x="203" y="178" width="37" height="31" rx="3" fill="#fff" />
            <path d="M208 172h27v7h-27z" fill="#d8eee8" />
            <path d="M215 193h13m-7-6v12" />
          </>
        )}
        {kind === 'pharmacy' && (
          <>
            <rect x="75" y="81" width="87" height="128" rx="8" fill="#fff" />
            <rect x="83" y="63" width="71" height="25" rx="3" fill="#26998d" />
            <rect x="75" y="120" width="87" height="55" fill="#d8eee8" />
            <path d="M104 148h30m-15-15v30M92 187h50" />
            <g transform="rotate(32 213 138)">
              <rect
                x="190"
                y="77"
                width="46"
                height="122"
                rx="23"
                fill="#fff"
              />
              <path d="M190 138h46v38a23 23 0 0 1-46 0v-38Z" fill="#26998d" />
              <path d="M202 93v29" />
            </g>
            <path d="M213 46h24m-12-12v24" stroke="#b2d9cf" />
          </>
        )}
        {kind === 'vaccination' && (
          <>
            <rect x="73" y="105" width="65" height="104" rx="7" fill="#fff" />
            <rect x="80" y="91" width="51" height="19" rx="3" fill="#26998d" />
            <path d="M74 139h63v44H74z" fill="#d8eee8" />
            <path d="M95 160h22m-11-11v22" />
            <g transform="rotate(35 212 119)">
              <path d="M196 58h32v103h-32z" fill="#fff" />
              <path d="M196 116h32v45h-32z" fill="#26998d" />
              <path d="M189 58h46m-23 103v39m-7-158h14v16m-21-20h28m-23 43h14m-14 16h14" />
            </g>
            <circle cx="257" cy="189" r="17" fill="#fff" />
            <path d="m249 189 6 6 10-13" />
          </>
        )}
      </g>
    </svg>
  );
}
