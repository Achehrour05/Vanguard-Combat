import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
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
export default function MatchupsPage() {
    const [fighters, setFighters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSport, setSelectedSport] = useState("mma");
    const [fighter1Id, setFighter1Id] = useState("");
    const [fighter2Id, setFighter2Id] = useState("");
    const sportCategories = [
        { id: "mma", name: "MMA", color: "#e74c3c" },
        { id: "boxing", name: "BOXING", color: "#f39c12" },
        { id: "bjj", name: "BJJ", color: "#2ecc71" },
        { id: "wrestling", name: "WRESTLING", color: "#3498db" },
        { id: "kickboxing", name: "KICKBOXING", color: "#9b59b6" }
    ];
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/fighters")
            .then(res => res.json())
            .then(data => {
                setFighters(data);
                const initialFighters = data.filter(f => f.sport === "mma");
                if (initialFighters.length >= 2) {
                    setFighter1Id(initialFighters[0].id);
                    setFighter2Id(initialFighters[1].id);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching fighters:", err);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f' }}>
                <div style={{ width: '50px', height: '50px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#e74c3c', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }
    const handleSportChange = (sportId) => {
        setSelectedSport(sportId);
        const sportFighters = fighters.filter(f => f.sport === sportId);
        if (sportFighters.length >= 2) {
            setFighter1Id(sportFighters[0].id);
            setFighter2Id(sportFighters[1].id);
        } else if (sportFighters.length === 1) {
            setFighter1Id(sportFighters[0].id);
            setFighter2Id("");
        }
    };
    const fighter1 = fighters.find(f => f.id.toString() === fighter1Id.toString());
    const fighter2 = fighters.find(f => f.id.toString() === fighter2Id.toString());
    const filteredFighters = fighters.filter(f => f.sport === selectedSport);
    if (!fighter1 || !fighter2) return null;
    const StatRow = ({ label, val1, val2 }) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem', width: '100%' }}>
            <div style={{ flex: 1, textAlign: 'right', fontSize: '1.4rem', fontWeight: 700, color: '#e74c3c', fontFamily: "'Oswald', sans-serif" }}>
                {val1 || "N/A"}
            </div>
            <div style={{ width: '200px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', letterSpacing: '4px', fontFamily: "'Inter', sans-serif" }}>
                {label}
            </div>
            <div style={{ flex: 1, textAlign: 'left', fontSize: '1.4rem', fontWeight: 700, color: '#3498db', fontFamily: "'Oswald', sans-serif" }}>
                {val2 || "N/A"}
            </div>
        </div>
    );
    return (
        <div style={{ minHeight: '100vh', background: '#050505', color: '#fff', overflowX: 'hidden' }}>
            <Navbar />
            {}
            <div style={{
                position: 'relative',
                padding: '8rem 2rem 4rem',
                overflow: 'hidden',
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
                    background: `radial-gradient(ellipse at center, rgba(231, 76, 60, 0.08) 0%, rgba(52, 152, 219, 0.05) 50%, transparent 70%)`,
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
                    WebkitTextStroke: '2px rgba(255, 255, 255, 0.03)',
                    lineHeight: 0.85,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-5px',
                    zIndex: 0,
                }}>
                    VERSUS
                </div>
                {}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(231, 76, 60, 0.3), rgba(52, 152, 219, 0.3), transparent)',
                }} />
                <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '5px',
                        color: 'rgba(255,255,255,0.4)',
                        marginBottom: '1rem',
                    }}>
                        Main Event Info
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
                    }}>Matchup Stats</h1>
                </div>
            </div>
            {}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '3rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 10
            }}>
                {sportCategories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => handleSportChange(cat.id)}
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
            {}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', zIndex: 10, position: 'relative' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: '#e74c3c', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem', fontWeight: 700 }}>Red Corner</div>
                    <select
                        value={fighter1Id}
                        onChange={(e) => setFighter1Id(e.target.value)}
                        style={{
                            padding: '0.8rem 1.5rem',
                            background: 'rgba(231, 76, 60, 0.1)',
                            border: '1px solid rgba(231, 76, 60, 0.3)',
                            color: '#fff',
                            borderRadius: '8px',
                            fontFamily: "'Oswald', sans-serif",
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            outline: 'none',
                            textTransform: 'uppercase'
                        }}
                    >
                        {filteredFighters.map(f => <option key={f.id} value={f.id} style={{ background: '#000', color: '#fff' }}>{f.name}</option>)}
                    </select>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: '#3498db', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem', fontWeight: 700 }}>Blue Corner</div>
                    <select
                        value={fighter2Id}
                        onChange={(e) => setFighter2Id(e.target.value)}
                        style={{
                            padding: '0.8rem 1.5rem',
                            background: 'rgba(52, 152, 219, 0.1)',
                            border: '1px solid rgba(52, 152, 219, 0.3)',
                            color: '#fff',
                            borderRadius: '8px',
                            fontFamily: "'Oswald', sans-serif",
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            outline: 'none',
                            textTransform: 'uppercase'
                        }}
                    >
                        {filteredFighters.map(f => <option key={f.id} value={f.id} style={{ background: '#000', color: '#fff' }}>{f.name}</option>)}
                    </select>
                </div>
            </div>
            {}
            <div style={{ position: 'relative', width: '100%', maxWidth: '1600px', margin: '0 auto', display: 'flex', alignItems: 'stretch' }}>
                {}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #e74c3c 0%, #e74c3c 49%, transparent 49%, transparent 51%, #3498db 51%, #3498db 100%)',
                    zIndex: 0
                }} />
                {}
                <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', minHeight: '600px', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', bottom: 0, left: '-15%', width: '120%', height: '100%', zIndex: 2, pointerEvents: 'none' }}>
                        <img
                            src={ASSET_MAP[fighter1.name] || fighter1.image_url}
                            alt={fighter1.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'top center',
                                filter: 'drop-shadow(10px 0 20px rgba(231, 76, 60, 0.2)) saturate(1.2)',
                                maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 30%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 30%, transparent 100%)',
                            }}
                        />
                        {}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '40%',
                            background: 'linear-gradient(to top, #050505, transparent)',
                            pointerEvents: 'none',
                        }} />
                    </div>
                    {}
                    <div style={{
                        position: 'absolute',
                        top: '40%',
                        left: '20%',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(231, 76, 60, 0.15) 0%, transparent 70%)',
                        zIndex: 1
                    }} />
                </div>
                {}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 'clamp(8rem, 25vw, 30rem)',
                    fontWeight: 900,
                    fontStyle: 'italic',
                    color: 'transparent',
                    WebkitTextStroke: '2px rgba(255, 255, 255, 0.04)',
                    pointerEvents: 'none',
                    zIndex: 0,
                    whiteSpace: 'nowrap'
                }}>
                    VS
                </div>
                {}
                <div style={{
                    flex: '0 0 500px',
                    zIndex: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '6rem'
                }}>
                    <StatRow label="Record" val1={fighter1.record} val2={fighter2.record} />
                    <StatRow label="Age" val1={fighter1.age} val2={fighter2.age} />
                    <StatRow label="Weight Class" val1={fighter1.weightClass} val2={fighter2.weightClass} />
                    <StatRow label="Stance" val1={fighter1.stance} val2={fighter2.stance} />
                    <StatRow label="Country" val1={fighter1.countryFlag + " " + fighter1.country} val2={fighter2.countryFlag + " " + fighter2.country} />
                    <StatRow label="Height" val1={fighter1.height} val2={fighter2.height} />
                    <StatRow label="Reach" val1={fighter1.reach} val2={fighter2.reach} />
                    {}
                    <div style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ textAlign: 'center', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '3px', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>
                            Knockout Rating
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ color: '#e74c3c', fontSize: '2rem', fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>
                                {Math.round((fighter1.finishes?.ko / Math.max(1, fighter1.wins)) * 100) || 0}%
                            </div>
                            <div style={{ flex: 1, margin: '0 1.5rem', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
                                <div style={{
                                    position: 'absolute', left: 0, top: 0, bottom: 0, background: '#e74c3c',
                                    width: `${Math.round((fighter1.finishes?.ko / Math.max(1, fighter1.wins)) * 100) || 0}%`
                                }} />
                            </div>
                            <div style={{ color: '#3498db', fontSize: '2rem', fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>
                                {Math.round((fighter2.finishes?.ko / Math.max(1, fighter2.wins)) * 100) || 0}%
                            </div>
                        </div>
                    </div>
                </div>
                {}
                <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', minHeight: '600px', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', bottom: 0, right: '-15%', width: '120%', height: '100%', zIndex: 2, pointerEvents: 'none' }}>
                        <img
                            src={ASSET_MAP[fighter2.name] || fighter2.image_url}
                            alt={fighter2.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'top center',
                                filter: 'drop-shadow(-10px 0 20px rgba(52, 152, 219, 0.2)) saturate(1.2)',
                                transform: 'scaleX(-1)',
                                maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 30%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 30%, transparent 100%)',
                            }}
                        />
                        {}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '40%',
                            background: 'linear-gradient(to top, #050505, transparent)',
                            pointerEvents: 'none',
                        }} />
                    </div>
                    {}
                    <div style={{
                        position: 'absolute',
                        top: '40%',
                        right: '20%',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(52, 152, 219, 0.15) 0%, transparent 70%)',
                        zIndex: 1
                    }} />
                </div>
            </div>
        </div>
    );
}