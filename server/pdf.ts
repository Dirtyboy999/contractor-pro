import { PDFDocument, PDFPage, rgb } from 'pdf-lib';

interface InvoiceData {
  invoiceNumber: string;
  title: string;
  dueDate?: Date;
  clientName: string;
  clientEmail?: string;
  businessName?: string;
  businessAddress?: string;
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    section: string;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
}

export async function generateInvoicePDF(data: InvoiceData): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // Letter size
  const { width, height } = page.getSize();
  
  const margin = 40;
  const lineHeight = 15;
  let y = height - margin;

  // Header
  page.drawText(data.businessName || 'Invoice', {
    x: margin,
    y: y,
    size: 24,
    color: rgb(0, 0, 0),
  });
  y -= lineHeight * 2;

  // Invoice details
  page.drawText(`Invoice #: ${data.invoiceNumber}`, {
    x: margin,
    y: y,
    size: 11,
    color: rgb(0, 0, 0),
  });
  y -= lineHeight;

  if (data.dueDate) {
    page.drawText(`Due Date: ${data.dueDate.toLocaleDateString()}`, {
      x: margin,
      y: y,
      size: 11,
      color: rgb(0, 0, 0),
    });
  }
  y -= lineHeight * 2;

  // Bill To
  page.drawText('BILL TO:', {
    x: margin,
    y: y,
    size: 12,
    color: rgb(0, 0, 0),
  });
  y -= lineHeight;

  page.drawText(data.clientName, {
    x: margin,
    y: y,
    size: 11,
    color: rgb(0, 0, 0),
  });
  y -= lineHeight;

  if (data.clientEmail) {
    page.drawText(data.clientEmail, {
      x: margin,
      y: y,
      size: 10,
      color: rgb(100, 100, 100),
    });
  }
  y -= lineHeight * 2;

  // Line items header
  const colX = [margin, margin + 250, margin + 350, margin + 450];
  page.drawText('Description', { x: colX[0], y: y, size: 11, color: rgb(0, 0, 0) });
  page.drawText('Qty', { x: colX[1], y: y, size: 11, color: rgb(0, 0, 0) });
  page.drawText('Unit Price', { x: colX[2], y: y, size: 11, color: rgb(0, 0, 0) });
  page.drawText('Total', { x: colX[3], y: y, size: 11, color: rgb(0, 0, 0) });
  y -= lineHeight;

  // Draw line
  page.drawLine({
    start: { x: margin, y: y },
    end: { x: width - margin, y: y },
    color: rgb(200, 200, 200),
  });
  y -= lineHeight;

  // Line items
  let currentSection = '';
  for (const item of data.lineItems) {
    if (item.section !== currentSection) {
      currentSection = item.section;
      page.drawText(currentSection, {
        x: margin,
        y: y,
        size: 10,
        color: rgb(100, 100, 100),
      });
      y -= lineHeight;
    }

    page.drawText(item.description, { x: colX[0], y: y, size: 10, color: rgb(0, 0, 0) });
    page.drawText(item.quantity.toString(), { x: colX[1], y: y, size: 10, color: rgb(0, 0, 0) });
    page.drawText(`$${item.unitPrice.toFixed(2)}`, { x: colX[2], y: y, size: 10, color: rgb(0, 0, 0) });
    page.drawText(`$${(item.quantity * item.unitPrice).toFixed(2)}`, { x: colX[3], y: y, size: 10, color: rgb(0, 0, 0) });
    y -= lineHeight;
  }

  y -= lineHeight;

  // Totals
  page.drawLine({
    start: { x: margin, y: y },
    end: { x: width - margin, y: y },
    color: rgb(200, 200, 200),
  });
  y -= lineHeight;

  page.drawText('Subtotal:', { x: colX[2], y: y, size: 11, color: rgb(0, 0, 0) });
  page.drawText(`$${data.subtotal.toFixed(2)}`, { x: colX[3], y: y, size: 11, color: rgb(0, 0, 0) });
  y -= lineHeight;

  page.drawText('Tax (10%):', { x: colX[2], y: y, size: 11, color: rgb(0, 0, 0) });
  page.drawText(`$${data.tax.toFixed(2)}`, { x: colX[3], y: y, size: 11, color: rgb(0, 0, 0) });
  y -= lineHeight;

  page.drawLine({
    start: { x: colX[2], y: y },
    end: { x: width - margin, y: y },
    color: rgb(0, 0, 0),
  });
  y -= lineHeight;

  page.drawText('TOTAL:', { x: colX[2], y: y, size: 12, color: rgb(0, 0, 0) });
  page.drawText(`$${data.total.toFixed(2)}`, { x: colX[3], y: y, size: 12, color: rgb(0, 0, 0) });
  y -= lineHeight * 2;

  // Notes
  if (data.notes) {
    page.drawText('Notes:', { x: margin, y: y, size: 11, color: rgb(0, 0, 0) });
    y -= lineHeight;
    page.drawText(data.notes, { x: margin, y: y, size: 10, color: rgb(100, 100, 100) });
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

export async function generateBidPDF(data: Omit<InvoiceData, 'invoiceNumber' | 'dueDate'> & { bidNumber: string; validUntil?: Date }): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]);
  const { width, height } = page.getSize();
  
  const margin = 40;
  const lineHeight = 15;
  let y = height - margin;

  // Header
  page.drawText(data.businessName || 'Estimate', {
    x: margin,
    y: y,
    size: 24,
    color: rgb(0, 0, 0),
  });
  y -= lineHeight * 2;

  // Estimate details
  page.drawText(`Estimate #: ${data.bidNumber}`, {
    x: margin,
    y: y,
    size: 11,
    color: rgb(0, 0, 0),
  });
  y -= lineHeight;

  if (data.validUntil) {
    page.drawText(`Valid Until: ${data.validUntil.toLocaleDateString()}`, {
      x: margin,
      y: y,
      size: 11,
      color: rgb(0, 0, 0),
    });
  }
  y -= lineHeight * 2;

  // Bill To
  page.drawText('FOR:', {
    x: margin,
    y: y,
    size: 12,
    color: rgb(0, 0, 0),
  });
  y -= lineHeight;

  page.drawText(data.clientName, {
    x: margin,
    y: y,
    size: 11,
    color: rgb(0, 0, 0),
  });
  y -= lineHeight * 2;

  // Line items header
  const colX = [margin, margin + 250, margin + 350, margin + 450];
  page.drawText('Description', { x: colX[0], y: y, size: 11, color: rgb(0, 0, 0) });
  page.drawText('Qty', { x: colX[1], y: y, size: 11, color: rgb(0, 0, 0) });
  page.drawText('Unit Price', { x: colX[2], y: y, size: 11, color: rgb(0, 0, 0) });
  page.drawText('Total', { x: colX[3], y: y, size: 11, color: rgb(0, 0, 0) });
  y -= lineHeight;

  page.drawLine({
    start: { x: margin, y: y },
    end: { x: width - margin, y: y },
    color: rgb(200, 200, 200),
  });
  y -= lineHeight;

  // Line items
  let currentSection = '';
  for (const item of data.lineItems) {
    if (item.section !== currentSection) {
      currentSection = item.section;
      page.drawText(currentSection, {
        x: margin,
        y: y,
        size: 10,
        color: rgb(100, 100, 100),
      });
      y -= lineHeight;
    }

    page.drawText(item.description, { x: colX[0], y: y, size: 10, color: rgb(0, 0, 0) });
    page.drawText(item.quantity.toString(), { x: colX[1], y: y, size: 10, color: rgb(0, 0, 0) });
    page.drawText(`$${item.unitPrice.toFixed(2)}`, { x: colX[2], y: y, size: 10, color: rgb(0, 0, 0) });
    page.drawText(`$${(item.quantity * item.unitPrice).toFixed(2)}`, { x: colX[3], y: y, size: 10, color: rgb(0, 0, 0) });
    y -= lineHeight;
  }

  y -= lineHeight;

  // Totals
  page.drawLine({
    start: { x: margin, y: y },
    end: { x: width - margin, y: y },
    color: rgb(200, 200, 200),
  });
  y -= lineHeight;

  page.drawText('Subtotal:', { x: colX[2], y: y, size: 11, color: rgb(0, 0, 0) });
  page.drawText(`$${data.subtotal.toFixed(2)}`, { x: colX[3], y: y, size: 11, color: rgb(0, 0, 0) });
  y -= lineHeight;

  page.drawText('Tax (10%):', { x: colX[2], y: y, size: 11, color: rgb(0, 0, 0) });
  page.drawText(`$${data.tax.toFixed(2)}`, { x: colX[3], y: y, size: 11, color: rgb(0, 0, 0) });
  y -= lineHeight;

  page.drawLine({
    start: { x: colX[2], y: y },
    end: { x: width - margin, y: y },
    color: rgb(0, 0, 0),
  });
  y -= lineHeight;

  page.drawText('TOTAL:', { x: colX[2], y: y, size: 12, color: rgb(0, 0, 0) });
  page.drawText(`$${data.total.toFixed(2)}`, { x: colX[3], y: y, size: 12, color: rgb(0, 0, 0) });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
