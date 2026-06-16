import React, { useState } from 'react';
import standardsData from '../data/standards_data.json';
import { Search } from 'lucide-react';

export default function QuickReference() {
  const quickRefData = standardsData['Quick Ref Card'] || [];
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = quickRefData.filter(row => {
    if (!row['Parameter / Test'] || row['Parameter / Test'] === 'Parameter / Test') return false;

    // Don't eagerly filter header sections unless searching
    const searchString = Object.values(row).join(' ').toLowerCase();
    if (searchTerm && !searchString.includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <div className="page-header">
        <h2>Quick Reference</h2>
        <p>Essential standards cheat-sheet for fast lookup.</p>
      </div>

      <div className="controls-bar" style={{ marginBottom: '24px' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search parameter, standard, note..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '40px', width: '100%' }}
          />
        </div>
      </div>

      <div className="card-grid">
        {filteredData.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No quick reference items found matching your search.
          </div>
        )}
        {filteredData.map((row, i) => {
          if (row['Parameter / Test'].includes('MAINTENANCE /') || row['Parameter / Test'].includes('ESTER OIL') || row['Parameter / Test'].includes('EXPORT /')) {
             return (
               <div key={i} style={{ gridColumn: '1 / -1', marginTop: '24px', borderBottom: '2px solid var(--sdo-iec)' }}>
                 <h3 style={{ color: 'var(--sdo-iec)', fontSize: '1.25rem' }}>{row['Parameter / Test']}</h3>
               </div>
             )
          }
          
          return (
            <div key={i} className="stat-card" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', width: '100%' }}>
                {row['Parameter / Test']}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>IEC</span>
                  <span style={{ fontWeight: 600, color: 'var(--sdo-iec)' }}>{row['IEC'] || '—'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>ASTM</span>
                  <span style={{ fontWeight: 500, color: 'var(--sdo-astm)' }}>{row['ASTM'] || '—'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>ISO / Other</span>
                  <span style={{ fontWeight: 500, color: 'var(--sdo-iso)' }}>{row['ISO / Other'] || '—'}</span>
                </div>
                {row['Notes'] && (
                  <div style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px dashed var(--border-color)', paddingTop: '8px' }}>
                    {row['Notes']}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
