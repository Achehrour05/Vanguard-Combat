import { Link, useLocation } from "react-router-dom";
export default function Navbar() {
    const location = useLocation();
    return (
        <nav className="tnx-header" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: '#000',
            zIndex: 9999,
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            padding: '0 4rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
            <div className="tnx-nav-group">
                <Link to="/" className="tnx-nav-link" style={{ textDecoration: 'none', color: '#fff' }}>HOME</Link>
                <Link to="/matchups" className="tnx-nav-link" style={{ textDecoration: 'none', color: '#fff' }}>MATCHUPS</Link>
                <Link to="/fights" className="tnx-nav-link" style={{ textDecoration: 'none', color: '#fff' }}>FAMOUS FIGHTS</Link>
                <Link to="/arsenal" className="tnx-nav-link" style={{ textDecoration: 'none', color: '#fff' }}>THE ARSENAL</Link>
                <Link to="/rankings" className="tnx-nav-link" style={{ textDecoration: 'none', color: '#fff' }}>POUND-FOR-POUND</Link>
            </div>
            <Link to="/" className="tnx-logo-center" style={{ textDecoration: 'none', margin: '0 auto', display: 'block' }}>
                <svg viewBox="0 0 100 40" className="tnx-logo-svg" style={{ height: '32px' }}>
                    <text x="0" y="30" fontSize="30" fontStyle="italic" fontWeight="900" fill="#fff" fontFamily="'Oswald', sans-serif">UFC</text>
                </svg>
            </Link>
            <div className="tnx-nav-group" style={{ justifyContent: 'flex-end' }}>
                <span className="tnx-nav-link" style={{ color: '#fff' }}>NEWS</span>
                <span className="tnx-nav-link" style={{ color: '#fff' }}>WATCH</span>
                <span className="tnx-nav-link" style={{ color: '#fff' }}>SHOP</span>
                <div className="tnx-nav-link" style={{ fontSize: '1.2rem', marginLeft: '1rem', color: '#fff' }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
            </div>
        </nav>
    );
}