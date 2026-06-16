import React, { useState, useMemo } from 'react';
import standardsData from '../data/standards_data.json';
import MatrixTable from '../components/MatrixTable';

export default function MasterMatrix() {
  const masterMatrix = standardsData['Master Matrix'] || [];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sdoFilter, setSdoFilter] = useState('');
  const [topicFilter, setTopicFilter] = useState('');

  // Extract unique filter options
  const sdos = useMemo(() => {
    const unique = new Set(masterMatrix.map(row => row['SDO']).filter(Boolean));
    return Array.from(unique).sort();
  }, [masterMatrix]);

  const topics = useMemo(() => {
    const unique = new Set(masterMatrix.map(row => row['Topic Category']).filter(Boolean));
    return Array.from(unique).sort();
  }, [masterMatrix]);

  // Filter data
  const filteredData = useMemo(() => {
    return masterMatrix.filter(row => {
      const matchesSearch = Object.values(row).some(val => 
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesSdo = sdoFilter ? row['SDO'] === sdoFilter : true;
      const matchesTopic = topicFilter ? row['Topic Category'] === topicFilter : true;
      
      return matchesSearch && matchesSdo && matchesTopic;
    });
  }, [masterMatrix, searchTerm, sdoFilter, topicFilter]);

  return (
    <div>
      <div className="page-header">
        <h2>Master Correlation Matrix</h2>
        <p>Complete searchable registry of all referenced standards.</p>
      </div>

      <div className="controls-bar">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search keywords, standards, keys..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select className="select-input" value={sdoFilter} onChange={e => setSdoFilter(e.target.value)}>
          <option value="">All SDOs</option>
          {sdos.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="select-input" value={topicFilter} onChange={e => setTopicFilter(e.target.value)}>
          <option value="">All Categories</option>
          {topics.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <button className="btn btn-outline" onClick={() => {
          setSearchTerm('');
          setSdoFilter('');
          setTopicFilter('');
        }}>Reset Filters</button>
      </div>

      <div style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
        Showing {filteredData.length} records
      </div>

      <MatrixTable data={filteredData} />
    </div>
  );
}
