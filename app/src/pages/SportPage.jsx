import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FighterCard from "../components/FighterCard";
export default function SportPage() {
    const { sportId } = useParams();
    const navigate = useNavigate();
    const [sport, setSport] = useState(null);
    const [fighters, setFighters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFocused, setSearchFocused] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch(`http://127.0.0.1:8000/api/sports/${sportId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setSport(null);
                } else {
                    setSport(data.sport);
                }
            })
            .catch((err) => console.error("Error fetching sport:", err));
        fetch(`http://127.0.0.1:8000/api/sports/${sportId}/fighters`)
            .then((res) => res.json())
            .then((data) => {
                setFighters(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching fighters:", err);
                setLoading(false);
            });
    }, [sportId]);
    if (loading && !sport) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
            }}>
                <div style={{
                    width: '50px',
                    height: '50px',
                    border: '3px solid rgba(255,255,255,0.1)',
                    borderTopColor: '#4ade80',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                }} />
                <h2 style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                }}>Loading Roster...</h2>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }
    if (!sport) {
        return (
            <div className="sport-page" style={{ textAlign: "center", paddingTop: "6rem" }}>
                <h1>Sport not found</h1>
                <button className="back-button" onClick={() => navigate("/")}>
                    ← Back to Home
                </button>
            </div>
        );
    }
    const filteredFighters = fighters.filter(fighter =>
        fighter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (fighter.nickname && fighter.nickname.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return (
        <div style={{ "--sport-color": sport.color, minHeight: '100vh' }}>
            {}
            <div style={{
                position: 'relative',
                padding: '8rem 2rem 4rem',
                overflow: 'hidden',
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
            }}>
                {}
                <div style={{
                    position: 'absolute',
                    top: '-30%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '140%',
                    height: '140%',
                    background: `radial-gradient(ellipse at center, ${sport.color}18 0%, ${sport.color}08 30%, transparent 60%)`,
                    pointerEvents: 'none',
                }} />
                {}
                <div style={{
                    position: 'absolute',
                    right: '-2%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 'clamp(6rem, 14vw, 14rem)',
                    fontWeight: 900,
                    fontStyle: 'italic',
                    textTransform: 'uppercase',
                    color: 'transparent',
                    WebkitTextStroke: `1.5px ${sport.color}18`,
                    lineHeight: 0.85,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-3px',
                    zIndex: 0,
                }}>
                    {sport.fullName}
                </div>
                {}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: `linear-gradient(90deg, transparent, ${sport.color}40, transparent)`,
                }} />
                <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2, width: '100%' }}>
                    {}
                    <button
                        onClick={() => navigate("/")}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.6rem 1.4rem',
                            borderRadius: '50px',
                            fontSize: '0.75rem',
                            fontFamily: "'Oswald', sans-serif",
                            fontWeight: 700,
                            color: '#fff',
                            background: sport.color,
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            marginBottom: '2.5rem',
                            boxShadow: `0 4px 20px ${sport.color}44`,
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.boxShadow = `0 6px 30px ${sport.color}66`;
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = `0 4px 20px ${sport.color}44`;
                        }}
                    >
                        ← All Sports
                    </button>
                    {}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                        <div>
                            {}
                            <div style={{
                                fontFamily: "'Oswald', sans-serif",
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '4px',
                                color: sport.color,
                                marginBottom: '0.5rem',
                            }}>
                                Combat Sport
                            </div>
                            {}
                            <h1 style={{
                                fontFamily: "'Oswald', sans-serif",
                                fontSize: 'clamp(3rem, 5vw, 5rem)',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                lineHeight: 0.9,
                                letterSpacing: '-2px',
                                color: '#fff',
                                marginBottom: '0.8rem',
                            }}>
                                {sport.fullName}
                            </h1>
                            {}
                            <p style={{
                                fontSize: '1.05rem',
                                color: 'rgba(255,255,255,0.45)',
                                maxWidth: '550px',
                                lineHeight: 1.7,
                                marginBottom: '1.5rem',
                            }}>
                                {sport.description}
                            </p>
                            {}
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                {!loading && (
                                    <span style={{
                                        padding: '0.5rem 1.3rem',
                                        background: `${sport.color}18`,
                                        color: sport.color,
                                        borderRadius: '50px',
                                        fontSize: '0.8rem',
                                        fontFamily: "'Oswald', sans-serif",
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        border: `1px solid ${sport.color}35`,
                                    }}>
                                        🏆 {fighters.length} Athletes
                                    </span>
                                )}
                                <span style={{
                                    padding: '0.5rem 1.3rem',
                                    background: 'rgba(255,255,255,0.04)',
                                    color: 'rgba(255,255,255,0.45)',
                                    borderRadius: '50px',
                                    fontSize: '0.8rem',
                                    fontFamily: "'Oswald', sans-serif",
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                }}>
                                    {sport.icon} {sport.name}
                                </span>
                                <span style={{
                                    width: '4px',
                                    height: '4px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.2)',
                                }} />
                                <span style={{
                                    fontSize: '0.75rem',
                                    color: 'rgba(255,255,255,0.3)',
                                    fontFamily: "'Oswald', sans-serif",
                                    fontWeight: 500,
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                }}>
                                    Top Ranked Fighters
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {}
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
                {}
                <div style={{
                    margin: '2rem auto 3rem',
                    maxWidth: '500px',
                    position: 'relative',
                }}>
                    <div style={{
                        position: 'absolute',
                        left: '1.5rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: searchFocused ? sport.color : 'rgba(255,255,255,0.3)',
                        transition: 'color 0.3s ease',
                        zIndex: 2,
                    }}>
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder={`Search ${fighters.length} fighters...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        style={{
                            width: '100%',
                            padding: '1rem 1.5rem 1rem 3.5rem',
                            borderRadius: '16px',
                            border: `1px solid ${searchFocused ? sport.color + '60' : 'rgba(255,255,255,0.1)'}`,
                            background: 'rgba(255,255,255,0.04)',
                            backdropFilter: 'blur(12px)',
                            color: '#fff',
                            fontSize: '1rem',
                            fontFamily: "'Oswald', sans-serif",
                            fontWeight: 400,
                            letterSpacing: '0.5px',
                            outline: 'none',
                            boxShadow: searchFocused ? `0 0 30px ${sport.color}20` : 'none',
                            transition: 'all 0.3s ease',
                        }}
                    />
                </div>
                {}
                {searchQuery && (
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '2rem',
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: '0.85rem',
                        color: 'rgba(255,255,255,0.4)',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                    }}>
                        {filteredFighters.length} result{filteredFighters.length !== 1 ? 's' : ''} for "{searchQuery}"
                    </div>
                )}
                {filteredFighters.length === 0 && !loading && fighters.length > 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>🔍</div>
                        <h3 style={{
                            fontFamily: "'Oswald', sans-serif",
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: 'rgba(255,255,255,0.4)',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                        }}>
                            No fighters found
                        </h3>
                        <p style={{
                            color: 'rgba(255,255,255,0.3)',
                            marginTop: '0.5rem',
                        }}>
                            Try a different search term
                        </p>
                    </div>
                )}
                {}
                <div className="fighters-grid">
                    {filteredFighters.map((fighter) => (
                        <FighterCard
                            key={fighter.id}
                            fighter={fighter}
                            sportColor={sport.color}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}