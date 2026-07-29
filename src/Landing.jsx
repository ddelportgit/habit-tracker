import "./Landing.css";

const Landing = ({ onGetStarted, onTryOut }) => {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <span className="landing-logo">Habitly</span>
        <button className="landing-nav-btn" onClick={onGetStarted}>
          Log in
        </button>
      </nav>

      <section className="hero">
        <h1 className="hero-title">
          Build habits that <span className="hero-accent">stick</span>
        </h1>
        <p className="hero-subtitle">
          Track your daily habits, build streaks, and visualize your progress over time.
        </p>
        <div className="hero-buttons">
          <button className="hero-btn" onClick={onGetStarted}>
            Get started for free
          </button>
          <button className="hero-btn-secondary" onClick={onTryOut}>
            Try it out
          </button>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Everything you need to build better habits</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>
              Streak tracking <i className="fa-solid fa-fire"></i>
            </h3>
            <p>Stay motivated by tracking your daily streaks and never break the chain.</p>
          </div>
          <div className="feature-card">
            <h3>
              Habit heatmap <i className="fa-solid fa-calendar-days"></i>
            </h3>
            <p>Visualize your consistency over the past 12 weeks with a beautiful heatmap.</p>
          </div>
          <div className="feature-card">
            <h3>
              Daily check-ins <i className="fa-solid fa-check"></i>
            </h3>
            <p>Mark habits as done each day and watch your progress grow over time</p>
          </div>
          <div className="feature-card">
            <h3>
              Private & secure <i className="fa-solid fa-lock"></i>
            </h3>
            <p>Your habits are private to you. Nobody else can see your data.</p>
          </div>
          <div className="feature-card">
            <h3>
              Full control <i className="fa-solid fa-pen"></i>
            </h3>
            <p>Add, edit, and delete habits anytime. You are always in control.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="section-title">Get started in minutes</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Create an account</h3>
              <p>Sign up for free in seconds. No credit card required.</p>
            </div>
          </div>
          <div className="step-divider" />
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Add your habits</h3>
              <p>Add the habits you want to build and start tracking right away.</p>
            </div>
          </div>
          <div className="step-divider" />
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Check in daily</h3>
              <p>Mark habits as done each day and watch your streaks grow.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span className="landing-logo">Habitly</span>
        <p className="footer-text">
          Track your habits effortlessly with Habitly. Get started now or try the demo.
        </p>
        <div className="hero-buttons">
          <button className="hero-btn" onClick={onGetStarted}>
            Sign Up
          </button>
          <button className="hero-btn-secondary" onClick={onTryOut}>
            Demo
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
