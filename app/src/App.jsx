import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SportPage from "./pages/SportPage";
import FighterPage from "./pages/FighterPage";
import FightsPage from "./pages/FightsPage";
import MatchupsPage from "./pages/MatchupsPage";
import SkillsPage from "./pages/SkillsPage";
import RankingsPage from "./pages/RankingsPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";
import ChatBot from "./components/ChatBot";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container flex flex-col min-h-screen">
        <Navbar />
        <main className="main-content flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sport/:sportId" element={<SportPage />} />
            <Route path="/fighter/:fighterId" element={<FighterPage />} />
            <Route path="/fights" element={<FightsPage />} />
            <Route path="/matchups" element={<MatchupsPage />} />
            <Route path="/arsenal" element={<SkillsPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/rankings" element={<RankingsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <ChatBot />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
