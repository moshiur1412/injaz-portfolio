import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';

function MainApp() {
    const [token, setToken] = useState(localStorage.getItem('admin_token'));
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (token) {
            axios.get('/api/check', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => setChecking(false))
            .catch(() => {
                localStorage.removeItem('admin_token');
                setToken(null);
                setChecking(false);
            });
        } else {
            setChecking(false);
        }
    }, [token]);

    const handleLogin = (newToken) => {
        setToken(newToken);
    };

    const handleLogout = () => {
        if (token) {
            axios.post('/api/logout', {}, {
                headers: { Authorization: `Bearer ${token}` }
            }).catch(() => {});
        }
        localStorage.removeItem('admin_token');
        setToken(null);
    };

    if (checking) return <div className="loading">Loading...</div>;

    return (
        <BrowserRouter>
            <div className="app">
                <nav className="main-nav">
                    <div className="nav-container">
                        <Link to="/" className="nav-logo">Portfolio</Link>
                        <div className="nav-links">
                            <Link to="/">Home</Link>
                            {token ? (
                                <>
                                    <Link to="/admin">Admin</Link>
                                    <button onClick={handleLogout} className="btn-logout">Logout</button>
                                </>
                            ) : (
                                <Link to="/login">Login</Link>
                            )}
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={
                        token ? <Navigate to="/admin" /> : <Login onLogin={handleLogin} />
                    } />
                    <Route path="/admin" element={
                        token ? <Admin token={token} onLogout={handleLogout} /> : <Navigate to="/login" />
                    } />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default MainApp;
