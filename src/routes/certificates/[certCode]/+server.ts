import { db } from '$lib/server/db';
import { certificates } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { generateCertificatePDF } from '$lib/server/certificates/pdf';

export async function GET({ params }) {
	const cert = await db
		.select()
		.from(certificates)
		.where(eq(certificates.certCode, params.certCode))
		.limit(1)
		.then((r) => r[0] ?? null);

	if (!cert) error(404, 'Certificate not found');

	const date = cert.issuedAt instanceof Date
		? cert.issuedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
		: String(cert.issuedAt);

	const pdf = await generateCertificatePDF(
		cert.userName,
		cert.courseTitle,
		date,
		cert.certCode
	);

	return new Response(new Uint8Array(pdf), {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': `attachment; filename="certificate-${cert.certCode}.pdf"`
		}
	});
}
