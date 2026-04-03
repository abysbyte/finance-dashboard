import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Wallet, Search, Filter, User } from 'lucide-react';

export const Navbar = () => {
  const { role, setRole } = useContext(AppContext);

  return (
    <nav className="gsap-reveal" style={{ paddingBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>

      {/* Brand logo as a pill button in header */}
      <div className="btn-icon" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
        <Wallet size={20} />
      </div>

      {/* Center Navbar Pills */}
      <div className="flex gap-2 p-1" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '3rem', padding: '0.25rem' }}>
        <button className="btn-pill hover:bg-white/10" style={{ padding: '0.5rem 1.5rem', background: 'rgba(255,255,255,0.1)' }}>Overview</button>
        <button className="btn-pill" style={{ padding: '0.5rem 1.5rem', background: 'transparent' }}>Activity</button>
        <button className="btn-pill dark" style={{ padding: '0.5rem 2rem', marginLeft: '2rem' }}>Reports ↗</button>
      </div>

      {/* Right Navbar Utility Icons */}
      <div className="flex gap-3">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            borderRadius: '2rem',
            padding: '0.5rem 1rem',
            fontSize: '0.8rem',
            backgroundColor: 'rgba(0,0,0,0.4)',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="Viewer">Viewer</option>
          <option value="Admin">Admin</option>
        </select>
        <button className="btn-icon dark"><Search size={16} /></button>
        <button className="btn-icon dark"><Filter size={16} /></button>
        <button className="btn-icon light" style={{ color: '#000', backgroundColor: '#F5F0EA' }}><User size={16} /></button>
      </div>

    </nav>
  );
};
