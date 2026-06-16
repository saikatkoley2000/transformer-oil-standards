import React, { useState } from 'react';
import tdsFiles from '../data/tds_list.json';
import { FileText, Download, ExternalLink } from 'lucide-react';

export default function TdsList() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFiles = tdsFiles.filter(file => 
    file.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h2>TDS - Transformer Oil - SOTL</h2>
        <p>Technical Data Sheets for Savita Oil Technologies Limited Transformer Oils.</p>
      </div>

      <div className="controls-bar">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search TDS by standard, type, or name..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ maxWidth: '400px' }}
        />
      </div>

      <div style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
        Showing {filteredFiles.length} Technical Data Sheets
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>TDS Document Name</th>
              <th style={{ width: '120px', textAlign: 'center' }}>View</th>
              <th style={{ width: '120px', textAlign: 'center' }}>Download</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.length === 0 && (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                  No TDS documents found matching your search.
                </td>
              </tr>
            )}
            {filteredFiles.map((filename, i) => (
              <tr key={i} className="clickable" onClick={() => window.open(`/tds/${encodeURIComponent(filename)}`, '_blank')}>
                <td style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={18} style={{ color: 'var(--sdo-sotl)' }} />
                  {filename.replace('.pdf', '')}
                </td>
                <td style={{ textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                  <a href={`/tds/${encodeURIComponent(filename)}`} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', padding: '6px 12px', fontSize: '0.8rem', gap: '6px', alignItems: 'center' }}>
                    <ExternalLink size={14} /> View
                  </a>
                </td>
                <td style={{ textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                  <a href={`/tds/${encodeURIComponent(filename)}`} download={filename} className="btn btn-primary" style={{ display: 'inline-flex', padding: '6px 12px', fontSize: '0.8rem', gap: '6px', alignItems: 'center' }}>
                    <Download size={14} /> Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
