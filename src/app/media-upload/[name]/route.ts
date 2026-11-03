import { readImage } from '@/lib/admin-images';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const image = await readImage((await params).name);
  if (!image) return new Response(null, { status: 404 });
  return new Response(new Uint8Array(image.bytes), {
    headers: {
      'Content-Type': image.type,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
