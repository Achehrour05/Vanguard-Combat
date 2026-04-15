import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
export default function SkillsPage() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [filter, setFilter] = useState("all");
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/skills")
            .then(res => res.json())
            .then(data => {
                setSkills(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching skills:", err);
                setLoading(false);
            });
    }, []);
    const sportCategories = [
        { id: "all", name: "ALL ARTS", color: "#fff" },
        { id: "Boxing", name: "BOXING", color: "#f39c12" },
        { id: "Kickboxing", name: "KICKBOXING", color: "#e74c3c" },
        { id: "Wrestling", name: "WRESTLING", color: "#3498db" },
        { id: "BJJ", name: "JIU-JITSU", color: "#2ecc71" }
    ];
    const filteredSkills = filter === "all" ? skills : skills.filter(s => s.sport === filter);
    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f' }}>
                <div style={{ width: '50px', height: '50px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#f39c12', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <div style={{ marginTop: '1rem', color: '#f39c12', fontFamily: "'Oswald', sans-serif", letterSpacing: '4px' }}>LOADING TECHNIQUES...</div>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }
    return (
        <div style={{ minHeight: '100vh', background: '#050505', color: '#fff' }}>
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
                <div style={{
                    position: 'absolute',
                    top: '-30%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '140%',
                    height: '140%',
                    background: `radial-gradient(ellipse at center, rgba(243, 156, 18, 0.1) 0%, transparent 60%)`,
                    pointerEvents: 'none',
                }} />
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
                    WebkitTextStroke: '2px rgba(243, 156, 18, 0.05)',
                    lineHeight: 0.85,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-5px',
                    zIndex: 0,
                }}>
                    ARSENAL
                </div>
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(243, 156, 18, 0.3), transparent)',
                }} />
                <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '5px',
                        color: '#f39c12',
                        marginBottom: '1rem',
                    }}>
                        Technique Database
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
                    }}>The Arsenal</h1>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'rgba(255,255,255,0.5)',
                        maxWidth: '600px',
                        lineHeight: 1.6,
                        marginBottom: '2rem',
                    }}>
                        Learn the devastating techniques used by the greatest fighters in history. Watch step-by-step tutorials and mechanics breakdowns.
                    </p>
                </div>
            </div>
            {}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '3rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 10
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
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '2.5rem'
            }}>
                {filteredSkills.map((skill, index) => {
                    const sportColor = sportCategories.find(c => c.id === skill.sport)?.color || '#f39c12';
                    return (
                        <div
                            key={index}
                            className="skill-card"
                            onClick={() => setSelectedVideo(skill)}
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                position: 'relative'
                            }}
                        >
                            {}
                            {}
                            <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                                <img
                                    src={skill.thumbnail}
                                    alt={skill.name}
                                    className="card-img"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)' }}
                                />
                                <div className="card-overlay" style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.1) 50%, rgba(0,0,0,0.5) 100%)',
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
                                    {skill.sport}
                                </div>
                            </div>
                            {}
                            <div style={{ padding: '1.5rem', position: 'relative' }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '1.5rem',
                                    fontSize: '3rem',
                                    fontFamily: "'Oswald', sans-serif",
                                    fontWeight: 900,
                                    color: 'rgba(255,255,255,0.03)',
                                    pointerEvents: 'none',
                                    lineHeight: 1
                                }}>{String(index + 1).padStart(2, '0')}</div>
                                <h3 style={{
                                    fontFamily: "'Oswald', sans-serif",
                                    fontSize: '1.6rem',
                                    fontWeight: 700,
                                    margin: '0 0 0.8rem',
                                    color: sportColor,
                                    lineHeight: 1.2
                                }}>{skill.name}</h3>
                                <p style={{
                                    fontSize: '0.85rem',
                                    color: 'rgba(255,255,255,0.6)',
                                    lineHeight: 1.6,
                                    margin: 0
                                }}>{skill.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {}
            {selectedVideo && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1000,
                    background: 'rgba(0,0,0,0.95)',
                    backdropFilter: 'blur(20px)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    padding: '100px 2rem 5rem',
                    overflowY: 'auto'
                }} onClick={() => setSelectedVideo(null)}>
                    <div style={{
                        width: '100%',
                        maxWidth: '900px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        position: 'relative'
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div>
                                <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '2rem', margin: 0, color: '#fff' }}>{selectedVideo.name} Tutorial</h2>
                                <p style={{ margin: '0.2rem 0', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Learn the technique</p>
                            </div>
                            <button
                                onClick={() => setSelectedVideo(null)}
                                style={{
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
                                }}
                            >✕</button>
                        </div>
                        <div style={{
                            width: '100%',
                            aspectRatio: '16/9',
                            position: 'relative',
                            boxShadow: '0 0 100px rgba(0,0,0,0.5)',
                            background: '#000',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.dailymotion.com/embed/video/${selectedVideo.videoId}?autoplay=1`}
                                title="Video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
            <style>{`
                .skill-card:hover { transform: translateY(-10px); background: rgba(255,255,255,0.05) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,0.05); }
                .skill-card:hover .card-img { transform: scale(1.1) !important; filter: brightness(1.2); }
                .skill-card:hover .card-overlay { background: linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.4) 100%) !important; }
                .skill-card:hover .play-button { background: #fff !important; transform: scale(1.1); box-shadow: 0 0 20px rgba(255,255,255,0.5) !important; border-color: #fff !important; }
                .skill-card:hover .play-icon { color: #000 !important; }
            `}</style>
        </div>
    );
}