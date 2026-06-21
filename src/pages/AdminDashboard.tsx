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
          <Route path="/projects" element={<div className="glass-card" style={{padding:'2rem'}}><h2>Projects Manager</h2><p>Coming soon...</p></div>} />
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
