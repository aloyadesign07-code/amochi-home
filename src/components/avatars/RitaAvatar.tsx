interface Props {
  size?: number;
  happiness?: number;
}

export default function RitaAvatar({ size = 64, happiness = 80 }: Props) {
  const featherColor = happiness > 60 ? '#5aab5a' : '#8ab88a';
  const eyeColor = happiness > 60 ? '#1a0e0a' : '#5a5a5a';

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="32" cy="42" rx="16" ry="18" fill={featherColor}/>
      {/* Wing left */}
      <ellipse cx="14" cy="44" rx="8" ry="12" fill="#4a9e4a" transform="rotate(-20 14 44)"/>
      {/* Wing right */}
      <ellipse cx="50" cy="44" rx="8" ry="12" fill="#4a9e4a" transform="rotate(20 50 44)"/>
      {/* Belly */}
      <ellipse cx="32" cy="46" rx="9" ry="11" fill="#c8e8a0"/>
      {/* Head */}
      <circle cx="32" cy="22" r="14" fill={featherColor}/>
      {/* Crest feathers */}
      <ellipse cx="32" cy="10" rx="3" ry="7" fill="#3a8e3a" transform="rotate(0 32 10)"/>
      <ellipse cx="26" cy="11" rx="2.5" ry="6" fill="#3a8e3a" transform="rotate(-20 26 11)"/>
      <ellipse cx="38" cy="11" rx="2.5" ry="6" fill="#3a8e3a" transform="rotate(20 38 11)"/>
      {/* Eyes */}
      <circle cx="26" cy="22" r="4" fill="white"/>
      <circle cx="38" cy="22" r="4" fill="white"/>
      <circle cx="26" cy="22" r="2.5" fill={eyeColor}/>
      <circle cx="38" cy="22" r="2.5" fill={eyeColor}/>
      <circle cx="27" cy="21" r="0.8" fill="white"/>
      <circle cx="39" cy="21" r="0.8" fill="white"/>
      {/* Beak */}
      <path d="M29 28 L35 28 L32 33 Z" fill="#f0c040"/>
      <line x1="29" y1="28" x2="35" y2="28" stroke="#d4a020" strokeWidth="1"/>
      {/* Feet */}
      <line x1="28" y1="59" x2="24" y2="63" stroke="#f0c040" strokeWidth="2" strokeLinecap="round"/>
      <line x1="28" y1="59" x2="28" y2="63" stroke="#f0c040" strokeWidth="2" strokeLinecap="round"/>
      <line x1="28" y1="59" x2="32" y2="63" stroke="#f0c040" strokeWidth="2" strokeLinecap="round"/>
      <line x1="36" y1="59" x2="32" y2="63" stroke="#f0c040" strokeWidth="2" strokeLinecap="round"/>
      <line x1="36" y1="59" x2="36" y2="63" stroke="#f0c040" strokeWidth="2" strokeLinecap="round"/>
      <line x1="36" y1="59" x2="40" y2="63" stroke="#f0c040" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
