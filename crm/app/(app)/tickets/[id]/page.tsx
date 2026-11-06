import { Placeholder } from '@/components/shell/Placeholder';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Placeholder title="Ticket" agent="F" subtitle={`Record ${id}`} />;
}
