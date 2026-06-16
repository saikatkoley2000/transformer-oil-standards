import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, ArrowRightLeft, Beaker, Shield, Wrench, FileArchive, History, Zap, 
  CheckCircle2, Globe, FileText, Search, Settings, ArrowRight, Droplets, Leaf
} from 'lucide-react';
import '../overview-custom.css';

export default function Overview() {
  const sdos = ['IEC', 'ASTM', 'ISO', 'IEEE', 'IS', 'BS', 'DIN', 'EN', 'IP', 'SOTL'];

  return (
    <div className="overview-page">
      {/* 1. HERO SECTION */}
      <div style={{ marginBottom: '48px', padding: '40px', background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--sdo-iec)', marginBottom: '16px', letterSpacing: '-0.5px' }}>
          Transformer Oil Standards Overview
        </h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '800px', lineHeight: 1.6, marginBottom: '40px' }}>
          Technical intelligence for specification, testing, maintenance, diagnostics, and standards equivalence across transformer fluids.
        </p>

        {/* Product Display Area */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {/* Mineral Oil */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <img src="/images/Transol.png" alt="Transol Logo" style={{ height: '40px', objectFit: 'contain', marginBottom: '16px' }} />
            <img src="/images/Transol Drum.jpg" alt="Transol Drum" style={{ height: '140px', objectFit: 'contain' }} />
          </div>
          {/* Synthetic Ester */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <img src="/images/TransolSynth100.png" alt="Transol Synth 100 Logo" style={{ height: '40px', objectFit: 'contain', marginBottom: '16px' }} />
            <img src="/images/Transol Synth 100 Drum.jpg" alt="Transol Synth 100 Drum" style={{ height: '140px', objectFit: 'contain' }} />
          </div>
          {/* Natural Ester */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <img src="/images/bioTRANSOL.png" alt="bioTRANSOL Logo" style={{ height: '40px', objectFit: 'contain', marginBottom: '16px' }} />
            <img src="/images/bioTRANSOL DRUM.jpg" alt="bioTRANSOL Drum" style={{ height: '140px', objectFit: 'contain' }} />
          </div>
        </div>
      </div>

      {/* 2. FLUID FAMILY SECTION */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px', paddingLeft: '8px', borderLeft: '4px solid var(--sdo-iec)' }}>
        Fluid Technology Families
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
        <div style={{ padding: '32px 24px', background: 'var(--bg-primary)', borderTop: '4px solid #1d3557', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', border: '1px solid var(--border-color)' }}>
          <Droplets size={32} style={{ color: '#1d3557', marginBottom: '16px' }} />
          <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Mineral Insulating Oil</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '16px', minHeight: '60px' }}>
            The global standard for conventional power and distribution transformers. Uninhibited, trace-inhibited, and fully inhibited variants.
          </p>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1d3557', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Focus: Mainstream Substation & Grid
          </span>
        </div>
        <div style={{ padding: '32px 24px', background: 'var(--bg-primary)', borderTop: '4px solid #2a9d8f', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', border: '1px solid var(--border-color)' }}>
          <Beaker size={32} style={{ color: '#2a9d8f', marginBottom: '16px' }} />
          <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Synthetic Ester</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '16px', minHeight: '60px' }}>
            High fire-point, K-class insulating fluid engineered for urban, traction, and offshore wind applications where safety is paramount.
          </p>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#2a9d8f', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Focus: Fire Safety & Traction
          </span>
        </div>
        <div style={{ padding: '32px 24px', background: 'var(--bg-primary)', borderTop: '4px solid #d4a373', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', border: '1px solid var(--border-color)' }}>
          <Leaf size={32} style={{ color: '#ca6702', marginBottom: '16px' }} />
          <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Natural Ester</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '16px', minHeight: '60px' }}>
            Bio-based, fully biodegradable insulating fluid for environmentally sensitive locations and sustainable grid deployments.
          </p>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ca6702', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Focus: Sustainability & Environment
          </span>
        </div>
      </div>

      {/* 3. QUICK ACCESS SECTION */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px', paddingLeft: '8px', borderLeft: '4px solid var(--sdo-iec)' }}>
        Knowledge Portals
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '48px' }}>
        {[
          { to: '/matrix', icon: Table, title: 'Master Matrix', desc: 'Complete searchable registry of all standards' },
          { to: '/cross-reference', icon: ArrowRightLeft, title: 'Cross-Reference', desc: 'Direct mapping between international bodies' },
          { to: '/test-methods', icon: Beaker, title: 'Test Methods', desc: 'Standardized testing procedures and parameters' },
          { to: '/specs', icon: Shield, title: 'Specification Standards', desc: 'Core oil quality and product requirements' },
          { to: '/maintenance', icon: Wrench, title: 'Maintenance & Sampling', desc: 'Field guidelines for in-service supervision' },
          { to: '/internal', icon: FileArchive, title: 'Internal Specs', desc: 'SOTL proprietary manufacturing references' },
          { to: '/historical', icon: History, title: 'Historical / Legacy', desc: 'Archival standards for traceability' },
          { to: '/quick-ref', icon: Zap, title: 'Quick Reference', desc: 'Essential cheat-sheet for fast lookup' }
        ].map((item, i) => (
          <Link key={i} to={item.to} style={{ textDecoration: 'none', display: 'flex', alignItems: 'flex-start', padding: '24px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }} className="access-card">
            <div style={{ background: 'var(--bg-tertiary)', padding: '12px', borderRadius: '8px', marginRight: '16px', color: 'var(--sdo-iec)' }}>
              <item.icon size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {item.title} <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* 4. STANDARDS COVERAGE SECTION */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px', paddingLeft: '8px', borderLeft: '4px solid var(--sdo-iec)' }}>
        Coverage Across Standards Bodies
      </h3>
      <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '32px', marginBottom: '48px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '24px' }}>
          This system comprehensively maps global regulatory, testing, and manufacturing standards for exact comparison and application.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {sdos.map(sdo => (
            <div key={sdo} style={{ padding: '12px 24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '100px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.5px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
              <Globe size={18} style={{ color: 'var(--sdo-iec)' }} /> {sdo}
            </div>
          ))}
        </div>
      </div>

      {/* 5. USE-CASE SECTION */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px', paddingLeft: '8px', borderLeft: '4px solid var(--sdo-iec)' }}>
        What You Can Do Here
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {[
          { icon: ArrowRightLeft, title: 'Compare equivalent standards', desc: 'Map ASTM to IEC and other regional adoptions instantly.' },
          { icon: Beaker, title: 'Identify test methods', desc: 'Find the correct procedure for BDV, DGA, Moisture, etc.' },
          { icon: FileText, title: 'Support tender specifications', desc: 'Validate technical requirements for utility bids.' },
          { icon: Wrench, title: 'Review maintenance guidance', desc: 'Access in-service limits and supervision criteria.' },
          { icon: History, title: 'Trace legacy references', desc: 'Understand superseded editions for older equipment.' },
          { icon: Settings, title: 'Access internal SOTL specs', desc: 'Review proprietary product grades and storage guidelines.' }
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-primary)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--sdo-iec)', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '50%' }}>
              <item.icon size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{item.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
