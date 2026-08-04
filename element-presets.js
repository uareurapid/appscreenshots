// ─── Element Presets: Badges, Overlays, Trust, and Category Icon Packs ───
// SVGs use {{variable}} template syntax for editable text and colors.
// `textFields` defines editable text with defaults.
// `colorFields` defines editable colors with defaults.

// ─── BADGE LIBRARY (Attention Grabbers — Point 1) ───
const badgePresets = [
    // ▸ Ribbons
    { id: 'ribbon-red', name: 'Red Ribbon', category: 'ribbon',
      colorFields: { primary: '#ef4444', secondary: '#b91c1c', dark: '#991b1b' },
      textFields: { line1: 'EDITOR\'S CHOICE' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
        <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="{{primary}}"/><stop offset="100%" stop-color="{{secondary}}"/></linearGradient></defs>
        <path d="M0 0h200l-20 40 20 40H0z" fill="url(#g1)"/>
        <text x="100" y="46" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="bold" font-size="18">{{line1}}</text>
        <path d="M180 80l20-5v10z" fill="{{dark}}"/>
      </svg>`,
      defaultWidth: 35, label: 'Editor\'s Choice' },
    { id: 'ribbon-blue', name: 'Blue Ribbon', category: 'ribbon',
      colorFields: { primary: '#3b82f6', secondary: '#1d4ed8', dark: '#1e40af' },
      textFields: { line1: '#1 TOP APP' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
        <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="{{primary}}"/><stop offset="100%" stop-color="{{secondary}}"/></linearGradient></defs>
        <path d="M0 0h200l-20 40 20 40H0z" fill="url(#g1)"/>
        <text x="100" y="46" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="bold" font-size="18">{{line1}}</text>
        <path d="M180 80l20-5v10z" fill="{{dark}}"/>
      </svg>`,
      defaultWidth: 30, label: '#1 Top App' },
    { id: 'ribbon-gold', name: 'Gold Ribbon', category: 'ribbon',
      colorFields: { primary: '#f59e0b', secondary: '#b45309', dark: '#92400e' },
      textFields: { line1: 'BEST OF 2025' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
        <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="{{primary}}"/><stop offset="100%" stop-color="{{secondary}}"/></linearGradient></defs>
        <path d="M0 0h200l-20 40 20 40H0z" fill="url(#g1)"/>
        <text x="100" y="46" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="bold" font-size="18">{{line1}}</text>
        <path d="M180 80l20-5v10z" fill="{{dark}}"/>
      </svg>`,
      defaultWidth: 32, label: 'Best Of' },
    { id: 'ribbon-green', name: 'Green Ribbon', category: 'ribbon',
      colorFields: { primary: '#10b981', secondary: '#047857', dark: '#065f46' },
      textFields: { line1: 'NEW' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
        <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="{{primary}}"/><stop offset="100%" stop-color="{{secondary}}"/></linearGradient></defs>
        <path d="M0 0h200l-20 40 20 40H0z" fill="url(#g1)"/>
        <text x="100" y="46" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="bold" font-size="18">{{line1}}</text>
        <path d="M180 80l20-5v10z" fill="{{dark}}"/>
      </svg>`,
      defaultWidth: 20, label: 'New' },

    // ▸ Starburst Badges
    { id: 'starburst-yellow', name: 'Yellow Starburst', category: 'starburst',
      colorFields: { primary: '#fef08a', secondary: '#ca8a04', stroke: '#a16207' },
      textFields: { line1: 'AWARD', line2: 'WINNER' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <defs><radialGradient id="g1" cx="50%" cy="50%"><stop offset="0%" stop-color="{{primary}}"/><stop offset="100%" stop-color="{{secondary}}"/></radialGradient></defs>
        <polygon points="60,5 72,42 108,30 86,58 115,78 82,82 95,115 60,92 25,115 38,82 5,78 34,58 12,30 48,42" fill="url(#g1)" stroke="{{stroke}}" stroke-width="2"/>
        <text x="60" y="56" text-anchor="middle" fill="#713f12" font-family="Arial,sans-serif" font-weight="bold" font-size="11">{{line1}}</text>
        <text x="60" y="72" text-anchor="middle" fill="#713f12" font-family="Arial,sans-serif" font-weight="bold" font-size="13">{{line2}}</text>
      </svg>`,
      defaultWidth: 18, label: 'Award Winner' },
    { id: 'starburst-sale', name: 'Sale Starburst', category: 'starburst',
      colorFields: { primary: '#fca5a5', secondary: '#dc2626', stroke: '#991b1b' },
      textFields: { line1: '50%', line2: 'OFF' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <defs><radialGradient id="g1" cx="50%" cy="50%"><stop offset="0%" stop-color="{{primary}}"/><stop offset="100%" stop-color="{{secondary}}"/></radialGradient></defs>
        <polygon points="60,5 72,42 108,30 86,58 115,78 82,82 95,115 60,92 25,115 38,82 5,78 34,58 12,30 48,42" fill="url(#g1)" stroke="{{stroke}}" stroke-width="2"/>
        <text x="60" y="56" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="bold" font-size="21">{{line1}}</text>
        <text x="60" y="74" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="bold" font-size="13">{{line2}}</text>
      </svg>`,
      defaultWidth: 18, label: '50% Off' },
    { id: 'starburst-free', name: 'FREE Starburst', category: 'starburst',
      colorFields: { primary: '#6ee7b7', secondary: '#059669', stroke: '#047857' },
      textFields: { line1: 'FREE' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <defs><radialGradient id="g1" cx="50%" cy="50%"><stop offset="0%" stop-color="{{primary}}"/><stop offset="100%" stop-color="{{secondary}}"/></radialGradient></defs>
        <polygon points="60,5 72,42 108,30 86,58 115,78 82,82 95,115 60,92 25,115 38,82 5,78 34,58 12,30 48,42" fill="url(#g1)" stroke="{{stroke}}" stroke-width="2"/>
        <text x="60" y="62" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="bold" font-size="25">{{line1}}</text>
      </svg>`,
      defaultWidth: 18, label: 'FREE' },

    // ▸ Rating Stars
    { id: 'stars-5', name: '★★★★★ (5 Stars)', category: 'rating',
      colorFields: { starStart: '#fbbf24', starEnd: '#f59e0b' },
      textFields: { rating: '4.9', count: '50K' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 50">
        <defs><linearGradient id="g1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="{{starStart}}"/><stop offset="100%" stop-color="{{starEnd}}"/></linearGradient></defs>
        ${Array.from({length:5},(_,i)=>`<polygon points="${12+i*54},5 ${16+i*54},18 ${30+i*54},19 ${19+i*54},28 ${21+i*54},38 ${12+i*54},32 ${3+i*54},38 ${5+i*54},28 ${-6+i*54},19 ${8+i*54},18" fill="url(#g1)"/>`).join('')}
        <text x="24" y="48" text-anchor="middle" fill="#d1d5db" font-family="Arial,sans-serif" font-size="10">{{rating}} • {{count}} ratings</text>
      </svg>`,
      defaultWidth: 30, label: '4.9 ★ (50K)' },
    { id: 'stars-45', name: '★★★★½ (4.5 Stars)', category: 'rating',
      colorFields: { starStart: '#fbbf24', starEnd: '#f59e0b' },
      textFields: { rating: '4.5', count: '12K' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 50">
        <defs><linearGradient id="g1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="{{starStart}}"/><stop offset="100%" stop-color="{{starEnd}}"/></linearGradient></defs>
        ${Array.from({length:4},(_,i)=>`<polygon points="${12+i*54},5 ${16+i*54},18 ${30+i*54},19 ${19+i*54},28 ${21+i*54},38 ${12+i*54},32 ${3+i*54},38 ${5+i*54},28 ${-6+i*54},19 ${8+i*54},18" fill="url(#g1)"/>`).join('')}
        <clipPath id="half"><rect x="228" y="0" width="27" height="50"/></clipPath>
        <polygon points="228,5 232,18 246,19 235,28 237,38 228,32" fill="url(#g1)" clip-path="url(#half)"/>
        <text x="24" y="48" text-anchor="middle" fill="#d1d5db" font-family="Arial,sans-serif" font-size="10">{{rating}} • {{count}} ratings</text>
      </svg>`,
      defaultWidth: 30, label: '4.5 ★ (12K)' },

    // ▸ Medals / Trophies
    { id: 'medal-gold', name: 'Gold Medal', category: 'medal',
      colorFields: { goldLight: '#fef08a', gold: '#f59e0b', goldDark: '#b45309', ribbon: '#ca8a04', ribbonDark: '#a16207', stroke: '#92400e' },
      textFields: { line1: '🏆', line2: '#1' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 130">
        <defs><radialGradient id="g1" cx="40%" cy="40%"><stop offset="0%" stop-color="{{goldLight}}"/><stop offset="60%" stop-color="{{gold}}"/><stop offset="100%" stop-color="{{goldDark}}"/></radialGradient></defs>
        <path d="M25 25h50l-5 35H30z" fill="{{ribbon}}"/>
        <circle cx="50" cy="70" r="35" fill="url(#g1)" stroke="{{stroke}}" stroke-width="2"/>
        <text x="50" y="66" text-anchor="middle" fill="#713f12" font-family="Arial,sans-serif" font-weight="bold" font-size="18">{{line1}}</text>
        <text x="50" y="82" text-anchor="middle" fill="#713f12" font-family="Arial,sans-serif" font-weight="bold" font-size="11">{{line2}}</text>
        <rect x="35" y="105" width="30" height="5" rx="2" fill="{{ribbon}}"/>
        <rect x="40" y="110" width="20" height="5" rx="2" fill="{{ribbonDark}}"/>
        <rect x="45" y="115" width="10" height="8" rx="2" fill="{{ribbon}}"/>
      </svg>`,
      defaultWidth: 14, label: '#1 Medal' },
    { id: 'trophy-gold', name: 'Gold Trophy', category: 'medal',
      colorFields: { goldLight: '#fde68a', gold: '#f59e0b', goldDark: '#b45309', stroke: '#92400e' },
      textFields: { line1: '🏆' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120">
        <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="{{goldLight}}"/><stop offset="50%" stop-color="{{gold}}"/><stop offset="100%" stop-color="{{goldDark}}"/></linearGradient></defs>
        <path d="M25 25c5-20 45-20 50 0 8 0 20 5 20 15 0 12-10 20-15 25-3 5-5 10-5 15v15H25V80c0-5-2-10-5-15-5-5-15-13-15-25 0-10 12-15 20-15z" fill="url(#g1)" stroke="{{stroke}}" stroke-width="2"/>
        <rect x="35" y="95" width="30" height="8" rx="2" fill="{{goldDark}}"/>
        <rect x="30" y="103" width="40" height="6" rx="2" fill="{{goldDark}}"/>
        <rect x="40" y="109" width="20" height="8" rx="2" fill="{{goldDark}}"/>
        <text x="50" y="55" text-anchor="middle" fill="#713f12" font-family="Arial,sans-serif" font-weight="bold" font-size="22">{{line1}}</text>
      </svg>`,
      defaultWidth: 14, label: 'Trophy' },

    // ▸ Shield / Trust Badges
    { id: 'shield-check', name: 'Verified Shield', category: 'shield',
      colorFields: { primary: '#6366f1', secondary: '#4338ca', stroke: '#312e81' },
      textFields: {},
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120">
        <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="{{primary}}"/><stop offset="100%" stop-color="{{secondary}}"/></linearGradient></defs>
        <path d="M50 5 L85 20 L85 65 C85 95 50 115 50 115 C50 115 15 95 15 65 L15 20 Z" fill="url(#g1)" stroke="{{stroke}}" stroke-width="2"/>
        <polyline points="32,55 45,68 68,40" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      defaultWidth: 14, label: 'Verified' },
    { id: 'shield-star', name: 'Top Rated Shield', category: 'shield',
      colorFields: { primary: '#fbbf24', secondary: '#f59e0b', stroke: '#b45309' },
      textFields: { line1: '★' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120">
        <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="{{primary}}"/><stop offset="100%" stop-color="{{secondary}}"/></linearGradient></defs>
        <path d="M50 5 L85 20 L85 65 C85 95 50 115 50 115 C50 115 15 95 15 65 L15 20 Z" fill="url(#g1)" stroke="{{stroke}}" stroke-width="2"/>
        <text x="50" y="62" text-anchor="middle" fill="#713f12" font-family="Arial,sans-serif" font-weight="bold" font-size="30">{{line1}}</text>
      </svg>`,
      defaultWidth: 14, label: 'Top Rated' },

    // ▸ Sale / Price Tags
    { id: 'tag-sale', name: 'SALE Tag', category: 'tag',
      colorFields: { primary: '#ef4444', secondary: '#dc2626', stroke: '#991b1b' },
      textFields: { line1: 'SALE', line2: '40% OFF' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100">
        <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="{{primary}}"/><stop offset="100%" stop-color="{{secondary}}"/></linearGradient></defs>
        <path d="M0 10 C0 4 4 0 10 0h100l50 50-50 50H10C4 100 0 96 0 90z" fill="url(#g1)" stroke="{{stroke}}" stroke-width="2"/>
        <text x="55" y="48" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="900" font-size="18">{{line1}}</text>
        <text x="55" y="68" text-anchor="middle" fill="#fecaca" font-family="Arial,sans-serif" font-weight="bold" font-size="11">{{line2}}</text>
      </svg>`,
      defaultWidth: 22, label: 'SALE 40% OFF' },
    { id: 'tag-new', name: 'NEW Tag', category: 'tag',
      colorFields: { primary: '#8b5cf6', secondary: '#6d28d9', stroke: '#5b21b6' },
      textFields: { line1: 'NEW' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100">
        <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="{{primary}}"/><stop offset="100%" stop-color="{{secondary}}"/></linearGradient></defs>
        <path d="M0 10 C0 4 4 0 10 0h90l40 50-40 50H10C4 100 0 96 0 90z" fill="url(#g1)" stroke="{{stroke}}" stroke-width="2"/>
        <text x="50" y="58" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="900" font-size="24">{{line1}}</text>
      </svg>`,
      defaultWidth: 18, label: 'NEW' },

    // ▸ Laurel Wreath
    { id: 'laurel-wreath', name: 'Laurel Wreath', category: 'medal',
      colorFields: { leaf: '#f59e0b', leafDark: '#b45309', textColor: '#f59e0b', starColor: '#fbbf24' },
      textFields: { line1: 'EDITOR\'S', line2: 'CHOICE' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 145">
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="{{leaf}}"/><stop offset="100%" stop-color="{{leafDark}}"/></linearGradient>
        </defs>
        <!-- Leaf shape template (used via <use>) -->
        <path id="L" d="M0,0 C3,-5 8,-9 14,-5 C12,-2 9,0 14,5 C8,9 3,5 0,0 Z" fill="url(#g1)" stroke="{{leafDark}}" stroke-width="0.3"/>
        <!-- Left side leaves -->
        <use href="#L" x="52" y="122" transform="rotate(-15 52 122)"/>
        <use href="#L" x="40" y="112" transform="rotate(-30 40 112)"/>
        <use href="#L" x="30" y="98" transform="rotate(-45 30 98)"/>
        <use href="#L" x="24" y="82" transform="rotate(-58 24 82)"/>
        <use href="#L" x="22" y="65" transform="rotate(-70 22 65)"/>
        <use href="#L" x="26" y="48" transform="rotate(-82 26 48)"/>
        <use href="#L" x="34" y="34" transform="rotate(-95 34 34)"/>
        <use href="#L" x="46" y="24" transform="rotate(-108 46 24)"/>
        <!-- Right side leaves (mirrored) -->
        <use href="#L" x="148" y="122" transform="rotate(15 148 122)"/>
        <use href="#L" x="160" y="112" transform="rotate(30 160 112)"/>
        <use href="#L" x="170" y="98" transform="rotate(45 170 98)"/>
        <use href="#L" x="176" y="82" transform="rotate(58 176 82)"/>
        <use href="#L" x="178" y="65" transform="rotate(70 178 65)"/>
        <use href="#L" x="174" y="48" transform="rotate(82 174 48)"/>
        <use href="#L" x="166" y="34" transform="rotate(95 166 34)"/>
        <use href="#L" x="154" y="24" transform="rotate(108 154 24)"/>
        <!-- Small berries/accents along the wreath -->
        <circle cx="48" cy="118" r="2.5" fill="{{starColor}}" opacity="0.8"/>
        <circle cx="32" cy="92" r="2" fill="{{starColor}}" opacity="0.8"/>
        <circle cx="28" cy="58" r="2" fill="{{starColor}}" opacity="0.8"/>
        <circle cx="40" cy="28" r="2.5" fill="{{starColor}}" opacity="0.8"/>
        <circle cx="152" cy="118" r="2.5" fill="{{starColor}}" opacity="0.8"/>
        <circle cx="168" cy="92" r="2" fill="{{starColor}}" opacity="0.8"/>
        <circle cx="172" cy="58" r="2" fill="{{starColor}}" opacity="0.8"/>
        <circle cx="160" cy="28" r="2.5" fill="{{starColor}}" opacity="0.8"/>
        <!-- Center text -->
        <text x="100" y="78" text-anchor="middle" fill="{{textColor}}" font-family="Georgia,serif" font-weight="900" font-size="16" font-style="italic">{{line1}}</text>
        <text x="100" y="98" text-anchor="middle" fill="{{textColor}}" font-family="Georgia,serif" font-weight="900" font-size="21" font-style="italic">{{line2}}</text>
        <!-- Bottom ribbon -->
        <path d="M60,130 L100,118 L140,130" fill="none" stroke="{{textColor}}" stroke-width="1.5" opacity="0.4"/>
        <path d="M55,135 L100,122 L145,135" fill="none" stroke="{{textColor}}" stroke-width="1" opacity="0.25"/>
      </svg>`,
      defaultWidth: 28, label: 'Laurel Wreath' },
];

// ─── OVERLAY LIBRARY (UI Overlays & Floating Elements — Point 5) ───
const overlayPresets = [
    // Chat bubbles
    { id: 'chat-blue', name: 'Chat Bubble (Blue)', category: 'chat',
      colorFields: { bubble: '#3b82f6', bubbleLight: '#93c5fd' },
      textFields: { name: 'Love this app!', message: 'So easy to use ✨' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180">
        <rect x="10" y="10" width="220" height="130" rx="24" fill="{{bubble}}"/>
        <path d="M30 155 L45 140 L55 155 Z" fill="{{bubble}}"/>
        <circle cx="45" cy="65" r="16" fill="{{bubbleLight}}"/>
        <text x="70" y="58" fill="white" font-family="Arial,sans-serif" font-size="16" font-weight="bold">{{name}}</text>
        <text x="70" y="80" fill="#bfdbfe" font-family="Arial,sans-serif" font-size="12">{{message}}</text>
        <text x="30" y="110" fill="{{bubbleLight}}" font-family="Arial,sans-serif" font-size="9">Just now</text>
      </svg>`,
      defaultWidth: 25, label: 'Chat Bubble' },
    { id: 'chat-green', name: 'Chat Bubble (Green)', category: 'chat',
      colorFields: { bubble: '#10b981', bubbleLight: '#6ee7b7' },
      textFields: { name: 'Game changer!', message: '5 stars ⭐' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160">
        <rect x="10" y="10" width="220" height="110" rx="24" fill="{{bubble}}"/>
        <path d="M210 135 L225 120 L215 135 Z" fill="{{bubble}}"/>
        <text x="30" y="55" fill="white" font-family="Arial,sans-serif" font-size="15" font-weight="bold">{{name}}</text>
        <text x="30" y="78" fill="#a7f3d0" font-family="Arial,sans-serif" font-size="11">{{message}}</text>
        <text x="190" y="105" fill="{{bubbleLight}}" font-family="Arial,sans-serif" font-size="9">2m ago</text>
      </svg>`,
      defaultWidth: 25, label: 'Chat Bubble (Green)' },

    // Notification Badges
    { id: 'notif-red', name: 'Notification Badge', category: 'notification',
      colorFields: { badge: '#ef4444' },
      textFields: { count: '3' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="28" fill="{{badge}}"/>
        <text x="30" y="37" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="bold" font-size="22">{{count}}</text>
      </svg>`,
      defaultWidth: 6, label: 'Notification (3)' },
    { id: 'notif-blue', name: 'Notification Dot', category: 'notification',
      colorFields: { primary: '#3b82f6', ring: '#93c5fd' },
      textFields: {},
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="{{primary}}"/>
        <circle cx="20" cy="20" r="14" fill="none" stroke="{{ring}}" stroke-width="2" stroke-dasharray="4 2"/>
      </svg>`,
      defaultWidth: 4, label: 'Notification Dot' },

    // Floating Cards
    { id: 'card-profile', name: 'Profile Card', category: 'card',
      colorFields: {},
      textFields: { name: 'Sarah Johnson', role: 'Premium Member' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
        <rect x="5" y="5" width="190" height="90" rx="14" fill="white" fill-opacity="0.15" stroke="white" stroke-opacity="0.3" stroke-width="1"/>
        <circle cx="35" cy="50" r="22" fill="white" fill-opacity="0.2"/>
        <text x="35" y="56" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-size="20">👤</text>
        <text x="70" y="44" fill="white" font-family="Arial,sans-serif" font-size="14" font-weight="bold">{{name}}</text>
        <text x="70" y="62" fill="white" fill-opacity="0.7" font-family="Arial,sans-serif" font-size="11">{{role}}</text>
      </svg>`,
      defaultWidth: 28, label: 'Profile Card' },
    { id: 'card-stats', name: 'Stats Card', category: 'card',
      colorFields: {},
      textFields: { label: 'TODAY', value: '2,847', change: '↑ 12.5%' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 110">
        <rect x="5" y="5" width="190" height="100" rx="14" fill="white" fill-opacity="0.12" stroke="white" stroke-opacity="0.2" stroke-width="1"/>
        <text x="20" y="30" fill="white" font-family="Arial,sans-serif" font-size="9" fill-opacity="0.6">{{label}}</text>
        <text x="20" y="58" fill="white" font-family="Arial,sans-serif" font-size="26" font-weight="bold">{{value}}</text>
        <text x="20" y="78" fill="#10b981" font-family="Arial,sans-serif" font-size="12">{{change}}</text>
        <polyline points="120,70 140,55 160,60 180,35" fill="none" stroke="#3b82f6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      defaultWidth: 28, label: 'Stats Card' },
    { id: 'card-payment', name: 'Payment Card', category: 'card',
      colorFields: {},
      textFields: { last4: '•••• •••• •••• 4242', expiry: 'EXP 12/27' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 130">
        <rect x="5" y="5" width="210" height="120" rx="16" fill="white" fill-opacity="0.15" stroke="white" stroke-opacity="0.25" stroke-width="1"/>
        <text x="20" y="38" fill="white" font-family="monospace" font-size="18" font-weight="bold">{{last4}}</text>
        <rect x="20" y="55" width="80" height="18" rx="4" fill="white" fill-opacity="0.15"/>
        <text x="25" y="68" fill="white" fill-opacity="0.7" font-family="Arial,sans-serif" font-size="9">{{expiry}}</text>
        <circle cx="185" cy="40" r="18" fill="none" stroke="white" stroke-opacity="0.3" stroke-width="2"/>
        <circle cx="170" cy="40" r="18" fill="none" stroke="white" stroke-opacity="0.3" stroke-width="2"/>
        <text x="20" y="98" fill="#34d399" font-family="Arial,sans-serif" font-size="11">✓ Payment verified</text>
        <text x="20" y="115" fill="white" fill-opacity="0.5" font-family="Arial,sans-serif" font-size="9">Secured by Stripe</text>
      </svg>`,
      defaultWidth: 30, label: 'Payment Card' },

    // Checkmarks & Security icons
    { id: 'check-circle', name: 'Verified Check', category: 'check',
      colorFields: { primary: '#10b981', stroke: '#047857' },
      textFields: {},
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="{{primary}}" stroke="{{stroke}}" stroke-width="3"/>
        <polyline points="28,52 43,67 72,35" fill="none" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      defaultWidth: 12, label: '✓ Verified' },
    { id: 'lock-secure', name: 'Lock (Secure)', category: 'check',
      colorFields: { bg: '#1e293b', fg: '#64748b' },
      textFields: {},
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="{{bg}}" stroke="{{fg}}" stroke-width="3"/>
        <rect x="32" y="42" width="36" height="30" rx="5" fill="{{fg}}"/>
        <path d="M38 42V32c0-8 16-8 16 0v10" fill="none" stroke="{{fg}}" stroke-width="5" stroke-linecap="round"/>
        <circle cx="50" cy="58" r="4" fill="{{bg}}"/>
        <line x1="50" y1="61" x2="50" y2="67" stroke="{{bg}}" stroke-width="3" stroke-linecap="round"/>
      </svg>`,
      defaultWidth: 12, label: '🔒 Secure' },
];

// ─── TRUST ELEMENTS (Social Proof — Point 7) ───
const trustPresets = [
    { id: 'trust-rating', name: 'App Store Rating', category: 'rating',
      colorFields: { bg: '#1c1d21', border: '#3b3b4f', accent: '#fbbf24' },
      textFields: { rating: '4.8', count: '50K+', subtitle: '#1 in Productivity • Editor\'s Choice' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 60">
        <rect x="0" y="0" width="300" height="60" rx="12" fill="{{bg}}" stroke="{{border}}" stroke-width="1"/>
        <text x="15" y="26" fill="white" font-family="Arial,sans-serif" font-size="14" font-weight="bold">★★★★★</text>
        <text x="105" y="26" fill="{{accent}}" font-family="Arial,sans-serif" font-size="12">{{rating}}</text>
        <text x="135" y="26" fill="#9ca3af" font-family="Arial,sans-serif" font-size="10">• {{count}} Ratings</text>
        <text x="15" y="48" fill="#6b7280" font-family="Arial,sans-serif" font-size="9">{{subtitle}}</text>
      </svg>`,
      defaultWidth: 38, label: 'App Store Rating' },
    { id: 'trust-downloads', name: 'Download Count', category: 'social',
      colorFields: { bg: 'rgba(255,255,255,0.1)', border: 'rgba(255,255,255,0.15)' },
      textFields: { count: '10M+', subtitle: 'DOWNLOADS WORLDWIDE' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60">
        <rect x="0" y="0" width="220" height="60" rx="12" fill="{{bg}}" stroke="{{border}}" stroke-width="1"/>
        <text x="110" y="24" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-size="20" font-weight="bold">{{count}}</text>
        <text x="110" y="44" text-anchor="middle" fill="white" fill-opacity="0.6" font-family="Arial,sans-serif" font-size="10">{{subtitle}}</text>
      </svg>`,
      defaultWidth: 28, label: '10M+ Downloads' },
    { id: 'trust-users', name: 'Editors\' Choice', category: 'social',
      colorFields: { bg: 'rgba(255,255,255,0.1)', border: 'rgba(255,255,255,0.15)', accent: '#fbbf24' },
      textFields: { title: '🏆 Editors\' Choice', subtitle: 'AS FEATURED ON THE APP STORE' },
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60">
        <rect x="0" y="0" width="220" height="60" rx="12" fill="{{bg}}" stroke="{{border}}" stroke-width="1"/>
        <text x="110" y="24" text-anchor="middle" fill="{{accent}}" font-family="Arial,sans-serif" font-size="20" font-weight="bold">{{title}}</text>
        <text x="110" y="44" text-anchor="middle" fill="white" fill-opacity="0.6" font-family="Arial,sans-serif" font-size="10">{{subtitle}}</text>
      </svg>`,
      defaultWidth: 28, label: 'Editors\' Choice' },
];

// ─── SCENIC BACKGROUND OVERLAYS (Point 3) ───
const scenicOverlays = [
    { id: 'clouds-soft', name: 'Soft Clouds', category: 'nature',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <ellipse cx="150" cy="120" rx="100" ry="40" fill="white" opacity="0.30"/>
        <ellipse cx="200" cy="100" rx="80" ry="35" fill="white" opacity="0.25"/>
        <ellipse cx="500" cy="80" rx="120" ry="45" fill="white" opacity="0.22"/>
        <ellipse cx="560" cy="65" rx="90" ry="35" fill="white" opacity="0.18"/>
        <ellipse cx="680" cy="140" rx="70" ry="30" fill="white" opacity="0.25"/>
        <ellipse cx="320" cy="200" rx="85" ry="35" fill="white" opacity="0.15"/>
      </svg>`,
      overlayOpacity: 70 },
    { id: 'palms-sunset', name: 'Palm Silhouettes', category: 'nature',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <ellipse cx="400" cy="300" rx="350" ry="250" fill="#f97316" opacity="0.25"/>
        <ellipse cx="400" cy="500" rx="400" ry="200" fill="#1a1a2e" opacity="0.5"/>
        <path d="M100 400 Q110 250 90 150 Q105 200 120 300 L100 400" fill="#0f172a" opacity="0.6"/>
        <path d="M90 150 Q80 220 60 280 Q85 240 120 300" fill="none" stroke="#0f172a" stroke-opacity="0.5" stroke-width="3"/>
        <path d="M700 380 Q720 220 750 130 Q730 180 710 280 L700 380" fill="#0f172a" opacity="0.6"/>
        <path d="M750 130 Q735 200 710 260 Q730 220 710 280" fill="none" stroke="#0f172a" stroke-opacity="0.5" stroke-width="3"/>
        <path d="M680 420 Q690 300 670 200 Q685 250 700 340 L680 420" fill="#0f172a" opacity="0.5"/>
        <rect x="0" y="380" width="800" height="220" fill="#0f172a" opacity="0.4"/>
      </svg>`,
      overlayOpacity: 80 },
    { id: 'mountains', name: 'Mountain Range', category: 'nature',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <polygon points="0,600 0,280 120,180 200,220 300,120 380,200 450,100 520,180 580,150 680,220 800,160 800,600" fill="white" opacity="0.22"/>
        <polygon points="0,600 0,350 100,290 180,320 280,250 350,310 430,240 500,300 600,260 700,320 800,280 800,600" fill="white" opacity="0.15"/>
        <circle cx="650" cy="80" r="40" fill="white" opacity="0.20"/>
        <circle cx="660" cy="75" r="30" fill="white" opacity="0.28"/>
      </svg>`,
      overlayOpacity: 65 },
    { id: 'circuit-pattern', name: 'Circuit / Tech', category: 'tech',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <g stroke="#3b82f6" stroke-opacity="0.4" stroke-width="2" fill="none">
          <path d="M0 100h80l20-20h60l20 20h620"/><path d="M200 100v40l-20 20v80l20 20v340"/>
          <path d="M600 120v-40l20-20h120"/><path d="M500 200h100l20-20v-60"/>
          <path d="M100 300h60l20 20v100l-20 20H80"/><path d="M400 400v60l20 20h150l20 20v80"/>
          <path d="M300 500h120"/>
        </g>
        <circle cx="200" cy="100" r="6" fill="#3b82f6" opacity="0.6"/>
        <circle cx="600" cy="60" r="6" fill="#3b82f6" opacity="0.6"/>
        <circle cx="160" cy="500" r="6" fill="#3b82f6" opacity="0.6"/>
        <circle cx="550" cy="560" r="6" fill="#3b82f6" opacity="0.6"/>
        <circle cx="320" cy="680" r="6" fill="#3b82f6" opacity="0.6"/>
      </svg>`,
      overlayOpacity: 60 },
    { id: 'geometric-circles', name: 'Geometric Circles', category: 'abstract',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <circle cx="100" cy="500" r="300" fill="white" opacity="0.14"/><circle cx="700" cy="100" r="250" fill="white" opacity="0.14"/>
        <circle cx="400" cy="300" r="200" fill="white" opacity="0.10"/><circle cx="200" cy="150" r="120" fill="white" opacity="0.10"/>
        <circle cx="600" cy="450" r="150" fill="white" opacity="0.10"/><circle cx="400" cy="300" r="80" fill="white" opacity="0.16"/>
      </svg>`,
      overlayOpacity: 55 },
    { id: 'hex-grid', name: 'Hex Grid', category: 'tech',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <g fill="none" stroke="white" stroke-opacity="0.20" stroke-width="1.5">
          ${Array.from({length:8},(_,r)=>Array.from({length:6},(_,c)=>{
            const x=60+c*120+(r%2)*60, y=40+r*75;
            return `<polygon points="${x},${y-22} ${x+20},${y-11} ${x+20},${y+11} ${x},${y+22} ${x-20},${y+11} ${x-20},${y-11}"/>`;
          }).join('')).join('')}
        </g>
      </svg>`,
      overlayOpacity: 50 },
];

// ─── CATEGORY ICON PACKS (Point 6) ───
const categoryIconPacks = {
    'health': {
        label: 'Health & Fitness', emoji: '💪',
        icons: ['heart-pulse','activity','dumbbell','apple','flame','footprints','timer','scale','brain','pill','stethoscope','droplets','bone','cross','thermometer']
    },
    'finance': {
        label: 'Finance & Banking', emoji: '💳',
        icons: ['credit-card','wallet','banknote','piggy-bank','chart-line','chart-bar','arrow-up-right','shield-check','receipt','landmark','coins','dollar-sign','trending-up','circle-dollar-sign','badge-percent']
    },
    'gaming': {
        label: 'Gaming', emoji: '🎮',
        icons: ['gamepad-2','swords','target','trophy','zap','sword','shield','bomb','ghost','skull','sparkles','star','crown','flame','rocket']
    },
    'food': {
        label: 'Food & Delivery', emoji: '🍕',
        icons: ['utensils','pizza','coffee','shopping-bag','truck','map-pin','clock','chef-hat','beef','croissant','ice-cream-cone','salad','sandwich','wine','package']
    },
    'dating': {
        label: 'Dating & Social', emoji: '❤️',
        icons: ['heart','message-circle','users','user-plus','sparkles','camera','party-popper','gift','star','smile','music','video','send','crown','compass']
    },
    'productivity': {
        label: 'Productivity', emoji: '✅',
        icons: ['check-square','calendar-days','folder-kanban','list-todo','clock','alarm-clock','timer','file-text','clipboard-list','pencil','sticky-note','layout-grid','bookmark','tag','pin']
    },
    'photo': {
        label: 'Photo & Video', emoji: '📸',
        icons: ['camera','image','video','film','picture-in-picture-2','aperture','palette','layers','sliders-horizontal','wand-2','focus','move-diagonal-2','crop','scissors','sparkles']
    },
};

// ─── HELPERS ───
function svgToImage(svgString) {
    return new Promise((resolve, reject) => {
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
        img.onerror = reject;
        img.src = url;
    });
}

// Fill {{variables}} in an SVG template
function fillTemplate(svg, textValues, colorValues) {
    let result = svg;
    if (textValues) {
        for (const [key, val] of Object.entries(textValues)) {
            result = result.replaceAll('{{'+key+'}}', val || '');
        }
    }
    if (colorValues) {
        for (const [key, val] of Object.entries(colorValues)) {
            result = result.replaceAll('{{'+key+'}}', val || '#000');
        }
    }
    return result;
}

// Get initial default texts for a preset
function getDefaultTexts(preset) {
    const texts = {};
    if (preset.textFields) {
        for (const [key, val] of Object.entries(preset.textFields)) {
            texts[key] = val;
        }
    }
    return texts;
}

// Get initial default colors for a preset
function getDefaultColors(preset) {
    const colors = {};
    if (preset.colorFields) {
        for (const [key, val] of Object.entries(preset.colorFields)) {
            colors[key] = val;
        }
    }
    return colors;
}

// Generate final SVG from a preset + user values, then convert to Image
async function generatePresetImage(preset, textValues, colorValues) {
    const filled = fillTemplate(preset.svg, textValues, colorValues);
    return await svgToImage(filled);
}

// Update an element's image when text or colors change
async function regeneratePresetImage(el) {
    const preset = getPresetById(el.presetId);
    if (!preset) return;
    el.image = await generatePresetImage(preset, el.badgeTexts || {}, el.badgeColors || {});
    if (typeof updateCanvas === 'function') updateCanvas();
}

function getPresetById(id) {
    return badgePresets.find(b => b.id === id) ||
           overlayPresets.find(o => o.id === id) ||
           trustPresets.find(t => t.id === id) ||
           null;
}

function getScenicOverlay(id) {
    return scenicOverlays.find(s => s.id === id) || null;
}
