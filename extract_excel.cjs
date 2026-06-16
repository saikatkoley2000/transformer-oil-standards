const xlsx = require('xlsx');
const fs = require('fs');

try {
    const workbook = xlsx.readFile('SOTL_Transformer_Oil_Standards_Correlation_updated.xlsx');
    const data = {};
    
    for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        // Read raw data to see where the headers are
        const raw = xlsx.utils.sheet_to_json(sheet, { header: 1 });
        
        let headerRowIndex = 0;
        // The first row often is a title, let's find the row that has the most columns and treat it as header.
        for (let i = 0; i < Math.min(10, raw.length); i++) {
            if (raw[i] && raw[i].length > raw[headerRowIndex].length) {
                headerRowIndex = i;
            }
        }
        
        // Extract with that specific range
        const json = xlsx.utils.sheet_to_json(sheet, { range: headerRowIndex, defval: "" });
        data[sheetName] = json;
    }

    fs.writeFileSync('src/data/standards_data.json', JSON.stringify(data, null, 2), 'utf-8');
    console.log("Data extracted correctly.");
} catch (e) {
    console.error("Error:", e);
}
