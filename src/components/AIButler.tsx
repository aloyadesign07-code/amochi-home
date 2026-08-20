import { GameState, ScheduleType, HouseStatus } from '@/types';
import { Bot, AlertTriangle } from 'lucide-react';

interface Props {
  gameState: GameState;
  scheduleType: ScheduleType;
  tasksToday: number;
  totalTasksAvailable: number;
  lastCompletedTask: string | null;
}

interface ButlerMessage {
  type: 'advice' | 'warning' | 'praise' | 'penalty';
  text: string;
  emoji: string;
}

function getDailyAdvice(scheduleType: ScheduleType, state: GameState, tasksToday: number, total: number): ButlerMessage[] {
  const messages: ButlerMessage[] = [];
  const day = new Date().getDay();
  const dayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const today = dayNames[day];

  // Main schedule advice
  if (scheduleType === 'hyrox') {
    messages.push({
      type: 'advice',
      emoji: '🏋️',
      text: `¡Es ${today} de Hyrox! Enfóquense solo en las tareas express de 15 minutos. Dejen lo demás para después del entrenamiento... si tienen energía. 💪`,
    });
  } else if (scheduleType === 'homeoffice') {
    messages.push({
      type: 'advice',
      emoji: '🏠',
      text: `Día de home office: aprovecha los breaks para hacer tareas de rutina. La lavadora puede correr mientras trabajas. ¡Multitasking cozy!`,
    });
  } else if (scheduleType === 'weekend') {
    messages.push({
      type: 'advice',
      emoji: '☀️',
      text: `¡Fin de semana! Es el mejor momento para tareas profundas. Pongan música, hagan café y ataquen la casa en equipo. Rita y Penny los van a amar.`,
    });
  } else {
    messages.push({
      type: 'advice',
      emoji: '📋',
      text: `Día normal de trabajo. Con solo hacer las tareas express al llegar a casa, ya tienen la situación bajo control. ¡5 minutos cada uno y listo!`,
    });
  }

  // Pet warnings
  const petIssues: string[] = [];
  if (state.rita_happiness < 50) petIssues.push('Rita');
  if (state.valky_happiness < 50) petIssues.push('Valky');
  if (state.penny_happiness < 50) petIssues.push('Penny');
  if (petIssues.length > 0) {
    messages.push({
      type: 'warning',
      emoji: '🐾',
      text: `${petIssues.join(' y ')} ${petIssues.length > 1 ? 'están' : 'está'} un poco triste${petIssues.length > 1 ? 's' : ''}. ¡No se les olvide darles amor y comida!`,
    });
  }

  // House status
  if (state.house_status === 'Caótica') {
    messages.push({
      type: 'penalty',
      emoji: '😱',
      text: `Valky y Penny están preocupados porque la casa está hecha un desastre. El caos tiene consecuencias: -10 monedas si no completan al menos 3 tareas hoy.`,
    });
  } else if (state.house_status === 'Impecable') {
    messages.push({
      type: 'praise',
      emoji: '✨',
      text: `¡La casa está impecable! Son el dúo más organizado del barrio. Rita canta de felicidad. Sigan así, merecen ese sofá.`,
    });
  }

  // Task completion feedback
  if (tasksToday === 0 && total > 0) {
    messages.push({
      type: 'warning',
      emoji: '⏰',
      text: `Aún no han completado ninguna tarea hoy. ¡No se preocupen, todavía hay tiempo! Empiecen con algo pequeño y el resto fluye solo.`,
    });
  } else if (tasksToday >= total && total > 0) {
    messages.push({
      type: 'praise',
      emoji: '🏆',
      text: `¡Completaron TODAS las tareas del día! Son unos campeones del hogar. Merecen Netflix, palomitas y nada de culpa. 🎉`,
    });
  } else if (tasksToday > 0) {
    messages.push({
      type: 'praise',
      emoji: '🌟',
      text: `¡Llevan ${tasksToday} tarea${tasksToday > 1 ? 's' : ''} completa${tasksToday > 1 ? 's' : ''}! Buen ritmo. ${total - tasksToday} más y la casa queda perfecta.`,
    });
  }

  return messages;
}

function getTaskPraise(taskName: string): string {
  const praises = [
    `¡Excelente! "${taskName}" completada. Valky meneó la cola de la emoción.`,
    `¡Bravo! "${taskName}" tachada. Rita cantó una canción de celebración.`,
    `¡Increíble! "${taskName}" hecha. Penny dio tres vueltas de felicidad.`,
    `¡Boom! "${taskName}" lista. La casa respira mejor ahora.`,
    `¡Así se hace! "${taskName}" completada. +1 punto de karma doméstico.`,
  ];
  return praises[Math.floor(Math.random() * praises.length)];
}

const TYPE_STYLES = {
  advice: { bg: 'bg-cream-50', border: 'border-cream-200', text: 'text-wood-700', icon: '💬' },
  warning: { bg: 'bg-cream-100', border: 'border-cream-300', text: 'text-cream-700', icon: '⚠️' },
  praise: { bg: 'bg-sage-50', border: 'border-sage-200', text: 'text-sage-700', icon: '⭐' },
  penalty: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', icon: '🚨' },
};

export default function AIButler({ gameState, scheduleType, tasksToday, totalTasksAvailable, lastCompletedTask }: Props) {
  const messages = getDailyAdvice(scheduleType, gameState, tasksToday, totalTasksAvailable);

  return (
    <div className="space-y-3">
      <div className="bg-cream-100 rounded-3xl border-2 border-cream-200 shadow-card overflow-hidden">
        <div className="bg-gradient-to-r from-cream-400 to-cream-500 px-4 py-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-2xl bg-white/20 flex items-center justify-center">
            <Bot size={16} className="text-white"/>
          </div>
          <div>
            <h3 className="font-black text-white text-sm">Capataz Amochi</h3>
            <p className="text-cream-100 text-xs">Tu mayordomo del hogar</p>
          </div>
          <div className="ml-auto text-white text-xl animate-float">🤖</div>
        </div>

        <div className="p-4 space-y-3">
          {/* Last completed task praise */}
          {lastCompletedTask && (
            <div className="rounded-2xl px-3 py-2.5 bg-sage-50 border-2 border-sage-200 animate-pop">
              <p className="text-xs font-medium text-sage-700">
                🌟 {getTaskPraise(lastCompletedTask)}
              </p>
            </div>
          )}

          {messages.map((msg, i) => {
            const style = TYPE_STYLES[msg.type];
            return (
              <div key={i} className={`rounded-2xl px-3 py-2.5 border-2 ${style.bg} ${style.border}`}>
                <div className="flex gap-2">
                  <span className="text-base flex-shrink-0">{msg.emoji}</span>
                  <p className={`text-xs font-medium leading-relaxed ${style.text}`}>{msg.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Penalty box if house is caotic */}
      {gameState.house_status === 'Caótica' && (
        <div className="bg-rose-50 rounded-3xl border-2 border-rose-200 p-4 shadow-card animate-pop">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-rose-500 flex-shrink-0 mt-0.5"/>
            <div>
              <p className="font-bold text-rose-700 text-sm">¡Advertencia del Capataz!</p>
              <p className="text-xs text-rose-600 mt-1">
                Valky y Penny están tristes porque la casa está desordenada. Si no hacen al menos 3 tareas hoy, se aplicará una penalización de <strong>-10 Monedas</strong> al cerrar el día.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
