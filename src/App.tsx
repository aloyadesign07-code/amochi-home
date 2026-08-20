import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { GameState, HouseStatus, Mood, Person, PresetTask, ScheduleType, FurnitureItem } from '@/types';
import { PRESET_TASKS, FURNITURE_ITEMS } from '@/data/tasks';
import PersonCard from '@/components/PersonCard';
import HouseStatusCard from '@/components/HouseStatus';
import PetCard from '@/components/PetCard';
import TaskManager from '@/components/TaskManager';
import FurnitureShop from '@/components/FurnitureShop';
import AIButler from '@/components/AIButler';
import CoinCounter from '@/components/CoinCounter';
import { Home, ListTodo, ShoppingBag } from 'lucide-react';

type Tab = 'home' | 'tasks' | 'shop';

function detectScheduleType(): ScheduleType {
  const day = new Date().getDay();
  if (day === 0 || day === 6) return 'weekend';
  if (day === 2 || day === 4) return 'hyrox';
  if (day === 3 || day === 5) return 'homeoffice';
  return 'normal';
}

function computeHouseStatus(tasksToday: number): HouseStatus {
  if (tasksToday >= 5) return 'Impecable';
  if (tasksToday >= 3) return 'Limpia';
  if (tasksToday >= 1) return 'Necesita atención';
  return 'Caótica';
}

