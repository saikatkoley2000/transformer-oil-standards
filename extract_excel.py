import pandas as pd
import json
import sys

file_path = "SOTL_Transformer_Oil_Standards_Correlation.xlsx"
try:
    xls = pd.ExcelFile(file_path)

    data = {}
    for sheet_name in xls.sheet_names:
        df = pd.read_excel(xls, sheet_name=sheet_name)
        df = df.fillna("")
        data[sheet_name] = df.to_dict(orient='records')

    with open("standards_data.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print("Sheet names:", xls.sheet_names)
    for sheet in xls.sheet_names:
        print(f"Columns in '{sheet}':", list(pd.read_excel(xls, sheet_name=sheet).columns))
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
