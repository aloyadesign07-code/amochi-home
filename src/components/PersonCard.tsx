import { Mood, Person } from '@/types';
import { Zap, Moon, Smile, AlertTriangle } from 'lucide-react';

interface Props {
  person: Person;
  mood: Mood;
  onMoodChange: (person: Person, mood: Mood) => void;
}

const MOOD_CONFIG: Record<Mood, { label: string; color: string; icon: React.ReactNode }> = {
  happy: { label: 'Feliz', color: 'text-sage-500', icon: <Smile size={14}/> },
  energized: { label: 'Con energía', color: 'text-cream-500', icon: <Zap size={14}/> },
  tired: { label: 'Cansado/a', color: 'text-wood-400', icon: <Moon size={14}/> },
  stressed: { label: 'Estresado/a', color: 'text-rose-500', icon: <AlertTriangle size={14}/> },
};

const MOODS: Mood[] = ['happy', 'energized', 'tired', 'stressed'];

export default function PersonCard({ person, mood, onMoodChange }: Props) {
  const isRoberto = person === 'roberto';
  const name = isRoberto ? 'Roberto' : 'Alejandra';
  const { label, color, icon } = MOOD_CONFIG[mood];

  const schedule = getScheduleLabel(isRoberto);

  return (
    <div className="bg-cream-100 rounded-3xl p-4 shadow-card border-2 border-cream-200 flex flex-col items-center gap-3 animate-pop">
      <div className="relative">
        <div className="w-20 h-20 rounded-2xl bg-cream-50 flex items-center justify-center border-2 border-cream-200 shadow-card overflow-hidden animate-float">
          {isRoberto
            ? <img src="/images/avatars/roberto_avatar.jpg" alt="Roberto" className="h-full w-full object-cover" />
            : <img src="/images/avatars/alejandra_avatar.jpg" alt="Alejandra" className="h-full w-full object-cover" />
          }
        </div>
        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white shadow-card
          ${mood === 'happy' ? 'bg-sage-500' : mood === 'energized' ? 'bg-cream-500' : mood === 'tired' ? 'bg-wood-400' : 'bg-rose-500'}`}>
          {icon}
        </div>
      </div>

      <div className="text-center">
        <h3 className="font-bold text-wood-700 text-sm">{name}</h3>
        <p className={`text-xs font-medium ${color} flex items-center gap-1 justify-center`}>
          {icon} {label}
        </p>
        <p className="text-xs text-wood-500 mt-0.5">{schedule}</p>
      </div>

      <div className="flex gap-1 flex-wrap justify-center">
        {MOODS.map(m => (
          <button
            key={m}
            onClick={() => onMoodChange(person, m)}
            className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-200 border
              ${mood === m
                ? 'bg-cream-500 text-white border-cream-500 scale-105'
                : 'bg-cream-50 text-wood-600 border-cream-200 hover:border-cream-300 hover:bg-cream-200/50'
              }`}
          >
            {MOOD_CONFIG[m].label}
          </button>
        ))}
      </div>
    </div>
  );
}

function getScheduleLabel(isRoberto: boolean): string {
  const day = new Date().getDay(); // 0=Sun
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const today = dayNames[day];

  if (day === 0 || day === 6) return `${today} — Fin de semana`;

  if (!isRoberto) {
    if (day === 3 || day === 5) return `${today} — Home Office`;
    if (day === 2 || day === 4) return `${today} — Oficina + Hyrox 7pm`;
    return `${today} — Oficina`;
  } else {
    if (day === 2 || day === 4) return `${today} — On-site + Hyrox 7pm`;
    return `${today} — On-site`;
  }
}
