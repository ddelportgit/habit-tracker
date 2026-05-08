import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient.js";
import Auth from "./Auth";
import Habits from "./Habits";

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!session) return <Auth />;

  return (
    <div>
      <button onClick={() => supabase.auth.signOut()}>Log out</button>
      <Habits session={session} />
    </div>
  );
};

export default App;
