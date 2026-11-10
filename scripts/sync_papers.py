"""Sync the Research Paper Bank from ../3 Research Papers.

Reads each O*/O*_Paper_Review.xlsx into src/data/papers.json.
PDFs are NOT hosted on the site (GitHub Pages size limit): they stay in each
objective's Papers folder, and the site shows the extracted notes plus a link to
where the paper is published. Only papers with a valid open-access PDF in the
Papers folder are listed: there is no "pending" list on the site.

Run from the web folder:  python scripts/sync_papers.py   (or: npm run sync)
"""
import json
import shutil
from pathlib import Path

import openpyxl

WEB = Path(__file__).resolve().parent.parent
SRC = WEB.parent / "3 Research Papers"
OUT_JSON = WEB / "src" / "data" / "papers.json"
OUT_PDF = WEB / "public" / "papers"

FIELDS = {
    "Paper ID": "id",
    "Paper Title": "title",
    "Authors": "authors",
    "Year": "year",
    "Published In": "venue",
    "Aim of the Paper": "aim",
    "Method Used": "method",
    "End Result": "result",
    "Technology / Tools Used": "tools",
    "Remaining Work (Gap)": "gap",
    "How It Relates to Our Project": "relation",
    "Limitations & Future Work": "limitations",
    "Link (DOI / arXiv)": "link",
    "PDF in Papers Folder": "pdf",
    "Open Access": "openAccess",
    "Base Paper": "base",
    "Notes": "notes",
    "Full Text Read": "fullText",
    "Detailed Methodology (How They Used the Method)": "methodologyDetail",
    "Study Design & Setting": "studyDesign",
    "Datasets & Sample Size": "datasets",
    "Preprocessing & Data Split": "preprocessing",
    "Model / Method Details": "modelDetails",
    "Training Settings & Values": "training",
    "Evaluation Protocol & Metrics": "evaluation",
    "Baselines Compared": "baselines",
    "Key Quantitative Results": "results",
    "Statistical Analysis": "statistics",
    "Code / Data Availability": "availability",
}


def clean(v):
    return "" if v is None else str(v).strip()


def main():
    groups = []
    skipped = 0
    for folder in sorted(p for p in SRC.iterdir() if p.is_dir()):
        xlsx = next(folder.glob("*_Paper_Review.xlsx"), None)
        if not xlsx:
            continue
        ws = openpyxl.load_workbook(xlsx, data_only=True).worksheets[0]
        rows = list(ws.iter_rows(values_only=True))
        heading = clean(rows[0][0])
        header = [clean(h) for h in rows[1]]
        papers = []
        for r in rows[2:]:
            rec = {FIELDS[h]: clean(v) for h, v in zip(header, r) if h in FIELDS}
            if not rec.get("id"):
                continue
            pdf = folder / "Papers" / rec.get("pdf", "")
            ok = rec.get("pdf") and pdf.is_file() and rec.get("openAccess", "").lower().startswith("yes")
            if ok and pdf.read_bytes()[:5] != b"%PDF-":
                print(f"  skipped {rec['id']}: {pdf.name} is not a valid PDF")
                ok = False
            if not ok:
                skipped += 1
                continue
            papers.append(rec)
        groups.append({
            "id": folder.name.split("_")[0],
            "folder": folder.name,
            "heading": heading,
            "papers": papers,
        })
        print(f"{folder.name}: {len(papers)} papers")
    # PDFs are no longer hosted with the site: remove any old copies
    if OUT_PDF.exists():
        shutil.rmtree(OUT_PDF)
    print(f"Listed {sum(len(g['papers']) for g in groups)} papers ({skipped} rows without an open-access PDF not listed)")
    OUT_JSON.write_text(json.dumps(groups, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {OUT_JSON}")


if __name__ == "__main__":
    main()
