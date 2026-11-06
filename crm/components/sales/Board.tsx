'use client';
/**
 * The pipeline board (Pipeline design). Columns are the open stages; the won and
 * lost boxes under the board are drop zones too. Dragging calls moveStageAction
 * optimistically and rolls back when the gate says no, then opens the gate
 * dialog with the missing fields. Won and Lost always show the dialog first, so
 * the reason and what automation will do are seen before the move. A lead
 * dropped on Qualified opens the qualify dialog (it creates the deal), on
 * Disqualified the disqualify dialog (reason required).
 *
 * Keyboard: focus a card, Space to lift, arrow keys to move, Space to drop.
 */
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, useDraggable, useDroppable, useSensor, useSensors,
  type DragEndEvent, type DragStartEvent,
} from '@dnd-kit/core';
import type { BoardCard, BoardData } from '@/lib/sales/queries';
import type { RequiredField } from '@/lib/stages';
import type { SalesResult } from '@/lib/sales/fields';
import { formatMoney } from '@/lib/format';
import { Avatar, Badge } from '@/components/ui';
import { moveStageAction, stageGateAction } from '@/app/(app)/pipelines/actions';
import { GateDialog } from './GateDialog';
import { DisqualifyDialog, QualifyDialog, type FirstStage } from './LeadDialogs';
import type { GateUser } from './GateFields';
import styles from './sales.module.css';

type Gate = {
  card: BoardCard;
  stageId: string;
  title: string;
  hint: string;
  fields: RequiredField[];
  missing: string[];
  needsReason: boolean;
  effects: string[];
  cta: string;
  variant: 'accent' | 'danger' | 'primary';
};

type Toast = { text: string; error?: boolean; href?: string };

const eur = (v: string | null | undefined, decimals?: 0) => (v ? formatMoney(v, 'EUR', decimals) : '€0');

