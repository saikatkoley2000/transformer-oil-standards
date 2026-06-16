import React from 'react';
import { X, ExternalLink, ShieldCheck, Tag, Info, BookOpen } from 'lucide-react';
import { getSdoClass } from '../utils';

export default function DetailModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
              <span className={`tag ${getSdoClass(data['SDO'])}`}>{data['SDO']}</span>
              <span className="tag tag-default">{data['Std. No.']}</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {data['Standard / Document']}
            </h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="detail-row">
            <div className="detail-group">
              <span className="detail-label"><Tag size={12} style={{ display: 'inline', marginRight: '4px' }}/> Topic Category</span>
              <span className="detail-value">{data['Topic Category'] || '—'}</span>
            </div>
            {data['Specification\n(Oil Quality)'] && (
              <div className="detail-group">
                <span className="detail-label"><ShieldCheck size={12} style={{ display: 'inline', marginRight: '4px' }}/> Specification Type</span>
                <span className="detail-value">Oil Quality Specification</span>
              </div>
            )}
            {data['Test Method'] && (
              <div className="detail-group">
                <span className="detail-label">Test Method</span>
                <span className="detail-value">Yes</span>
              </div>
            )}
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }} className="detail-row">
            <div className="detail-group">
              <span className="detail-label">IEC Equivalent</span>
              <span className="detail-value">{data['IEC Equivalent'] || '—'}</span>
            </div>
            <div className="detail-group">
              <span className="detail-label">ASTM Equivalent</span>
              <span className="detail-value">{data['ASTM Equivalent'] || '—'}</span>
            </div>
            <div className="detail-group">
              <span className="detail-label">ISO Equivalent</span>
              <span className="detail-value">{data['ISO Equivalent'] || '—'}</span>
            </div>
            <div className="detail-group">
              <span className="detail-label">IS/BS/DIN Equivalent</span>
              <span className="detail-value">{data['IS/BS/DIN\nEquivalent'] || '—'}</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="detail-group">
              <span className="detail-label"><Info size={12} style={{ display: 'inline', marginRight: '4px' }}/> Scope / Key Parameter</span>
              <span className="detail-value">{data['Scope / Key Parameter'] || '—'}</span>
            </div>
            <div className="detail-group">
              <span className="detail-label"><ExternalLink size={12} style={{ display: 'inline', marginRight: '4px' }}/> Notes / Applicability</span>
              <span className="detail-value">{data['Notes / Applicability'] || '—'}</span>
            </div>
            <div className="detail-group">
              <span className="detail-label"><BookOpen size={12} style={{ display: 'inline', marginRight: '4px' }}/> Engineering Description</span>
              <div className="detail-value long-text">
                {data['Engineering Description'] || '—'}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
