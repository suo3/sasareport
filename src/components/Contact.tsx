import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { AtSign, Check } from 'lucide-react';
import './Contact.css';

export const Contact: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    
    setStatus('SENDING');
    
    try {
      const { error } = await supabase
        .from('sasareport_messages')
        .insert([{ email, message }]);
        
      if (error) throw error;
      
      setStatus('SUCCESS');
      setEmail('');
      setMessage('');
      
      setTimeout(() => setStatus('IDLE'), 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('ERROR');
      setTimeout(() => setStatus('IDLE'), 3000);
    }
  };

  return (
    <section id="contact" className="contact section-padding">
      <div className="container">
        <div className="section-header text-center">
          <div className="status-badge active mono" style={{ position: 'relative', display: 'inline-block', top: '0', right: '0', marginBottom: '2rem' }}>
            <span className="status-dot"></span> CURRENTLY AVAILABLE FOR COLLABORATION
          </div>
          
          <h2 className="section-title">Let's Talk</h2>
          <div className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 3rem auto', textTransform: 'none', color: 'var(--text-secondary)' }}>
            I am actively seeking projects that challenge the boundaries of distributed systems and high-scale performance. If you have a mission-critical system to build, let's open a connection.
          </div>
        </div>

        <div className="contact-form-wrapper glass-card">
          {status === 'SUCCESS' ? (
            <div className="success-state text-center" style={{ padding: '3rem 1rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0, 255, 204, 0.1)', color: 'var(--accent)', marginBottom: '1.5rem' }}>
                <Check size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Message Received</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Thank you for reaching out. I'll get back to you shortly.</p>
              <button onClick={() => setStatus('IDLE')} className="btn btn-secondary" style={{ marginTop: '2rem' }}>Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="modern-form">
              <div className="form-group-modern">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <AtSign size={18} className="input-icon-modern" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com" 
                    className="modern-input"
                    required
                    disabled={status === 'SENDING'}
                  />
                </div>
              </div>

              <div className="form-group-modern">
                <label>Message</label>
                <div className="input-wrapper align-top">
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we collaborate?" 
                    className="modern-input"
                    rows={5}
                    required
                    disabled={status === 'SENDING'}
                  ></textarea>
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary w-full" disabled={status === 'SENDING'}>
                {status === 'SENDING' ? 'Sending...' : 'Send Message'}
              </button>
              
              {status === 'ERROR' && (
                <div style={{ marginTop: '1rem', color: '#ff4444', textAlign: 'center', fontSize: '0.85rem' }}>Failed to send. Please try again.</div>
              )}
            </form>
          )}
        </div>
        

      </div>
    </section>
  );
};