export function Board({
  data,
  users,
  firstSalesStage,
  canEdit,
}: {
  data: Pick<BoardData, 'objectType' | 'columns' | 'closedStages' | 'cards' | 'closed'>;
  users: GateUser[];
  firstSalesStage: FirstStage | null;
  canEdit: boolean;
}) {
  const router = useRouter();
  const [cards, setCards] = useState<BoardCard[]>(data.cards);
  const [pending, setPending] = useState<Set<string>>(new Set());
  const [dragging, setDragging] = useState<BoardCard | null>(null);
  const [gate, setGate] = useState<Gate | null>(null);
  const [qualify, setQualify] = useState<BoardCard | null>(null);
  const [disqualify, setDisqualify] = useState<BoardCard | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => setCards(data.cards), [data.cards]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), toast.error ? 7000 : 4500);
    return () => clearTimeout(t);
  }, [toast]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 220, tolerance: 8 } }),
    useSensor(KeyboardSensor),
  );

  const stageById = useMemo(() => {
    const m = new Map<string, BoardData['columns'][number]['stage']>();
    for (const c of data.columns) m.set(c.stage.id, c.stage);
    for (const s of data.closedStages) m.set(s.id, s);
    return m;
  }, [data.columns, data.closedStages]);

  const isLead = data.objectType === 'lead';

  function moveLocal(cardId: string, stageId: string) {
    setCards((cs) => cs.map((c) => (c.id === cardId ? { ...c, stageId } : c)));
  }

  function setBusy(id: string, on: boolean) {
    setPending((p) => {
      const n = new Set(p);
      if (on) n.add(id);
      else n.delete(id);
      return n;
    });
  }

  async function openGateFromServer(card: BoardCard, stageId: string) {
    const stage = stageById.get(stageId);
    if (!stage) return;
    setBusy(card.id, true);
    const info = await stageGateAction(data.objectType, card.id, stageId);
    setBusy(card.id, false);
    if (!info.ok) {
      setToast({ text: info.error, error: true });
      return;
    }
    const lost = info.state === 'lost';
    setGate({
      card,
      stageId,
      title: info.needsReason ? `Move ${card.title} back to ${stage.name}?` : `To enter ${stage.name}, fill these in`,
      hint: info.needsReason ? 'Moving back gets logged with your reason' : 'Required fields are set per stage in Settings',
      fields: info.fields,
      missing: info.fields.filter((f) => !f.value).map((f) => f.field_key),
      needsReason: info.needsReason,
      effects: info.effects,
      cta: lost ? `Mark as lost` : info.state === 'won' ? 'Mark as won' : `Move to ${stage.name}`,
      variant: lost ? 'danger' : 'accent',
    });
  }

  async function tryMove(card: BoardCard, stageId: string) {
    const stage = stageById.get(stageId);
    if (!stage) return;
    const from = card.stageId;
    moveLocal(card.id, stageId);
    setBusy(card.id, true);
    const res = await moveStageAction({ objectType: data.objectType, recordId: card.id, toStageId: stageId, source: 'board' });
    setBusy(card.id, false);
    if (res.ok) {
      setToast({ text: `${card.title} moved to ${stage.name}` });
      router.refresh();
      return;
    }
    moveLocal(card.id, from); // roll back
    if (res.code === 'required_fields' || res.code === 'reason_required') {
      await openGateFromServer(card, stageId);
      return;
    }
    setToast({ text: res.error, error: true });
  }

  function onDragStart(e: DragStartEvent) {
    setDragging(cards.find((c) => c.id === e.active.id) ?? null);
  }

  function onDragEnd(e: DragEndEvent) {
    setDragging(null);
    const card = cards.find((c) => c.id === e.active.id);
    const overId = e.over?.id ? String(e.over.id) : null;
    if (!card || !overId || !canEdit) return;
    const stageId = overId.replace(/^stage:/, '');
    if (stageId === card.stageId) return;
    const stage = stageById.get(stageId);
    if (!stage) return;
    if (isLead && stage.state === 'won') {
      setQualify(card);
      return;
    }
    if (isLead && stage.state === 'lost') {
      setDisqualify(card);
      return;
    }
    if (stage.state !== 'open') {
      void openGateFromServer(card, stageId);
      return;
    }
    void tryMove(card, stageId);
  }

  const afterLeadDialog = (card: BoardCard | null, stageId: string | undefined) => (res: SalesResult) => {
    if (card && stageId) moveLocal(card.id, stageId);
    if (res.ok) setToast({ text: res.message ?? 'Saved', href: res.href });
    router.refresh();
  };

  const wonStage = data.closedStages.find((s) => s.state === 'won');
  const lostStage = data.closedStages.find((s) => s.state === 'lost');

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragCancel={() => setDragging(null)}>
      <div role="region" aria-label="Board" tabIndex={0} className={styles.board}>
        <div className={styles.columns}>
          {data.columns.map((col) => {
            const colCards = cards.filter((c) => c.stageId === col.stage.id);
            const hidden = col.count - col.shown;
            const meta =
              data.objectType === 'deal'
                ? `${col.stage.probability ?? 0}% · ${eur(sumCards(colCards, 'amount'))} · weighted ${eur(sumCards(colCards, 'weighted'), 0)}`
                : col.stage.description ?? '';
            return (
              <Column key={col.stage.id} id={col.stage.id} name={col.stage.name} count={data.objectType === 'deal' ? colCards.length : col.count + (colCards.length - col.shown)} meta={meta}>
                {colCards.map((card) => (
                  <DraggableCard
                    key={card.id}
                    card={card}
                    disabled={!canEdit || pending.has(card.id)}
                    pending={pending.has(card.id)}
                    onQualify={isLead && card.canQualify && canEdit ? () => setQualify(card) : undefined}
                  />
                ))}
                {hidden > 0 ? (
                  <Link className={styles.more} href={`/leads?stage=${col.stage.id}`}>
                    + {hidden} more
                  </Link>
                ) : null}
              </Column>
            );
          })}
        </div>
      </div>

      <div className={styles.closedRow}>
        {data.closed.map((z) => (
          <ClosedZone key={z.stageId} zone={z} dragging={Boolean(dragging)} />
        ))}
      </div>

      <DragOverlay dropAnimation={null}>{dragging ? <CardBody card={dragging} overlay /> : null}</DragOverlay>

      <GateDialog
        open={Boolean(gate)}
        title={gate?.title ?? ''}
        hint={gate?.hint}
        fields={gate?.fields ?? []}
        missing={gate?.missing}
        needsReason={gate?.needsReason}
        effects={gate?.effects}
        effectsLead="On save, the automations do this"
        cta={gate?.cta ?? ''}
        ctaVariant={gate?.variant}
        users={users}
        key={gate ? `${gate.card.id}-${gate.stageId}` : 'none'}
        onCancel={() => setGate(null)}
        onSubmit={(values, reason) =>
          moveStageAction({ objectType: data.objectType, recordId: gate!.card.id, toStageId: gate!.stageId, values, reason, source: 'board' })
        }
        onDone={() => {
          if (gate) {
            moveLocal(gate.card.id, gate.stageId);
            setToast({ text: `${gate.card.title} moved to ${stageById.get(gate.stageId)?.name ?? 'the new stage'}` });
          }
          setGate(null);
          router.refresh();
        }}
      />

      {isLead ? (
        <>
          <QualifyDialog
            open={Boolean(qualify)}
            lead={qualify ? { id: qualify.id, title: qualify.title, orgName: qualify.orgName, worth: qualify.amount, ownerId: qualify.ownerId } : null}
            firstStage={firstSalesStage}
            users={users}
            onClose={() => setQualify(null)}
            onDone={afterLeadDialog(qualify, wonStage?.id)}
          />
          <DisqualifyDialog
            open={Boolean(disqualify)}
            lead={disqualify ? { id: disqualify.id, title: disqualify.title } : null}
            onClose={() => setDisqualify(null)}
            onDone={afterLeadDialog(disqualify, lostStage?.id)}
          />
        </>
      ) : null}

      {toast ? (
        <div role="status" aria-live="polite" className={[styles.toast, toast.error ? styles.toastError : ''].join(' ')}>
          {toast.text}
          {toast.href ? (
            <>
              {' '}
              <Link href={toast.href} style={{ color: '#fff', textDecoration: 'underline' }}>
                Open
              </Link>
            </>
          ) : null}
        </div>
      ) : null}
    </DndContext>
  );
}

