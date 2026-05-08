import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient.js";

const Habits = ({ session }) => {
  const [habits, setHabits] = useState([]);
  const [completions, setCompletions] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    fetchHabits();
    fetchCompletions();
  }, []);

  async function fetchHabits() {
    const { data, error } = await supabase
      .from("habits")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) console.log(error);
    else setHabits(data);
  }

  async function fetchCompletions() {
    const { data, error } = await supabase.from("completions").select("*");

    if (error) console.log(error);
    else setCompletions(data);
  }

  function isCompletedToday(habitId) {
    return completions.some((c) => c.habit_id === habitId);
  }

  async function toggleCompletion(habitId) {
    const today = new Date().toISOString().split("T")[0];
    const alreadyDone = isCompletedToday(habitId);

    if (alreadyDone) {
      const { error } = await supabase
        .from("completions")
        .delete()
        .eq("habit_id", habitId)
        .eq("completed_date", today);

      if (error) console.log(error);
    } else {
      const { error } = await supabase
        .from("completions")
        .insert({ habit_id: habitId, user_id: session.user.id });

      if (error) console.log(error);
    }

    fetchCompletions();
  }

  function getStreak(habitId) {
    const dates = completions
      .filter((c) => c.habit_id === habitId)
      .map((c) => c.completed_date)
      .sort()
      .reverse();

    if (dates.length === 0) return 0;

    let streak = 0;
    let current = new Date();

    for (let i = 0; i < dates.length; i++) {
      const expected = current.toISOString().split("T")[0];

      if (dates[i] === expected) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }
  }

  async function addHabit(e) {
    e.preventDefault();
    if (!newHabit.trim()) return;

    const { error } = await supabase
      .from("habits")
      .insert({ name: newHabit, user_id: session.user.id });

    if (error) console.log(error);
    else {
      setNewHabit("");
      fetchHabits();
    }
  }

  async function deleteHabit(id) {
    const { error } = await supabase.from("habits").delete().eq("id", id);

    if (error) console.log(error);
    else fetchHabits();
  }

  return (
    <div>
      <h1>My Habits</h1>
      <form onSubmit={addHabit}>
        <input
          type="text"
          placeholder="Add new habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            <span style={{ textDecoration: isCompletedToday(habit.id) ? "line-through" : "none" }}>
              {habit.name}
            </span>
            <span>🔥 {getStreak(habit.id)} day streak</span>
            <button onClick={() => toggleCompletion(habit.id)}>
              {isCompletedToday(habit.id) ? "✅ Done" : "⬜ Mark done"}
            </button>
            <button onClick={() => deleteHabit(habit.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Habits;
