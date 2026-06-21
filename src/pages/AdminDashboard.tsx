import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import type { Session } from '@supabase/supabase-js';
import { Settings, FolderGit2, Wrench, MessageSquare, LogOut } from 'lucide-react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';

interface AdminDashboardProps {
  session: Session;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ session }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-color)', padding: '2rem 1rem' }}>
        <div style={{ marginBottom: '3rem', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>SOA Admin</h2>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} className="mono">{session.user.email}</div>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <NavLink to="/admin" end style={({isActive}) => ({ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', background: isActive ? 'var(--bg-card)' : 'transparent', textDecoration: 'none' })}>
            <Settings size={18} /> Settings
          </NavLink>
          <NavLink to="/admin/projects" style={({isActive}) => ({ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', background: isActive ? 'var(--bg-card)' : 'transparent', textDecoration: 'none' })}>
            <FolderGit2 size={18} /> Projects
          </NavLink>
          <NavLink to="/admin/skills" style={({isActive}) => ({ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', background: isActive ? 'var(--bg-card)' : 'transparent', textDecoration: 'none' })}>
            <Wrench size={18} /> Skills
          </NavLink>
          <NavLink to="/admin/messages" style={({isActive}) => ({ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', background: isActive ? 'var(--bg-card)' : 'transparent', textDecoration: 'none' })}>
            <MessageSquare size={18} /> Messages
          </NavLink>
        </nav>
        
        <div style={{ marginTop: 'auto', paddingTop: '3rem' }}>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        <Routes>
          <Route path="/" element={<SettingsView />} />
          <Route path="/projects" element={<ProjectsManager />} />
          <Route path="/skills" element={<div className="glass-card" style={{padding:'2rem'}}><h2>Skills Manager</h2><p>Coming soon...</p></div>} />
          <Route path="/messages" element={<div className="glass-card" style={{padding:'2rem'}}><h2>Messages Inbox</h2><p>Coming soon...</p></div>} />
        </Routes>
      </main>
    </div>
  );
};

const SettingsView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    hero_intro: '',
    hero_title: '',
    hero_description: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from('sasareport_settings').select('*');
    if (data) {
      const newSettings = { ...settings };
      data.forEach((row) => {
        if (row.key in newSettings) {
          newSettings[row.key as keyof typeof settings] = row.value;
        }
      });
      setSettings(newSettings);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value
    }));

    await supabase.from('sasareport_settings').upsert(updates);
    setSaving(false);
    alert('Settings saved successfully!');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="glass-card" style={{ padding: '2rem', maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '2rem' }}>General Settings</h2>
      
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Hero Intro</label>
          <input 
            type="text" 
            value={settings.hero_intro}
            onChange={(e) => setSettings({...settings, hero_intro: e.target.value})}
            style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '4px' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Hero Title (Supports HTML)</label>
          <textarea 
            value={settings.hero_title}
            onChange={(e) => setSettings({...settings, hero_title: e.target.value})}
            rows={3}
            style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '4px' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Hero Description</label>
          <textarea 
            value={settings.hero_description}
            onChange={(e) => setSettings({...settings, hero_description: e.target.value})}
            rows={4}
            style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '4px' }}
          />
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={saving} style={{ alignSelf: 'flex-start' }}>
          {saving ? 'SAVING...' : 'SAVE SETTINGS'}
        </button>
      </form>
    </div>
  );
};

const ProjectsManager: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', image_url: '', year: new Date().getFullYear().toString(),
    status: 'ACTIVE', tags: '', demo_url: '', source_url: ''
  });

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    const { data } = await supabase.from('sasareport_projects').select('*').order('year', { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    await supabase.from('sasareport_projects').delete().eq('id', id);
    fetchProjects();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
    
    await supabase.from('sasareport_projects').insert([{
      title: formData.title,
      description: formData.description,
      image_url: formData.image_url || null,
      year: formData.year,
      status: formData.status,
      tags: tagsArray,
      demo_url: formData.demo_url || null,
      source_url: formData.source_url || null
    }]);
    
    setShowForm(false);
    setFormData({ title: '', description: '', image_url: '', year: new Date().getFullYear().toString(), status: 'ACTIVE', tags: '', demo_url: '', source_url: '' });
    fetchProjects();
  };

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Projects Manager</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
          {showForm ? 'Cancel' : '+ Add Project'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} style={{ display: 'grid', gap: '1rem', marginBottom: '3rem', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '8px' }}>
          <input placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="terminal-input" />
          <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required className="terminal-input" rows={3} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input placeholder="Year" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} required className="terminal-input" />
            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="terminal-input">
              <option value="ACTIVE">ACTIVE</option>
              <option value="BETA">BETA</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>
          <input placeholder="Tags (comma separated, e.g. React, Node.js)" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} required className="terminal-input" />
          <input placeholder="Image URL (optional)" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="terminal-input" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input placeholder="Demo URL (optional)" value={formData.demo_url} onChange={e => setFormData({...formData, demo_url: e.target.value})} className="terminal-input" />
            <input placeholder="Source URL (optional)" value={formData.source_url} onChange={e => setFormData({...formData, source_url: e.target.value})} className="terminal-input" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ justifySelf: 'start' }}>Save Project</button>
        </form>
      )}

      {loading ? <p>Loading projects...</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {projects.map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{p.title} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({p.year})</span></h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Status: {p.status} | Tags: {p.tags?.join(', ')}</div>
              </div>
              <button onClick={() => handleDelete(p.id)} style={{ background: '#ff444422', color: '#ff4444', border: '1px solid #ff444444', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