const DEFAULT_STATE: GameState = {
  id: '',
  coins: 0,
  house_status: 'Caótica',
  roberto_mood: 'happy',
  alejandra_mood: 'happy',
  rita_happiness: 85,
  rita_hunger: 80,
  valky_happiness: 85,
  valky_hunger: 80,
  penny_happiness: 85,
  penny_hunger: 80,
  last_updated: new Date().toISOString(),
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [gameState, setGameState] = useState<GameState>(DEFAULT_STATE);
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(new Set());
  const [unlockedItems, setUnlockedItems] = useState<Set<string>>(new Set());
  const [lastCompletedTask, setLastCompletedTask] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [coinFlash, setCoinFlash] = useState(false);

  const scheduleType = detectScheduleType();

  // Compute tasks today from today's completions
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const tasksToday = completedTaskIds.size;
  const availableTasks = PRESET_TASKS.filter(t => t.schedules.includes(scheduleType));

  // Load data from Supabase
  useEffect(() => {
    async function loadData() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }
      try {
        const [stateRes, completionsRes, furnitureRes] = await Promise.all([
          supabase.from('game_state').select('*').maybeSingle(),
          supabase
            .from('task_completions')
            .select('task_id')
            .gte('completed_at', todayStart.toISOString()),
          supabase.from('furniture_unlocks').select('item_id'),
        ]);

        if (stateRes.data) {
          setGameState(stateRes.data as GameState);
        }

        if (completionsRes.data) {
          const ids = new Set(completionsRes.data.map((c: { task_id: string }) => c.task_id));
          setCompletedTaskIds(ids);
        }

        if (furnitureRes.data) {
          setUnlockedItems(new Set(furnitureRes.data.map((f: { item_id: string }) => f.item_id)));
        }
      } catch (err) {
        console.error('Failed to load game state', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const updateGameState = useCallback(async (updates: Partial<GameState>) => {
    const merged = { ...gameState, ...updates, last_updated: new Date().toISOString() };
    setGameState(merged);
    if (!isSupabaseConfigured || !gameState.id) return;
    await supabase.from('game_state').update(updates).eq('id', gameState.id);
  }, [gameState]);

  const handleMoodChange = useCallback((person: Person, mood: Mood) => {
    const field = person === 'roberto' ? 'roberto_mood' : 'alejandra_mood';
    updateGameState({ [field]: mood } as Partial<GameState>);
  }, [updateGameState]);

  const handleCompleteTask = useCallback(async (task: PresetTask, person: Person) => {
    const newCompleted = new Set(completedTaskIds);
    newCompleted.add(task.id);
    setCompletedTaskIds(newCompleted);
    setLastCompletedTask(task.name);
    setTimeout(() => setLastCompletedTask(null), 4000);

    const newCoins = gameState.coins + task.coins;
    const newHouseStatus = computeHouseStatus(newCompleted.size);

    // Pet happiness boost when feeding task done
    const petUpdate: Partial<GameState> = {
      coins: newCoins,
      house_status: newHouseStatus,
    };
    if (task.id === 'feed-pets') {
      petUpdate.rita_happiness = Math.min(100, gameState.rita_happiness + 20);
      petUpdate.rita_hunger = Math.min(100, gameState.rita_hunger + 25);
      petUpdate.valky_happiness = Math.min(100, gameState.valky_happiness + 20);
      petUpdate.valky_hunger = Math.min(100, gameState.valky_hunger + 25);
      petUpdate.penny_happiness = Math.min(100, gameState.penny_happiness + 20);
      petUpdate.penny_hunger = Math.min(100, gameState.penny_hunger + 25);
    }

    await updateGameState(petUpdate);

    // Log completion
    if (isSupabaseConfigured) {
      await supabase.from('task_completions').insert({
        task_id: task.id,
        task_name: task.name,
        coins_earned: task.coins,
        completed_by: person,
      });
    }

    setCoinFlash(true);
    setTimeout(() => setCoinFlash(false), 800);
  }, [completedTaskIds, gameState, updateGameState]);

  const handleFeedPet = useCallback(async (pet: 'Rita' | 'Valky' | 'Penny') => {
    const updates: Partial<GameState> = {};
    if (pet === 'Rita') {
      updates.rita_happiness = Math.min(100, gameState.rita_happiness + 15);
      updates.rita_hunger = Math.min(100, gameState.rita_hunger + 20);
    } else if (pet === 'Valky') {
      updates.valky_happiness = Math.min(100, gameState.valky_happiness + 15);
      updates.valky_hunger = Math.min(100, gameState.valky_hunger + 20);
    } else {
      updates.penny_happiness = Math.min(100, gameState.penny_happiness + 15);
      updates.penny_hunger = Math.min(100, gameState.penny_hunger + 20);
    }
    await updateGameState(updates);
  }, [gameState, updateGameState]);

  const handleUnlockItem = useCallback(async (item: FurnitureItem) => {
    if (gameState.coins < item.cost) return;
    const newUnlocked = new Set(unlockedItems);
    newUnlocked.add(item.id);
    setUnlockedItems(newUnlocked);

    await updateGameState({ coins: gameState.coins - item.cost });
    if (isSupabaseConfigured) {
      await supabase.from('furniture_unlocks').insert({ item_id: item.id });
    }
  }, [gameState.coins, unlockedItems, updateGameState]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl animate-float mb-4">🏡</div>
          <p className="text-wood-700 font-semibold text-sm">Cargando Amochi Home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D87A43' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    }}>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-cream-100/95 backdrop-blur-md border-b border-cream-200 shadow-cozy">
        <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-cream-200 shadow-card flex-shrink-0">
              <img src="/images/amochi_home_logo.jpg" alt="Amochi Home" className="h-full w-full object-cover" />
            </div>
            <div>
              <h1 className="font-black text-wood-700 text-base leading-none">Amochi Home</h1>
              <p className="text-wood-500 text-xs">amor + tamagotchi</p>
            </div>
          </div>
          <CoinCounter coins={gameState.coins} flash={coinFlash}/>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 pb-28 pt-4">
        {activeTab === 'home' && (
          <div className="space-y-4">
            {/* Person cards */}
            <div className="grid grid-cols-2 gap-3">
              <PersonCard person="roberto" mood={gameState.roberto_mood as Mood} onMoodChange={handleMoodChange}/>
              <PersonCard person="alejandra" mood={gameState.alejandra_mood as Mood} onMoodChange={handleMoodChange}/>
            </div>

            {/* AI Butler */}
            <AIButler
              gameState={gameState}
              scheduleType={scheduleType}
              tasksToday={tasksToday}
              totalTasksAvailable={availableTasks.length}
              lastCompletedTask={lastCompletedTask}
            />

            {/* House status */}
            <HouseStatusCard
              status={gameState.house_status as HouseStatus}
              coins={gameState.coins}
              tasksToday={tasksToday}
            />

            {/* Pets */}
            <div>
              <h2 className="font-black text-wood-700 text-sm mb-3 flex items-center gap-2">
                <span className="text-base">🐾</span> Mascotas
              </h2>
              <div className="space-y-3">
                <PetCard
                  name="Rita"
                  happiness={gameState.rita_happiness}
                  hunger={gameState.rita_hunger}
                  onFeed={() => handleFeedPet('Rita')}
                />
                <PetCard
                  name="Valky"
                  happiness={gameState.valky_happiness}
                  hunger={gameState.valky_hunger}
                  onFeed={() => handleFeedPet('Valky')}
                />
                <PetCard
                  name="Penny"
                  happiness={gameState.penny_happiness}
                  hunger={gameState.penny_hunger}
                  onFeed={() => handleFeedPet('Penny')}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <TaskManager
            scheduleType={scheduleType}
            completedTaskIds={completedTaskIds}
            onComplete={handleCompleteTask}
          />
        )}

        {activeTab === 'shop' && (
          <FurnitureShop
            coins={gameState.coins}
            unlockedItems={unlockedItems}
            onUnlock={handleUnlockItem}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-cream-100/95 backdrop-blur-md border-t border-cream-200 shadow-cozy-lg">
        <div className="max-w-2xl mx-auto px-4 py-2 flex justify-around">
          {([
            { tab: 'home' as Tab, icon: <Home size={20}/>, label: 'Hogar', badge: null as string | null },
            { tab: 'tasks' as Tab, icon: <ListTodo size={20}/>, label: 'Tareas', badge: `${tasksToday}/${availableTasks.length}` as string | null },
            { tab: 'shop' as Tab, icon: <ShoppingBag size={20}/>, label: 'Tienda', badge: null as string | null },
          ]).map(({ tab, icon, label, badge }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center gap-0.5 px-6 py-2 rounded-2xl transition-all duration-200 relative
                ${activeTab === tab
                  ? 'text-cream-600 bg-cream-200'
                  : 'text-wood-500 hover:text-wood-700 hover:bg-cream-200/50'
                }`}
            >
              <span className={activeTab === tab ? 'scale-110' : ''}>{icon}</span>
              <span className="text-xs font-semibold">{label}</span>
              {badge && (
                <span className="absolute -top-1 -right-1 text-xs bg-cream-500 text-white rounded-full px-1.5 py-0.5 font-bold leading-none min-w-[1.25rem] text-center">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
