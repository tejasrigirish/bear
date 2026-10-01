const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'assets', 'stickers');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const stickers = {
  // 1. Teddy Bear Sticker
  'teddy-bear.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <defs>
    <filter id="sticker-shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="1" dy="3" stdDeviation="2.5" flood-color="#2c1a10" flood-opacity="0.25"/>
    </filter>
  </defs>
  <g filter="url(#sticker-shadow)">
    <!-- Die-cut white border outline -->
    <path d="M60 14 C48 14 36 22 34 32 C26 31 16 38 18 49 C19 56 25 61 31 63 C29 68 28 74 29 80 C23 83 18 90 20 98 C22 106 31 109 38 107 C44 112 52 114 60 114 C68 114 76 112 82 107 C89 109 98 106 100 98 C102 90 97 83 91 80 C92 74 91 68 89 63 C95 61 101 56 102 49 C104 38 94 31 86 32 C84 22 72 14 60 14 Z" fill="#ffffff" stroke="#f4ede2" stroke-width="4" stroke-linejoin="round"/>
    <!-- Outer Ears -->
    <circle cx="36" cy="38" r="14" fill="#a0724f"/>
    <circle cx="84" cy="38" r="14" fill="#a0724f"/>
    <!-- Inner Ears -->
    <circle cx="36" cy="38" r="8" fill="#e8cbb0"/>
    <circle cx="84" cy="38" r="8" fill="#e8cbb0"/>
    <!-- Bear Head -->
    <ellipse cx="60" cy="55" rx="30" ry="26" fill="#b0835f"/>
    <!-- Snout Area -->
    <ellipse cx="60" cy="62" rx="16" ry="12" fill="#f4dfce"/>
    <!-- Nose & Smile -->
    <ellipse cx="60" cy="57" rx="5" ry="3.5" fill="#3b2314"/>
    <path d="M56 64 Q60 67 64 64" stroke="#3b2314" stroke-width="2" stroke-linecap="round" fill="none"/>
    <line x1="60" y1="60.5" x2="60" y2="64" stroke="#3b2314" stroke-width="1.8"/>
    <!-- Eyes with cute sparkles -->
    <circle cx="48" cy="50" r="3.5" fill="#29160a"/>
    <circle cx="72" cy="50" r="3.5" fill="#29160a"/>
    <circle cx="49" cy="49" r="1.2" fill="#ffffff"/>
    <circle cx="73" cy="49" r="1.2" fill="#ffffff"/>
    <!-- Blushing Pink Cheeks -->
    <ellipse cx="42" cy="58" rx="5" ry="2.8" fill="#e8988a" opacity="0.75"/>
    <ellipse cx="78" cy="58" rx="5" ry="2.8" fill="#e8988a" opacity="0.75"/>
    <!-- Bear Body -->
    <ellipse cx="60" cy="88" rx="26" ry="22" fill="#a0724f"/>
    <!-- Belly Patch with tiny stitches -->
    <ellipse cx="60" cy="89" rx="16" ry="14" fill="#e8cbb0"/>
    <ellipse cx="60" cy="89" rx="16" ry="14" fill="none" stroke="#8d5f3d" stroke-width="1" stroke-dasharray="2 2"/>
    <!-- Little Paws / Hands holding a red heart -->
    <circle cx="38" cy="82" r="7" fill="#b0835f"/>
    <circle cx="82" cy="82" r="7" fill="#b0835f"/>
    <!-- Small Red Heart held -->
    <path d="M60 82 Q56 75 51 79 Q46 84 60 96 Q74 84 69 79 Q64 75 60 82 Z" fill="#c64738"/>
    <path d="M55 79 Q53 82 56 86" stroke="#ffffff" stroke-width="1" stroke-linecap="round" opacity="0.6" fill="none"/>
    <!-- Little Feet -->
    <ellipse cx="42" cy="102" rx="10" ry="7" fill="#b0835f"/>
    <ellipse cx="78" cy="102" rx="10" ry="7" fill="#b0835f"/>
    <circle cx="42" cy="102" r="4" fill="#e8cbb0"/>
    <circle cx="78" cy="102" r="4" fill="#e8cbb0"/>
  </g>
</svg>`,

  // 2. Favorite Person Sticker
  'favorite-person.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 54" width="100%" height="100%">
  <defs>
    <filter id="fp-shadow" x="-10%" y="-15%" width="125%" height="140%">
      <feDropShadow dx="1" dy="2.5" stdDeviation="2" flood-color="#2c1a10" flood-opacity="0.22"/>
    </filter>
  </defs>
  <g filter="url(#fp-shadow)">
    <!-- Die cut white border -->
    <rect x="2" y="2" width="166" height="50" rx="12" fill="#ffffff" stroke="#f4ede2" stroke-width="3"/>
    <!-- Kraft/Beige Washi Label Inner -->
    <rect x="6" y="6" width="158" height="42" rx="9" fill="#ecdcc7"/>
    <!-- Stitched Dashed Border -->
    <rect x="9" y="9" width="152" height="36" rx="7" fill="none" stroke="#b08d6d" stroke-width="1.2" stroke-dasharray="3 2"/>
    <!-- Tiny Red Heart Badge -->
    <path d="M25 24 Q22 20 18 23 Q14 27 25 36 Q36 27 32 23 Q28 20 25 24 Z" fill="#b84537"/>
    <!-- Text: Favorite person -->
    <text x="36" y="32" font-family="'Playfair Display', Georgia, serif" font-weight="700" font-size="15.5" fill="#3d271d" letter-spacing="0.8">favorite person</text>
    <!-- Tiny Sparkles -->
    <path d="M152 18 L153.5 21.5 L157 23 L153.5 24.5 L152 28 L150.5 24.5 L147 23 L150.5 21.5 Z" fill="#d99c43"/>
    <circle cx="152" cy="34" r="1.5" fill="#b08d6d"/>
  </g>
</svg>`,

  // 3. You're Mine Sticker
  'youre-mine.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 46" width="100%" height="100%">
  <defs>
    <filter id="ym-shadow" x="-10%" y="-15%" width="125%" height="140%">
      <feDropShadow dx="1" dy="2.5" stdDeviation="2" flood-color="#2c1a10" flood-opacity="0.22"/>
    </filter>
  </defs>
  <g filter="url(#ym-shadow)">
    <!-- White Die-Cut Base with slight tilt feel -->
    <rect x="3" y="3" width="134" height="40" rx="8" fill="#ffffff" stroke="#f6eee4" stroke-width="3"/>
    <!-- Soft Dusty Rose/Blush Washi Tape -->
    <rect x="6" y="6" width="128" height="34" rx="6" fill="#f0dbd4"/>
    <!-- Torn tape jagged ends simulation -->
    <line x1="6" y1="6" x2="6" y2="40" stroke="#dab9af" stroke-width="1.5" stroke-dasharray="2 2"/>
    <line x1="134" y1="6" x2="134" y2="40" stroke="#dab9af" stroke-width="1.5" stroke-dasharray="2 2"/>
    <!-- Script Text -->
    <text x="70" y="28" font-family="'Caveat', cursive" font-weight="700" font-size="20" fill="#663529" text-anchor="middle" letter-spacing="0.5">you’re mine ♡</text>
  </g>
</svg>`,

  // 4. I Love You Sticker
  'i-love-you.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 56" width="100%" height="100%">
  <defs>
    <filter id="ily-shadow" x="-10%" y="-15%" width="125%" height="140%">
      <feDropShadow dx="1" dy="2.5" stdDeviation="2" flood-color="#2c1a10" flood-opacity="0.24"/>
    </filter>
  </defs>
  <g filter="url(#ily-shadow)">
    <!-- White die cut cloud bubble -->
    <path d="M20 10 C10 10 4 18 4 28 C4 38 12 46 22 46 L128 46 C138 46 146 38 146 28 C146 18 138 10 128 10 Z" fill="#ffffff" stroke="#f3ebe0" stroke-width="4" stroke-linejoin="round"/>
    <!-- Inner soft cream background -->
    <path d="M22 13 C14 13 8 20 8 28 C8 36 14 43 22 43 L128 43 C136 43 142 36 142 28 C142 20 136 13 128 13 Z" fill="#fbf7f1"/>
    <!-- Deep burgundy / wine cursive script -->
    <text x="70" y="34" font-family="'Caveat', cursive" font-weight="700" font-size="25" fill="#8c2e23" text-anchor="middle">i love you</text>
    <!-- Tiny hearts accents -->
    <path d="M124 23 Q121 20 118 22 Q115 25 124 32 Q133 25 130 22 Q127 20 124 23 Z" fill="#c64738"/>
    <path d="M18 25 Q16 23 14 24.5 Q12 27 18 32 Q24 27 22 24.5 Q20 23 18 25 Z" fill="#e08479"/>
  </g>
</svg>`,

  // 5. My Love Stamp Sticker
  'my-love.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 76" width="100%" height="100%">
  <defs>
    <filter id="ml-shadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#2c1a10" flood-opacity="0.22"/>
    </filter>
  </defs>
  <g filter="url(#ml-shadow)">
    <!-- White border -->
    <circle cx="38" cy="38" r="36" fill="#ffffff" stroke="#f2eae0" stroke-width="3"/>
    <!-- Vintage scalloped postal round badge -->
    <circle cx="38" cy="38" r="32" fill="#ecdac5"/>
    <circle cx="38" cy="38" r="28" fill="none" stroke="#875838" stroke-width="1.2" stroke-dasharray="3 2"/>
    <!-- Center text -->
    <text x="38" y="34" font-family="'Cormorant Garamond', Georgia, serif" font-style="italic" font-weight="600" font-size="13" fill="#4d301f" text-anchor="middle">my</text>
    <text x="38" y="48" font-family="'Playfair Display', Georgia, serif" font-weight="700" font-size="15" fill="#3b2012" text-anchor="middle" letter-spacing="1">LOVE</text>
    <!-- Heart below -->
    <path d="M38 52 Q36 50 34 51.5 Q32 53.5 38 58 Q44 53.5 42 51.5 Q40 50 38 52 Z" fill="#a83b2e"/>
  </g>
</svg>`,

  // 6. Red Satin Bow Sticker
  'red-bow.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80" width="100%" height="100%">
  <defs>
    <filter id="bow-shadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="1" dy="3" stdDeviation="2.5" flood-color="#2c1a10" flood-opacity="0.28"/>
    </filter>
  </defs>
  <g filter="url(#bow-shadow)">
    <!-- Die cut white border -->
    <path d="M50 32 C40 18 12 18 10 32 C8 45 35 48 45 42 L28 72 L38 72 L50 48 L62 72 L72 72 L55 42 C65 48 92 45 90 32 C88 18 60 18 50 32 Z" fill="#ffffff" stroke="#f6eee4" stroke-width="4" stroke-linejoin="round"/>
    <!-- Left Ribbon Loop -->
    <path d="M48 35 C38 22 16 22 14 34 C12 45 38 46 48 40 Z" fill="#ad2e24"/>
    <path d="M46 36 C38 26 22 26 20 34 C19 41 38 42 46 38 Z" fill="#c93e32"/>
    <path d="M42 34 Q28 32 30 36" stroke="#e87368" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <!-- Right Ribbon Loop -->
    <path d="M52 35 C62 22 84 22 86 34 C88 45 62 46 52 40 Z" fill="#ad2e24"/>
    <path d="M54 36 C62 26 78 26 80 34 C81 41 62 42 54 38 Z" fill="#c93e32"/>
    <path d="M58 34 Q72 32 70 36" stroke="#e87368" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <!-- Ribbon Tails -->
    <path d="M46 42 L30 70 L38 69 L48 48 Z" fill="#8c1f17"/>
    <path d="M46 42 L33 68 L39 67 L48 47 Z" fill="#ad2e24"/>
    <path d="M54 42 L70 70 L62 69 L52 48 Z" fill="#8c1f17"/>
    <path d="M54 42 L67 68 L61 67 L52 47 Z" fill="#ad2e24"/>
    <!-- Central Knot -->
    <ellipse cx="50" cy="38" rx="7" ry="6.5" fill="#801912"/>
    <ellipse cx="50" cy="38" rx="5.5" ry="5" fill="#c93e32"/>
    <circle cx="48" cy="36" r="1.5" fill="#e87368"/>
  </g>
</svg>`,

  // 7. Pink Bow Sticker
  'pink-bow.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80" width="100%" height="100%">
  <defs>
    <filter id="pbow-shadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="1" dy="3" stdDeviation="2.5" flood-color="#2c1a10" flood-opacity="0.22"/>
    </filter>
  </defs>
  <g filter="url(#pbow-shadow)">
    <!-- Die cut white border -->
    <path d="M50 32 C40 18 12 18 10 32 C8 45 35 48 45 42 L28 72 L38 72 L50 48 L62 72 L72 72 L55 42 C65 48 92 45 90 32 C88 18 60 18 50 32 Z" fill="#ffffff" stroke="#fbf5ee" stroke-width="4" stroke-linejoin="round"/>
    <!-- Left Loop -->
    <path d="M48 35 C38 22 16 22 14 34 C12 45 38 46 48 40 Z" fill="#c97e79"/>
    <path d="M46 36 C38 26 22 26 20 34 C19 41 38 42 46 38 Z" fill="#dba09b"/>
    <!-- Right Loop -->
    <path d="M52 35 C62 22 84 22 86 34 C88 45 62 46 52 40 Z" fill="#c97e79"/>
    <path d="M54 36 C62 26 78 26 80 34 C81 41 62 42 54 38 Z" fill="#dba09b"/>
    <!-- Ribbon Tails -->
    <path d="M46 42 L30 70 L38 69 L48 48 Z" fill="#a8625d"/>
    <path d="M46 42 L33 68 L39 67 L48 47 Z" fill="#c97e79"/>
    <path d="M54 42 L70 70 L62 69 L52 48 Z" fill="#a8625d"/>
    <path d="M54 42 L67 68 L61 67 L52 47 Z" fill="#c97e79"/>
    <!-- Knot -->
    <ellipse cx="50" cy="38" rx="6.5" ry="6" fill="#a8625d"/>
    <ellipse cx="50" cy="38" rx="5" ry="4.5" fill="#dba09b"/>
    <circle cx="48" cy="36" r="1.3" fill="#f7d4d0"/>
  </g>
</svg>`,

  // 8. Vintage Camera Sticker
  'vintage-camera.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 90" width="100%" height="100%">
  <defs>
    <filter id="cam-shadow" x="-10%" y="-10%" width="125%" height="130%">
      <feDropShadow dx="1" dy="3" stdDeviation="2.5" flood-color="#2c1a10" flood-opacity="0.25"/>
    </filter>
  </defs>
  <g filter="url(#cam-shadow)">
    <!-- White border -->
    <rect x="5" y="15" width="100" height="70" rx="14" fill="#ffffff" stroke="#f4ece2" stroke-width="4"/>
    <!-- Flash bump outline -->
    <path d="M35 16 L42 9 L68 9 L75 16 Z" fill="#ffffff" stroke="#f4ece2" stroke-width="3"/>
    <!-- Top metal plate -->
    <path d="M9 28 L9 24 C9 18 14 15 20 15 L90 15 C96 15 101 18 101 24 L101 28 Z" fill="#d8c5b0"/>
    <rect x="44" y="11" width="22" height="7" rx="2" fill="#c4ad95"/>
    <!-- Shutter button -->
    <rect x="22" y="10" width="10" height="5" rx="2" fill="#994d3d"/>
    <!-- Camera body (Caramel Leatherette) -->
    <rect x="9" y="28" width="92" height="52" rx="4" fill="#a66e44"/>
    <rect x="9" y="44" width="92" height="2" fill="#8f5730"/>
    <!-- Big Vintage Lens -->
    <circle cx="55" cy="54" r="23" fill="#2d1d14"/>
    <circle cx="55" cy="54" r="19" fill="#52392b"/>
    <circle cx="55" cy="54" r="15" fill="#1f140e"/>
    <circle cx="55" cy="54" r="10" fill="#364954"/>
    <!-- Lens reflection -->
    <path d="M47 48 Q55 42 61 46" stroke="#90b4c7" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <circle cx="61" cy="60" r="2" fill="#ffffff" opacity="0.6"/>
    <!-- Viewfinder -->
    <rect x="80" y="20" width="10" height="7" rx="2" fill="#2d1d14"/>
    <rect x="82" y="22" width="6" height="3" fill="#8aa2a8"/>
    <!-- Tiny heart engraved on camera -->
    <path d="M24 60 Q22 57 19 59 Q16 62 24 69 Q32 62 29 59 Q26 57 24 60 Z" fill="#f7dfd7"/>
  </g>
</svg>`,

  // 9. Cute Sleeping Cat Sticker
  'cute-cat.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 90" width="100%" height="100%">
  <defs>
    <filter id="cat-shadow" x="-10%" y="-10%" width="125%" height="130%">
      <feDropShadow dx="1" dy="3" stdDeviation="2.5" flood-color="#2c1a10" flood-opacity="0.22"/>
    </filter>
  </defs>
  <g filter="url(#cat-shadow)">
    <!-- White die cut border -->
    <ellipse cx="55" cy="52" rx="48" ry="34" fill="#ffffff" stroke="#f6eee4" stroke-width="4"/>
    <!-- Cat body curled up -->
    <ellipse cx="55" cy="54" rx="42" ry="28" fill="#e8cfba"/>
    <!-- Tail wrapped around -->
    <path d="M16 56 C14 38 32 30 46 32" stroke="#d4b49a" stroke-width="8" stroke-linecap="round" fill="none"/>
    <!-- Cat Head -->
    <circle cx="74" cy="46" r="20" fill="#edd6c4"/>
    <!-- Ears -->
    <polygon points="64,30 70,18 78,28" fill="#d4b49a"/>
    <polygon points="67,28 71,21 76,27" fill="#f2a89f"/>
    <polygon points="80,28 88,18 94,30" fill="#d4b49a"/>
    <polygon points="82,27 87,21 91,28" fill="#f2a89f"/>
    <!-- Sleeping Eyes (curved lines) -->
    <path d="M68 45 Q72 49 76 45" stroke="#4a3020" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    <path d="M82 45 Q86 49 90 45" stroke="#4a3020" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    <!-- Nose & Mouth -->
    <polygon points="78,49 80,49 79,51" fill="#e8988a"/>
    <path d="M76 52 Q79 54 82 52" stroke="#4a3020" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <!-- Rosy Cheeks -->
    <ellipse cx="68" cy="49" rx="3.5" ry="2" fill="#f09d92" opacity="0.7"/>
    <ellipse cx="90" cy="49" rx="3.5" ry="2" fill="#f09d92" opacity="0.7"/>
    <!-- Whiskers -->
    <line x1="60" y1="48" x2="52" y2="46" stroke="#a68469" stroke-width="1.2"/>
    <line x1="60" y1="51" x2="53" y2="52" stroke="#a68469" stroke-width="1.2"/>
    <line x1="96" y1="48" x2="104" y2="46" stroke="#a68469" stroke-width="1.2"/>
    <line x1="96" y1="51" x2="103" y2="52" stroke="#a68469" stroke-width="1.2"/>
    <!-- Little paws tucked -->
    <ellipse cx="64" cy="66" rx="6" ry="4.5" fill="#f7ebe1"/>
    <ellipse cx="76" cy="66" rx="6" ry="4.5" fill="#f7ebe1"/>
  </g>
</svg>`,

  // 10. Vintage Butterflies Sticker
  'butterflies.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 80" width="100%" height="100%">
  <defs>
    <filter id="bf-shadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="1" dy="2.5" stdDeviation="2" flood-color="#2c1a10" flood-opacity="0.22"/>
    </filter>
  </defs>
  <g filter="url(#bf-shadow)">
    <!-- Die cut white border -->
    <path d="M45 40 C35 15 10 15 8 35 C6 50 30 52 42 46 C34 56 22 72 36 74 C46 76 45 55 45 48 C45 55 44 76 54 74 C68 72 56 56 48 46 C60 52 84 50 82 35 C80 15 55 15 45 40 Z" fill="#ffffff" stroke="#f6ede2" stroke-width="4" stroke-linejoin="round"/>
    <!-- Wings Top Left -->
    <path d="M44 38 C36 18 14 18 12 34 C10 46 32 48 43 43 Z" fill="#d9825b"/>
    <path d="M40 36 C34 22 18 22 16 32 C15 40 32 42 40 38 Z" fill="#eec49f"/>
    <circle cx="26" cy="30" r="3" fill="#8f4327"/>
    <!-- Wings Bottom Left -->
    <path d="M42 45 C34 52 24 66 35 68 C43 70 43 54 43 46 Z" fill="#be6744"/>
    <!-- Wings Top Right -->
    <path d="M46 38 C54 18 76 18 78 34 C80 46 58 48 47 43 Z" fill="#d9825b"/>
    <path d="M50 36 C56 22 72 22 74 32 C75 40 58 42 50 38 Z" fill="#eec49f"/>
    <circle cx="64" cy="30" r="3" fill="#8f4327"/>
    <!-- Wings Bottom Right -->
    <path d="M48 45 C56 52 66 66 55 68 C47 70 47 54 47 46 Z" fill="#be6744"/>
    <!-- Body & Antennae -->
    <ellipse cx="45" cy="45" rx="3.5" ry="14" fill="#3b2214"/>
    <path d="M44 32 Q38 20 32 18" stroke="#3b2214" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <path d="M46 32 Q52 20 58 18" stroke="#3b2214" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <circle cx="32" cy="18" r="1.5" fill="#3b2214"/>
    <circle cx="58" cy="18" r="1.5" fill="#3b2214"/>
  </g>
</svg>`,

  // 11. Pressed Dried Flowers Sticker
  'pressed-flowers.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 110" width="100%" height="100%">
  <defs>
    <filter id="fl-shadow" x="-15%" y="-10%" width="130%" height="125%">
      <feDropShadow dx="1" dy="2.5" stdDeviation="2" flood-color="#2c1a10" flood-opacity="0.22"/>
    </filter>
  </defs>
  <g filter="url(#fl-shadow)">
    <!-- White die cut border -->
    <path d="M40 8 C30 8 20 18 20 30 C20 40 32 46 36 60 L36 98 C36 102 44 102 44 98 L44 60 C48 46 60 40 60 30 C60 18 50 8 40 8 Z" fill="#ffffff" stroke="#f6efe6" stroke-width="4" stroke-linejoin="round"/>
    <!-- Stem -->
    <path d="M40 35 Q38 65 41 100" stroke="#687854" stroke-width="2.8" stroke-linecap="round" fill="none"/>
    <!-- Green Leaves -->
    <path d="M39 60 Q26 55 28 48 Q36 50 39 58 Z" fill="#7a8c63"/>
    <path d="M41 72 Q54 67 52 60 Q44 62 41 70 Z" fill="#7a8c63"/>
    <!-- Flower Petals (Dried Daisy / Chamomile) -->
    <ellipse cx="40" cy="16" rx="4" ry="11" fill="#fcedd9"/>
    <ellipse cx="40" cy="44" rx="4" ry="11" fill="#fcedd9"/>
    <ellipse cx="26" cy="30" rx="11" ry="4" fill="#fcedd9"/>
    <ellipse cx="54" cy="30" rx="11" ry="4" fill="#fcedd9"/>
    <ellipse cx="30" cy="20" rx="9" ry="4" transform="rotate(45 30 20)" fill="#fae5cc"/>
    <ellipse cx="50" cy="20" rx="9" ry="4" transform="rotate(-45 50 20)" fill="#fae5cc"/>
    <ellipse cx="30" cy="40" rx="9" ry="4" transform="rotate(-45 30 40)" fill="#fae5cc"/>
    <ellipse cx="50" cy="40" rx="9" ry="4" transform="rotate(45 50 40)" fill="#fae5cc"/>
    <!-- Flower Center Disc -->
    <circle cx="40" cy="30" r="7" fill="#c7913e"/>
    <circle cx="40" cy="30" r="5" fill="#a47225"/>
    <!-- Translucent Washi tape holding stem -->
    <rect x="25" y="78" width="30" height="12" rx="1" fill="#d9c3a3" opacity="0.85"/>
  </g>
</svg>`,

  // 12. Vintage Envelope with Wax Seal
  'vintage-envelope.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80" width="100%" height="100%">
  <defs>
    <filter id="env-shadow" x="-10%" y="-10%" width="125%" height="130%">
      <feDropShadow dx="1" dy="3" stdDeviation="2.5" flood-color="#2c1a10" flood-opacity="0.25"/>
    </filter>
  </defs>
  <g filter="url(#env-shadow)">
    <!-- White die cut border -->
    <rect x="5" y="10" width="90" height="60" rx="7" fill="#ffffff" stroke="#f4ebe0" stroke-width="4"/>
    <!-- Kraft Envelope Base -->
    <rect x="8" y="13" width="84" height="54" rx="5" fill="#dfcbb5"/>
    <!-- Envelope folds -->
    <path d="M8 13 L50 44 L92 13" fill="#ead8c4" stroke="#cbb299" stroke-width="1.2"/>
    <path d="M8 67 L42 38" stroke="#cbb299" stroke-width="1.2"/>
    <path d="M92 67 L58 38" stroke="#cbb299" stroke-width="1.2"/>
    <!-- Mini postal cancellation stamp -->
    <circle cx="78" cy="26" r="8" fill="none" stroke="#96775d" stroke-width="1" stroke-dasharray="2 1.5"/>
    <text x="78" y="28.5" font-family="'Nunito', sans-serif" font-size="5.5" font-weight="700" fill="#96775d" text-anchor="middle">AIR MAIL</text>
    <!-- Red Wax Seal in Center -->
    <circle cx="50" cy="42" r="10" fill="#a62c20"/>
    <circle cx="50" cy="42" r="7.5" fill="#c73c2e"/>
    <!-- Heart embossed in seal -->
    <path d="M50 39 Q48 37 46 38.5 Q44 40.5 50 45 Q56 40.5 54 38.5 Q52 37 50 39 Z" fill="#751c14"/>
  </g>
</svg>`,

  // 13. Red Paper Heart Sticker
  'red-heart.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 65" width="100%" height="100%">
  <defs>
    <filter id="rh-shadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="1" dy="2.5" stdDeviation="2" flood-color="#2c1a10" flood-opacity="0.25"/>
    </filter>
  </defs>
  <g filter="url(#rh-shadow)">
    <!-- White die cut border -->
    <path d="M35 16 Q30 6 18 10 Q6 17 6 30 Q6 43 35 60 Q64 43 64 30 Q64 17 52 10 Q40 6 35 16 Z" fill="#ffffff" stroke="#f6eee4" stroke-width="3.5" stroke-linejoin="round"/>
    <!-- Crimson paper heart -->
    <path d="M35 18 Q31 9 20 12 Q9 18 9 30 Q9 41 35 56 Q61 41 61 30 Q61 18 50 12 Q39 9 35 18 Z" fill="#ba3325"/>
    <!-- Inner stitched detail -->
    <path d="M35 22 Q31 15 22 17 Q14 22 14 30 Q14 38 35 50 Q56 38 56 30 Q56 22 48 17 Q39 15 35 22 Z" fill="none" stroke="#e07267" stroke-width="1.2" stroke-dasharray="2 2"/>
    <!-- Highlight shine -->
    <path d="M16 22 Q14 27 15 32" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" fill="none" opacity="0.65"/>
  </g>
</svg>`,

  // 14. Pink Paper Heart Sticker
  'pink-heart.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 65" width="100%" height="100%">
  <defs>
    <filter id="ph-shadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="1" dy="2.5" stdDeviation="2" flood-color="#2c1a10" flood-opacity="0.2"/>
    </filter>
  </defs>
  <g filter="url(#ph-shadow)">
    <!-- White die cut border -->
    <path d="M35 16 Q30 6 18 10 Q6 17 6 30 Q6 43 35 60 Q64 43 64 30 Q64 17 52 10 Q40 6 35 16 Z" fill="#ffffff" stroke="#fbf5ee" stroke-width="3.5" stroke-linejoin="round"/>
    <!-- Pastel dusty pink heart -->
    <path d="M35 18 Q31 9 20 12 Q9 18 9 30 Q9 41 35 56 Q61 41 61 30 Q61 18 50 12 Q39 9 35 18 Z" fill="#e29b93"/>
    <!-- Stitched detail -->
    <path d="M35 22 Q31 15 22 17 Q14 22 14 30 Q14 38 35 50 Q56 38 56 30 Q56 22 48 17 Q39 15 35 22 Z" fill="none" stroke="#f7d4cf" stroke-width="1.2" stroke-dasharray="2 2"/>
  </g>
</svg>`,

  // 15. Watercolor Kiss Lips Sticker
  'kiss-lips.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 60" width="100%" height="100%">
  <defs>
    <filter id="lip-shadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#2c1a10" flood-opacity="0.22"/>
    </filter>
  </defs>
  <g filter="url(#lip-shadow)">
    <!-- White border -->
    <path d="M10 30 C20 12 36 20 45 24 C54 20 70 12 80 30 C72 48 55 52 45 52 C35 52 18 48 10 30 Z" fill="#ffffff" stroke="#fbf2ea" stroke-width="3.5" stroke-linejoin="round"/>
    <!-- Top Lip -->
    <path d="M14 29 C24 16 38 22 45 26 C52 22 66 16 76 29 C68 33 54 30 45 32 C36 30 22 33 14 29 Z" fill="#c43e37"/>
    <!-- Bottom Lip -->
    <path d="M18 33 C30 35 40 35 45 35 C50 35 60 35 72 33 C68 47 54 48 45 48 C36 48 22 47 18 33 Z" fill="#b3332d"/>
    <ellipse cx="45" cy="41" rx="14" ry="4" fill="#d95d55" opacity="0.6"/>
  </g>
</svg>`,

  // 16. Paper Quote 1: "you make my heart smile"
  'paper-quote-1.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 54" width="100%" height="100%">
  <defs>
    <filter id="pq1-shadow" x="-10%" y="-15%" width="125%" height="140%">
      <feDropShadow dx="1" dy="2.5" stdDeviation="2" flood-color="#2c1a10" flood-opacity="0.22"/>
    </filter>
  </defs>
  <g filter="url(#pq1-shadow)">
    <rect x="3" y="3" width="164" height="48" rx="4" fill="#ffffff" stroke="#f4ede2" stroke-width="2"/>
    <!-- Lined Paper Notebook Scrap -->
    <rect x="5" y="5" width="160" height="44" fill="#faf6f0"/>
    <line x1="10" y1="18" x2="160" y2="18" stroke="#e0d4c3" stroke-width="1"/>
    <line x1="10" y1="32" x2="160" y2="32" stroke="#e0d4c3" stroke-width="1"/>
    <!-- Tape at corner -->
    <rect x="0" y="0" width="22" height="10" rx="1" fill="#cbb295" opacity="0.8" transform="rotate(-15 11 5)"/>
    <text x="85" y="30" font-family="'Caveat', cursive" font-weight="700" font-size="18" fill="#4d3221" text-anchor="middle">you make my heart smile ♡</text>
  </g>
</svg>`,

  // 17. Paper Quote 2: "forever & always"
  'paper-quote-2.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 44" width="100%" height="100%">
  <defs>
    <filter id="pq2-shadow" x="-10%" y="-15%" width="125%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#2c1a10" flood-opacity="0.2"/>
    </filter>
  </defs>
  <g filter="url(#pq2-shadow)">
    <rect x="3" y="3" width="144" height="38" rx="6" fill="#ffffff" stroke="#f4ece1" stroke-width="2.5"/>
    <rect x="5" y="5" width="140" height="34" rx="4" fill="#eee1d0"/>
    <rect x="8" y="8" width="134" height="28" rx="3" fill="none" stroke="#bda083" stroke-width="1" stroke-dasharray="3 2"/>
    <text x="75" y="27" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-weight="600" font-size="15" fill="#3b2416" text-anchor="middle">forever &amp; always</text>
  </g>
</svg>`,

  // 18. Metallic Gold Stars Cluster
  'stars-cluster.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="100%" height="100%">
  <defs>
    <filter id="star-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="1.5" stdDeviation="1.5" flood-color="#2c1a10" flood-opacity="0.25"/>
    </filter>
  </defs>
  <g filter="url(#star-shadow)">
    <!-- Main 4-point star -->
    <path d="M28 8 L31 22 L45 25 L31 28 L28 42 L25 28 L11 25 L25 22 Z" fill="#d99c43" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>
    <!-- Small star 1 -->
    <path d="M46 36 L47.5 42 L53.5 43.5 L47.5 45 L46 51 L44.5 45 L38.5 43.5 L44.5 42 Z" fill="#e5b364" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round"/>
    <!-- Tiny sparkle 2 -->
    <circle cx="16" cy="42" r="2.5" fill="#d99c43" stroke="#ffffff" stroke-width="1"/>
    <circle cx="44" cy="15" r="2" fill="#d99c43" stroke="#ffffff" stroke-width="1"/>
  </g>
</svg>`,

  // 19. Ribbon Strip
  'ribbon-strip.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 30" width="100%" height="100%">
  <defs>
    <filter id="rs-shadow" x="-10%" y="-20%" width="120%" height="150%">
      <feDropShadow dx="1" dy="2" stdDeviation="1.8" flood-color="#2c1a10" flood-opacity="0.22"/>
    </filter>
  </defs>
  <g filter="url(#rs-shadow)">
    <rect x="2" y="2" width="156" height="26" fill="#ffffff" stroke="#f4ede2" stroke-width="2"/>
    <rect x="4" y="4" width="152" height="22" fill="#c4786e"/>
    <line x1="8" y1="15" x2="152" y2="15" stroke="#f6ded9" stroke-width="1.5" stroke-dasharray="4 3"/>
    <!-- Scalloped dots -->
    <circle cx="16" cy="15" r="2" fill="#ffffff"/>
    <circle cx="36" cy="15" r="2" fill="#ffffff"/>
    <circle cx="56" cy="15" r="2" fill="#ffffff"/>
    <circle cx="76" cy="15" r="2" fill="#ffffff"/>
    <circle cx="96" cy="15" r="2" fill="#ffffff"/>
    <circle cx="116" cy="15" r="2" fill="#ffffff"/>
    <circle cx="136" cy="15" r="2" fill="#ffffff"/>
  </g>
</svg>`
};

Object.entries(stickers).forEach(([filename, svgContent]) => {
  fs.writeFileSync(path.join(outDir, filename), svgContent.trim());
  console.log('Created sticker asset:', filename);
});
console.log('All stickers successfully generated!');
