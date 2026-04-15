import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import buchechaImg from "../assets/marcus_buchecha.jpg";
import almeidaImg from "../assets/Marcus_Almeida.jpg";
import craigJonesImg from "../assets/craig_jones.jpg";
import kyleSnyderImg from "../assets/Kyle_Snyder.jpg";
const ASSET_MAP = {
    "Marcus Buchecha": buchechaImg,
    "Marcus Almeida": almeidaImg,
    "Craig Jones": craigJonesImg,
    "Kyle Snyder": kyleSnyderImg,
    "Marcelo Garcia": null
};
export default function FighterPage() {
    const { fighterId } = useParams();
    const navigate = useNavigate();
    const [fighter, setFighter] = useState(null);
    const [sport, setSport] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/fighters/${fighterId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setFighter(null);
                    setLoading(false);
                    return;
                }
                setFighter(data);
                return fetch(`http://127.0.0.1:8000/api/sports/${data.sport}`);
            })
            .then((res) => res ? res.json() : null)
            .then((data) => {
                if (data && !data.error) {
                    setSport(data.sport);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching fighter data:", err);
                setLoading(false);
            });
    }, [fighterId]);
    if (loading) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0a0a0f',
            }}>
                <div style={{
                    width: '50px', height: '50px',
                    border: '3px solid rgba(255,255,255,0.1)',
                    borderTopColor: '#4ade80',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                }} />
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }
    if (!fighter || !sport) {
        return (
            <div style={{ textAlign: "center", paddingTop: "6rem", background: '#0a0a0f', minHeight: '100vh', color: '#fff' }}>
                <h1>Fighter not found</h1>
                <button onClick={() => navigate("/")} style={{
                    marginTop: '1rem', padding: '0.6rem 1.2rem',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px', color: '#fff', cursor: 'pointer',
                    fontFamily: "'Oswald', sans-serif",
                }}>← Back to Home</button>
            </div>
        );
    }
    const totalFinishes = fighter.finishes.ko + fighter.finishes.sub + fighter.finishes.dec;
    const getPercent = (val) => totalFinishes > 0 ? Math.round((val / totalFinishes) * 100) : 0;
    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0f',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {}
            <div style={{
                height: '100vh',
                position: 'relative',
                display: 'flex',
                overflow: 'hidden',
                background: '#0a0a0f',
            }}>
                {}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(ellipse at 70% 50%, ${sport.color}12 0%, transparent 50%)`,
                    pointerEvents: 'none',
                    zIndex: 0,
                }} />
                {}
                {fighter.image_url && (
                    <div style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: '55%',
                        height: '100%',
                        zIndex: 1,
                    }}>
                        <img
                            src={ASSET_MAP[fighter.name] || fighter.image_url}
                            alt={fighter.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'top center',
                                maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, transparent 100%)',
                            }}
                        />
                        {}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '40%',
                            background: 'linear-gradient(to top, #0a0a0f, transparent)',
                            pointerEvents: 'none',
                        }} />
                    </div>
                )}
                {}
                <div style={{
                    position: 'absolute',
                    right: '5%',
                    top: '15%',
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 'clamp(10rem, 20vw, 22rem)',
                    fontWeight: 900,
                    fontStyle: 'italic',
                    color: 'transparent',
                    WebkitTextStroke: `2px ${sport.color}30`,
                    lineHeight: 0.85,
                    zIndex: 2,
                    pointerEvents: 'none',
                    userSelect: 'none',
                }}>
                    {fighter.ranking > 0 ? `#${fighter.ranking}` : sport.icon}
                </div>
                {}
                <div style={{
                    position: 'absolute',
                    top: '80px',
                    left: 0,
                    right: 0,
                    padding: '0 3rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 10,
                }}>
                    {}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <Link to={`/sport/${fighter.sport}`} style={{ textDecoration: 'none' }}>
                            <div style={{
                                width: '45px', height: '45px',
                                borderRadius: '14px',
                                background: sport.color,
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                color: '#fff',
                                fontWeight: 800,
                                boxShadow: `0 4px 15px ${sport.color}66`,
                            }}>
                                ←
                            </div>
                        </Link>
                        <div>
                            <div style={{
                                fontFamily: "'Oswald', sans-serif",
                                fontWeight: 700,
                                fontSize: '0.85rem',
                                color: sport.color,
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                            }}>
                                {sport.fullName}
                            </div>
                            <div style={{
                                fontSize: '0.75rem',
                                color: 'rgba(255,255,255,0.4)',
                                fontWeight: 500,
                            }}>
                                {fighter.weightClass}
                            </div>
                        </div>
                    </div>
                    {}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <span style={{
                            fontSize: '0.85rem',
                            color: 'rgba(255,255,255,0.5)',
                        }}>
                            {fighter.countryFlag} {fighter.country}
                        </span>
                    </div>
                </div>
                {}
                <div style={{
                    position: 'relative',
                    zIndex: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    padding: '12rem 3rem 6rem',
                    width: '50%',
                    gap: '2rem',
                }}>
                    {}
                    <div>
                        <div style={{
                            fontFamily: "'Oswald', sans-serif",
                            fontSize: '2.5rem',
                            fontWeight: 800,
                            color: sport.color,
                            lineHeight: 1,
                            marginBottom: '1rem',
                        }}>
                            ,,
                        </div>
                        <p style={{
                            fontFamily: "'Oswald', sans-serif",
                            fontSize: '1.3rem',
                            fontWeight: 700,
                            color: 'rgba(255,255,255,0.85)',
                            textTransform: 'uppercase',
                            lineHeight: 1.4,
                            maxWidth: '400px',
                            letterSpacing: '0.5px',
                        }}>
                            {fighter.bio || `A world-class ${sport.name} fighter competing at the highest level.`}
                        </p>
                        <div style={{
                            fontFamily: "'Oswald', sans-serif",
                            fontSize: '0.8rem',
                            color: 'rgba(255,255,255,0.3)',
                            marginTop: '0.8rem',
                            letterSpacing: '1px',
                        }}>
                            {fighter.name}
                        </div>
                    </div>
                    {}
                    <div style={{
                        display: 'flex',
                        gap: '2.5rem',
                        marginTop: '1rem',
                    }}>
                        <div>
                            <div style={{
                                fontFamily: "'Oswald', sans-serif",
                                fontSize: '2.5rem',
                                fontWeight: 800,
                                color: '#4ade80',
                                lineHeight: 1,
                            }}>{fighter.wins}</div>
                            <div style={{
                                fontFamily: "'Oswald', sans-serif",
                                fontSize: '0.65rem',
                                color: 'rgba(255,255,255,0.3)',
                                textTransform: 'uppercase',
                                letterSpacing: '3px',
                                fontWeight: 700,
                                marginTop: '4px',
                            }}>Wins</div>
                        </div>
                        <div>
                            <div style={{
                                fontFamily: "'Oswald', sans-serif",
                                fontSize: '2.5rem',
                                fontWeight: 800,
                                color: '#f87171',
                                lineHeight: 1,
                            }}>{fighter.losses}</div>
                            <div style={{
                                fontFamily: "'Oswald', sans-serif",
                                fontSize: '0.65rem',
                                color: 'rgba(255,255,255,0.3)',
                                textTransform: 'uppercase',
                                letterSpacing: '3px',
                                fontWeight: 700,
                                marginTop: '4px',
                            }}>Losses</div>
                        </div>
                        <div>
                            <div style={{
                                fontFamily: "'Oswald', sans-serif",
                                fontSize: '2.5rem',
                                fontWeight: 800,
                                color: 'rgba(255,255,255,0.25)',
                                lineHeight: 1,
                            }}>{fighter.draws}</div>
                            <div style={{
                                fontFamily: "'Oswald', sans-serif",
                                fontSize: '0.65rem',
                                color: 'rgba(255,255,255,0.3)',
                                textTransform: 'uppercase',
                                letterSpacing: '3px',
                                fontWeight: 700,
                                marginTop: '4px',
                            }}>Draws</div>
                        </div>
                    </div>
                </div>
                {}
                <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '3rem',
                    right: '3rem',
                    zIndex: 8,
                    pointerEvents: 'none',
                    overflow: 'hidden',
                }}>
                    <h1 style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: 'clamp(4rem, 10vw, 9rem)',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        lineHeight: 0.85,
                        letterSpacing: '-3px',
                        color: '#fff',
                        textShadow: '0 4px 30px rgba(0,0,0,0.8)',
                        whiteSpace: 'nowrap',
                    }}>
                        {fighter.name}
                    </h1>
                    {fighter.nickname !== "N/A" && (
                        <div style={{
                            fontFamily: "'Oswald', sans-serif",
                            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                            fontWeight: 600,
                            fontStyle: 'italic',
                            color: sport.color,
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            marginTop: '0.3rem',
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        }}>
                            "{fighter.nickname}"
                        </div>
                    )}
                </div>
            </div>
            {}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '5rem 3rem 8rem',
            }}>
                <div style={{
                    height: '1px',
                    background: `linear-gradient(90deg, ${sport.color}50, transparent)`,
                    marginBottom: '4rem',
                }} />
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4rem',
                }}>
                    {}
                    <div>
                        <h2 style={{
                            fontFamily: "'Oswald', sans-serif",
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            color: sport.color,
                            marginBottom: '2.5rem',
                        }}>Physical Profile</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                { label: 'Age', value: fighter.age },
                                { label: 'Height', value: fighter.height },
                                { label: 'Reach', value: fighter.reach },
                                { label: 'Stance', value: fighter.stance },
                            ].map((item, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '1rem 0',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                }}>
                                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '2px' }}>{item.label}</span>
                                    <span style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: "'Oswald', sans-serif" }}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {}
                    <div>
                        <h2 style={{
                            fontFamily: "'Oswald', sans-serif",
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            color: sport.color,
                            marginBottom: '2.5rem',
                        }}>Biography</h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: 'rgba(255,255,255,0.5)',
                            lineHeight: 1.8,
                        }}>
                            {fighter.wiki_bio || fighter.bio || "World-class athlete competing in the highest tiers of professional combat sports."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}