import { useState, useEffect } from 'react';

interface Props {
  coins: number;
  flash?: boolean;
}

export default function CoinCounter({ coins, flash = false }: Props) {
  const [displayCoins, setDisplayCoins] = useState(coins);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (coins !== displayCoins) {
      setAnimating(true);
      const step = coins > displayCoins ? 1 : -1;
      const diff = Math.abs(coins - displayCoins);
      const stepSize = Math.max(1, Math.floor(diff / 20));
      const interval = setInterval(() => {
        setDisplayCoins(prev => {
          const next = prev + step * stepSize;
          if ((step > 0 && next >= coins) || (step < 0 && next <= coins)) {
            clearInterval(interval);
            setAnimating(false);
            return coins;
          }
          return next;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [coins]);

  return (
    <div className={`relative flex items-center gap-2 bg-cream-100 border-2 border-cream-200 rounded-2xl px-4 py-2.5 shadow-card transition-all duration-300 ${flash ? 'scale-105' : ''}`}>
      <span className={`text-2xl transition-transform duration-300 ${animating ? 'animate-bounce-coin' : ''}`}>🪙</span>
      <div>
        <p className="text-xs text-wood-500 font-medium leading-none">$MONEDAS</p>
        <p className="text-xl font-black text-wood-700 leading-tight tabular-nums">{displayCoins.toLocaleString()}</p>
      </div>
      {flash && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-cream-500 font-bold text-sm animate-bounce-coin pointer-events-none">
          +🪙
        </div>
      )}
    </div>
  );
}
