export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || 'World';
  return Response.json({ message: `Hello ${name}!!` });
}
