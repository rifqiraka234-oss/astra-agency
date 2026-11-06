'use client';
/** Qualify and Disqualify buttons for the lead record header. */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { DisqualifyDialog, QualifyDialog, type FirstStage, type QualifyLead } from './LeadDialogs';
import type { GateUser } from './GateFields';

export function LeadActions({
  lead,
  firstSalesStage,
  users,
  canQualify,
  canDisqualify,
}: {
  lead: QualifyLead;
  firstSalesStage: FirstStage | null;
  users: GateUser[];
  canQualify: boolean;
  canDisqualify: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState<'qualify' | 'disqualify' | null>(null);
  return (
    <>
      {canDisqualify ? <Button onClick={() => setOpen('disqualify')}>Disqualify</Button> : null}
      {canQualify ? (
        <Button variant="accent" onClick={() => setOpen('qualify')}>
          Qualify and create deal
        </Button>
      ) : null}
      <QualifyDialog
        open={open === 'qualify'}
        lead={lead}
        firstStage={firstSalesStage}
        users={users}
        onClose={() => setOpen(null)}
        onDone={(res) => (res.ok && res.href ? router.push(res.href) : router.refresh())}
      />
      <DisqualifyDialog open={open === 'disqualify'} lead={{ id: lead.id, title: lead.title }} onClose={() => setOpen(null)} onDone={() => router.refresh()} />
    </>
  );
}
