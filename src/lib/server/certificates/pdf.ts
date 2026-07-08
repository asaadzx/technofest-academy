import PDFDocument from 'pdfkit';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

const LOGO_PATH = resolve('static/school-logo.webp');

const PW = 841;
const PH = 595;
const CX = PW / 2;
const CY = PH / 2;

function loadLogoBuffer(): Buffer | null {
	if (!existsSync(LOGO_PATH)) return null;
	try {
		return execSync(`python3 -c "
from PIL import Image
import sys
img = Image.open('${LOGO_PATH}').convert('RGBA')
img.save(sys.stdout.buffer, 'PNG')
"`, { stdio: ['pipe', 'pipe', 'pipe'] });
	} catch {
		return null;
	}
}

const LOGO_BUF = loadLogoBuffer();

export function generateCertificatePDF(
	userName: string,
	courseTitle: string,
	date: string,
	certCode: string
): Promise<Buffer> {
	return new Promise((resolvePromise) => {
		const doc = new PDFDocument({ layout: 'landscape', size: 'A4' });
		const chunks: Buffer[] = [];

		doc.on('data', (chunk: Buffer) => chunks.push(chunk));
		doc.on('end', () => resolvePromise(Buffer.concat(chunks)));

		const centerText = (text: string, y: number, size: number, color: string) => {
			doc.font('Helvetica').fontSize(size).fillColor(color).text(text, 0, y, { align: 'center', width: PW });
		};

		doc.lineWidth(2).rect(30, 30, PW - 60, PH - 60).stroke('#2563eb');

		if (LOGO_BUF) {
			try { doc.image(LOGO_BUF, CX - 35, CY - 190, { width: 70 }); } catch {}
		}

		centerText('Certificate of Completion', CY - 110, 28, '#2563eb');

		const lineY = CY - 70;
		doc.moveTo(150, lineY).lineTo(PW - 150, lineY).stroke('#e5e7eb');

		centerText('This certifies that', CY - 40, 14, '#6b7280');
		centerText(userName, CY, 32, '#1e293b');
		centerText('has successfully completed the course', CY + 45, 14, '#6b7280');
		centerText(courseTitle, CY + 80, 22, '#2563eb');

		centerText(`Date: ${date}`, CY + 130, 11, '#9ca3af');
		centerText(`Code: ${certCode}`, CY + 150, 8, '#9ca3af');

		doc.end();
	});
}