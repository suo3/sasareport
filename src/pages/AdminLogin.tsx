import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Lock, Mail } from 'lucide-react';
import '../components/Contact.css'; // Reuse form styles

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-primary)' }}>
      <div className="contact-form-wrapper glass-card" style={{ maxWidth: '400px', width: '100%', margin: '0 1rem' }}>
        <form onSubmit={handleLogin} className="modern-form">
          <div className="form-header text-center" style={{ marginBottom: '2rem' }}>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Admin Access</h2>
            <div className="status-badge mono active" style={{ display: 'inline-block' }}>RESTRICTED ZONE</div>
          </div>
          
          {error && <div style={{ color: '#ff4444', marginBottom: '1rem', fontSize: '0.85rem', textAlign: 'center' }}>Error: {error}</div>}

          <div className="form-group-modern">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon-modern" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@domain.com" 
                className="modern-input"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group-modern">
            <label>Passphrase</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon-modern" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter passphrase" 
                className="modern-input"
                required
                disabled={loading}
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary w-full" disabled={loading} style={{ marginTop: '1rem' }}>
            {loading ? 'AUTHENTICATING...' : 'AUTHORIZE'}
          </button>
        </form>
      </div>
    </div>
  );
};
