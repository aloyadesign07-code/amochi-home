import { HouseStatus as HouseStatusType } from '@/types';
import { Home, Sparkles, AlertTriangle, Zap } from 'lucide-react';

interface Props {
  status: HouseStatusType;
  coins: number;
  tasksToday: number;
}

const STATUS_CONFIG: Record<HouseStatusType, {
  color: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
  emoji: string;
  description: string;
}> = {
  'Impecable': {
    color: 'text-sage-600',
    bg: 'bg-sage-50',
    border: 'border-sage-200',
    icon: <Sparkles size={18} className="text-sage-500"/>,
    emoji: '✨',
    description: '¡La casa está perfecta!',
  },
  'Limpia': {
    color: 'text-wood-600',
    bg: 'bg-cream-100',
    border: 'border-cream-200',
    icon: <Home size={18} className="text-wood-500"/>,
    emoji: '🏡',
    description: 'Todo en orden',
  },
  'Necesita atención': {
    color: 'text-cream-600',
    bg: 'bg-cream-100',
    border: 'border-cream-200',
    icon: <AlertTriangle size={18} className="text-cream-500"/>,
    emoji: '⚠️',
    description: 'Hay cosas por hacer',
  },
  'Caótica': {
    color: 'text-rose-700',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    icon: <Zap size={18} className="text-rose-500"/>,
    emoji: '😱',
    description: '¡Necesita rescate urgente!',
  },
};

export default function HouseStatus({ status, coins, tasksToday }: Props) {
  const cfg = STATUS_CONFIG[status];

  return (
    <div className={`rounded-3xl p-4 border-2 ${cfg.bg} ${cfg.border} shadow-card`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {cfg.icon}
          <h3 className="font-bold text-wood-700 text-sm">Estado del Hogar</h3>
        </div>
        <span className="text-xl">{cfg.emoji}</span>
      </div>

      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-sm font-bold ${cfg.bg} ${cfg.color} border-2 ${cfg.border} mb-3`}>
        {cfg.icon}
        {status}
      </div>

      <p className={`text-xs ${cfg.color} mb-3`}>{cfg.description}</p>

      {/* House illustration */}
      <div className="relative h-24 rounded-2xl bg-cream-50 overflow-hidden border-2 border-cream-200 mb-3">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <HouseSVG status={status}/>
        </div>
        {/* Stars for impecable */}
        {status === 'Impecable' && (
          <>
            <div className="absolute top-2 left-4 text-cream-400 text-sm animate-float">★</div>
            <div className="absolute top-3 right-6 text-cream-400 text-xs animate-float" style={{animationDelay:'0.5s'}}>★</div>
            <div className="absolute top-1 left-1/2 text-cream-400 text-xs animate-float" style={{animationDelay:'1s'}}>✦</div>
          </>
        )}
        {/* Dust for caotica */}
        {status === 'Caótica' && (
          <>
            <div className="absolute top-2 left-4 text-slate-400 text-xs">💨</div>
            <div className="absolute top-4 right-4 text-slate-400 text-xs">🌀</div>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-cream-100 rounded-2xl p-2 text-center border border-cream-200">
          <p className="text-xs text-wood-500">Tareas hoy</p>
          <p className="text-lg font-bold text-wood-700">{tasksToday}</p>
        </div>
        <div className="bg-cream-100 rounded-2xl p-2 text-center border border-cream-200">
          <p className="text-xs text-wood-500">$MONEDAS</p>
          <p className="text-lg font-bold text-wood-700">{coins} 🪙</p>
        </div>
      </div>
    </div>
  );
}

function HouseSVG({ status }: { status: HouseStatusType }) {
  const wallColor = status === 'Caótica' ? '#c4a882' : status === 'Necesita atención' ? '#d4bc96' : '#FFFDF9';
  const roofColor = status === 'Impecable' ? '#2A7342' : status === 'Limpia' ? '#579d6a' : '#B85B28';

  return (
    <svg width="80" height="72" viewBox="0 0 80 72" fill="none">
      {/* Roof */}
      <polygon points="40,4 76,32 4,32" fill={roofColor}/>
      <polygon points="40,4 76,32 4,32" fill="none" stroke="white" strokeWidth="1" opacity="0.3"/>
      {/* Chimney */}
      <rect x="54" y="10" width="8" height="18" fill={roofColor} opacity="0.8"/>
      {/* Wall */}
      <rect x="8" y="30" width="64" height="42" rx="2" fill={wallColor}/>
      {/* Door */}
      <rect x="30" y="48" width="20" height="24" rx="3" fill="#8b6a42"/>
      <circle cx="47" cy="61" r="1.5" fill="#d4a060"/>
      {/* Windows */}
      <rect x="12" y="36" width="16" height="14" rx="2" fill="#a8d8e8" opacity="0.8"/>
      <rect x="52" y="36" width="16" height="14" rx="2" fill="#a8d8e8" opacity="0.8"/>
      <line x1="20" y1="36" x2="20" y2="50" stroke="white" strokeWidth="1" opacity="0.6"/>
      <line x1="12" y1="43" x2="28" y2="43" stroke="white" strokeWidth="1" opacity="0.6"/>
      <line x1="60" y1="36" x2="60" y2="50" stroke="white" strokeWidth="1" opacity="0.6"/>
      <line x1="52" y1="43" x2="68" y2="43" stroke="white" strokeWidth="1" opacity="0.6"/>
    </svg>
  );
}
