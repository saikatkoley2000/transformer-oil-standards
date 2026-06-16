import React, { useMemo, useState } from 'react';
import standardsData from '../data/standards_data.json';
import MatrixTable from '../components/MatrixTable';
import { Search } from 'lucide-react';

// Generic Wrapper for filtered views
function FilteredView({ title, description, filterFn }) {
  const masterMatrix = standardsData['Master Matrix'] || [];
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    let data = masterMatrix.filter(filterFn);
    if (searchTerm) {
      data = data.filter(row => {
        const searchString = Object.values(row).join(' ').toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
      });
    }
    return data;
  }, [masterMatrix, filterFn, searchTerm]);

  return (
    <div>
      <div className="page-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="controls-bar" style={{ marginBottom: '24px' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search by standard no, title, notes..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '40px', width: '100%' }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
        Showing {filteredData.length} records
      </div>
      <MatrixTable data={filteredData} />
    </div>
  );
}

export function TestMethods() {
  return <FilteredView 
    title="Test Methods" 
    description="Standardized testing procedures for BDV, DGA, Furans, Moisture, and other key parameters." 
    filterFn={row => row['Test Method']} 
  />;
}

export function SpecStandards() {
  return <FilteredView 
    title="Specification Standards" 
    description="Core specifications defining oil quality and product requirements." 
    filterFn={row => row['Specification\n(Oil Quality)']} 
  />;
}

export function MaintenanceSampling() {
  return <FilteredView 
    title="Maintenance & Sampling" 
    description="Guidelines for supervision, maintenance, and field sampling of transformer oils." 
    filterFn={row => row['Maintenance\n& Supervision'] || row['Sampling'] || row['DGA / Furans']} 
  />;
}

export function InternalSpecs() {
  return <FilteredView 
    title="Internal SOTL Specifications" 
    description="SOTL specific internal product specifications, storage guidelines, and manufacturing references." 
    filterFn={row => (row['SDO'] || '').includes('SOTL')} 
  />;
}

export function HistoricalLegacy() {
  return <FilteredView 
    title="Historical / Legacy Standards" 
    description="Archival and superseded standards kept for traceability of older equipment and legacy contracts." 
    filterFn={row => {
      const scope = (row['Scope / Key Parameter'] || '').toLowerCase();
      const notes = (row['Notes / Applicability'] || '').toLowerCase();
      return scope.includes('historical') || scope.includes('superseded') || scope.includes('old') ||
             notes.includes('historical') || notes.includes('superseded') || notes.includes('old');
    }} 
  />;
}
