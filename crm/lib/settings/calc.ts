/**
 * lib/settings/calc.ts, calculation fields. A calculation is a small arithmetic
 * expression over number fields of the same record: + - * / and brackets,
 * numbers, and field keys (core numeric columns or custom number, currency and
 * percent fields). Pure, safe in client code. No eval.
 *
 *   const res = parseExpression('amount * probability / 100', ['amount', 'probability']);
 *   if (!res.ok) res.error            // 'Unknown field "probabilty"'
 *   evaluateExpression(res.ast, { amount: '1500.00', probability: 40 })   // 600
 *   identifiersOf(res.ast)            // ['amount', 'probability']
 */

export type CalcNode =
  | { k: 'num'; v: number }
  | { k: 'id'; name: string }
  | { k: 'neg'; e: CalcNode }
  | { k: 'bin'; op: '+' | '-' | '*' | '/'; a: CalcNode; b: CalcNode };

type Token = { t: 'num'; v: number } | { t: 'id'; v: string } | { t: 'op'; v: string };

function tokenize(src: string): Token[] | string {
  const out: Token[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < src.length && /[0-9.]/.test(src[j])) j++;
      const raw = src.slice(i, j);
      if (!/^\d+(\.\d+)?$|^\.\d+$/.test(raw)) return `"${raw}" is not a number`;
      out.push({ t: 'num', v: Number(raw) });
      i = j;
      continue;
    }
    if (/[a-z_]/i.test(c)) {
      let j = i;
      while (j < src.length && /[a-z0-9_]/i.test(src[j])) j++;
      out.push({ t: 'id', v: src.slice(i, j).toLowerCase() });
      i = j;
      continue;
    }
    if ('+-*/()'.includes(c)) {
      out.push({ t: 'op', v: c });
      i++;
      continue;
    }
    return `"${c}" is not allowed, use numbers, field names, + - * / and brackets`;
  }
  return out;
}

export type ParseResult = { ok: true; ast: CalcNode } | { ok: false; error: string };

/** Parse an expression. Pass allowed field keys to reject unknown names. */
export function parseExpression(src: string, allowed?: Iterable<string>): ParseResult {
  const text = (src ?? '').trim();
  if (!text) return { ok: false, error: 'Write an expression, for example amount * 0.21' };
  if (text.length > 500) return { ok: false, error: 'Keep the expression under 500 characters' };
  const tokens = tokenize(text);
  if (typeof tokens === 'string') return { ok: false, error: tokens };
  let pos = 0;
  const peek = () => tokens[pos];
  const isOp = (v: string) => peek()?.t === 'op' && peek()?.v === v;

  function primary(): CalcNode {
    const tok = peek();
    if (!tok) throw new Error('The expression ends too early');
    if (tok.t === 'num') {
      pos++;
      return { k: 'num', v: tok.v };
    }
    if (tok.t === 'id') {
      pos++;
      return { k: 'id', name: tok.v };
    }
    if (isOp('(')) {
      pos++;
      const e = expr();
      if (!isOp(')')) throw new Error('A bracket is not closed');
      pos++;
      return e;
    }
    if (isOp('-')) {
      pos++;
      return { k: 'neg', e: primary() };
    }
    throw new Error(`Unexpected "${tok.v}"`);
  }
  function term(): CalcNode {
    let a = primary();
    while (isOp('*') || isOp('/')) {
      const op = (tokens[pos++] as { v: '*' | '/' }).v;
      a = { k: 'bin', op, a, b: primary() };
    }
    return a;
  }
  function expr(): CalcNode {
    let a = term();
    while (isOp('+') || isOp('-')) {
      const op = (tokens[pos++] as { v: '+' | '-' }).v;
      a = { k: 'bin', op, a, b: term() };
    }
    return a;
  }

  let ast: CalcNode;
  try {
    ast = expr();
    if (pos < tokens.length) throw new Error(`Unexpected "${String(tokens[pos].v)}"`);
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
  if (allowed) {
    const set = new Set(allowed);
    const unknown = identifiersOf(ast).filter((x) => !set.has(x));
    if (unknown.length) return { ok: false, error: `Unknown field ${unknown.map((u) => `"${u}"`).join(', ')}, use number fields of this object` };
  }
  return { ok: true, ast };
}

export function identifiersOf(ast: CalcNode): string[] {
  const out = new Set<string>();
  const walk = (n: CalcNode) => {
    if (n.k === 'id') out.add(n.name);
    else if (n.k === 'neg') walk(n.e);
    else if (n.k === 'bin') {
      walk(n.a);
      walk(n.b);
    }
  };
  walk(ast);
  return [...out];
}

/** Evaluate with values from the record. Empty values count as 0, a division by 0 gives null. */
export function evaluateExpression(ast: CalcNode, values: Record<string, unknown>): number | null {
  const ev = (n: CalcNode): number | null => {
    switch (n.k) {
      case 'num':
        return n.v;
      case 'id': {
        const raw = values[n.name];
        if (raw === null || raw === undefined || raw === '') return 0;
        const v = typeof raw === 'number' ? raw : Number(String(raw).replace(/[€\s,]/g, ''));
        return Number.isFinite(v) ? v : null;
      }
      case 'neg': {
        const v = ev(n.e);
        return v === null ? null : -v;
      }
      case 'bin': {
        const a = ev(n.a);
        const b = ev(n.b);
        if (a === null || b === null) return null;
        if (n.op === '+') return a + b;
        if (n.op === '-') return a - b;
        if (n.op === '*') return a * b;
        return b === 0 ? null : a / b;
      }
    }
  };
  const out = ev(ast);
  return out === null ? null : Math.round(out * 100) / 100;
}

/** Core numeric columns a calculation may use, per object. */
export const NUMERIC_CORE_FIELDS: Record<string, string[]> = {
  organization: ['annual_revenue', 'checkin_cadence_days'],
  contact: [],
  lead: ['angle_worth_eur'],
  deal: ['amount', 'forecast_probability', 'probability'],
  project: ['budget_amount', 'budget_hours'],
  ticket: ['number'],
  invoice: ['subtotal', 'vat_amount', 'total'],
  task: ['remind_before_minutes'],
};
