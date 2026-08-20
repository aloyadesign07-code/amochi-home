/*
# Amochi Home - Game State Schema

A cozy gamified home management app for Roberto and Alejandra.

## Tables

### game_state
Single-row table tracking overall house game state.
- coins: total earned coins
- house_status: current cleanliness level
- roberto_mood, alejandra_mood: current mood for each person
- pet happiness and hunger bars for Rita, Valky, Penny

### task_completions
Log of every task completed, with who completed it and when.
- task_id: identifier of the preset task
- task_name: display name
- coins_earned: how many coins this completion gave
- completed_by: 'roberto' or 'alejandra'
- completed_at: timestamp

### furniture_unlocks
Tracks which furniture items have been unlocked/purchased.

## Security
- RLS enabled on all tables
- anon + authenticated access (no sign-in required for this app)
- USING (true) intentional: shared family data, no per-user isolation needed
*/

-- Game state table (single shared row)
CREATE TABLE IF NOT EXISTS game_state (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  coins integer NOT NULL DEFAULT 0,
  house_status text NOT NULL DEFAULT 'Limpia',
  roberto_mood text NOT NULL DEFAULT 'happy',
  alejandra_mood text NOT NULL DEFAULT 'happy',
  rita_happiness integer NOT NULL DEFAULT 85,
  rita_hunger integer NOT NULL DEFAULT 80,
  valky_happiness integer NOT NULL DEFAULT 85,
  valky_hunger integer NOT NULL DEFAULT 80,
  penny_happiness integer NOT NULL DEFAULT 85,
  penny_hunger integer NOT NULL DEFAULT 80,
  last_updated timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE game_state ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_game_state" ON game_state;
CREATE POLICY "anon_select_game_state" ON game_state FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_game_state" ON game_state;
CREATE POLICY "anon_insert_game_state" ON game_state FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_game_state" ON game_state;
CREATE POLICY "anon_update_game_state" ON game_state FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_game_state" ON game_state;
CREATE POLICY "anon_delete_game_state" ON game_state FOR DELETE
  TO anon, authenticated USING (true);

-- Task completions log
CREATE TABLE IF NOT EXISTS task_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id text NOT NULL,
  task_name text NOT NULL,
  coins_earned integer NOT NULL,
  completed_by text NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE task_completions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_task_completions" ON task_completions;
CREATE POLICY "anon_select_task_completions" ON task_completions FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_task_completions" ON task_completions;
CREATE POLICY "anon_insert_task_completions" ON task_completions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_task_completions" ON task_completions;
CREATE POLICY "anon_update_task_completions" ON task_completions FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_task_completions" ON task_completions;
CREATE POLICY "anon_delete_task_completions" ON task_completions FOR DELETE
  TO anon, authenticated USING (true);

-- Furniture unlocks table
CREATE TABLE IF NOT EXISTS furniture_unlocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id text NOT NULL UNIQUE,
  unlocked_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE furniture_unlocks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_furniture_unlocks" ON furniture_unlocks;
CREATE POLICY "anon_select_furniture_unlocks" ON furniture_unlocks FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_furniture_unlocks" ON furniture_unlocks;
CREATE POLICY "anon_insert_furniture_unlocks" ON furniture_unlocks FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_furniture_unlocks" ON furniture_unlocks;
CREATE POLICY "anon_update_furniture_unlocks" ON furniture_unlocks FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_furniture_unlocks" ON furniture_unlocks;
CREATE POLICY "anon_delete_furniture_unlocks" ON furniture_unlocks FOR DELETE
  TO anon, authenticated USING (true);

-- Seed a single game_state row if none exists
INSERT INTO game_state (coins, house_status)
SELECT 0, 'Limpia'
WHERE NOT EXISTS (SELECT 1 FROM game_state);
