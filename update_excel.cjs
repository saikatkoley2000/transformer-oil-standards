const ExcelJS = require('exceljs');
const fs = require('fs');

async function updateWorkbook() {
  const filePath = 'SOTL_Transformer_Oil_Standards_Correlation.xlsx';
  const backupPath = 'SOTL_Transformer_Oil_Standards_Correlation_backup.xlsx';
  
  // Backup
  fs.copyFileSync(filePath, backupPath);

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  console.log('Workbook loaded. Starting updates...');

  // ==========================================
  // 1. UPDATE MASTER MATRIX
  // ==========================================
  const masterSheet = workbook.getWorksheet('Master Matrix');
  if (!masterSheet) {
    console.error('Master Matrix sheet not found!');
    return;
  }

  // Find header row mapping
  let headerRowIndex = -1;
  const colMap = {};
  
  masterSheet.eachRow((row, rowNumber) => {
    if (headerRowIndex !== -1) return;
    row.eachCell((cell, colNumber) => {
      const val = cell.value ? cell.value.toString().trim() : '';
      if (val === 'Std. No.') headerRowIndex = rowNumber;
    });
  });

  if (headerRowIndex === -1) {
    console.error('Could not find header row in Master Matrix');
    return;
  }

  const headerRow = masterSheet.getRow(headerRowIndex);
  headerRow.eachCell((cell, colNumber) => {
    const val = cell.value ? cell.value.toString().replace(/\n/g, ' ').trim() : '';
    colMap[val] = colNumber;
  });

  // Check existing Std. No.
  const existingStds = new Set();
  masterSheet.eachRow((row, rowNumber) => {
    if (rowNumber <= headerRowIndex) return;
    const stdCell = row.getCell(colMap['Std. No.']);
    if (stdCell && stdCell.value) {
        existingStds.add(stdCell.value.toString().trim().toLowerCase());
    }
  });

  const masterAdditions = [
    // SECTION A
    {
      'Std. No.': 'IEC 62770:2024',
      'Standard / Document': 'Fluids for electrotechnical applications – Unused natural esters for transformers and similar electrical equipment',
      'SDO': 'IEC',
      'Topic Category': 'Specification – Natural Ester',
      'Specification (Oil Quality)': '✔',
      'IEC Equivalent': 'IEC 62770',
      'ASTM Equivalent': 'ASTM D6871',
      'IS/BS/DIN Equivalent': 'IS 16659:2017',
      'Scope / Key Parameter': 'Quality specification for unused natural ester insulating fluids for transformers and similar electrical equipment; includes BDV, viscosity, flash/fire point, pour point, acidity, water content, oxidation stability, biodegradability.',
      'Notes / Applicability': 'Edition 2 (2024), supersedes earlier edition. Natural ester analogue to IEC 60296 (mineral oil) and IEC 61099 (synthetic ester).',
      'Engineering Description': 'Core IEC specification for unused natural ester insulating fluids used in transformers and related equipment. Important for fire safety, biodegradability, and green utility procurement.'
    },
    {
      'Std. No.': 'IS 16659:2017',
      'Standard / Document': 'Insulating liquids – Specification for unused natural organic esters for electrical purposes',
      'SDO': 'IS',
      'Topic Category': 'Specification – Natural Ester',
      'Specification (Oil Quality)': '✔',
      'IEC Equivalent': 'IEC 62770',
      'ASTM Equivalent': 'ASTM D6871',
      'IS/BS/DIN Equivalent': 'IS 16659:2017',
      'Scope / Key Parameter': 'Indian BIS specification for unused natural ester insulating fluids.',
      'Notes / Applicability': 'Indian equivalent / adoption aligned with IEC 62770.',
      'Engineering Description': 'Key Indian reference for natural ester oil procurement and technical compliance in Indian utility applications.'
    },
    {
      'Std. No.': 'IEC 62975:2021',
      'Standard / Document': 'Natural esters – Guidelines for maintenance and use in electrical equipment',
      'SDO': 'IEC',
      'Topic Category': 'Maintenance – Natural Ester',
      'Maintenance & Supervision': '✔',
      'IEC Equivalent': 'IEC 62975',
      'Scope / Key Parameter': 'Maintenance, supervision, monitoring, and condition assessment of natural ester fluids in service.',
      'Notes / Applicability': 'Natural ester counterpart to IEC 60422 for mineral oil.',
      'Engineering Description': 'Provides in-service monitoring philosophy, diagnostic criteria, test interpretation, and maintenance guidance for natural ester filled equipment.'
    },
    {
      'Std. No.': 'ASTM D6871',
      'Standard / Document': 'Standard Specification for Natural (Vegetable Oil) Ester Fluids Used in Electrical Apparatus',
      'SDO': 'ASTM',
      'Topic Category': 'Specification – Natural Ester',
      'Specification (Oil Quality)': '✔',
      'IEC Equivalent': 'IEC 62770',
      'ASTM Equivalent': 'ASTM D6871',
      'IS/BS/DIN Equivalent': 'IS 16659:2017',
      'Scope / Key Parameter': 'US specification for natural ester dielectric fluids for electrical apparatus.',
      'Notes / Applicability': 'Important for export, OEM alignment, and cross-reference with IEC / IS natural ester standards.',
      'Engineering Description': 'ASTM reference specification for natural ester transformer fluids, especially relevant in US and international cross-reference discussions.'
    },
    // SECTION B
    {
      'Std. No.': 'IEC 61099',
      'Standard / Document': 'Insulating liquids – Specifications for unused synthetic organic esters for electrical purposes',
      'SDO': 'IEC',
      'Topic Category': 'Specification – Synthetic Ester',
      'Specification (Oil Quality)': '✔',
      'IEC Equivalent': 'IEC 61099',
      'IS/BS/DIN Equivalent': 'IS 16081',
      'Scope / Key Parameter': 'Primary IEC specification for unused synthetic organic ester insulating fluids.',
      'Notes / Applicability': 'Base fluid quality specification for synthetic ester transformer liquids.',
      'Engineering Description': 'Core IEC specification governing synthetic ester quality, performance, and applicability in transformers and related equipment.'
    },
    {
      'Std. No.': 'IS 16081',
      'Standard / Document': 'Synthetic ester insulating fluid specification',
      'SDO': 'IS',
      'Topic Category': 'Specification – Synthetic Ester',
      'Specification (Oil Quality)': '✔',
      'IEC Equivalent': 'IEC 61099',
      'IS/BS/DIN Equivalent': 'IS 16081',
      'Scope / Key Parameter': 'Indian BIS reference for synthetic ester insulating fluids.',
      'Notes / Applicability': 'Indian utility and procurement relevance.',
      'Engineering Description': 'Indian equivalent / aligned reference for synthetic ester oil qualification and procurement.'
    },
    {
      'Std. No.': 'IEC 61203:2025',
      'Standard / Document': 'Synthetic Organic Esters – Guidelines for maintenance and use in electrical equipment',
      'SDO': 'IEC',
      'Topic Category': 'Maintenance – Synthetic Ester',
      'Maintenance & Supervision': '✔',
      'IEC Equivalent': 'IEC 61203',
      'Scope / Key Parameter': 'Maintenance, supervision, diagnostic testing, action limits, and condition assessment of synthetic esters in service.',
      'Notes / Applicability': 'Edition 2 (2025). Synthetic ester counterpart to IEC 62975 (natural esters) and IEC 60422 (mineral oil).',
      'Engineering Description': 'Defines maintenance practices, categories of equipment, routine/complementary/investigative tests, interpretation, and corrective action guidance for synthetic ester-filled equipment.'
    },
    // SECTION C
    {
      'Std. No.': 'IEC 62021-3',
      'Standard / Document': 'Insulating liquids – Determination of acidity – Part 3: Test methods for non-mineral insulating oils',
      'SDO': 'IEC',
      'Topic Category': 'Test Method – Acidity',
      'Test Method': '✔',
      'IEC Equivalent': 'IEC 62021-3',
      'Scope / Key Parameter': 'Acidity test method for non-mineral insulating oils including natural and synthetic esters.',
      'Notes / Applicability': 'Preferred IEC acidity method for ester fluids.',
      'Engineering Description': 'Critical acidity method for ester-based insulating liquids; should not be confused with mineral-oil acidity methods.'
    },
    {
      'Std. No.': 'IEC 60076-14',
      'Standard / Document': 'Power transformers – Part 14: Liquid-immersed power transformers using high-temperature insulation materials',
      'SDO': 'IEC',
      'Topic Category': 'Transformer Design Standard',
      'IEC Equivalent': 'IEC 60076-14',
      'IS/BS/DIN Equivalent': 'IS 2026 Part 14',
      'Scope / Key Parameter': 'Design, thermal performance, and insulation coordination for transformers using high-temperature insulation systems and ester-compatible designs.',
      'Notes / Applicability': 'Important for ester-filled transformer design and high-temperature insulation systems.',
      'Engineering Description': 'Supports equipment design logic where ester fluids are combined with high-temperature insulation systems.'
    },
    {
      'Std. No.': 'IEC 63012',
      'Standard / Document': 'Insulating liquids – Unused modified or blended esters for electrotechnical applications',
      'SDO': 'IEC',
      'Topic Category': 'Specification – Modified / Blended Ester',
      'Specification (Oil Quality)': '✔',
      'IEC Equivalent': 'IEC 63012',
      'Scope / Key Parameter': 'Specification for modified or blended ester insulating liquids.',
      'Notes / Applicability': 'Relevant where blended ester products are discussed.',
      'Engineering Description': 'Important bridge standard between pure natural ester and other ester-based insulating fluid formulations.'
    },
    {
      'Std. No.': 'IEEE C57.147',
      'Standard / Document': 'Guide for Acceptance and Maintenance of Natural Ester Fluids in Transformers',
      'SDO': 'IEEE',
      'Topic Category': 'Maintenance – Natural Ester',
      'Maintenance & Supervision': '✔',
      'Scope / Key Parameter': 'Acceptance, maintenance, reconditioning, and in-service guidance for natural ester fluids.',
      'Notes / Applicability': 'Useful IEEE companion to IEC 62975 and ASTM D6871.',
      'Engineering Description': 'Widely cited IEEE natural ester maintenance guide for condition assessment and field handling.'
    },
    {
      'Std. No.': 'IEEE C57.154',
      'Standard / Document': 'Guide for the Design, Testing, and Application of Liquid-Immersed Distribution, Power, and Regulating Transformers Using High-Temperature Insulation Systems and Operating at Elevated Temperatures',
      'SDO': 'IEEE',
      'Topic Category': 'Transformer Design Standard',
      'Scope / Key Parameter': 'Transformer design and application guidance for high-temperature systems often associated with ester fluid use.',
      'Notes / Applicability': 'Useful companion reference for ester-compatible transformer systems.',
      'Engineering Description': 'Relevant for technical positioning of ester-filled transformers using advanced thermal classes.'
    },
    // SECTION D: ASTM Methods
    { 'Std. No.': 'ASTM D923', 'SDO': 'ASTM', 'Topic Category': 'Test Method – Sampling', 'Test Method': '✔', 'Standard / Document': 'Practices for sampling', 'Scope / Key Parameter': 'General sampling procedures, applicable to natural and synthetic esters.', 'Notes / Applicability': 'Includes ester applications alongside mineral oils.' },
    { 'Std. No.': 'ASTM D3305', 'SDO': 'ASTM', 'Topic Category': 'Test Method – Sampling', 'Test Method': '✔', 'Standard / Document': 'Practices for sampling (alternate)', 'Scope / Key Parameter': 'Alternate sampling practice, suitable for natural esters.', 'Notes / Applicability': 'Useful for ester-based sampling references.' },
    { 'Std. No.': 'ASTM D664', 'SDO': 'ASTM', 'Topic Category': 'Test Method – Acidity', 'Test Method': '✔', 'Standard / Document': 'Neutralization number', 'Scope / Key Parameter': 'Acidity measurement, applied to natural and synthetic esters.', 'Notes / Applicability': 'Often cited in ASTM ester specifications.' },
    { 'Std. No.': 'ASTM D974', 'SDO': 'ASTM', 'Topic Category': 'Test Method – Acidity', 'Test Method': '✔', 'Standard / Document': 'Neutralization number (colour indicator)', 'Scope / Key Parameter': 'Acidity measurement (colour indicator method), applied to natural and synthetic esters.', 'Notes / Applicability': 'Applicable for ester monitoring.' },
    { 'Std. No.': 'ASTM D1816', 'SDO': 'ASTM', 'Topic Category': 'Test Method – BDV', 'Test Method': '✔', 'Standard / Document': 'Dielectric breakdown voltage', 'IEC Equivalent': 'IEC 60156', 'Scope / Key Parameter': 'Breakdown voltage measurement suitable for natural and synthetic esters.', 'Notes / Applicability': 'Standard BDV test in ASTM framework.' },
    { 'Std. No.': 'ASTM D3300', 'SDO': 'ASTM', 'Topic Category': 'Test Method – Impulse BDV', 'Test Method': '✔', 'Standard / Document': 'Dielectric breakdown voltage, impulse conditions', 'IEC Equivalent': 'IEC 60897', 'Scope / Key Parameter': 'Impulse breakdown voltage, applicable to ester fluids.', 'Notes / Applicability': 'Crucial for insulation coordination in ester transformers.' },
    { 'Std. No.': 'ASTM D924', 'SDO': 'ASTM', 'Topic Category': 'Test Method – Tan Delta', 'Test Method': '✔', 'Standard / Document': 'AC loss characteristics / dissipation factor / relative permittivity', 'IEC Equivalent': 'IEC 60247', 'Scope / Key Parameter': 'Tan delta and permittivity, critical for ester dielectric evaluation.', 'Notes / Applicability': 'Standard evaluation for natural and synthetic esters.' },
    { 'Std. No.': 'ASTM D971', 'SDO': 'ASTM', 'Topic Category': 'Test Method – IFT', 'Test Method': '✔', 'Standard / Document': 'Interfacial tension', 'IEC Equivalent': 'IEC 62961', 'Scope / Key Parameter': 'IFT measurement for natural and synthetic esters.', 'Notes / Applicability': 'Used for contamination and degradation checks.' },
    { 'Std. No.': 'ASTM D1500', 'SDO': 'ASTM', 'Topic Category': 'Test Method – Colour', 'Test Method': '✔', 'Standard / Document': 'Colour', 'ISO Equivalent': 'ISO 2049', 'Scope / Key Parameter': 'Visual colour evaluation suitable for esters.', 'Notes / Applicability': 'Standard parameter in oil condition checks.' },
    { 'Std. No.': 'ASTM D445', 'SDO': 'ASTM', 'Topic Category': 'Test Method – Viscosity', 'Test Method': '✔', 'Standard / Document': 'Kinematic viscosity', 'ISO Equivalent': 'ISO 3104', 'Scope / Key Parameter': 'Viscosity measurement, important for the differing thermal flow characteristics of esters.', 'Notes / Applicability': 'Highly relevant due to higher viscosity of natural and synthetic esters.' },
    { 'Std. No.': 'ASTM D92', 'SDO': 'ASTM', 'Topic Category': 'Test Method – Flash & Fire Point', 'Test Method': '✔', 'Standard / Document': 'Flash point and fire point – Cleveland Open Cup', 'ISO Equivalent': 'ISO 2592', 'Scope / Key Parameter': 'Flash and fire point measurement (Cleveland Open Cup), critical for K-class ester classification.', 'Notes / Applicability': 'Defines the fire safety rating of ester fluids.' },
    { 'Std. No.': 'ASTM D1298', 'SDO': 'ASTM', 'Topic Category': 'Test Method – Density', 'Test Method': '✔', 'Standard / Document': 'Relative density (specific gravity)', 'ISO Equivalent': 'ISO 3675 / ISO 12185', 'Scope / Key Parameter': 'Density measurement, distinguishing esters from mineral oils.', 'Notes / Applicability': 'Relevant due to higher density of esters.' },
    { 'Std. No.': 'ASTM D97', 'SDO': 'ASTM', 'Topic Category': 'Test Method – Pour Point', 'Test Method': '✔', 'Standard / Document': 'Pour point', 'ISO Equivalent': 'ISO 3016', 'Scope / Key Parameter': 'Pour point determination, important for cold start operations of ester transformers.', 'Notes / Applicability': 'Natural esters typically have different pour points requiring specific additives or management.' },
    { 'Std. No.': 'ASTM D1169', 'SDO': 'ASTM', 'Topic Category': 'Test Method – Resistivity', 'Test Method': '✔', 'Standard / Document': 'Volume resistivity (specific resistance)', 'IEC Equivalent': 'IEC 60247', 'Scope / Key Parameter': 'Volume resistivity evaluation for natural and synthetic esters.', 'Notes / Applicability': 'Standard electrical property test.' },
    { 'Std. No.': 'ASTM D2945', 'SDO': 'ASTM', 'Topic Category': 'Test Method – DGA', 'Test Method': '✔', 'Standard / Document': 'Gas analysis', 'Scope / Key Parameter': 'Gas analysis method, with developing relevance to ester diagnostic interpretation.', 'Notes / Applicability': 'DGA for esters requires different interpretation algorithms.' },
    { 'Std. No.': 'ASTM D3284', 'SDO': 'ASTM', 'Topic Category': 'Test Method – DGA', 'Test Method': '✔', 'Standard / Document': 'Gas analysis', 'Scope / Key Parameter': 'Combustible gas analysis.', 'Notes / Applicability': 'Part of ester DGA framework.' },
    { 'Std. No.': 'ASTM D3612', 'SDO': 'ASTM', 'Topic Category': 'Test Method – DGA', 'Test Method': '✔', 'Standard / Document': 'Gas analysis', 'IEC Equivalent': 'IEC 60567', 'Scope / Key Parameter': 'Primary ASTM DGA method, adapted for natural and synthetic ester diagnostics.', 'Notes / Applicability': 'Crucial for in-service ester transformer condition monitoring.' },
    { 'Std. No.': 'ASTM D1533', 'SDO': 'ASTM', 'Topic Category': 'Test Method – Water Content', 'Test Method': '✔', 'Standard / Document': 'Water content – Karl Fischer', 'IEC Equivalent': 'IEC 60814', 'Scope / Key Parameter': 'Karl Fischer water content determination, essential as esters have higher moisture saturation limits.', 'Notes / Applicability': 'Requires specific methodology variations for high-moisture ester capacity.' },
    { 'Std. No.': 'ASTM D1524', 'SDO': 'ASTM', 'Topic Category': 'Test Method – Visual Examination', 'Test Method': '✔', 'Standard / Document': 'Visual examination field test (and colour)', 'Scope / Key Parameter': 'Field visual checks for ester insulating fluids.', 'Notes / Applicability': 'Field maintenance checks.' },
    { 'Std. No.': 'ASTM D2300', 'SDO': 'ASTM', 'Topic Category': 'Test Method – Gassing', 'Test Method': '✔', 'Standard / Document': 'Gassing of insulating oils under electrical stress and ionization', 'IEC Equivalent': 'IEC 60628', 'Scope / Key Parameter': 'Gassing tendency evaluation under electrical stress, comparative for ester fluids.', 'Notes / Applicability': 'Helps classify ester behaviour under electrical stress.' },
    { 'Std. No.': 'ASTM D1275', 'SDO': 'ASTM', 'Topic Category': 'Test Method – Corrosive Sulphur', 'Test Method': '✔', 'Standard / Document': 'Corrosive sulphur test', 'IEC Equivalent': 'IEC 62535', 'IS/BS/DIN Equivalent': 'DIN 51353', 'Scope / Key Parameter': 'Detection of corrosive sulphur compounds in natural and synthetic esters.', 'Notes / Applicability': 'Relevant for ester quality and safety against copper sulphide formation.' },
    { 'Std. No.': 'ASTM D4059', 'SDO': 'ASTM', 'Topic Category': 'Test Method – PCB', 'Test Method': '✔', 'Standard / Document': 'PCB determination', 'IEC Equivalent': 'IEC 61619', 'Scope / Key Parameter': 'PCB contamination checking, applicable to all insulating liquids.', 'Notes / Applicability': 'Ensures environmental compliance for ester fluids.' }
  ];

  let addedMasterCount = 0;
  for (const item of masterAdditions) {
    if (!existingStds.has(item['Std. No.'].toLowerCase())) {
      const newRow = [];
      Object.keys(colMap).forEach(key => {
        newRow[colMap[key]] = item[key] || '—'; // default dash if missing
      });
      masterSheet.addRow(newRow);
      addedMasterCount++;
      existingStds.add(item['Std. No.'].toLowerCase());
    }
  }
  console.log(`Added ${addedMasterCount} rows to Master Matrix.`);

  // ==========================================
  // 2. UPDATE SDO CROSS-REFERENCE
  // ==========================================
  const sdoSheet = workbook.getWorksheet('SDO Cross-Reference');
  if (!sdoSheet) {
    console.error('SDO Cross-Reference sheet not found!');
  } else {
    // We will append a "ESTER SPECIFIC STANDARDS" header block, then append the mappings.
    const lastRowSdo = sdoSheet.rowCount;
    
    // Add spacer
    sdoSheet.addRow([]);
    sdoSheet.addRow([]);
    
    // Add header
    const headerRow = sdoSheet.addRow(['ESTER SPECIFIC STANDARDS / MAPPINGS']);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF004E8A' } };
    sdoSheet.mergeCells(`A${headerRow.number}:F${headerRow.number}`);

    const sdoMappings = [
      ['Natural Ester Specification', 'IEC 62770', 'ASTM D6871', '—', 'IS 16659', 'Core product specification for natural esters'],
      ['Synthetic Ester Specification', 'IEC 61099', '—', '—', 'IS 16081', 'Core product specification for synthetic esters'],
      ['Synthetic Ester Maintenance', 'IEC 61203', '—', '—', '—', 'Guidelines for maintenance & supervision'],
      ['Natural Ester Maintenance', 'IEC 62975', '—', '—', 'IEEE C57.147', 'Guidelines for maintenance & supervision'],
      ['Ester Acidity', 'IEC 62021-3', 'ASTM D664 / D974', '—', '—', 'Crucial acidity test methods for non-mineral oils'],
      ['Ester IFT', 'IEC 62961', 'ASTM D971', '—', '—', 'Interfacial tension evaluation'],
      ['Ester BDV', 'IEC 60156', 'ASTM D1816', '—', '—', 'Breakdown voltage measurement'],
      ['Ester Impulse BDV', 'IEC 60897', 'ASTM D3300', '—', '—', 'Impulse breakdown voltage'],
      ['Ester Tan Delta', 'IEC 60247', 'ASTM D924', '—', '—', 'Dissipation factor and relative permittivity'],
      ['Ester Water Content', 'IEC 60814', 'ASTM D1533', '—', '—', 'Karl Fischer moisture measurement'],
      ['Ester Corrosive Sulphur', 'IEC 62535', 'ASTM D1275', '—', 'DIN 51353', 'Detection of corrosive sulphur'],
      ['Ester PCB', 'IEC 61619', 'ASTM D4059', '—', '—', 'PCB contamination verification'],
      ['Ester Viscosity', '—', 'ASTM D445 / D7042', 'ISO 3104', '—', 'Kinematic viscosity'],
      ['Ester Density', '—', 'ASTM D1298 / D7042', 'ISO 3675 / ISO 12185', '—', 'Relative density / Specific gravity'],
      ['Ester Pour Point', '—', 'ASTM D97', 'ISO 3016', '—', 'Pour point determination'],
      ['Ester Flash / Fire Point', '—', 'ASTM D92', 'ISO 2592', '—', 'Fire point verification (Cleveland Open Cup)']
    ];

    sdoMappings.forEach(m => sdoSheet.addRow(m));
    console.log(`Added ${sdoMappings.length} mappings to SDO Cross-Reference.`);
  }

  // ==========================================
  // 3. UPDATE QUICK REF CARD
  // ==========================================
  const qrSheet = workbook.getWorksheet('Quick Ref Card');
  if (!qrSheet) {
    console.error('Quick Ref Card sheet not found!');
  } else {
    // Add spacer
    qrSheet.addRow([]);
    qrSheet.addRow([]);

    const qrHeader = qrSheet.addRow(['Natural & Synthetic Ester Test Methods — ASTM Focus']);
    qrHeader.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
    qrHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2A9D8F' } }; // Use a distinct teal color for ester
    qrSheet.mergeCells(`A${qrHeader.number}:E${qrHeader.number}`);

    // Subheader
    const subHeader = qrSheet.addRow(['Parameter / Test', 'ASTM Method(s)', 'Applicability', 'Notes / Link to Main Matrix', '']);
    subHeader.font = { bold: true };
    subHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F2F2' } };

    const qrRows = [
      ['Sampling', 'D923, D3305', 'Natural ester; reference for field/lab sampling', 'Use alongside IEC 60475 where applicable'],
      ['Neutralization number / Acidity', 'D664, D974', 'Natural ester; supportive for synthetic ester context', 'Prefer IEC 62021-3 for ester acidity in IEC framework'],
      ['Power-frequency BDV', 'D1816', 'Natural ester; comparative relevance for synthetic esters', 'Functional equivalent to IEC 60156'],
      ['Impulse BDV', 'D3300', 'Natural ester / dielectric qualification', 'Functional equivalent to IEC 60897'],
      ['Dielectric dissipation factor & permittivity', 'D924', 'Natural & synthetic esters', 'Functional equivalent to IEC 60247'],
      ['Interfacial tension', 'D971', 'Natural & synthetic esters', 'Functional equivalent to IEC 62961'],
      ['Colour', 'D1500', 'Natural & synthetic esters', 'Related ISO 2049'],
      ['Kinematic viscosity', 'D445', 'Natural & synthetic esters', 'Related ISO 3104'],
      ['Flash & fire point', 'D92', 'Natural & synthetic esters', 'Related ISO 2592'],
      ['Relative density / specific gravity', 'D1298', 'Natural & synthetic esters', 'Related ISO 3675 / ISO 12185'],
      ['Pour point', 'D97', 'Natural & synthetic esters', 'Related ISO 3016'],
      ['Volume resistivity', 'D1169', 'Natural & synthetic esters', 'Functional relation to IEC 60247'],
      ['Gas analysis', 'D2945, D3284, D3612', 'Natural ester and ester-filled transformer diagnostics', 'Cross-check with IEC DGA framework'],
      ['Water content', 'D1533', 'Natural & synthetic esters', 'Functional equivalent to IEC 60814'],
      ['Visual examination', 'D1524', 'Natural & synthetic esters', 'Field inspection support'],
      ['Gassing tendency', 'D2300', 'Natural ester / comparative fluid behaviour', 'Related to IEC 60628 concept'],
      ['Corrosive sulphur', 'D1275', 'Natural & synthetic esters', 'Cross-reference IEC 62535 / DIN 51353'],
      ['PCB determination', 'D4059', 'Natural & synthetic esters', 'Cross-reference IEC 61619']
    ];

    qrRows.forEach(r => qrSheet.addRow([r[0], r[1], '', r[2], r[3]])); // Shift to map layout
    console.log(`Added ${qrRows.length} rows to Quick Ref Card.`);
  }

  // Save changes
  await workbook.xlsx.writeFile(filePath);
  console.log('Update completed successfully!');
}

updateWorkbook().catch(console.error);
