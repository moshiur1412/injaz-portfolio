import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

function Admin({ token, onLogout }) {
    const [activeTab, setActiveTab] = useState('profile');
    const [data, setData] = useState({ profile: {}, skills: [], projects: [], experiences: [], educations: [], achievements: [], leaderships: [], publications: [], ai_tools: [], ides: [] });
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState({});

    const api = useCallback((method, url, data) => {
        return axios({ method, url, data, headers: { Authorization: `Bearer ${token}` } });
    }, [token]);

    const loadImages = () => {
        api('get', '/api/images').then(res => setImages(res.data));
    };

    const loadData = () => {
        Promise.all([
            api('get', '/api/all'),
            api('get', '/api/sections/manage')
        ]).then(([dataRes, sectionsRes]) => {
            setData({
                profile: dataRes.data.profile || {},
                skills: dataRes.data.skills || [],
                projects: dataRes.data.projects || [],
                experiences: dataRes.data.experiences || [],
                educations: dataRes.data.educations || [],
                achievements: dataRes.data.achievements || [],
                leaderships: dataRes.data.leaderships || [],
                publications: dataRes.data.publications || [],
                ai_tools: dataRes.data.ai_tools || [],
                ides: dataRes.data.ides || []
            });
            setSections(sectionsRes.data || []);
            setLoading(false);
        }).catch(() => setLoading(false));
    };

    useEffect(() => {
        loadData();
        loadImages();
    }, []);

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(''), 3000);
    };

    const uploadImage = (file, onUploadStart, onUploadEnd) => {
        const formData = new FormData();
        formData.append('file', file);
        return api('post', '/api/upload', formData)
            .then(res => { loadImages(); return res.data.url; })
            .catch(err => {
                const msg = err.response?.data?.message || err.response?.data?.errors?.file?.[0] || 'Upload failed';
                showMessage(msg);
                throw new Error(msg);
            });
    };

    const updateProfile = (e) => {
        e.preventDefault();
        setSaving(true);
        api('put', '/api/profile', data.profile)
            .then(() => { showMessage('Profile updated successfully!'); setSaving(false); })
            .catch(() => setSaving(false));
    };

    const crudSave = (endpoint, item) => {
        setSaving(true);
        const promise = item.id ? api('put', `/${endpoint}/${item.id}`, item) : api('post', `/${endpoint}`, item);
        promise.then(() => { loadData(); setSaving(false); }).catch(() => setSaving(false));
    };

    const deleteItem = (endpoint, id) => {
        if (!confirm('Delete this item?')) return;
        api('delete', `/${endpoint}/${id}`).then(() => { loadData(); showMessage('Deleted!'); });
    };

    const getPaginatedItems = (items, tab) => {
        const page = currentPage[tab] || 1;
        const start = (page - 1) * 10;
        return items.slice(start, start + 10);
    };

    const getTotalPages = (items) => Math.ceil(items.length / 10);

    const setPage = (tab, page) => {
        setCurrentPage({ ...currentPage, [tab]: page });
    };

    if (loading) return <div className="loading">Loading...</div>;

    const TAB_SECTION_MAP = {
        skills: 'skills',
        projects: 'projects',
        educations: 'education',
        achievements: 'achievements',
        leaderships: 'leadership',
        publications: 'publications',
        ai_tools: 'ai_tools',
        ides: 'ides',
    };

    const ALWAYS_SHOW_TABS = ['profile', 'experiences', 'sections', 'settings'];

    const tabs = ALWAYS_SHOW_TABS.concat(
        Object.keys(TAB_SECTION_MAP).filter(tab => {
            const sectionKey = TAB_SECTION_MAP[tab];
            const section = sections.find(s => s.key === sectionKey);
            return section ? section.is_visible : true;
        })
    );

    return (
        <div className="admin-page">
            <div className="toast-container">
                {message && <div className="toast-message">{message}</div>}
            </div>
            <div className="admin-header">
                <h1>Admin Panel</h1>
                <div className="admin-header-right">
                    <button onClick={onLogout} className="btn-logout-admin">Logout</button>
                </div>
            </div>

            <div className="admin-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        className={activeTab === tab ? 'active' : ''}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === 'ai_tools' ? 'AI Tools' : tab.charAt(0).toUpperCase() + tab.slice(1).replace('_', ' ')}
                    </button>
                ))}
            </div>

            <div className="admin-content">
                {activeTab === 'profile' && (
                    <ProfileForm profile={data.profile} onChange={p => setData({ ...data, profile: p })} onSubmit={updateProfile} saving={saving} images={images} uploadImage={uploadImage} />
                )}
                {activeTab === 'skills' && (
                    <CrudList items={getPaginatedItems(data.skills, 'skills')} totalItems={data.skills.length} currentPage={currentPage['skills'] || 1} onPageChange={(page) => setPage('skills', page)} fields={['name', 'category', 'level', 'order']} onSave={(item) => crudSave('skills', item)} onDelete={(id) => deleteItem('skills', id)} title="Skills" />
                )}
                {activeTab === 'projects' && (
                    <CrudList items={getPaginatedItems(data.projects, 'projects')} totalItems={data.projects.length} currentPage={currentPage['projects'] || 1} onPageChange={(page) => setPage('projects', page)} fields={['title', 'description', 'image', 'url', 'github', 'order', 'is_visible']} onSave={(item) => crudSave('projects', item)} onDelete={(id) => deleteItem('projects', id)} title="Projects" images={images} uploadImage={uploadImage} />
                )}
                {activeTab === 'experiences' && (
                    <CrudList items={getPaginatedItems(data.experiences, 'experiences')} totalItems={data.experiences.length} currentPage={currentPage['experiences'] || 1} onPageChange={(page) => setPage('experiences', page)} fields={['company', 'position', 'start_date', 'end_date', 'is_current', 'description', 'order']} onSave={(item) => crudSave('experiences', item)} onDelete={(id) => deleteItem('experiences', id)} title="Experiences" />
                )}
                {activeTab === 'educations' && (
                    <CrudList items={getPaginatedItems(data.educations, 'educations')} totalItems={data.educations.length} currentPage={currentPage['educations'] || 1} onPageChange={(page) => setPage('educations', page)} fields={['degree', 'institution', 'result', 'year', 'order']} onSave={(item) => crudSave('educations', item)} onDelete={(id) => deleteItem('educations', id)} title="Education" />
                )}
                {activeTab === 'achievements' && (
                    <CrudList items={getPaginatedItems(data.achievements, 'achievements')} totalItems={data.achievements.length} currentPage={currentPage['achievements'] || 1} onPageChange={(page) => setPage('achievements', page)} fields={['title', 'description', 'category', 'order']} onSave={(item) => crudSave('achievements', item)} onDelete={(id) => deleteItem('achievements', id)} title="Achievements" />
                )}
                {activeTab === 'leaderships' && (
                    <CrudList items={getPaginatedItems(data.leaderships, 'leaderships')} totalItems={data.leaderships.length} currentPage={currentPage['leaderships'] || 1} onPageChange={(page) => setPage('leaderships', page)} fields={['title', 'organization', 'description', 'order']} onSave={(item) => crudSave('leaderships', item)} onDelete={(id) => deleteItem('leaderships', id)} title="Leadership" />
                )}
                {activeTab === 'publications' && (
                    <CrudList items={getPaginatedItems(data.publications, 'publications')} totalItems={data.publications.length} currentPage={currentPage['publications'] || 1} onPageChange={(page) => setPage('publications', page)} fields={['title', 'url', 'type', 'order']} onSave={(item) => crudSave('publications', item)} onDelete={(id) => deleteItem('publications', id)} title="Publications" />
                )}
                {activeTab === 'ai_tools' && (
                    <CrudList items={getPaginatedItems(data.ai_tools, 'ai_tools')} totalItems={data.ai_tools.length} currentPage={currentPage['ai_tools'] || 1} onPageChange={(page) => setPage('ai_tools', page)} fields={['name', 'description', 'url', 'order']} onSave={(item) => crudSave('ai_tools', item)} onDelete={(id) => deleteItem('ai_tools', id)} title="AI Tools" />
                )}
                {activeTab === 'ides' && (
                    <CrudList items={getPaginatedItems(data.ides, 'ides')} totalItems={data.ides.length} currentPage={currentPage['ides'] || 1} onPageChange={(page) => setPage('ides', page)} fields={['name', 'description', 'icon', 'order']} onSave={(item) => crudSave('ides', item)} onDelete={(id) => deleteItem('ides', id)} title="IDEs" />
                )}
                {activeTab === 'sections' && (
                    <SectionsManager api={api} showMessage={showMessage} />
                )}
                {activeTab === 'settings' && (
                    <SettingsPanel api={api} showMessage={showMessage} />
                )}
            </div>
        </div>
    );
}

