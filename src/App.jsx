import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient.js";
import Auth from "./Auth";
import Habits from "./Habits";
import Landing from "./Landing";
import "./Habits.css";

const App = () => {
  const [session, setSession] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  async function handleTryOut() {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) console.log(error);
  }

  if (showLanding && !session)
    return <Landing onGetStarted={() => setShowLanding(false)} onTryOut={handleTryOut} />;
  if (!session)
    return (
      <div className="auth-wrapper">
        <Auth onBack={() => setShowLanding(true)} />
      </div>
    );

  return (
    <div className="app-container">
      <div className="habits-header">
        <button className="logout-btn" onClick={() => supabase.auth.signOut()}>
          Log out
        </button>
        <button className="dark-mode-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
        </button>
      </div>
      <Habits session={session} />
    </div>
  );
};

export default App;
