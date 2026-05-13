import { useState } from "react";
import { supabase } from "./supabaseClient.js";
import "./Auth.css";

const Auth = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
    }
  }

  return (
    <div className="auth-container">
      <button className="auth-back-btn" onClick={onBack}>
        <i className="fa-solid fa-arrow-left"></i> Back
      </button>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      {error && <p className="auth-error">{error}</p>}
      <button className="auth-toggle" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need an account? Register" : "Have an account? Login"}
      </button>
    </div>
  );
};

export default Auth;
