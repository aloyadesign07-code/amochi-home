import { Heart, Utensils } from 'lucide-react';

const PET_IMG: Record<string, string> = {
  Rita: '/images/avatars/rita_avatar.png',
  Valky: '/images/avatars/valky_avatar.png',
  Penny: '/images/avatars/penny_avatar.jpg',
};

interface Props {
  name: 'Rita' | 'Valky' | 'Penny';
  happiness: number;
  hunger: number;
  onFeed: () => void;
}

const PET_DESC: Record<string, string> = {
  Rita: 'Periquito verde',
  Valky: 'Dachshund cafe',
  Penny: 'Poodle blanca',
};

function StatusBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full bg-cream-200 rounded-full h-2.5 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ${color}`}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

function getEmoji(happiness: number) {
  if (happiness >= 80) return '😊';
  if (happiness >= 60) return '😐';
  if (happiness >= 40) return '😕';
  return '😢';
}

export default function PetCard({ name, happiness, hunger, onFeed }: Props) {
  const isLow = happiness < 50 || hunger < 50;

  return (
    <div className={`bg-cream-100 rounded-3xl p-4 shadow-card border-2 transition-all duration-300
      ${isLow ? 'border-rose-200' : 'border-cream-200'}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-14 h-14 rounded-2xl bg-cream-100 flex items-center justify-center flex-shrink-0 border-2 border-cream-200 overflow-hidden shadow-sm">
          <img src={PET_IMG[name]} alt={name} className="h-full w-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-wood-700 text-sm">{name}</h4>
            <span className="text-base">{getEmoji(happiness)}</span>
          </div>
          <p className="text-xs text-wood-500">{PET_DESC[name]}</p>
        </div>
        <button
          onClick={onFeed}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-cream-50 hover:bg-cream-200 text-wood-700 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 border border-cream-200"
        >
          <Utensils size={12}/>
          Dar de comer
        </button>
      </div>

      <div className="space-y-2">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs text-wood-500 flex items-center gap-1"><Heart size={10} className="text-rose-400"/> Felicidad</span>
            <span className="text-xs font-semibold text-wood-600">{happiness}%</span>
          </div>
          <StatusBar value={happiness} color={happiness >= 60 ? 'bg-rose-400' : 'bg-rose-300'}/>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs text-wood-500 flex items-center gap-1"><Utensils size={10} className="text-amber-400"/> Hambre</span>
            <span className="text-xs font-semibold text-wood-600">{hunger}%</span>
          </div>
          <StatusBar value={hunger} color={hunger >= 60 ? 'bg-cream-400' : 'bg-cream-300'}/>
        </div>
      </div>

      {isLow && (
        <div className="mt-2 px-2 py-1.5 bg-rose-50 rounded-xl border-2 border-rose-200 text-xs text-rose-600 font-medium">
          {name} necesita atención!
        </div>
      )}
    </div>
  );
}
