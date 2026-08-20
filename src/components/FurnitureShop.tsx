import { FURNITURE_ITEMS } from '@/data/tasks';
import { FurnitureItem } from '@/types';
import { ShoppingBag, Lock, CheckCircle } from 'lucide-react';

interface Props {
  coins: number;
  unlockedItems: Set<string>;
  onUnlock: (item: FurnitureItem) => void;
}

export default function FurnitureShop({ coins, unlockedItems, onUnlock }: Props) {
  const totalItems = FURNITURE_ITEMS.length;
  const unlockedCount = FURNITURE_ITEMS.filter(i => unlockedItems.has(i.id)).length;
  const progress = (unlockedCount / totalItems) * 100;

  return (
    <div className="space-y-4">
      <div className="bg-cream-100 rounded-3xl p-4 shadow-card border-2 border-cream-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-black text-wood-700 text-base flex items-center gap-2">
            <ShoppingBag size={16} className="text-wood-500"/> Tienda Real
          </h2>
          <span className="text-xs text-wood-600 font-bold bg-cream-50 px-2 py-1 rounded-xl border border-cream-200">
            {coins} 🪙 disponibles
          </span>
        </div>
        <p className="text-xs text-wood-500 mb-3">
          Gana monedas completando tareas y desbloquea artículos para tu hogar real.
        </p>

        <div className="flex justify-between text-xs mb-1">
          <span className="text-wood-500">{unlockedCount} de {totalItems} desbloqueados</span>
          <span className="text-sage-600 font-bold">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-cream-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-wood-400 to-wood-500 rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {FURNITURE_ITEMS.map(item => {
          const unlocked = unlockedItems.has(item.id);
          const canAfford = coins >= item.cost;

          return (
            <div
              key={item.id}
              className={`bg-cream-100 rounded-3xl border-2 shadow-card transition-all duration-300 overflow-hidden
                ${unlocked
                  ? 'border-sage-300 bg-sage-50/50'
                  : canAfford
                  ? 'border-cream-300 hover:border-cream-400'
                  : 'border-cream-200'
                }`}
            >
              <div className="flex items-center gap-4 p-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 border-2
                  ${unlocked ? 'bg-sage-100 border-sage-200' : 'bg-cream-50 border-cream-200'}`}>
                  {item.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-wood-700 text-sm">{item.nameEs}</h4>
                    {unlocked && (
                      <span className="flex items-center gap-1 text-xs text-sage-600 bg-sage-100 px-2 py-0.5 rounded-full border border-sage-200 font-semibold">
                        <CheckCircle size={10}/> Desbloqueado
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-wood-500 mt-0.5">{item.description}</p>

                  {/* Progress bar to unlock */}
                  {!unlocked && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-wood-400">{Math.min(coins, item.cost)} / {item.cost} 🪙</span>
                        <span className={`font-semibold ${canAfford ? 'text-sage-600' : 'text-wood-400'}`}>
                          {canAfford ? '¡Disponible!' : `Faltan ${item.cost - coins} 🪙`}
                        </span>
                      </div>
                      <div className="w-full bg-cream-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${canAfford ? 'bg-sage-400' : 'bg-amber-400'}`}
                          style={{ width: `${Math.min(100, (coins / item.cost) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="text-xs font-black text-wood-700 bg-cream-100 px-2.5 py-1 rounded-xl border border-cream-200">
                    {item.cost} 🪙
                  </span>
                  {!unlocked ? (
                    <button
                      onClick={() => canAfford && onUnlock(item)}
                      disabled={!canAfford}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200
                        ${canAfford
                          ? 'bg-cream-500 text-white hover:bg-cream-600 active:scale-95 hover:scale-105 shadow-sm'
                          : 'bg-cream-50 text-wood-400 border border-cream-200 cursor-not-allowed'
                        }`}
                    >
                      {canAfford ? (
                        <><ShoppingBag size={12}/> Comprar</>
                      ) : (
                        <><Lock size={12}/> Bloqueado</>
                      )}
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-sage-100 text-sage-600 border border-sage-200">
                      <CheckCircle size={12}/> ¡Tuyo!
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
