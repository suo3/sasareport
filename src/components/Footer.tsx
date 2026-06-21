import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      padding: '2rem 0',
      marginTop: '4rem',
      backgroundColor: 'var(--bg-primary)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div className="brand-text" style={{ fontSize: '1rem', opacity: 0.8 }}>SOA</div>

        <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} SOA. ALL RIGHTS RESERVED.
        </div>


      </div>
    </footer>
  );
};
