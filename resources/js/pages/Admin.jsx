import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Admin() {
    const [activeTab, setActiveTab] = useState('profile');
    const [data, setData] = useState({ profile: {}, skills: [], projects: [], experiences: [], educations: [], achievements: [], leaderships: [], publications: [], ai_tools: [], ides: [] });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState({});

    const loadImages = () => {
        axios.get('/api/images').then(res => setImages(res.data));
    };

    const loadData = () => {
        axios.get('/api/all')
            .then(res => {
                setData({
                    profile: res.data.profile || {},
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
        return axios.post('/api/upload', formData)
            .then(res => {
                loadImages();
                return res.data.url;
            })
            .catch(err => {
                const msg = err.response?.data?.message || err.response?.data?.errors?.file?.[0] || 'Upload failed';
                showMessage(msg);
                throw new Error(msg);
            });
    };

    const updateProfile = (e) => {
        e.preventDefault();
        setSaving(true);
        axios.put('/api/profile', data.profile)
            .then(() => {
                showMessage('Profile updated successfully!');
                setSaving(false);
            })
            .catch(() => setSaving(false));
    };

    const saveSkill = (skill) => {
        setSaving(true);
        const promise = skill.id 
            ? axios.put(`/api/skills/${skill.id}`, skill)
            : axios.post('/api/skills', skill);
        promise.then(() => {
            loadData();
            showMessage('Skill saved!');
            setSaving(false);
        }).catch(() => setSaving(false));
    };

    const deleteSkill = (id) => {
        if (!confirm('Delete this skill?')) return;
        axios.delete(`/api/skills/${id}`).then(() => {
            loadData();
            showMessage('Skill deleted!');
        });
    };

    const saveProject = (project) => {
        setSaving(true);
        const promise = project.id
            ? axios.put(`/api/projects/${project.id}`, project)
            : axios.post('/api/projects', project);
        promise.then(() => {
            loadData();
            showMessage('Project saved!');
            setSaving(false);
        }).catch(() => setSaving(false));
    };

    const deleteProject = (id) => {
        if (!confirm('Delete this project?')) return;
        axios.delete(`/api/projects/${id}`).then(() => {
            loadData();
            showMessage('Project deleted!');
        });
    };

    const saveExperience = (exp) => {
        setSaving(true);
        const promise = exp.id
            ? axios.put(`/api/experiences/${exp.id}`, exp)
            : axios.post('/api/experiences', exp);
        promise.then(() => {
            loadData();
            showMessage('Experience saved!');
            setSaving(false);
        }).catch(() => setSaving(false));
    };

    const deleteExperience = (id) => {
        if (!confirm('Delete this experience?')) return;
        axios.delete(`/api/experiences/${id}`).then(() => {
            loadData();
            showMessage('Experience deleted!');
        });
    };

    const saveEducation = (item) => {
        setSaving(true);
        const promise = item.id ? axios.put(`/api/educations/${item.id}`, item) : axios.post('/api/educations', item);
        promise.then(() => { loadData(); showMessage('Education saved!'); setSaving(false); }).catch(() => setSaving(false));
    };
    const deleteEducation = (id) => { if (!confirm('Delete?')) return; axios.delete(`/api/educations/${id}`).then(() => { loadData(); showMessage('Deleted!'); }); };

    const saveAchievement = (item) => {
        setSaving(true);
        const promise = item.id ? axios.put(`/api/achievements/${item.id}`, item) : axios.post('/api/achievements', item);
        promise.then(() => { loadData(); showMessage('Achievement saved!'); setSaving(false); }).catch(() => setSaving(false));
    };
    const deleteAchievement = (id) => { if (!confirm('Delete?')) return; axios.delete(`/api/achievements/${id}`).then(() => { loadData(); showMessage('Deleted!'); }); };

    const saveLeadership = (item) => {
        setSaving(true);
        const promise = item.id ? axios.put(`/api/leaderships/${item.id}`, item) : axios.post('/api/leaderships', item);
        promise.then(() => { loadData(); showMessage('Leadership saved!'); setSaving(false); }).catch(() => setSaving(false));
    };
    const deleteLeadership = (id) => { if (!confirm('Delete?')) return; axios.delete(`/api/leaderships/${id}`).then(() => { loadData(); showMessage('Deleted!'); }); };

    const savePublication = (item) => {
        setSaving(true);
        const promise = item.id ? axios.put(`/api/publications/${item.id}`, item) : axios.post('/api/publications', item);
        promise.then(() => { loadData(); showMessage('Publication saved!'); setSaving(false); }).catch(() => setSaving(false));
    };
    const deletePublication = (id) => { if (!confirm('Delete?')) return; axios.delete(`/api/publications/${id}`).then(() => { loadData(); showMessage('Deleted!'); }); };

    const saveAITool = (item) => {
        setSaving(true);
        const promise = item.id ? axios.put(`/api/ai-tools/${item.id}`, item) : axios.post('/api/ai-tools', item);
        promise.then(() => { loadData(); showMessage('AI Tool saved!'); setSaving(false); }).catch(() => setSaving(false));
    };
    const deleteAITool = (id) => { if (!confirm('Delete?')) return; axios.delete(`/api/ai-tools/${id}`).then(() => { loadData(); showMessage('Deleted!'); }); };

    // IDEs
    const saveIDE = (item) => {
        setSaving(true);
        const promise = item.id ? axios.put(`/api/ides/${item.id}`, item) : axios.post('/api/ides', item);
        promise.then(() => { loadData(); showMessage('IDE saved!'); setSaving(false); }).catch(() => setSaving(false));
    };
    const deleteIDE = (id) => { if (!confirm('Delete?')) return; axios.delete(`/api/ides/${id}`).then(() => { loadData(); showMessage('Deleted!'); }); };

    const getPaginatedItems = (items, tab) => {
        const page = currentPage[tab] || 1;
        const perPage = 10;
        const start = (page - 1) * perPage;
        return items.slice(start, start + perPage);
    };

    const getTotalPages = (items) => {
        return Math.ceil(items.length / 10);
    };

    const setPage = (tab, page) => {
        setCurrentPage({ ...currentPage, [tab]: page });
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Admin Panel</h1>
                {message && <div className="message">{message}</div>}
            </div>

            <div className="admin-tabs">
                {['profile', 'skills', 'projects', 'experiences', 'educations', 'achievements', 'leaderships', 'publications', 'ai_tools', 'ides'].map(tab => (
                    <button
                        key={tab}
                        className={activeTab === tab ? 'active' : ''}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1).replace('_', ' ')}
                    </button>
                ))}
            </div>

            <div className="admin-content">
                {activeTab === 'profile' && (
                    <ProfileForm 
                        profile={data.profile} 
                        onChange={p => setData({ ...data, profile: p })} 
                        onSubmit={updateProfile} 
                        saving={saving}
                        images={images}
                        uploadImage={uploadImage}
                    />
                )}
                {activeTab === 'skills' && (
                    <CrudList
                        items={getPaginatedItems(data.skills, 'skills')}
                        totalItems={data.skills.length}
                        currentPage={currentPage['skills'] || 1}
                        onPageChange={(page) => setPage('skills', page)}
                        fields={['name', 'category', 'level', 'order']}
                        onSave={saveSkill}
                        onDelete={deleteSkill}
                        onReload={loadData}
                        title="Skills"
                    />
                )}
                {activeTab === 'projects' && (
                    <CrudList
                        items={getPaginatedItems(data.projects, 'projects')}
                        totalItems={data.projects.length}
                        currentPage={currentPage['projects'] || 1}
                        onPageChange={(page) => setPage('projects', page)}
                        fields={['title', 'description', 'image', 'url', 'github', 'order', 'is_visible']}
                        onSave={saveProject}
                        onDelete={deleteProject}
                        onReload={loadData}
                        title="Projects"
                        images={images}
                        uploadImage={uploadImage}
                    />
                )}
                {activeTab === 'experiences' && (
                    <CrudList
                        items={getPaginatedItems(data.experiences, 'experiences')}
                        totalItems={data.experiences.length}
                        currentPage={currentPage['experiences'] || 1}
                        onPageChange={(page) => setPage('experiences', page)}
                        fields={['company', 'position', 'start_date', 'end_date', 'is_current', 'description', 'order']}
                        onSave={saveExperience}
                        onDelete={deleteExperience}
                        onReload={loadData}
                        title="Experiences"
                    />
                )}
                {activeTab === 'educations' && (
                    <CrudList
                        items={getPaginatedItems(data.educations, 'educations')}
                        totalItems={data.educations.length}
                        currentPage={currentPage['educations'] || 1}
                        onPageChange={(page) => setPage('educations', page)}
                        fields={['degree', 'institution', 'result', 'year', 'order']}
                        onSave={saveEducation}
                        onDelete={deleteEducation}
                        onReload={loadData}
                        title="Education"
                    />
                )}
                {activeTab === 'achievements' && (
                    <CrudList
                        items={getPaginatedItems(data.achievements, 'achievements')}
                        totalItems={data.achievements.length}
                        currentPage={currentPage['achievements'] || 1}
                        onPageChange={(page) => setPage('achievements', page)}
                        fields={['title', 'description', 'category', 'order']}
                        onSave={saveAchievement}
                        onDelete={deleteAchievement}
                        onReload={loadData}
                        title="Achievements"
                    />
                )}
                {activeTab === 'leaderships' && (
                    <CrudList
                        items={getPaginatedItems(data.leaderships, 'leaderships')}
                        totalItems={data.leaderships.length}
                        currentPage={currentPage['leaderships'] || 1}
                        onPageChange={(page) => setPage('leaderships', page)}
                        fields={['title', 'organization', 'description', 'order']}
                        onSave={saveLeadership}
                        onDelete={deleteLeadership}
                        onReload={loadData}
                        title="Leadership"
                    />
                )}
                {activeTab === 'publications' && (
                    <CrudList
                        items={getPaginatedItems(data.publications, 'publications')}
                        totalItems={data.publications.length}
                        currentPage={currentPage['publications'] || 1}
                        onPageChange={(page) => setPage('publications', page)}
                        fields={['title', 'url', 'type', 'order']}
                        onSave={savePublication}
                        onDelete={deletePublication}
                        onReload={loadData}
                        title="Publications"
                    />
                )}
                {activeTab === 'ai_tools' && (
                    <CrudList
                        items={getPaginatedItems(data.ai_tools, 'ai_tools')}
                        totalItems={data.ai_tools.length}
                        currentPage={currentPage['ai_tools'] || 1}
                        onPageChange={(page) => setPage('ai_tools', page)}
                        fields={['name', 'description', 'url', 'order']}
                        onSave={saveAITool}
                        onDelete={deleteAITool}
                        onReload={loadData}
                        title="AI Tools"
                    />
                )}
                {activeTab === 'ides' && (
                    <CrudList
                        items={getPaginatedItems(data.ides, 'ides')}
                        totalItems={data.ides.length}
                        currentPage={currentPage['ides'] || 1}
                        onPageChange={(page) => setPage('ides', page)}
                        fields={['name', 'description', 'icon', 'order']}
                        onSave={saveIDE}
                        onDelete={deleteIDE}
                        onReload={loadData}
                        title="IDEs"
                    />
                )}
            </div>
        </div>
    );
}

function ProfileForm({ profile, onChange, onSubmit, saving, images, uploadImage }) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = (field, value) => {
        onChange({ ...profile, [field]: value });
    };

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const url = await uploadImage(file);
            handleChange('avatar', url);
        } catch (err) {
            console.error(err);
        }
        setUploading(false);
    };

    return (
        <form onSubmit={onSubmit} className="admin-form">
            <div className="form-group">
                <label>Profile Image</label>
                <ImageUpload 
                    value={profile.avatar || ''}
                    onChange={(url) => handleChange('avatar', url)}
                    images={images}
                    uploadImage={uploadImage}
                    onUploadStart={() => setUploading(true)}
                    onUploadEnd={() => setUploading(false)}
                />
            </div>
            <div className="form-group">
                <label>Name</label>
                <input type="text" value={profile.name || ''} onChange={e => handleChange('name', e.target.value)} />
            </div>
            <div className="form-group">
                <label>Title</label>
                <input type="text" value={profile.title || ''} onChange={e => handleChange('title', e.target.value)} />
            </div>
            <div className="form-group">
                <label>Bio</label>
                <textarea value={profile.bio || ''} onChange={e => handleChange('bio', e.target.value)} rows={4} />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" value={profile.email || ''} onChange={e => handleChange('email', e.target.value)} />
            </div>
            <div className="form-group">
                <label>Phone</label>
                <input type="text" value={profile.phone || ''} onChange={e => handleChange('phone', e.target.value)} />
            </div>
            <div className="form-group">
                <label>Location</label>
                <input type="text" value={profile.location || ''} onChange={e => handleChange('location', e.target.value)} />
            </div>
            <div className="form-group">
                <label>GitHub URL</label>
                <input type="text" value={profile.github || ''} onChange={e => handleChange('github', e.target.value)} />
            </div>
            <div className="form-group">
                <label>LinkedIn URL</label>
                <input type="text" value={profile.linkedin || ''} onChange={e => handleChange('linkedin', e.target.value)} />
            </div>
            <div className="form-group">
                <label>Twitter URL</label>
                <input type="text" value={profile.twitter || ''} onChange={e => handleChange('twitter', e.target.value)} />
            </div>
            <div className="form-group">
                <label>Resume URL</label>
                <input type="text" value={profile.resume_url || ''} onChange={e => handleChange('resume_url', e.target.value)} placeholder="https://..." />
            </div>
            <div className="form-group">
                <label>Years of Experience</label>
                <input type="text" value={profile.years_experience || ''} onChange={e => handleChange('years_experience', e.target.value)} placeholder="e.g. 5+" />
            </div>
            <div className="form-group">
                <label>Happy Clients</label>
                <input type="text" value={profile.happy_clients || ''} onChange={e => handleChange('happy_clients', e.target.value)} placeholder="e.g. 20+" />
            </div>
            <button type="submit" disabled={saving || uploading}>{saving ? 'Saving...' : 'Save Profile'}</button>
        </form>
    );
}

