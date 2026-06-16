import React, { useState } from 'react';
import standardsData from '../data/standards_data.json';
import { Search } from 'lucide-react';

export default function CrossReference() {
  const crossRefData = standardsData['SDO Cross-Reference'] || [];
  const [searchTerm, setSearchTerm] = useState('');

  // Pre-process and filter
  const filteredData = crossRefData.filter(row => {
    if (!row['Parameter'] && !row['IEC Standard'] && !row['ASTM Standard']) return false;
    if (row['Parameter'] === 'Parameter / Test' || row['Parameter'] === 'Parameter') return false;

    // Don't filter out header rows immediately, we will keep them if they match or if we want to show all. 
    // For simplicity, if it's a header row, we'll include it if there's no search, but if there's a search, we only match if it contains the term.
    const searchString = Object.values(row).join(' ').toLowerCase();
    if (searchTerm && !searchString.includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <div className="page-header">
        <h2>Cross-Reference Engine</h2>
        <p>Direct mapping between IEC, ASTM, ISO, and IS/BS/DIN standards by parameter.</p>
      </div>

      <div className="controls-bar" style={{ marginBottom: '24px' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search parameter, standard no, notes..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '40px', width: '100%' }}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>IEC</th>
              <th>ASTM</th>
              <th>ISO</th>
              <th>IS / BS / DIN</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                  No cross-references found matching your search.
                </td>
              </tr>
            )}
            {filteredData.map((row, i) => {
              if (row['Parameter']?.includes('MAINTENANCE / IN-SERVICE OIL') || row['Parameter']?.includes('ESTER OIL') || row['Parameter']?.includes('EXPORT / REGULATORY')) {
                return (
                  <tr key={i} style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <td colSpan="6" style={{ fontWeight: 'bold', color: 'var(--sdo-iec)', paddingTop: '20px' }}>
                      {row['Parameter']}
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{row['Parameter'] || '—'}</td>
                  <td>{row['IEC Standard'] || '—'}</td>
                  <td>{row['ASTM Standard'] || '—'}</td>
                  <td>{row['ISO Standard'] || '—'}</td>
                  <td>{row['IS / BS / DIN'] || '—'}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{row['Notes'] || '—'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
