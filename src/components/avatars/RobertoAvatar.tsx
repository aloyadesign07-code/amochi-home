interface Props {
  size?: number;
  mood?: string;
}

export default function RobertoAvatar({ size = 80, mood = 'happy' }: Props) {
  const eyeExpr = mood === 'tired'
    ? <><ellipse cx="28" cy="36" rx="3" ry="2" fill="#1a0e0a"/><ellipse cx="44" cy="36" rx="3" ry="2" fill="#1a0e0a"/></>
    : mood === 'energized'
    ? <><circle cx="28" cy="36" r="3.5" fill="#1a0e0a"/><circle cx="44" cy="36" r="3.5" fill="#1a0e0a"/><circle cx="29.5" cy="34.5" r="1" fill="white"/><circle cx="45.5" cy="34.5" r="1" fill="white"/></>
    : <><circle cx="28" cy="36" r="3" fill="#1a0e0a"/><circle cx="44" cy="36" r="3" fill="#1a0e0a"/><circle cx="29" cy="35" r="1" fill="white"/><circle cx="45" cy="35" r="1" fill="white"/></>;

  const mouth = mood === 'tired'
    ? <path d="M30 46 Q36 44 42 46" stroke="#1a0e0a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    : mood === 'stressed'
    ? <path d="M30 47 Q36 44 42 47" stroke="#1a0e0a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    : <path d="M29 45 Q36 51 43 45" stroke="#1a0e0a" strokeWidth="1.8" fill="none" strokeLinecap="round"/>;

  return (
    <svg width={size} height={size} viewBox="0 0 72 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Neck */}
      <rect x="29" y="62" width="14" height="10" rx="4" fill="#6B3A2A"/>
      {/* Shirt */}
      <ellipse cx="36" cy="76" rx="20" ry="10" fill="#3a6e4a"/>
      {/* Head */}
      <ellipse cx="36" cy="36" rx="22" ry="24" fill="#7B4533"/>
      {/* Hair — short dark */}
      <ellipse cx="36" cy="15" rx="20" ry="10" fill="#1a0e0a"/>
      <rect x="16" y="14" width="40" height="12" rx="6" fill="#1a0e0a"/>
      {/* Ears */}
      <ellipse cx="14" cy="38" rx="5" ry="7" fill="#7B4533"/>
      <ellipse cx="58" cy="38" rx="5" ry="7" fill="#7B4533"/>
      <ellipse cx="14" cy="38" rx="3" ry="5" fill="#A0624E"/>
      <ellipse cx="58" cy="38" rx="3" ry="5" fill="#A0624E"/>
      {/* Beard */}
      <ellipse cx="36" cy="55" rx="14" ry="8" fill="#1a0e0a" opacity="0.85"/>
      <ellipse cx="24" cy="50" rx="5" ry="4" fill="#1a0e0a" opacity="0.7"/>
      <ellipse cx="48" cy="50" rx="5" ry="4" fill="#1a0e0a" opacity="0.7"/>
      {/* Mustache */}
      <ellipse cx="36" cy="44" rx="8" ry="3" fill="#1a0e0a" opacity="0.9"/>
      {/* Eyes */}
      {eyeExpr}
      {/* Glasses frame */}
      <rect x="20" y="30" width="14" height="10" rx="5" stroke="#2d2d2d" strokeWidth="1.8" fill="none"/>
      <rect x="38" y="30" width="14" height="10" rx="5" stroke="#2d2d2d" strokeWidth="1.8" fill="none"/>
      <line x1="34" y1="35" x2="38" y2="35" stroke="#2d2d2d" strokeWidth="1.5"/>
      <line x1="16" y1="34" x2="20" y2="34" stroke="#2d2d2d" strokeWidth="1.5"/>
      <line x1="52" y1="34" x2="56" y2="34" stroke="#2d2d2d" strokeWidth="1.5"/>
      {/* Nose */}
      <ellipse cx="36" cy="41" rx="3" ry="2" fill="#5E3020" opacity="0.6"/>
      {/* Mouth */}
      {mouth}
      {/* Rosy cheeks */}
      <ellipse cx="20" cy="44" rx="5" ry="3" fill="#e8a090" opacity="0.35"/>
      <ellipse cx="52" cy="44" rx="5" ry="3" fill="#e8a090" opacity="0.35"/>
    </svg>
  );
}
