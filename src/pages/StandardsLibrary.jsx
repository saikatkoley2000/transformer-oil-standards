import React, { useState, useMemo } from 'react';
import standardsData from '../data/standards_data.json';
import DetailModal from '../components/DetailModal';
import { getSdoClass } from '../utils';

export default function StandardsLibrary() {
  const masterMatrix = standardsData['Master Matrix'] || [];
  const [selectedRow, setSelectedRow] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [topicFilter, setTopicFilter] = useState('');

  // Extract unique filter options
  const topics = useMemo(() => {
    const unique = new Set(masterMatrix.map(row => row['Topic Category']).filter(Boolean));
    return Array.from(unique).sort();
  }, [masterMatrix]);

  // Filter data first
  const filteredData = useMemo(() => {
    return masterMatrix.filter(row => {
      const matchesSearch = Object.values(row).some(val => 
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesTopic = topicFilter ? row['Topic Category'] === topicFilter : true;
      
      return matchesSearch && matchesTopic;
    });
  }, [masterMatrix, searchTerm, topicFilter]);

  // Then group by SDO
  const groupedBySdo = useMemo(() => {
    const groups = {};
    filteredData.forEach(row => {
      const sdo = row['SDO'] || 'Other';
      if (!groups[sdo]) groups[sdo] = [];
      groups[sdo].push(row);
    });
    return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filteredData]);

  return (
    <div>
      <div className="page-header">
        <h2>Standards Library</h2>
        <p>Browse standards organized by Standards Development Organization (SDO).</p>
      </div>

      <div className="controls-bar">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search standard no, keywords..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select className="select-input" value={topicFilter} onChange={e => setTopicFilter(e.target.value)}>
          <option value="">All Categories</option>
          {topics.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <button className="btn btn-outline" onClick={() => {
          setSearchTerm('');
          setTopicFilter('');
        }}>Reset Filters</button>
      </div>

      <div style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
        Showing {filteredData.length} documents across {groupedBySdo.length} SDOs
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {groupedBySdo.length === 0 && (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No standards found matching your criteria.
          </div>
        )}
        
        {groupedBySdo.map(([sdo, items]) => (
          <div key={sdo} style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className={`tag ${getSdoClass(sdo)}`} style={{ fontSize: '1rem', padding: '6px 12px' }}>{sdo}</span>
                <h3 style={{ margin: 0 }}>{sdo} Standards</h3>
              </div>
              <span className="group-count">{items.length} Documents</span>
            </div>
            <div style={{ padding: '0' }}>
              <table className="data-table" style={{ border: 'none' }}>
                <tbody>
                  {items.map((row, i) => (
                    <tr key={i} className="clickable" onClick={() => setSelectedRow(row)}>
                      <td style={{ width: '20%', fontWeight: 600 }}>{row['Std. No.']}</td>
                      <td style={{ width: '45%' }}>{row['Standard / Document']}</td>
                      <td style={{ width: '35%', color: 'var(--text-secondary)' }}>{row['Topic Category']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {selectedRow && <DetailModal data={selectedRow} onClose={() => setSelectedRow(null)} />}
    </div>
  );
}
