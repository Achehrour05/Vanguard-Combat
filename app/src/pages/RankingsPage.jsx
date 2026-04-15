import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
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
export default function RankingsPage() {
    const [fighters, setFighters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSport, setSelectedSport] = useState("mma");
    const sportCategories = [
        { id: "mma", name: "MMA", color: "#e74c3c" },
        { id: "boxing", name: "BOXING", color: "#f39c12" },
        { id: "bjj", name: "JIU-JITSU", color: "#2ecc71" },
        { id: "wrestling", name: "WRESTLING", color: "#3498db" },
        { id: "kickboxing", name: "KICKBOXING", color: "#9b59b6" }
    ];
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/fighters")
            .then(res => res.json())
            .then(data => {
                const rankedData = data.map(f => ({
                    ...f,
                    ranking: (f.ranking && f.ranking > 0) ? f.ranking : 999
                }));
                rankedData.sort((a, b) => {
                    if (a.ranking !== b.ranking) {
                        return a.ranking - b.ranking;
                    }
                    if (b.wins !== a.wins) {
                        return b.wins - a.wins;
                    }
                    return a.losses - b.losses;
                });
                setFighters(rankedData);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching fighters:", err);
                setLoading(false);
            });
    }, []);
    const filteredFighters = fighters.filter(f => f.sport === selectedSport);
    const firstPlace = filteredFighters.length > 0 ? filteredFighters[0] : null;
    const secondPlace = filteredFighters.length > 1 ? filteredFighters[1] : null;
    const thirdPlace = filteredFighters.length > 2 ? filteredFighters[2] : null;
    const remainingFighters = filteredFighters.slice(3, 15);
    const PodiumCard = ({ fighter, rank, color, height, delay }) => {
        if (!fighter) return <div style={{ flex: 1 }} />;
        return (
            <Link to={`/fighter/${fighter.id}`} style={{ textDecoration: 'none', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    height: '400px',
                    position: 'relative',
                    animation: `slideUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}s both`
                }}>
                    {}
                    <div style={{ position: 'absolute', bottom: '20%', width: '150px', height: '150px', background: color, filter: 'blur(80px)', opacity: 0.3, zIndex: 0 }} />
                    {}
                    <img
                        src={ASSET_MAP[fighter.name] || fighter.image_url}
                        alt={fighter.name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'top center',
                            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, transparent 100%)',
                            zIndex: 2,
                            transition: 'transform 0.4s ease',
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05) translateY(-10px)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
                    />
                    {}
                    <div style={{
                        position: 'absolute',
                        bottom: '40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: '12rem',
                        fontWeight: 900,
                        fontStyle: 'italic',
                        color: 'transparent',
                        WebkitTextStroke: `2px ${color}40`,
                        zIndex: 1,
                        lineHeight: 0.8
                    }}>
                        {rank}
                    </div>
                    {}
                    <div style={{
                        width: '90%',
                        height: height,
                        background: `linear-gradient(to bottom, ${color}22, rgba(0,0,0,0.8))`,
                        borderTop: `2px solid ${color}`,
                        borderLeft: `1px solid ${color}44`,
                        borderRight: `1px solid ${color}44`,
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                        zIndex: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingTop: '1rem',
                        boxShadow: `0 -10px 40px ${color}22`
                    }}>
                        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '1.2rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', textAlign: 'center' }}>
                            {fighter.name}
                        </div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginTop: '0.2rem' }}>
                            {fighter.weightClass}
                        </div>
                    </div>
                </div>
            </Link>
        );
    };
    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f' }}>
                <div style={{ width: '50px', height: '50px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#ffd700', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <div style={{ marginTop: '1rem', color: '#ffd700', fontFamily: "'Oswald', sans-serif", letterSpacing: '4px' }}>CALCULATING RANKINGS...</div>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }
    return (
        <div style={{ minHeight: '100vh', background: '#050505', color: '#fff', overflowX: 'hidden' }}>
            <Navbar />
            {}
            <div style={{
                position: 'relative',
                padding: '8rem 2rem 4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                textAlign: 'center',
                zIndex: 10
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-30%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '140%',
                    height: '140%',
                    background: `radial-gradient(ellipse at center, rgba(255, 215, 0, 0.08) 0%, transparent 60%)`,
                    pointerEvents: 'none',
                    zIndex: -1
                }} />
                {}
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '40%',
                    transform: 'translate(-50%, -50%)',
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 'clamp(5rem, 15vw, 15rem)',
                    fontWeight: 900,
                    fontStyle: 'italic',
                    textTransform: 'uppercase',
                    color: 'transparent',
                    WebkitTextStroke: '2px rgba(255, 215, 0, 0.05)',
                    lineHeight: 0.85,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-5px',
                    zIndex: -1,
                }}>
                    THE PODIUM
                </div>
                <div style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '5px',
                    color: '#ffd700',
                    marginBottom: '1rem',
                }}>
                    Pound-For-Pound Greatness
                </div>
                <h1 style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 'clamp(4rem, 8vw, 7rem)',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    lineHeight: 0.9,
                    letterSpacing: '-2px',
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255,255,255,0.4)',
                    background: 'linear-gradient(to bottom right, #fff, rgba(255,215,0,0.4))',
                    WebkitBackgroundClip: 'text',
                    marginBottom: '1rem',
                    textShadow: '0 10px 40px rgba(255,215,0,0.2)'
                }}>Global Rankings</h1>
            </div>
            {}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '4rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 10
            }}>
                {sportCategories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedSport(cat.id)}
                        style={{
                            padding: '0.6rem 1.8rem',
                            background: selectedSport === cat.id ? cat.color : 'rgba(255,255,255,0.03)',
                            color: selectedSport === cat.id ? '#000' : '#fff',
                            border: selectedSport === cat.id ? `1px solid ${cat.color}` : '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '50px',
                            fontFamily: "'Oswald', sans-serif",
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            transform: selectedSport === cat.id ? 'scale(1.05) translateY(-2px)' : 'none',
                            boxShadow: selectedSport === cat.id ? `0 10px 20px ${cat.color}44` : 'none',
                            letterSpacing: '1px'
                        }}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 6rem' }}>
                {}
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginBottom: '6rem',
                    minHeight: '450px'
                }}>
                    <PodiumCard fighter={secondPlace} rank="2" color="#C0C0C0" height="120px" delay={0.2} />
                    <PodiumCard fighter={firstPlace} rank="1" color="#FFD700" height="180px" delay={0.4} />
                    <PodiumCard fighter={thirdPlace} rank="3" color="#CD7F32" height="80px" delay={0} />
                </div>
                {}
                {remainingFighters.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', animation: 'fadeIn 1s ease 1s both' }}>
                        <div style={{
                            fontFamily: "'Oswald', sans-serif",
                            fontSize: '2rem',
                            fontWeight: 800,
                            color: 'rgba(255,255,255,0.8)',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                            paddingBottom: '1rem',
                            marginBottom: '1rem',
                            textAlign: 'left'
                        }}>
                            The Contenders
                        </div>
                        {remainingFighters.map((fighter, index) => {
                            const currentRank = index + 4;
                            const sportColor = sportCategories.find(c => c.id === fighter.sport)?.color || '#3498db';
                            return (
                                <Link to={`/fighter/${fighter.id}`} key={fighter.id} style={{ textDecoration: 'none' }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        borderRadius: '12px',
                                        padding: '1rem 2rem',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                    }}
                                        onMouseOver={e => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                                            e.currentTarget.style.transform = 'translateX(10px)';
                                            e.currentTarget.style.borderColor = sportColor;
                                        }}
                                        onMouseOut={e => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                                            e.currentTarget.style.transform = 'translateX(0)';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                        }}
                                    >
                                        <div style={{
                                            fontFamily: "'Oswald', sans-serif",
                                            fontSize: '2.5rem',
                                            fontWeight: 900,
                                            fontStyle: 'italic',
                                            color: 'rgba(255,255,255,0.1)',
                                            width: '80px',
                                            textAlign: 'left'
                                        }}>
                                            {currentRank}
                                        </div>
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            border: `2px solid ${sportColor}`,
                                            background: '#000',
                                            marginRight: '2rem'
                                        }}>
                                            <img
                                                src={ASSET_MAP[fighter.name] || fighter.image_url}
                                                alt={fighter.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>
                                                {fighter.name}
                                            </div>
                                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                {fighter.weightClass}
                                                <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.2)' }}>|</span>
                                                <span style={{ color: sportColor, fontWeight: 700 }}>{fighter.record}</span>
                                            </div>
                                        </div>
                                        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '1.2rem', color: sportColor }}>
                                            →
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
            <style>{`
                @keyframes slideUp {
                    0% { transform: translateY(100px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
}