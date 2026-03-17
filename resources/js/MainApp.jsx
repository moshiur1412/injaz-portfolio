import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';

function MainApp() {
    return (
        <BrowserRouter>
            <div className="app">
                <nav className="main-nav">
                    <div className="nav-container">
                        <Link to="/" className="nav-logo">Portfolio</Link>
                        <div className="nav-links">
                            <Link to="/">Home</Link>
                            <Link to="/admin">Admin</Link>
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default MainApp;
