import React, { useState } from 'react';
import DetailModal from './DetailModal';
import { getSdoClass } from '../utils';

export default function MatrixTable({ data }) {
  const [selectedRow, setSelectedRow] = useState(null);

  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  return (
    <>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Std. No.</th>
              <th>Standard / Document</th>
              <th>SDO</th>
              <th>Topic Category</th>
              <th>IEC Eqv.</th>
              <th>ASTM Eqv.</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="clickable" onClick={() => handleRowClick(row)}>
                <td style={{ fontWeight: 600 }}>{row['Std. No.']}</td>
                <td>{row['Standard / Document']}</td>
                <td>
                  <span className={`tag ${getSdoClass(row['SDO'])}`}>{row['SDO']}</span>
                </td>
                <td>{row['Topic Category']}</td>
                <td>{row['IEC Equivalent']}</td>
                <td>{row['ASTM Equivalent']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRow && (
        <DetailModal data={selectedRow} onClose={() => setSelectedRow(null)} />
      )}
    </>
  );
}
