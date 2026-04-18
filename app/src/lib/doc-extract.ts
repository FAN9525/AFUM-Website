import * as pdfjsLib from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Set worker source once at module level
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

/**
 * Extract plain text from a File.
 * Supports: .pdf  (pdfjs-dist)
 *           .docx (mammoth)
 *           .md / .txt / any other text (native FileReader)
 */
export async function extractText(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';

  if (ext === 'pdf') {
    return extractPdf(file);
  }

  if (ext === 'docx') {
    return extractDocx(file);
  }

  // markdown, txt, and other readable formats
  return file.text();
}

async function extractPdf(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;

  const pages: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page    = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map(item => ('str' in item ? item.str : ''))
      .join(' ');
    pages.push(pageText);
  }

  return pages.join('\n');
}

async function extractDocx(file: File): Promise<string> {
  // Dynamically imported to avoid bundling on non-admin routes
  const mammoth = await import('mammoth');
  const arrayBuffer = await file.arrayBuffer();
  // mammoth uses export = so .default may or may not be present depending on bundler
  const mod = (mammoth as unknown as { default?: typeof mammoth }).default ?? mammoth;
  const result = await mod.extractRawText({ arrayBuffer });
  return result.value;
}