function ImageUpload({ value, onChange, images, uploadImage, onUploadStart, onUploadEnd }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleDrop = async (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setUploading(true);
            onUploadStart?.();
            try {
                const url = await uploadImage(file);
                onChange(url);
            } catch (err) {
                console.error(err);
            }
            setUploading(false);
            onUploadEnd?.();
        }
    };

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploading(true);
            onUploadStart?.();
            try {
                const url = await uploadImage(file);
                onChange(url);
            } catch (err) {
                console.error(err);
            }
            setUploading(false);
            onUploadEnd?.();
        }
    };

    const selectImage = (url) => {
        onChange(url);
        setShowDropdown(false);
    };

    const removeImage = () => {
        onChange('');
    };

    return (
        <div className="image-upload-container">
            {value ? (
                <div className="image-preview">
                    <img src={value} alt="Preview" />
                    <div className="image-preview-actions">
                        <button type="button" onClick={() => setShowDropdown(!showDropdown)}>Change</button>
                        <button type="button" onClick={removeImage} className="btn-delete">Remove</button>
                    </div>
                </div>
            ) : (
                <div 
                    className={`image-dropzone ${uploading ? 'uploading' : ''}`}
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    {uploading ? (
                        <div className="upload-spinner">Uploading...</div>
                    ) : (
                        <>
                            <div className="dropzone-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="17 8 12 3 7 8"/>
                                    <line x1="12" y1="3" x2="12" y2="15"/>
                                </svg>
                            </div>
                            <p>Click or drag to upload</p>
                            <span>PNG, JPG, GIF up to 2MB</span>
                        </>
                    )}
                </div>
            )}
            
            <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
            />

            {showDropdown && (
                <div className="image-dropdown">
                    <div className="dropdown-section">
                        <h4>Upload New</h4>
                        <div 
                            className="upload-option"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="17 8 12 3 7 8"/>
                                <line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                            Upload from computer
                        </div>
                    </div>
                    {images.length > 0 && (
                        <div className="dropdown-section">
                            <h4>Existing Images</h4>
                            <div className="image-grid">
                                {images.map((img, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`image-option ${value === img.url ? 'selected' : ''}`}
                                        onClick={() => selectImage(img.url)}
                                    >
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

function CrudList({ items, totalItems, currentPage, onPageChange, fields, onSave, onDelete, onReload, title, images, uploadImage }) {
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({});
    const totalPages = Math.ceil(totalItems / 10);

    const startEdit = (item = {}) => {
        setEditing(item.id || 'new');
        setForm({ ...item });
    };

    const cancelEdit = () => {
        setEditing(null);
        setForm({});
    };

    const handleSave = () => {
        onSave(form);
        cancelEdit();
    };

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const isImageField = (field) => field === 'image';

    return (
        <div className="crud-list">
            <button className="btn-add" onClick={() => startEdit()}>Add New {title.slice(0, -1)}</button>

            {editing && (
                <div className="edit-form">
                    {fields.map(field => (
                        <div key={field} className="form-group">
                            <label>{field.replace('_', ' ')}</label>
                            {isImageField(field) ? (
                                <ImageUpload 
                                    value={form[field] || ''}
                                    onChange={(url) => handleChange(field, url)}
                                    images={images || []}
                                    uploadImage={uploadImage}
                                />
                            ) : field === 'description' ? (
                                <textarea value={form[field] || ''} onChange={e => handleChange(field, e.target.value)} />
                            ) : field === 'is_visible' || field === 'is_current' ? (
                                <input type="checkbox" checked={form[field] || false} onChange={e => handleChange(field, e.target.checked)} />
                            ) : (
                                <input type={field.includes('date') ? 'date' : field === 'level' || field === 'order' ? 'number' : 'text'} value={form[field] || ''} onChange={e => handleChange(field, e.target.value)} />
                            )}
                        </div>
                    ))}
                    <div className="form-actions">
                        <button onClick={handleSave}>Save</button>
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
                                    {f === 'image' && item[f] ? (
                                        <img src={item[f]} alt="" style={{width: 50, height: 50, objectFit: 'cover', borderRadius: 4}} />
                                    ) : typeof item[f] === 'boolean' ? (item[f] ? 'Yes' : 'No') : item[f]}
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
                    <button 
                        onClick={() => onPageChange(currentPage - 1)} 
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button 
                        onClick={() => onPageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default Admin;
