import { useState, useMemo } from 'react';
import { PRESET_TASKS, CATEGORY_LABELS } from '@/data/tasks';
import { ScheduleType, PresetTask, Person } from '@/types';
import { CheckCircle, Star } from 'lucide-react';

interface Props {
  scheduleType: ScheduleType;
  completedTaskIds: Set<string>;
  onComplete: (task: PresetTask, person: Person) => void;
}

const SCHEDULE_LABELS: Record<ScheduleType, string> = {
  normal: 'Día Normal',
  hyrox: 'Hyrox (Express 15min)',
  homeoffice: 'Home Office',
  weekend: 'Fin de Semana',
};

const SCHEDULE_ICONS: Record<ScheduleType, string> = {
  normal: '🏢',
  hyrox: '🏋️',
  homeoffice: '🏠',
  weekend: '☀️',
};

const SCHEDULE_COLORS: Record<ScheduleType, string> = {
  normal: 'bg-cream-100 text-wood-700 border-cream-200',
  hyrox: 'bg-cream-200 text-cream-600 border-cream-300',
  homeoffice: 'bg-sage-100 text-sage-600 border-sage-200',
  weekend: 'bg-cream-100 text-cream-600 border-cream-200',
};

const CATEGORY_COLORS = {
  express: { bg: 'bg-cream-50', border: 'border-cream-200', badge: 'bg-cream-100 text-cream-600', dot: 'bg-cream-400' },
  routine: { bg: 'bg-sage-50', border: 'border-sage-200', badge: 'bg-sage-100 text-sage-600', dot: 'bg-sage-400' },
  deep: { bg: 'bg-cream-100', border: 'border-cream-300', badge: 'bg-cream-200 text-cream-700', dot: 'bg-cream-500' },
};

const SCHEDULES: ScheduleType[] = ['normal', 'homeoffice', 'hyrox', 'weekend'];

export default function TaskManager({ scheduleType, completedTaskIds, onComplete }: Props) {
  const [activeSchedule, setActiveSchedule] = useState<ScheduleType>(scheduleType);
  const [selectedPerson, setSelectedPerson] = useState<Person>('roberto');
  const [justCompleted, setJustCompleted] = useState<string | null>(null);

  const visibleTasks = useMemo(() =>
    PRESET_TASKS.filter(t => t.schedules.includes(activeSchedule)),
    [activeSchedule]
  );

  const grouped = useMemo(() => ({
    express: visibleTasks.filter(t => t.category === 'express'),
    routine: visibleTasks.filter(t => t.category === 'routine'),
    deep: visibleTasks.filter(t => t.category === 'deep'),
  }), [visibleTasks]);

  const completedToday = visibleTasks.filter(t => completedTaskIds.has(t.id)).length;
  const progress = visibleTasks.length > 0 ? (completedToday / visibleTasks.length) * 100 : 0;

  function handleComplete(task: PresetTask) {
    if (completedTaskIds.has(task.id)) return;
    setJustCompleted(task.id);
    onComplete(task, selectedPerson);
    setTimeout(() => setJustCompleted(null), 1200);
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-cream-100 rounded-3xl p-4 shadow-card border-2 border-cream-200">
        <h2 className="font-black text-wood-700 text-base mb-3 flex items-center gap-2">
          <Star size={16} className="text-cream-500 fill-cream-500"/> Tareas del Hogar
        </h2>

        {/* Who's completing */}
        <div className="flex gap-2 mb-4">
          <p className="text-xs text-wood-500 self-center mr-1">Completar como:</p>
          {(['roberto', 'alejandra'] as Person[]).map(p => (
            <button
              key={p}
              onClick={() => setSelectedPerson(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border
                ${selectedPerson === p
                  ? 'bg-cream-500 text-white border-cream-500 scale-105 shadow-sm'
                  : 'bg-cream-50 text-wood-600 border-cream-200 hover:border-cream-300'
                }`}
            >
              {p === 'roberto' ? '🧔 Roberto' : '👩 Alejandra'}
            </button>
          ))}
        </div>

        {/* Schedule filter */}
        <div className="flex gap-2 flex-wrap mb-4">
          {SCHEDULES.map(s => (
            <button
              key={s}
              onClick={() => setActiveSchedule(s)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border
                ${activeSchedule === s
                  ? `${SCHEDULE_COLORS[s]} scale-105 shadow-sm`
                  : 'bg-cream-50 text-wood-500 border-cream-200 hover:border-wood-300'
                }`}
            >
              <span>{SCHEDULE_ICONS[s]}</span>
              {SCHEDULE_LABELS[s]}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-wood-500 font-medium">{completedToday} de {visibleTasks.length} tareas</span>
            <span className="text-sage-600 font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-cream-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cream-400 to-cream-500 rounded-full transition-all duration-700 relative"
              style={{ width: `${progress}%` }}
            >
              {progress > 10 && (
                <div className="absolute right-1 top-0 h-full flex items-center">
                  <span className="text-white text-xs">🌿</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Task groups */}
      {(['express', 'routine', 'deep'] as const).map(cat => {
        const tasks = grouped[cat];
        if (tasks.length === 0) return null;
        const colors = CATEGORY_COLORS[cat];

        return (
          <div key={cat} className={`rounded-3xl border-2 ${colors.border} ${colors.bg} overflow-hidden shadow-card`}>
            <div className={`px-4 py-2.5 border-b ${colors.border} flex items-center gap-2`}>
              <div className={`w-2 h-2 rounded-full ${colors.dot}`}/>
              <h3 className="font-bold text-wood-700 text-sm">{CATEGORY_LABELS[cat]}</h3>
              <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-semibold ${colors.badge}`}>
                {tasks.filter(t => completedTaskIds.has(t.id)).length}/{tasks.length}
              </span>
            </div>
            <div className="divide-y divide-cream-100">
              {tasks.map(task => {
                const done = completedTaskIds.has(task.id);
                const justDone = justCompleted === task.id;

                return (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 px-4 py-3 transition-all duration-300
                      ${done ? 'opacity-60' : 'hover:bg-cream-50'}
                      ${justDone ? 'animate-pop' : ''}
                    `}
                  >
                    <span className="text-xl flex-shrink-0">{task.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${done ? 'line-through text-wood-400' : 'text-wood-700'}`}>
                        {task.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs font-bold text-wood-600 bg-cream-100 px-2 py-0.5 rounded-full border border-cream-200">
                        +{task.coins} 🪙
                      </span>
                      <button
                        onClick={() => handleComplete(task)}
                        disabled={done}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200
                          ${done
                            ? 'bg-sage-100 text-sage-600 border border-sage-200 cursor-default'
                            : 'bg-cream-500 text-white hover:bg-cream-600 active:scale-95 shadow-sm hover:scale-105'
                          }`}
                      >
                        {done
                          ? <><CheckCircle size={12}/> ¡Listo!</>
                          : 'Completar'
                        }
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {visibleTasks.length === 0 && (
        <div className="text-center py-8 text-wood-400">
          <p className="text-3xl mb-2">😌</p>
          <p className="text-sm font-medium">No hay tareas para este modo.</p>
        </div>
      )}
    </div>
  );
}
