import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import mainImg from "../assets/main.jpg";
import TiltedCard from "../components/TiltedCard";
import mmaImg from "../assets/islam.jpg";
import boxingImg from "../assets/Oleksandr_Usyk.jpg";
import kickboxingImg from "../assets/rico_verhoeven.jpg";
import bjjImg from "../assets/Marcus_Almeida.jpg";
import wrestlingImg from "../assets/Aleksandr_Karelin.jpg";
const sportImages = {
    mma: mmaImg,
    boxing: boxingImg,
    kickboxing: kickboxingImg,
    bjj: bjjImg,
    wrestling: wrestlingImg
};
export default function HomePage() {
    const navigate = useNavigate();
    const [sports, setSports] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/sports")
            .then((res) => res.json())
            .then((data) => {
                setSports(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching sports:", err);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return (
            <div className="tnx-page" style={{ textAlign: "center", paddingTop: "10rem", height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h2 style={{ fontSize: '2rem', color: 'var(--tnx-green)' }}>LOADING TNX NETWORK...</h2>
                <div style={{ width: '40px', height: '40px', border: '3px solid var(--tnx-green)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', marginTop: '1rem' }}></div>
            </div>
        );
    }
    return (
        <div className="tnx-page">
            <header className="tnx-banner" style={{
                backgroundImage: `url(${mainImg})`,
                backgroundSize: '100% 100%',
            }}>
            </header>
            {}
            <div className="content-container" id="categories">
                <section className="sports-grid" style={{ paddingBottom: '10rem', paddingTop: '6rem' }}>
                    {sports.map((sport) => (
                        <div
                            key={sport.id}
                            className="animate-in"
                            onClick={() => navigate(`/sport/${sport.id}`)}
                        >
                            <TiltedCard
                                imageSrc={sportImages[sport.id] || sport.image || `https://images.unsplash.com/photo-1595079676339-150ad082237d?auto=format&fit=crop&q=80&w=800`}
                                altText={sport.name}
                                captionText={sport.name}
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
                                        inset: 0,
                                        padding: '2rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        pointerEvents: 'none',
                                        zIndex: 10,
                                    }}>
                                        {}
                                        <div style={{
                                            alignSelf: 'flex-end',
                                            fontFamily: "'Oswald', sans-serif",
                                            fontSize: '4rem',
                                            fontWeight: 900,
                                            fontStyle: 'italic',
                                            textTransform: 'uppercase',
                                            color: 'transparent',
                                            WebkitTextStroke: `1.5px ${sport.color}`,
                                            lineHeight: 0.8,
                                            opacity: 0.8,
                                            letterSpacing: '-2px',
                                        }}>
                                            {sport.name}
                                        </div>
                                        {}
                                    </div>
                                }
                            />
                        </div>
                    ))}
                </section>
            </div>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}