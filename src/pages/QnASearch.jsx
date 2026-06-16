import React, { useState, useMemo } from 'react';
import standardsData from '../data/standards_data.json';
import { Search, BookOpen, AlertCircle, FileText } from 'lucide-react';

export default function QnASearch() {
  const masterMatrix = standardsData['Master Matrix'] || [];
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Stop words to filter out common conversational words from query
  const stopWords = new Set(['what', 'is', 'the', 'for', 'in', 'of', 'and', 'to', 'a', 'an', 'how', 'do', 'i', 'find', 'which', 'standard', 'are', 'about', 'can', 'you', 'tell', 'me']);
  
  // High-value keywords that should heavily influence results
  const primaryKeywords = new Set(['synthetic', 'natural', 'mineral', 'bdv', 'dga', 'ift', 'acidity', 'viscosity', 'water', 'moisture', 'flash', 'fire', 'pour', 'density', 'gassing', 'pcb', 'sulphur']);
  const genericKeywords = new Set(['test', 'method', 'oil', 'fluid', 'liquid', 'equipment', 'transformer']);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const rawQuery = query.toLowerCase();
    const rawKeywords = rawQuery.split(/[\s,?\.]+/);
    const keywords = rawKeywords.filter(k => k.length > 2 && !stopWords.has(k));

    if (keywords.length === 0) return [];

    const scoredData = masterMatrix.map(row => {
      let score = 0;
      
      const stdNo = (row['Std. No.'] || '').toLowerCase();
      const stdDoc = (row['Standard / Document'] || '').toLowerCase();
      const scope = (row['Scope / Key Parameter'] || '').toLowerCase();
      const notes = (row['Notes / Applicability'] || '').toLowerCase();
      const engDesc = (row['Engineering Description'] || '').toLowerCase();
      const topic = (row['Topic Category'] || '').toLowerCase();
      
      const combinedText = `${stdNo} ${stdDoc} ${topic} ${scope} ${notes} ${engDesc}`;

      // 1. Fluid Type Strictness (Massive boost for exact fluid match, penalty for mismatch)
      const queryHasSynthetic = rawQuery.includes('synthetic');
      const queryHasNatural = rawQuery.includes('natural');
      const queryHasMineral = rawQuery.includes('mineral');

      const rowHasSynthetic = combinedText.includes('synthetic');
      const rowHasNatural = combinedText.includes('natural');
      const rowHasMineral = combinedText.includes('mineral');

      // If they asked for synthetic, heavily reward synthetic rows, heavily penalize natural-only rows
      if (queryHasSynthetic) {
        if (rowHasSynthetic) score += 100;
        if (rowHasNatural && !rowHasSynthetic) score -= 100; // It's natural, not synthetic!
        if (topic.includes('synthetic')) score += 50;
      }
      
      if (queryHasNatural) {
        if (rowHasNatural) score += 100;
        if (rowHasSynthetic && !rowHasNatural) score -= 100;
        if (topic.includes('natural')) score += 50;
      }

      if (queryHasMineral) {
        if (rowHasMineral) score += 100;
        if ((rowHasSynthetic || rowHasNatural) && !rowHasMineral) score -= 100;
        if (topic.includes('mineral')) score += 50;
      }

      // 2. Keyword matching
      keywords.forEach(kw => {
        // Skip adding points for fluid types since we handled them above
        if (kw === 'synthetic' || kw === 'natural' || kw === 'mineral') return;

        let kwScore = 0;
        
        // Exact standard match gets high priority
        if (stdNo.includes(kw)) kwScore += 50;
        
        // Match in title or topic gets good priority
        if (stdDoc.includes(kw)) kwScore += 20;
        if (topic.includes(kw)) kwScore += 30;

        // Match in descriptions
        if (scope.includes(kw)) kwScore += 10;
        if (notes.includes(kw)) kwScore += 5;
        if (engDesc.includes(kw)) kwScore += 5;
        
        // Multiply by importance
        if (primaryKeywords.has(kw)) {
          kwScore *= 3; // Huge boost for specific test parameters (e.g. 'bdv')
        } else if (genericKeywords.has(kw)) {
          kwScore *= 0.1; // Drastically reduce value of words like 'test' or 'method'
        }

        score += kwScore;
      });

      // 3. Exact phrase match boosts
      if (combinedText.includes(rawQuery)) {
         score += 200;
      }

      return { row, score };
    });

    // Filter out rows with no score (or negative score) and sort
    const matches = scoredData.filter(item => item.score > 10).sort((a, b) => b.score - a.score);
    
    return matches.slice(0, 5);
  }, [query, masterMatrix]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setHasSearched(true);
    } else {
      setHasSearched(false);
    }
  };

  return (
    <div className="qna-page">
      <div className="page-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2>Intelligent Q&A Search</h2>
        <p>Ask a question about transformer oil specifications, tests, or maintenance.</p>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto 40px auto' }}>
        <form onSubmit={handleSearch} style={{ position: 'relative', width: '100%', display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <Search size={24} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="e.g. What is the standard for natural ester?" 
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                if (e.target.value === '') setHasSearched(false);
              }}
              style={{ padding: '16px 16px 16px 50px', width: '100%', fontSize: '1.1rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
            />
          </div>
          <button type="submit" className="action-btn primary" style={{ padding: '0 24px', fontSize: '1.05rem', height: 'auto', display: 'flex', alignItems: 'center' }}>
            Search
          </button>
        </form>
      </div>

      {hasSearched && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ marginBottom: '24px', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            Search Results
          </h3>

          {searchResults.length === 0 ? (
            <div className="empty-state" style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
              <AlertCircle size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 16px auto', display: 'block' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-primary)' }}>No direct answers found in the database.</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                You may search relevant Standard for the same.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {searchResults.map((result, idx) => {
                const { row, score } = result;
                return (
                  <div key={idx} className="access-card" style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '16px', textDecoration: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px' }}>
                        <BookOpen size={24} style={{ color: 'var(--sdo-iec)' }} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 'bold', color: 'var(--sdo-iec)', fontSize: '1.1rem' }}>{row['Std. No.'] || 'Standard'}</span>
                          <span style={{ fontSize: '0.8rem', padding: '2px 8px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', color: 'var(--text-secondary)' }}>
                            Match Score: {score}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 600 }}>{row['Standard / Document'] || '—'}</h4>
                      </div>
                    </div>

                    {row['Scope / Key Parameter'] && (
                      <div style={{ paddingLeft: '52px' }}>
                        <h5 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Scope / Key Parameter</h5>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>{row['Scope / Key Parameter']}</p>
                      </div>
                    )}
                    
                    {row['Engineering Description'] && (
                      <div style={{ paddingLeft: '52px' }}>
                        <h5 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Engineering Description</h5>
                        <p style={{ color: 'var(--text-primary)', lineHeight: '1.6', backgroundColor: '#f8fafc', padding: '12px', borderRadius: '6px', borderLeft: '3px solid var(--sdo-iec)' }}>
                          {row['Engineering Description']}
                        </p>
                      </div>
                    )}

                    {row['Notes / Applicability'] && (
                      <div style={{ paddingLeft: '52px' }}>
                        <h5 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Notes</h5>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5', fontSize: '0.9rem' }}>{row['Notes / Applicability']}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
