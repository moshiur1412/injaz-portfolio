import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [data, setData] = useState({ profile: null, skills: [], projects: [], experiences: [], educations: [], achievements: [], leaderships: [], publications: [], ai_tools: [], ides: [] });
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme) {
            setDarkMode(JSON.parse(savedTheme));
        }
        fetchData();
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const fetchData = () => {
        axios.get('/api/all')
            .then(res => {
                setData({
                    profile: res.data.profile || null,
                    skills: res.data.skills || [],
                    projects: res.data.projects || [],
                    experiences: res.data.experiences || [],
                    educations: res.data.educations || [],
                    achievements: res.data.achievements || [],
                    leaderships: res.data.leaderships || [],
                    publications: res.data.publications || [],
                    ai_tools: res.data.ai_tools || [],
                    ides: res.data.ides || []
                });
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const defaultIDEs = [
        { id: 1, name: 'VS Code', description: 'Primary code editor', icon: '💜' },
        { id: 2, name: 'Ollama', description: 'Local LLM', icon: '🦙' },
        { id: 3, name: 'Antigravity', description: 'AI coding assistant', icon: '🚀' },
        { id: 4, name: 'Cursor', description: 'AI-powered IDE', icon: '💫' },
        { id: 5, name: 'Trea', description: 'AI developer', icon: '🌳' },
        { id: 6, name: 'OpenCode', description: 'AI IDE', icon: '⚡' },
    ];

    if (loading) return <div className="loading">Loading...</div>;

    const { profile, skills, projects, experiences, educations, achievements, leaderships, publications, ai_tools, ides } = data;

    return (
        <div className="home-page">
            <nav className="main-nav">
                <div className="container nav-container">
                    <a href="#" className="nav-logo">{profile?.name?.split(' ')[0] || 'Portfolio'}</a>
                    <div className="nav-links">
                        <a href="#about">About</a>
                        <a href="#skills">Skills</a>
                        <a href="#projects">Projects</a>
                        <a href="#contact">Contact</a>
                        {profile?.resume_url && (
                            <a href={profile.resume_url} target="_blank" rel="noopener noreferrer" className="btn-resume">
                                Download CV
                            </a>
                        )}
                        <button className="theme-toggle" onClick={toggleDarkMode}>
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                    </div>
                </div>
            </nav>

            <section className="hero">
                <div className="hero-bg"></div>
                <div className="container hero-content">
                    <div className="hero-text animate-fade-in">
                        <p className="hero-greeting">Hello World! 👋</p>
                        <h1>{profile?.name || 'Your Name'}</h1>
                        <h2 className="hero-title">{profile?.title || 'Full Stack Developer'}</h2>
                        <p className="hero-bio">{profile?.bio || 'Building robust web solutions with precise code and scalable infrastructure.'}</p>
                        <div className="hero-cta">
                            <a href="#projects" className="btn btn-primary">View Work</a>
                            <a href="#contact" className="btn btn-outline">Contact Me</a>
                        </div>
                        <div className="hero-social">
                            {profile?.github && <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            </a>}
                            {profile?.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </a>}
                            {profile?.twitter && <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="social-icon" title="Twitter">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>}
                            {profile?.email && <a href={`mailto:${profile.email}`} className="social-icon" title="Email">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
                            </a>}
                        </div>
                    </div>
                    <div className="hero-avatar animate-fade-in-delay">
                        {profile?.avatar ? (
                            <img src={profile.avatar} alt={profile.name || 'Profile'} />
                        ) : (
                            <div className="avatar-placeholder">{(profile?.name || 'P').charAt(0).toUpperCase()}</div>
                        )}
                    </div>
                </div>
            </section>

            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item animate-slide-up">
                            <span className="stat-number">{profile?.years_experience || '5+'}</span>
                            <span className="stat-label">Years Experience</span>
                        </div>
                        <div className="stat-item animate-slide-up" style={{animationDelay: '0.1s'}}>
                            <span className="stat-number">{projects.length || '10+'}</span>
                            <span className="stat-label">Projects Completed</span>
                        </div>
                        <div className="stat-item animate-slide-up" style={{animationDelay: '0.2s'}}>
                            <span className="stat-number">{profile?.happy_clients || '20+'}</span>
                            <span className="stat-label">Happy Clients</span>
                        </div>
                        <div className="stat-item animate-slide-up" style={{animationDelay: '0.3s'}}>
                            <span className="stat-number">100%</span>
                            <span className="stat-label">Commitment</span>
                        </div>
                    </div>
                </div>
            </section>

            {educations.length > 0 && (
                <section className="section education-section" id="about">
                    <div className="container">
                        <h2 className="section-title animate-fade-in">Education & Certifications</h2>
                        <div className="education-grid">
                            {educations.map((edu, idx) => (
                                <div key={edu.id} className="education-card animate-slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                                    <div className="edu-icon">🎓</div>
                                    <div className="edu-content">
                                        <h3>{edu.degree}</h3>
                                        <p className="edu-institution">{edu.institution}</p>
                                        <div className="edu-meta">
                                            {edu.result && <span className="edu-result">{edu.result}</span>}
                                            {edu.year && <span className="edu-year">{edu.year}</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {achievements.length > 0 && (
                <section className="section achievements-section">
                    <div className="container">
                        <h2 className="section-title animate-fade-in">Achievements & Awards</h2>
                        <div className="achievements-grid">
                            {achievements.map((achievement, idx) => (
                                <div key={achievement.id} className="achievement-card animate-slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                                    <span className="achievement-icon">🏆</span>
                                    <h3>{achievement.title}</h3>
                                    <p>{achievement.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {skills.length > 0 && (
                <section className="section skills-section" id="skills">
                    <div className="container">
                        <h2 className="section-title animate-fade-in">Technical Proficiency</h2>
                        <p className="section-subtitle">A comprehensive overview of the tools and technologies I use.</p>
                        <div className="skills-categories">
                            {getSkillCategories(skills).map((category, idx) => (
                                <div key={idx} className="skill-category animate-slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                                    <h3>{category.name}</h3>
                                    <div className="skills-list">
                                        {category.skills.map(skill => (
                                            <div key={skill.id} className="skill-item">
                                                <div className="skill-info">
                                                    <span className="skill-name">{skill.name}</span>
                                                    <span className="skill-level">{getLevelText(skill.level)}</span>
                                                </div>
                                                <div className="skill-bar">
                                                    <div className="skill-progress" style={{ width: `${skill.level * 20}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {ai_tools.length > 0 && (
                <section className="section ai-tools-section">
                    <div className="container">
                        <h2 className="section-title animate-fade-in">AI Tools I Use</h2>
                        <p className="section-subtitle">AI-powered tools that enhance my productivity.</p>
                        <div className="ai-tools-grid">
                            {ai_tools.map((tool, idx) => (
                                <div key={tool.id} className="ai-tool-card animate-slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                                    <div className="ai-tool-icon">🤖</div>
                                    <h3>{tool.name}</h3>
                                    <p>{tool.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="section ides-section">
                <div className="container">
                    <h2 className="section-title animate-fade-in">IDEs & Tools I Use</h2>
                    <p className="section-subtitle">Development environments and tools I use daily.</p>
                    <div className="ides-grid">
                        {(ides.length > 0 ? ides : defaultIDEs).map((ide, idx) => (
                            <div key={ide.id || idx} className="ide-card animate-slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                                <span className="ide-icon">{ide.icon || '💻'}</span>
                                <h3>{ide.name}</h3>
                                <p>{ide.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {projects.length > 0 && (
                <section className="section projects-section" id="projects">
                    <div className="container">
                        <h2 className="section-title animate-fade-in">Featured Projects</h2>
                        <p className="section-subtitle">A small selection of my recent work.</p>
                        <div className="projects-grid">
                            {projects.map((project, idx) => (
                                <div key={project.id} className="project-card animate-slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                                    <div className="project-image">
                                        {project.image ? (
                                            <img src={project.image} alt={project.title} />
                                        ) : (
                                            <div className="project-placeholder">
                                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z"/></svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="project-content">
                                        <h3>{project.title}</h3>
                                        <p>{project.description}</p>
                                        <div className="project-tech">
                                            <span>PHP</span>
                                            <span>Laravel</span>
                                        </div>
                                        <div className="project-links">
                                            {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer">Live Demo</a>}
                                            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {leaderships.length > 0 && (
                <section className="section leadership-section">
                    <div className="container">
                        <h2 className="section-title animate-fade-in">Leadership & Volunteer Experience</h2>
                        <div className="leadership-grid">
                            {leaderships.map((item, idx) => (
                                <div key={item.id} className="leadership-card animate-slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                                    <span className="leadership-icon">👥</span>
                                    <h3>{item.title}</h3>
                                    {item.organization && <p className="leadership-org">{item.organization}</p>}
                                    {item.description && <p>{item.description}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {publications.length > 0 && (
                <section className="section publications-section">
                    <div className="container">
                        <h2 className="section-title animate-fade-in">Publications & Profiles</h2>
                        <div className="publications-grid">
                            {publications.map((pub, idx) => (
                                <a key={pub.id} href={pub.url} target="_blank" rel="noopener noreferrer" className="publication-card animate-slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                                    <span className="publication-icon">{pub.type === 'Blog' ? '📝' : '👤'}</span>
                                    <h3>{pub.title}</h3>
                                    <span className="publication-type">{pub.type}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="section contact-section" id="contact">
                <div className="container">
                    <h2 className="section-title animate-fade-in">Let's Work Together</h2>
                    <p className="section-subtitle">Have a project in mind? I'm currently available for freelance work.</p>
                    <div className="contact-content">
                        <div className="contact-info">
                            <div className="contact-item animate-slide-up">
                                <div className="contact-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
                                </div>
                                <div>
                                    <h4>Email Me</h4>
                                    <a href={`mailto:${profile?.email || 'email@example.com'}`}>{profile?.email || 'email@example.com'}</a>
                                </div>
                            </div>
                            <div className="contact-item animate-slide-up" style={{animationDelay: '0.1s'}}>
                                <div className="contact-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                                </div>
                                <div>
                                    <h4>Call Me</h4>
                                    <a href={`tel:${profile?.phone || ''}`}>{profile?.phone || '+880 1XX XXXX XXXX'}</a>
                                </div>
                            </div>
                            <div className="contact-item animate-slide-up" style={{animationDelay: '0.2s'}}>
                                <div className="contact-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                                </div>
                                <div>
                                    <h4>Location</h4>
                                    <p>{profile?.location || 'Dhaka, Bangladesh'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <p>© {new Date().getFullYear()} {profile?.name || 'Portfolio'}. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

function getSkillCategories(skills) {
    const categories = {};
    skills.forEach(skill => {
        const cat = skill.category || 'Other';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(skill);
    });
    return Object.entries(categories).map(([name, skills]) => ({ name, skills }));
}

function getLevelText(level) {
    const levels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert', 'Master'];
    return levels[level - 1] || 'Intermediate';
}

export default Home;
