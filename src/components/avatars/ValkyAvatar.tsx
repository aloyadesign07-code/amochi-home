interface Props {
  size?: number;
  happiness?: number;
}

export default function ValkyAvatar({ size = 64, happiness = 80 }: Props) {
  const bodyColor = happiness > 60 ? '#8B5E3C' : '#a07856';
  const tailWag = happiness > 60;

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Long body */}
      <ellipse cx="32" cy="46" rx="20" ry="11" fill={bodyColor}/>
      {/* Head */}
      <ellipse cx="20" cy="36" rx="14" ry="12" fill={bodyColor}/>
      {/* Snout */}
      <ellipse cx="11" cy="40" rx="7" ry="5" fill="#a07856"/>
      <ellipse cx="11" cy="41" rx="4" ry="3" fill="#c49a76"/>
      {/* Nose */}
      <ellipse cx="8" cy="38" rx="3" ry="2.5" fill="#3a1a0a"/>
      <ellipse cx="7.5" cy="37.5" rx="1" ry="0.7" fill="white" opacity="0.5"/>
      {/* Eyes */}
      <circle cx="18" cy="32" r="4" fill="white"/>
      <circle cx="18" cy="32" r="2.5" fill="#3a1a0a"/>
      <circle cx="19" cy="31" r="0.8" fill="white"/>
      {/* Eyebrow */}
      <path d="M14 28 Q18 26 22 28" stroke="#5a3a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Floppy ears */}
      <ellipse cx="10" cy="29" rx="6" ry="10" fill="#6B4423" transform="rotate(-15 10 29)"/>
      <ellipse cx="30" cy="27" rx="5" ry="9" fill="#6B4423" transform="rotate(15 30 27)"/>
      {/* Legs */}
      <rect x="14" y="54" width="7" height="8" rx="3.5" fill={bodyColor}/>
      <rect x="24" y="54" width="7" height="8" rx="3.5" fill={bodyColor}/>
      <rect x="36" y="54" width="7" height="8" rx="3.5" fill={bodyColor}/>
      <rect x="46" y="54" width="7" height="8" rx="3.5" fill={bodyColor}/>
      {/* Tail */}
      {tailWag
        ? <path d="M51 42 Q62 34 58 26" stroke={bodyColor} strokeWidth="6" fill="none" strokeLinecap="round"/>
        : <path d="M51 42 Q60 40 58 34" stroke={bodyColor} strokeWidth="6" fill="none" strokeLinecap="round"/>
      }
      {/* Collar */}
      <rect x="16" y="44" width="18" height="4" rx="2" fill="#d44"/>
      <circle cx="25" cy="48" r="2" fill="#e8c040"/>
      {/* Mouth */}
      <path d="M8 42 Q11 45 14 42" stroke="#3a1a0a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}
