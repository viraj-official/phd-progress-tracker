"""Sync the Research Paper Bank from ../3 Research Papers.

Reads each O*/O*_Paper_Review.xlsx into src/data/papers.json and copies the
PDFs of OPEN-ACCESS papers into public/papers/ so they are hosted with the site.
Every PDF also stays in its objective's Papers folder (two copies). Only papers
with a valid open-access PDF are listed: there is no "pending" list on the site.

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
    OUT_PDF.mkdir(parents=True, exist_ok=True)
    hosted = set()
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
            shutil.copy2(pdf, OUT_PDF / pdf.name)
            hosted.add(pdf.name)
            rec["pdfUrl"] = f"/papers/{pdf.name}"
            papers.append(rec)
        groups.append({
            "id": folder.name.split("_")[0],
            "folder": folder.name,
            "heading": heading,
            "papers": papers,
        })
        print(f"{folder.name}: {len(papers)} papers")
    # remove PDFs that are no longer open access / no longer listed
    for f in OUT_PDF.glob("*.pdf"):
        if f.name not in hosted:
            f.unlink()
    print(f"Hosting {len(hosted)} open-access PDFs in public/papers ({skipped} rows without one not listed)")
    OUT_JSON.write_text(json.dumps(groups, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {OUT_JSON}")


if __name__ == "__main__":
    main()
