import { BrowserRouter as Router, Routes, Route, ScrollRestoration } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SportPage from "./pages/SportPage";
import FighterPage from "./pages/FighterPage";
import FightsPage from "./pages/FightsPage";
import MatchupsPage from "./pages/MatchupsPage";
import SkillsPage from "./pages/SkillsPage";
import RankingsPage from "./pages/RankingsPage";
import ChatBot from "./components/ChatBot";
import "./App.css";
function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sport/:sportId" element={<SportPage />} />
            <Route path="/fighter/:fighterId" element={<FighterPage />} />
            <Route path="/fights" element={<FightsPage />} />
            <Route path="/matchups" element={<MatchupsPage />} />
            <Route path="/arsenal" element={<SkillsPage />} />
            <Route path="/rankings" element={<RankingsPage />} />
          </Routes>
          <ChatBot />
        </main>
        <footer className="footer">
          <p>© {new Date().getFullYear()} CombatZone. All rights reserved.</p>
          <p style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>
            The ultimate encyclopedia for combat sports.
          </p>
        </footer>
        {}
        <Navbar />
      </div>
    </Router>
  );
}
export default App;