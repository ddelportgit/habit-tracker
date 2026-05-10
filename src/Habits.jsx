import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient.js";
import Heatmap from "./Heatmap";
import "./Habits.css";

const Habits = ({ session }) => {
  const [habits, setHabits] = useState([]);
  const [completions, setCompletions] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [openHeatmapId, setOpenHeatmapId] = useState(null);

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
    const today = new Date().toISOString().split("T")[0];
    return completions.some((c) => c.habit_id === habitId && c.completed_date === today);
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

    return streak;
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

  async function updateHabit(id) {
    if (!editingName.trim()) return;

    const { error } = await supabase.from("habits").update({ name: editingName }).eq("id", id);

    if (error) console.log(error);
    else {
      setEditingId(null);
      setEditingName("");
      fetchHabits();
    }
  }

  function toggleHeatmap(habitId) {
    setOpenHeatmapId(openHeatmapId === habitId ? null : habitId);
  }

  return (
    <div>
      <div className="habits-header">
        <h1>My Habits</h1>
      </div>
      <form className="add-habit-form" onSubmit={addHabit}>
        <input
          type="text"
          placeholder="Add new habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button type="submit">
          <i className="fa-solid fa-plus"></i>
        </button>
      </form>
      {habits.length === 0 ? (
        <div className="empty-state">
          <i className="fa-solid fa-list-check"></i>
          <h2>No habits yet</h2>
          <p>Add your first habit above to get started</p>
        </div>
      ) : (
        <ul className="habits-list">
          {habits.map((habit) => (
            <li className="habit-card" key={habit.id}>
              {editingId === habit.id ? (
                <>
                  <input
                    className="edit-input"
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                  <button className="save-btn" onClick={() => updateHabit(habit.id)}>
                    <i className="fa-solid fa-floppy-disk"></i>
                  </button>
                  <button className="cancel-btn" onClick={() => setEditingId(null)}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </>
              ) : (
                <>
                  <span className={`habit-name ${isCompletedToday(habit.id) ? "done" : ""}`}>
                    {habit.name}
                  </span>
                  <span className="streak">
                    <i className="fa-solid fa-fire"></i> {getStreak(habit.id)} day streak
                  </span>
                  <button className="done-btn" onClick={() => toggleCompletion(habit.id)}>
                    {isCompletedToday(habit.id) ? (
                      <i className="fa-solid fa-check"></i>
                    ) : (
                      <i className="fa-regular fa-circle"></i>
                    )}
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingId(habit.id);
                      setEditingName(habit.name);
                    }}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button className="delete-btn" onClick={() => deleteHabit(habit.id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button className="history-btn" onClick={() => toggleHeatmap(habit.id)}>
                    {openHeatmapId === habit.id ? (
                      <i className="fa-solid fa-calendar-xmark"></i>
                    ) : (
                      <i className="fa-solid fa-calendar-days"></i>
                    )}
                  </button>
                </>
              )}
              {openHeatmapId === habit.id && (
                <Heatmap habitId={habit.id} completions={completions} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Habits;
