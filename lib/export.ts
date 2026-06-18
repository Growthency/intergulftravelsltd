'use client';

type Cell = string | number | null | undefined;

/** Export rows to a real .xlsx file (SheetJS, loaded on demand). */
export async function exportToExcel(filename: string, headers: string[], rows: Cell[][]) {
  const XLSX = await import('xlsx');
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows.map((r) => r.map((c) => c ?? ''))]);
  ws['!cols'] = headers.map(() => ({ wch: 18 }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`);
}

/** Export a titled table to PDF (jsPDF + autotable, loaded on demand). */
export async function exportToPDF(opts: {
  filename: string;
  title: string;
  subtitle?: string;
  headers: string[];
  rows: Cell[][];
  orientation?: 'p' | 'l';
}) {
  const { jsPDF } = await import('jspdf');
  const autoTable = (await import('jspdf-autotable')).default;

  const doc = new jsPDF({ orientation: opts.orientation ?? 'p', unit: 'mm', format: 'a4' });
  doc.setFontSize(15);
  doc.setTextColor(6, 64, 43);
  doc.text('Inter Gulf Travels Ltd', 14, 15);
  doc.setFontSize(11);
  doc.setTextColor(20);
  doc.text(opts.title, 14, 22);
  if (opts.subtitle) {
    doc.setFontSize(9);
    doc.setTextColor(110);
    doc.text(opts.subtitle, 14, 27);
  }
  autoTable(doc, {
    head: [opts.headers],
    body: opts.rows.map((r) => r.map((c) => (c == null ? '' : String(c)))),
    startY: opts.subtitle ? 31 : 26,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [14, 124, 90], textColor: 255 },
    alternateRowStyles: { fillColor: [246, 243, 234] },
  });
  doc.save(opts.filename.endsWith('.pdf') ? opts.filename : `${opts.filename}.pdf`);
}

/** Open a clean print window for a titled table (list print / ledger print). */
export function printTable(opts: {
  title: string;
  subtitle?: string;
  headers: string[];
  rows: Cell[][];
}) {
  const w = window.open('', '_blank', 'width=1000,height=700');
  if (!w) return;
  const head = opts.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('');
  const body = opts.rows
    .map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c == null ? '' : String(c))}</td>`).join('')}</tr>`)
    .join('');
  w.document.write(`<!doctype html><html><head><title>${escapeHtml(opts.title)}</title>
    <style>
      *{font-family:Arial,Helvetica,sans-serif}
      body{margin:28px;color:#0a1410}
      h1{font-size:18px;margin:0;color:#06402b}
      h2{font-size:13px;font-weight:600;margin:2px 0 2px}
      p.sub{font-size:11px;color:#555;margin:0 0 14px}
      table{width:100%;border-collapse:collapse;font-size:11px}
      th,td{border:1px solid #cfd8d3;padding:6px 8px;text-align:left}
      th{background:#0e7c5a;color:#fff}
      tr:nth-child(even) td{background:#f6f3ea}
      @media print{.noprint{display:none}}
    </style></head><body>
      <h1>Inter Gulf Travels Ltd</h1>
      <h2>${escapeHtml(opts.title)}</h2>
      ${opts.subtitle ? `<p class="sub">${escapeHtml(opts.subtitle)}</p>` : ''}
      <table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>
      <script>window.onload=function(){window.print()}</script>
    </body></html>`);
  w.document.close();
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}