/* ==================== SECTIONS MANAGER ==================== */
function SectionsManager({ api, showMessage }) {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [newSection, setNewSection] = useState({ key: '', label: '' });
    const [showNewForm, setShowNewForm] = useState(false);
    const [dragId, setDragId] = useState(null);

    const loadSections = () => {
        api('get', '/api/sections/manage')
            .then(res => { setSections(res.data); setLoading(false); })
            .catch(() => setLoading(false));
    };

    useEffect(() => { loadSections(); }, []);

    const sortedSections = [...sections].sort((a, b) => a.order - b.order);

    const handleVisibilityChange = (id, isVisible) => {
        setSections(sections.map(s => s.id === id ? { ...s, is_visible: isVisible } : s));
    };

    const handleLabelChange = (id, label) => {
        setSections(sections.map(s => s.id === id ? { ...s, label } : s));
    };

    const saveSections = () => {
        setSaving(true);
        api('put', '/api/sections/manage', { sections })
            .then(res => { setSections(res.data); showMessage('Sections updated!'); setSaving(false); })
            .catch(() => setSaving(false));
    };

    const handleDragStart = (id) => { setDragId(id); };

    const handleDragOver = (e, id) => {
        e.preventDefault();
        if (dragId === null || dragId === id) return;
        const draggedIdx = sortedSections.findIndex(s => s.id === dragId);
        const targetIdx = sortedSections.findIndex(s => s.id === id);
        const reordered = [...sortedSections];
        const [moved] = reordered.splice(draggedIdx, 1);
        reordered.splice(targetIdx, 0, moved);
        const updatedIds = reordered.map((s, i) => ({ ...s, order: i + 1 }));
        setSections(updatedIds);
        setDragId(id);
    };

    const handleDragEnd = () => { setDragId(null); };

    const addSection = () => {
        if (!newSection.key || !newSection.label) return;
        setSaving(true);
        api('post', '/api/sections/manage', newSection)
            .then(() => {
                showMessage('Section created!');
                setNewSection({ key: '', label: '' });
                setShowNewForm(false);
                loadSections();
                setSaving(false);
            })
            .catch(err => {
                const msg = err.response?.data?.errors?.key?.[0] || 'Failed to create section';
                showMessage(msg);
                setSaving(false);
            });
    };

    const deleteSection = (id) => {
        if (!confirm('Delete this section? It will be removed from the portfolio.')) return;
        api('delete', `/api/sections/manage/${id}`)
            .then(() => { loadSections(); showMessage('Section deleted!'); })
            .catch(() => showMessage('Failed to delete section'));
    };

    if (loading) return <div className="loading">Loading sections...</div>;

    return (
        <div className="settings-panel">
            <div className="settings-section">
                <div className="sections-header">
                    <h2>Portfolio Sections</h2>
                    <button className="btn-add-section" onClick={() => setShowNewForm(!showNewForm)}>
                        {showNewForm ? 'Cancel' : '+ Add New Section'}
                    </button>
                </div>
                <p className="settings-desc">Drag and drop to reorder. Toggle visibility, edit labels, or delete sections.</p>

                {showNewForm && (
                    <div className="new-section-form">
                        <div className="form-group">
                            <label>Section Key (unique identifier)</label>
                            <input type="text" value={newSection.key} onChange={e => setNewSection({ ...newSection, key: e.target.value })} placeholder="e.g., my_custom_section" />
                        </div>
                        <div className="form-group">
                            <label>Display Label</label>
                            <input type="text" value={newSection.label} onChange={e => setNewSection({ ...newSection, label: e.target.value })} placeholder="e.g., My Custom Section" />
                        </div>
                        <button onClick={addSection} disabled={saving} className="btn-save-sections">
                            {saving ? 'Creating...' : 'Create Section'}
                        </button>
                    </div>
                )}

                <div className="sections-list">
                    {sortedSections.map(section => (
                        <div
                            key={section.id}
                            className={`section-item ${dragId === section.id ? 'dragging' : ''}`}
                            draggable
                            onDragStart={() => handleDragStart(section.id)}
                            onDragOver={(e) => handleDragOver(e, section.id)}
                            onDragEnd={handleDragEnd}
                        >
                            <div className="section-drag-handle">⠿</div>
                                    <div className="section-item-left">
                                        <input type="checkbox" checked={section.is_visible} onChange={e => handleVisibilityChange(section.id, e.target.checked)} title="Show on page &amp; navbar menu" />
                                        <div className="section-item-info">
                                            <input type="text" value={section.label} onChange={e => handleLabelChange(section.id, e.target.value)} className="section-label-input" />
                                            <span className="section-key">{section.key}</span>
                                        </div>
                                    </div>
                                    <div className="section-item-right">
                                        <span className="section-order-badge">{section.order}</span>
                                        <button onClick={() => deleteSection(section.id)} className="btn-delete-section" title="Delete section">✕</button>
                                    </div>
                        </div>
                    ))}
                </div>
                <button onClick={saveSections} disabled={saving} className="btn-save-sections">
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
}

/* ==================== SETTINGS (Password Only) ==================== */
function SettingsPanel({ api, showMessage }) {
    const [passwordForm, setPasswordForm] = useState({ current_password: '', new_password: '' });
    const [saving, setSaving] = useState(false);

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setSaving(true);
        api('put', '/api/change-password', passwordForm)
            .then(() => {
                showMessage('Password changed successfully!');
                setPasswordForm({ current_password: '', new_password: '' });
                setSaving(false);
            })
            .catch(err => {
                const msg = err.response?.data?.errors?.current_password?.[0] || 'Failed to change password';
                showMessage(msg);
                setSaving(false);
            });
    };

    return (
        <div className="settings-panel">
            <div className="settings-section">
                <h2>Change Password</h2>
                <p className="settings-desc">Update your admin account password.</p>
                <form onSubmit={handlePasswordChange} className="admin-form">
                    <div className="form-group">
                        <label>Current Password</label>
                        <input type="password" value={passwordForm.current_password} onChange={e => setPasswordForm({ ...passwordForm, current_password: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>New Password (min 6 characters)</label>
                        <input type="password" value={passwordForm.new_password} onChange={e => setPasswordForm({ ...passwordForm, new_password: e.target.value })} required minLength={6} />
                    </div>
                    <button type="submit" disabled={saving}>{saving ? 'Changing...' : 'Change Password'}</button>
                </form>
            </div>
        </div>
    );
}

/* ==================== PROFILE FORM ==================== */
function ProfileForm({ profile, onChange, onSubmit, saving, images, uploadImage }) {
    const [uploading, setUploading] = useState(false);
    const handleChange = (field, value) => onChange({ ...profile, [field]: value });

    return (
        <form onSubmit={onSubmit} className="admin-form">
            <div className="form-group">
                <label>Profile Image</label>
                <ImageUpload value={profile.avatar || ''} onChange={(url) => handleChange('avatar', url)} images={images} uploadImage={uploadImage} onUploadStart={() => setUploading(true)} onUploadEnd={() => setUploading(false)} />
            </div>
            {[
                ['name', 'Name', 'text'],
                ['title', 'Title', 'text'],
                ['email', 'Email', 'email'],
                ['phone', 'Phone', 'text'],
                ['location', 'Location', 'text'],
                ['github', 'GitHub URL', 'text'],
                ['linkedin', 'LinkedIn URL', 'text'],
                ['twitter', 'Twitter URL', 'text'],
                ['resume_url', 'Resume URL', 'text'],
                ['years_experience', 'Years of Experience', 'text'],
                ['happy_clients', 'Happy Clients', 'text'],
            ].map(([field, label, type]) => (
                <div key={field} className="form-group">
                    <label>{label}</label>
                    <input type={type} value={profile[field] || ''} onChange={e => handleChange(field, e.target.value)} placeholder={field === 'resume_url' ? 'https://...' : ''} />
                </div>
            ))}
            <div className="form-group">
                <label>Bio</label>
                <textarea value={profile.bio || ''} onChange={e => handleChange('bio', e.target.value)} rows={4} />
            </div>
            <button type="submit" disabled={saving || uploading}>{saving ? 'Saving...' : 'Save Profile'}</button>
        </form>
    );
}

/* ==================== IMAGE UPLOAD ==================== */
function ImageUpload({ value, onChange, images, uploadImage, onUploadStart, onUploadEnd }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFile = async (file) => {
        if (!file) return;
        setUploading(true);
        onUploadStart?.();
        try { const url = await uploadImage(file); onChange(url); } catch (err) { console.error(err); }
        setUploading(false);
        onUploadEnd?.();
    };

    return (
        <div className="image-upload-container">
            {value ? (
                <div className="image-preview">
                    <img src={value} alt="Preview" />
                    <div className="image-preview-actions">
                        <button type="button" onClick={() => setShowDropdown(!showDropdown)}>Change</button>
                        <button type="button" onClick={() => onChange('')} className="btn-delete">Remove</button>
                    </div>
                </div>
            ) : (
                <div className={`image-dropzone ${uploading ? 'uploading' : ''}`} onClick={() => fileInputRef.current?.click()} onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }} onDragOver={e => e.preventDefault()}>
                    {uploading ? <div className="upload-spinner">Uploading...</div> : (
                        <>
                            <div className="dropzone-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                                </svg>
                            </div>
                            <p>Click or drag to upload</p>
                            <span>PNG, JPG, GIF up to 2MB</span>
                        </>
                    )}
                </div>
            )}
            <input type="file" ref={fileInputRef} accept="image/*" onChange={e => handleFile(e.target.files[0])} style={{ display: 'none' }} />
            {showDropdown && (
                <div className="image-dropdown">
                    <div className="dropdown-section">
                        <h4>Upload New</h4>
                        <div className="upload-option" onClick={() => fileInputRef.current?.click()}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                            Upload from computer
                        </div>
                    </div>
                    {images.length > 0 && (
                        <div className="dropdown-section">
                            <h4>Existing Images</h4>
                            <div className="image-grid">
                                {images.map((img, idx) => (
                                    <div key={idx} className={`image-option ${value === img.url ? 'selected' : ''}`} onClick={() => { onChange(img.url); setShowDropdown(false); }}>
                                        <img src={img.url} alt={img.name} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ==================== CRUD LIST ==================== */
function CrudList({ items, totalItems, currentPage, onPageChange, fields, onSave, onDelete, title, images, uploadImage }) {
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({});
    const totalPages = Math.ceil(totalItems / 10);

    const startEdit = (item = {}) => {
        setEditing(item.id || 'new');
        setForm({ ...item });
    };

    const cancelEdit = () => { setEditing(null); setForm({}); };

    return (
        <div className="crud-list">
            <button className="btn-add" onClick={() => startEdit()}>Add New {title.slice(0, -1)}</button>
            {editing && (
                <div className="edit-form">
                    {fields.map(field => (
                        <div key={field} className="form-group">
                            <label>{field.replace('_', ' ')}</label>
                            {field === 'image' ? (
                                <ImageUpload value={form[field] || ''} onChange={(url) => setForm({ ...form, [field]: url })} images={images || []} uploadImage={uploadImage} />
                            ) : field === 'description' ? (
                                <textarea value={form[field] || ''} onChange={e => setForm({ ...form, [field]: e.target.value })} />
                            ) : field === 'is_visible' || field === 'is_current' ? (
                                <input type="checkbox" checked={form[field] || false} onChange={e => setForm({ ...form, [field]: e.target.checked })} />
                            ) : (
                                <input type={field.includes('date') ? 'date' : field === 'level' || field === 'order' ? 'number' : 'text'} value={form[field] || ''} onChange={e => setForm({ ...form, [field]: e.target.value })} />
                            )}
                        </div>
                    ))}
                    <div className="form-actions">
                        <button onClick={() => { onSave(form); cancelEdit(); }}>Save</button>
                        <button onClick={cancelEdit} className="btn-cancel">Cancel</button>
                    </div>
                </div>
            )}
            <table className="admin-table">
                <thead>
                    <tr>
                        {fields.slice(0, 3).map(f => <th key={f}>{f.replace('_', ' ')}</th>)}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            {fields.slice(0, 3).map(f => (
                                <td key={f}>
                                    {f === 'image' && item[f] ? <img src={item[f]} alt="" style={{width: 50, height: 50, objectFit: 'cover', borderRadius: 4}} /> : typeof item[f] === 'boolean' ? (item[f] ? 'Yes' : 'No') : item[f]}
                                </td>
                            ))}
                            <td>
                                <button onClick={() => startEdit(item)}>Edit</button>
                                <button onClick={() => onDelete(item.id)} className="btn-delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                </div>
            )}
        </div>
    );
}

export default Admin;
