interface Props {
  size?: number;
  happiness?: number;
}

export default function PennyAvatar({ size = 64, happiness = 80 }: Props) {
  const fluffColor = happiness > 60 ? '#f5f5f5' : '#e0e0e0';
  const accentColor = '#f9a8c9';

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Fluffy body with curly texture */}
      <ellipse cx="32" cy="46" rx="18" ry="14" fill={fluffColor}/>
      <ellipse cx="20" cy="44" rx="7" ry="7" fill={fluffColor}/>
      <ellipse cx="44" cy="44" rx="7" ry="7" fill={fluffColor}/>
      <ellipse cx="32" cy="35" rx="8" ry="8" fill={fluffColor}/>
      {/* Head */}
      <circle cx="32" cy="22" r="14" fill={fluffColor}/>
      {/* Fluffy head top */}
      <ellipse cx="24" cy="12" rx="6" ry="6" fill={fluffColor}/>
      <ellipse cx="32" cy="10" rx="7" ry="6" fill={fluffColor}/>
      <ellipse cx="40" cy="12" rx="6" ry="6" fill={fluffColor}/>
      {/* Fluffy ears */}
      <ellipse cx="16" cy="18" rx="7" ry="9" fill={fluffColor}/>
      <ellipse cx="48" cy="18" rx="7" ry="9" fill={fluffColor}/>
      <ellipse cx="14" cy="16" rx="4" ry="5" fill={fluffColor}/>
      <ellipse cx="50" cy="16" rx="4" ry="5" fill={fluffColor}/>
      {/* Bow */}
      <path d="M26 13 L30 16 L26 19 Z" fill={accentColor}/>
      <path d="M34 13 L30 16 L34 19 Z" fill={accentColor}/>
      <circle cx="30" cy="16" r="2" fill="#f06090"/>
      {/* Snout */}
      <ellipse cx="32" cy="28" rx="7" ry="5" fill="white"/>
      {/* Nose */}
      <ellipse cx="32" cy="25" rx="3" ry="2" fill={accentColor}/>
      <ellipse cx="31.5" cy="24.5" rx="1" ry="0.6" fill="white" opacity="0.5"/>
      {/* Eyes */}
      <circle cx="25" cy="20" r="4" fill="white"/>
      <circle cx="39" cy="20" r="4" fill="white"/>
      <circle cx="25" cy="20" r="2.5" fill="#1a0a0a"/>
      <circle cx="39" cy="20" r="2.5" fill="#1a0a0a"/>
      <circle cx="26" cy="19" r="0.8" fill="white"/>
      <circle cx="40" cy="19" r="0.8" fill="white"/>
      {/* Eyelashes */}
      <path d="M21 16 L20 13" stroke="#1a0a0a" strokeWidth="1" strokeLinecap="round"/>
      <path d="M23 15.5 L22 12.5" stroke="#1a0a0a" strokeWidth="1" strokeLinecap="round"/>
      <path d="M35 15.5 L34 12.5" stroke="#1a0a0a" strokeWidth="1" strokeLinecap="round"/>
      <path d="M37 16 L37 13" stroke="#1a0a0a" strokeWidth="1" strokeLinecap="round"/>
      {/* Mouth */}
      <path d="M28 30 Q32 33 36 30" stroke={accentColor} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* Legs */}
      <ellipse cx="22" cy="58" rx="5" ry="5" fill={fluffColor}/>
      <ellipse cx="42" cy="58" rx="5" ry="5" fill={fluffColor}/>
      {/* Paws */}
      <ellipse cx="22" cy="60" rx="4" ry="3" fill="white"/>
      <ellipse cx="42" cy="60" rx="4" ry="3" fill="white"/>
      {/* Collar */}
      <rect x="24" y="33" width="16" height="4" rx="2" fill={accentColor}/>
      <circle cx="32" cy="37" r="1.5" fill="#f06090"/>
    </svg>
  );
}
