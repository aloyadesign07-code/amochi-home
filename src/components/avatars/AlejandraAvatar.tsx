interface Props {
  size?: number;
  mood?: string;
}

export default function AlejandraAvatar({ size = 80, mood = 'happy' }: Props) {
  const eyeExpr = mood === 'tired'
    ? <><ellipse cx="27" cy="35" rx="3" ry="2" fill="#1a0e0a"/><ellipse cx="43" cy="35" rx="3" ry="2" fill="#1a0e0a"/></>
    : mood === 'energized'
    ? <><circle cx="27" cy="35" r="3.5" fill="#1a0e0a"/><circle cx="43" cy="35" r="3.5" fill="#1a0e0a"/><circle cx="28.5" cy="33.5" r="1" fill="white"/><circle cx="44.5" cy="33.5" r="1" fill="white"/></>
    : <><circle cx="27" cy="35" r="3" fill="#2a1a0a"/><circle cx="43" cy="35" r="3" fill="#2a1a0a"/><circle cx="28" cy="34" r="1" fill="white"/><circle cx="44" cy="34" r="1" fill="white"/></>;

  const mouth = mood === 'tired'
    ? <path d="M29 44 Q35 42 41 44" stroke="#c47070" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    : mood === 'stressed'
    ? <path d="M29 45 Q35 42 41 45" stroke="#c47070" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    : <path d="M28 43 Q35 49 42 43" stroke="#c47070" strokeWidth="1.8" fill="none" strokeLinecap="round"/>;

  return (
    <svg width={size} height={size} viewBox="0 0 72 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Neck */}
      <rect x="29" y="60" width="14" height="12" rx="4" fill="#f5d9c0"/>
      {/* Shirt */}
      <ellipse cx="36" cy="77" rx="22" ry="10" fill="#8b5c9e"/>
      {/* Long hair back */}
      <rect x="12" y="18" width="48" height="52" rx="8" fill="#1a0a0a"/>
      {/* Head */}
      <ellipse cx="36" cy="36" rx="21" ry="23" fill="#fde8d0"/>
      {/* Hair top */}
      <ellipse cx="36" cy="16" rx="21" ry="10" fill="#1a0a0a"/>
      <rect x="15" y="14" width="42" height="14" rx="7" fill="#1a0a0a"/>
      {/* Hair sides over head */}
      <rect x="12" y="20" width="10" height="36" rx="5" fill="#1a0a0a"/>
      <rect x="50" y="20" width="10" height="36" rx="5" fill="#1a0a0a"/>
      {/* Ears */}
      <ellipse cx="15" cy="38" rx="4.5" ry="6" fill="#fde8d0"/>
      <ellipse cx="57" cy="38" rx="4.5" ry="6" fill="#fde8d0"/>
      <ellipse cx="15" cy="38" rx="2.5" ry="4" fill="#f5c8ac"/>
      <ellipse cx="57" cy="38" rx="2.5" ry="4" fill="#f5c8ac"/>
      {/* Eyes */}
      {eyeExpr}
      {/* Eyelashes */}
      <path d="M22 31 L20 28 M24 30 L23 27 M26 30 L26 27" stroke="#1a0a0a" strokeWidth="1" strokeLinecap="round"/>
      <path d="M38 31 L36 28 M40 30 L39 27 M42 30 L42 27" stroke="#1a0a0a" strokeWidth="1" strokeLinecap="round"/>
      {/* Glasses */}
      <rect x="19" y="29" width="14" height="9" rx="3" stroke="#5a3e8a" strokeWidth="1.8" fill="rgba(200,190,240,0.15)"/>
      <rect x="37" y="29" width="14" height="9" rx="3" stroke="#5a3e8a" strokeWidth="1.8" fill="rgba(200,190,240,0.15)"/>
      <line x1="33" y1="33" x2="37" y2="33" stroke="#5a3e8a" strokeWidth="1.5"/>
      <line x1="15" y1="33" x2="19" y2="33" stroke="#5a3e8a" strokeWidth="1.5"/>
      <line x1="51" y1="33" x2="55" y2="33" stroke="#5a3e8a" strokeWidth="1.5"/>
      {/* Nose */}
      <ellipse cx="36" cy="40" rx="2.5" ry="1.5" fill="#e8b090" opacity="0.5"/>
      {/* Mouth */}
      {mouth}
      {/* Rosy cheeks */}
      <ellipse cx="20" cy="43" rx="5" ry="3" fill="#f4a0b0" opacity="0.4"/>
      <ellipse cx="52" cy="43" rx="5" ry="3" fill="#f4a0b0" opacity="0.4"/>
    </svg>
  );
}
