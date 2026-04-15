import { useNavigate } from "react-router-dom";
import TiltedCard from "./TiltedCard";
import buchechaImg from "../assets/marcus_buchecha.jpg";
import almeidaImg from "../assets/Marcus_Almeida.jpg";
import craigJonesImg from "../assets/craig_jones.jpg";
import kyleSnyderImg from "../assets/Kyle_Snyder.jpg";
const ASSET_MAP = {
    "Marcus Buchecha": buchechaImg,
    "Marcus Almeida": almeidaImg,
    "Craig Jones": craigJonesImg,
    "Kyle Snyder": kyleSnyderImg,
    "Marcelo Garcia": null,
};
export default function FighterCard({ fighter, sportColor }) {
    const navigate = useNavigate();
    const imageSrc = ASSET_MAP[fighter.name] || fighter.image_url || `https://via.placeholder.com/400x500?text=${encodeURIComponent(fighter.name)}`;
    return (
        <div
            className="animate-in"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/fighter/${fighter.id}`)}
        >
            <TiltedCard
                imageSrc={imageSrc}
                altText={fighter.name}
                captionText={fighter.name}
                containerHeight="550px"
                containerWidth="100%"
                imageHeight="550px"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        pointerEvents: 'none',
                        borderRadius: '15px',
                        overflow: 'hidden',
                    }}>
                        {}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '60%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)',
                            pointerEvents: 'none',
                        }} />
                        {}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            padding: '1.2rem',
                            position: 'relative',
                            zIndex: 2,
                        }}>
                            {fighter.ranking > 0 && (
                                <div style={{
                                    background: sportColor,
                                    color: '#fff',
                                    fontFamily: "'Oswald', sans-serif",
                                    fontWeight: 800,
                                    fontSize: '1.1rem',
                                    padding: '0.4rem 1rem',
                                    borderRadius: '10px',
                                    letterSpacing: '1px',
                                    boxShadow: `0 4px 15px ${sportColor}66`,
                                }}>
                                    #{fighter.ranking}
                                </div>
                            )}
                        </div>
                        {}
                        <div style={{
                            position: 'relative',
                            zIndex: 2,
                            padding: '1.5rem',
                        }}>
                            {}
                            <div style={{
                                fontFamily: "'Oswald', sans-serif",
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '2.5px',
                                color: sportColor,
                                marginBottom: '0.5rem',
                                opacity: 0.9,
                            }}>
                                {fighter.weightClass}
                            </div>
                            {}
                            <h3 style={{
                                fontFamily: "'Oswald', sans-serif",
                                fontSize: '2.5rem',
                                fontWeight: 800,
                                color: '#fff',
                                textTransform: 'uppercase',
                                lineHeight: 0.95,
                                marginBottom: '0.2rem',
                                letterSpacing: '-0.5px',
                                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                            }}>
                                {fighter.name}
                            </h3>
                            {}
                            {fighter.nickname !== "N/A" && (
                                <div style={{
                                    fontFamily: "'Oswald', sans-serif",
                                    fontSize: '0.85rem',
                                    fontStyle: 'italic',
                                    color: 'rgba(255,255,255,0.5)',
                                    marginBottom: '1rem',
                                    letterSpacing: '0.5px',
                                }}>
                                    "{fighter.nickname}"
                                </div>
                            )}
                            {}
                            <div style={{
                                width: '40px',
                                height: '3px',
                                background: `linear-gradient(90deg, ${sportColor}, transparent)`,
                                marginBottom: '1rem',
                                borderRadius: '2px',
                            }} />
                            {}
                            <div style={{
                                display: 'flex',
                                gap: '1.8rem',
                                alignItems: 'flex-end',
                            }}>
                                <div>
                                    <div style={{
                                        fontFamily: "'Oswald', sans-serif",
                                        fontSize: '1.8rem',
                                        fontWeight: 800,
                                        color: '#4ade80',
                                        lineHeight: 1,
                                    }}>{fighter.wins}</div>
                                    <div style={{
                                        fontSize: '0.55rem',
                                        color: 'rgba(255,255,255,0.4)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        fontWeight: 700,
                                        marginTop: '2px',
                                    }}>WINS</div>
                                </div>
                                <div>
                                    <div style={{
                                        fontFamily: "'Oswald', sans-serif",
                                        fontSize: '1.8rem',
                                        fontWeight: 800,
                                        color: '#f87171',
                                        lineHeight: 1,
                                    }}>{fighter.losses}</div>
                                    <div style={{
                                        fontSize: '0.55rem',
                                        color: 'rgba(255,255,255,0.4)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        fontWeight: 700,
                                        marginTop: '2px',
                                    }}>LOSSES</div>
                                </div>
                                <div>
                                    <div style={{
                                        fontFamily: "'Oswald', sans-serif",
                                        fontSize: '1.8rem',
                                        fontWeight: 800,
                                        color: 'rgba(255,255,255,0.25)',
                                        lineHeight: 1,
                                    }}>{fighter.draws}</div>
                                    <div style={{
                                        fontSize: '0.55rem',
                                        color: 'rgba(255,255,255,0.4)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        fontWeight: 700,
                                        marginTop: '2px',
                                    }}>DRAWS</div>
                                </div>
                                {}
                                <div style={{
                                    marginLeft: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    gap: '0.15rem',
                                }}>
                                    <span style={{ fontSize: '1.4rem' }}>{fighter.countryFlag}</span>
                                    <span style={{
                                        fontSize: '0.55rem',
                                        color: 'rgba(255,255,255,0.4)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        fontWeight: 700,
                                    }}>{fighter.country}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    );
}