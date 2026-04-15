import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
export default function FightsPage() {
    const [fights, setFights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [selectedVideo, setSelectedVideo] = useState(null);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/fights")
            .then(res => res.json())
            .then(data => {
                setFights(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching fights:", err);
                setLoading(false);
            });
    }, []);
    const filteredFights = filter === "all"
        ? fights
        : fights.filter(f => f.sport === filter);
    const sportCategories = [
        { id: "all", name: "ALL SPORTS", color: "#4ade80" },
        { id: "mma", name: "MMA", color: "#e74c3c" },
        { id: "boxing", name: "BOXING", color: "#f39c12" },
        { id: "bjj", name: "BJJ", color: "#2ecc71" },
        { id: "wrestling", name: "WRESTLING", color: "#3498db" },
        { id: "kickboxing", name: "KICKBOXING", color: "#9b59b6" }
    ];
    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f' }}>
                <div className="loader" style={{ width: '50px', height: '50px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#4ade80', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            </div>
        );
    }
    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#fff' }}>
            <Navbar />
            {}
            <div style={{
                position: 'relative',
                padding: '8rem 2rem 4rem',
                overflow: 'hidden',
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                textAlign: 'center'
            }}>
                {}
                <div style={{
                    position: 'absolute',
                    top: '-30%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '140%',
                    height: '140%',
                    background: `radial-gradient(ellipse at center, rgba(74, 222, 128, 0.1) 0%, rgba(74, 222, 128, 0.03) 30%, transparent 60%)`,
                    pointerEvents: 'none',
                }} />
                {}
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '40%',
                    transform: 'translate(-50%, -50%)',
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 'clamp(6rem, 18vw, 18rem)',
                    fontWeight: 900,
                    fontStyle: 'italic',
                    textTransform: 'uppercase',
                    color: 'transparent',
                    WebkitTextStroke: '2px rgba(74, 222, 128, 0.05)',
                    lineHeight: 0.85,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-5px',
                    zIndex: 0,
                }}>
                    LEGENDS
                </div>
                {}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.3), transparent)',
                }} />
                <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '5px',
                        color: '#4ade80',
                        marginBottom: '1rem',
                    }}>
                        Global Archive
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
                        background: 'linear-gradient(to bottom right, #fff, rgba(255,255,255,0.2))',
                        WebkitBackgroundClip: 'text',
                        marginBottom: '1rem',
                        textShadow: '0 20px 40px rgba(0,0,0,0.8)'
                    }}>Legendary Fights</h1>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'rgba(255,255,255,0.5)',
                        maxWidth: '600px',
                        lineHeight: 1.6,
                        marginBottom: '2rem',
                    }}>
                        Witness the greatest moments in combat sports history. Curated highlights and full battles from the world's most elite organizations.
                    </p>
                    {}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                        {!loading && (
                            <span style={{
                                padding: '0.5rem 1.3rem',
                                background: 'rgba(74, 222, 128, 0.1)',
                                color: '#4ade80',
                                borderRadius: '50px',
                                fontSize: '0.8rem',
                                fontFamily: "'Oswald', sans-serif",
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                border: '1px solid rgba(74, 222, 128, 0.2)',
                            }}>
                                🎬 {fights.length} Battles
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
                            ⭐ High Definition
                        </span>
                    </div>
                </div>
            </div>
            {}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '3rem',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                {sportCategories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setFilter(cat.id)}
                        style={{
                            padding: '0.6rem 1.8rem',
                            background: filter === cat.id ? cat.color : 'rgba(255,255,255,0.03)',
                            color: filter === cat.id ? '#000' : '#fff',
                            border: filter === cat.id ? `1px solid ${cat.color}` : '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '50px',
                            fontFamily: "'Oswald', sans-serif",
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            transform: filter === cat.id ? 'scale(1.05) translateY(-2px)' : 'none',
                            boxShadow: filter === cat.id ? `0 10px 20px ${cat.color}44` : 'none',
                            letterSpacing: '1px'
                        }}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
            {}
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '4rem 2rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                gap: '2.5rem'
            }}>
                {filteredFights.map(fight => {
                    const sportColor = sportCategories.find(c => c.id === fight.sport)?.color || '#4ade80';
                    return (
                        <div
                            key={fight.id}
                            className="fight-card"
                            onClick={() => setSelectedVideo(fight)}
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                position: 'relative'
                            }}
                        >
                            {}
                            <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                                <img
                                    src={fight.thumbnail}
                                    alt={fight.title}
                                    className="card-img"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)' }}
                                />
                                <div className="card-overlay" style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.5) 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'background 0.3s ease'
                                }}>
                                    <div className="play-button" style={{
                                        width: '60px', height: '60px',
                                        background: 'rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid rgba(255,255,255,0.3)',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                                    }}>
                                        <span className="play-icon" style={{ fontSize: '1.5rem', marginLeft: '5px', color: '#fff', transition: 'color 0.3s' }}>▶</span>
                                    </div>
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    left: '1rem',
                                    background: sportColor,
                                    color: '#000',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '8px',
                                    fontSize: '0.65rem',
                                    fontWeight: 800,
                                    fontFamily: "'Oswald', sans-serif",
                                    textTransform: 'uppercase'
                                }}>
                                    {fight.sport}
                                </div>
                            </div>
                            {}
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ fontSize: '0.8rem', color: sportColor, fontWeight: 700, fontFamily: "'Oswald', sans-serif", marginBottom: '0.3rem' }}>
                                    {fight.event} • {fight.date}
                                </div>
                                <h3 style={{
                                    fontFamily: "'Oswald', sans-serif",
                                    fontSize: '1.4rem',
                                    fontWeight: 700,
                                    margin: '0 0 0.8rem',
                                    lineHeight: 1.2
                                }}>{fight.title}</h3>
                                <p style={{
                                    fontSize: '0.85rem',
                                    color: 'rgba(255,255,255,0.5)',
                                    lineHeight: 1.5,
                                    margin: 0
                                }}>{fight.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {}
            {
                selectedVideo && (
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 1000,
                        background: 'rgba(0,0,0,0.95)',
                        backdropFilter: 'blur(20px)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        padding: '150px 2rem 5rem',
                        overflowY: 'auto'
                    }} onClick={() => setSelectedVideo(null)}>
                        <div style={{
                            width: '100%',
                            maxWidth: '1000px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            position: 'relative'
                        }} onClick={e => e.stopPropagation()}>
                            <button
                                onClick={() => setSelectedVideo(null)}
                                style={{
                                    position: 'absolute',
                                    top: '-3.5rem',
                                    right: 0,
                                    background: 'rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    color: '#fff',
                                    fontSize: '1.2rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 1001
                                }}
                            >✕</button>
                            <div style={{
                                width: '100%',
                                aspectRatio: '16/9',
                                position: 'relative',
                                boxShadow: '0 0 100px rgba(0,0,0,0.5)',
                                background: '#000',
                                borderRadius: '12px',
                                overflow: 'hidden'
                            }}>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={selectedVideo.source === 'dailymotion'
                                        ? `https://www.dailymotion.com/embed/video/${selectedVideo.videoId}?autoplay=1`
                                        : `https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0&enablejsapi=1&origin=${window.location.origin}`
                                    }
                                    title="Video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                )
            }
            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                .fight-card { box-shadow: 0 10px 30px rgba(0,0,0,0.4); }
                .fight-card:hover { transform: translateY(-10px) scale(1.02); background: rgba(255,255,255,0.04) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.7), 0 0 20px rgba(255,255,255,0.03); }
                .fight-card:hover .card-img { transform: scale(1.15) !important; filter: brightness(1.1); }
                .fight-card:hover .card-overlay { background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 100%) !important; }
                .fight-card:hover .play-button { background: #fff !important; transform: scale(1.15); box-shadow: 0 0 30px rgba(255,255,255,0.6) !important; border-color: #fff !important; }
                .fight-card:hover .play-icon { color: #000 !important; }
            `}</style>
        </div >
    );
}