function sumCards(cards: BoardCard[], key: 'amount' | 'weighted'): string {
  let cents = 0n;
  for (const c of cards) {
    const v = c[key];
    if (!v) continue;
    const [w, f = ''] = v.split('.');
    cents += BigInt(w || '0') * 100n + BigInt((f + '00').slice(0, 2));
  }
  return `${cents / 100n}.${String(cents % 100n).padStart(2, '0')}`;
}

function Column({ id, name, count, meta, children }: { id: string; name: string; count: number; meta: string; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: `stage:${id}` });
  return (
    <section ref={setNodeRef} aria-label={name} className={[styles.column, isOver ? styles.columnOver : ''].join(' ')}>
      <div className={styles.columnHead}>
        <div className={styles.columnTitleRow}>
          <h2 className={styles.columnTitle}>{name}</h2>
          <span className={styles.columnCount}>{count}</span>
        </div>
        {meta ? <div className={styles.columnMeta}>{meta}</div> : null}
      </div>
      {children}
    </section>
  );
}

function ClosedZone({ zone, dragging }: { zone: BoardData['closed'][number]; dragging: boolean }) {
  const { setNodeRef, isOver } = useDroppable({ id: `stage:${zone.stageId}` });
  const overClass = isOver ? (zone.state === 'won' ? styles.closedZoneWonOver : styles.closedZoneLostOver) : dragging ? styles.closedZoneActive : '';
  return (
    <section ref={setNodeRef} aria-label={`${zone.name}, drop here`} className={[styles.closedZone, overClass].join(' ')}>
      <div className={styles.closedHead}>
        <h2 className={styles.closedTitle}>{zone.name}</h2>
        <span className={styles.closedValue}>{zone.value}</span>
      </div>
      <div className={styles.closedDetail}>{zone.detail}</div>
    </section>
  );
}

function DraggableCard({ card, disabled, pending, onQualify }: { card: BoardCard; disabled: boolean; pending: boolean; onQualify?: () => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: card.id, disabled });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      aria-roledescription="Draggable card"
      aria-label={`${card.title}, ${card.chip}. Space to lift, arrow keys to move, Space to drop.`}
      className={[styles.card, isDragging ? styles.cardDragging : '', pending ? styles.cardPending : ''].join(' ')}
    >
      <CardBody card={card} onQualify={onQualify} />
    </div>
  );
}

const stop = (e: React.KeyboardEvent | React.PointerEvent) => e.stopPropagation();

function CardBody({ card, overlay, onQualify }: { card: BoardCard; overlay?: boolean; onQualify?: () => void }) {
  const inner = (
    <>
      <div className={styles.cardTop}>
        <Link href={card.href} className={styles.cardTitle} onKeyDown={stop} draggable={false}>
          {card.title}
        </Link>
        {card.ownerName ? (
          <Avatar name={card.ownerName} initials={card.ownerInitials} bg={card.ownerBg} fg="#15171A" size="xs" title={`Owner ${card.ownerName}`} />
        ) : (
          <span className="muted small">No owner</span>
        )}
      </div>
      {card.sub ? <div className={styles.cardSub}>{card.sub}</div> : null}
      {card.amount ? <div className={styles.cardAmount}>{formatMoney(card.amount, card.currency)}</div> : null}
      <div className={styles.cardMeta}>
        {card.chip ? (
          <Badge tone={card.chipTone} className={styles.chipText}>
            {card.chip}
          </Badge>
        ) : null}
        <span className={styles.cardAge}>{card.age}</span>
      </div>
      {card.warn ? <div className={styles.warn}>{card.warn}</div> : null}
      {onQualify ? (
        <button type="button" className={styles.qualifyBtn} onClick={onQualify} onKeyDown={stop} onPointerDown={stop}>
          Qualify and create deal
        </button>
      ) : null}
    </>
  );
  return overlay ? <div className={[styles.card, styles.cardOverlay].join(' ')}>{inner}</div> : inner;
}
