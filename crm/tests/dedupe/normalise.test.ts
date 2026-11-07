import { afterAll, describe, expect, it } from 'vitest';
import { closeDb, sql } from '../../lib/db';
import { NAME_HONORIFICS, NAME_SUFFIXES, normPersonName } from '../../lib/normalize';

afterAll(() => closeDb());

describe('normPersonName', () => {
  it('strips honorifics in front', () => {
    expect(normPersonName('Dr Ashish Rajput')).toBe('ashish rajput');
    expect(normPersonName('Dr. Ashish Rajput')).toBe(normPersonName('Ashish Rajput'));
    expect(normPersonName('Mr John Smith')).toBe('john smith');
    expect(normPersonName('Mrs. Jane Smith')).toBe('jane smith');
    expect(normPersonName('Prof. Dr. Ir. Jan de Vries')).toBe('jan de vries');
    expect(normPersonName('Dipl.-Ing. Hans Weber')).toBe('hans weber');
  });

  it('strips suffixes at the end, with or without dots', () => {
    expect(normPersonName('Andy Tidd Fbcs')).toBe('andy tidd');
    expect(normPersonName('Andy Tidd FBCS')).toBe(normPersonName('Andy Tidd'));
    expect(normPersonName('Jane Doe, PhD')).toBe('jane doe');
    expect(normPersonName('Jane Doe Ph.D.')).toBe('jane doe');
    expect(normPersonName('Sam Lee MBA')).toBe('sam lee');
    expect(normPersonName('Sam Lee M.B.A.')).toBe('sam lee');
    expect(normPersonName('Robert Downey Jr.')).toBe('robert downey');
    expect(normPersonName('Rob Brown Jr, MBA, FBCS')).toBe('rob brown');
    expect(normPersonName('Dr Ashish Rajput PhD')).toBe('ashish rajput');
  });

  it('folds accents, case, punctuation and spaces', () => {
    expect(normPersonName('José  Müller-Lüdenscheidt')).toBe('jose muller ludenscheidt');
    expect(normPersonName('ZOË  O’Brien')).toBe('zoe o brien');
    expect(normPersonName('  Søren   Kierkegaard ')).toBe('soren kierkegaard');
    expect(normPersonName('Łukasz Straße')).toBe('lukasz strasse');
    expect(normPersonName('Ærø Ångström')).toBe('aero angstrom');
    expect(normPersonName('François')).toBe(normPersonName('francois'));
  });

  it('never swaps first and last name', () => {
    expect(normPersonName('Tidd Andy')).toBe('tidd andy');
    expect(normPersonName('Tidd Andy')).not.toBe(normPersonName('Andy Tidd'));
  });

  it('keeps names that only look like titles, and always keeps one word', () => {
    expect(normPersonName('Jack Ma')).toBe('jack ma');
    expect(normPersonName('Don Draper')).toBe('don draper');
    expect(normPersonName('Rajesh KC')).toBe('rajesh kc');
    expect(normPersonName('Dr. Ph.D.')).toBe('dr');
    expect(normPersonName('Dr')).toBe('dr');
    expect(normPersonName('')).toBeNull();
    expect(normPersonName(' .,- ')).toBeNull();
    expect(normPersonName(null)).toBeNull();
  });
});

describe('contacts.name_normalised agrees with normPersonName', () => {
  const samples = [
    'Andy Tidd Fbcs', 'Dr Ashish Rajput', 'Dr. Ph.D.', 'José  Müller-Lüdenscheidt, PhD', 'Prof. Dr. Ir. Jan de Vries',
    'Sam Lee M.B.A.', 'Robert Downey Jr.', 'ZOË O’Brien', 'Søren Kierkegaard', 'Łukasz Straße', 'Ærø Ångström',
    'Tidd Andy', 'Jack Ma', 'Rajesh KC', 'Đặng Thị Nguyễn', 'Иван Петров', '李 小龍', 'Ölçer Iğdır', 'Mark-Paul Burgersdijk',
    'Anne-Marie  D’Arcy MSc', 'Herr Dipl.-Ing. Hans Weber', 'Ms. Ada Lovelace (FRSA)', 'X Æ A-12', 'Ji-hoon 김',
  ];

  it('gives the same value in SQL and TypeScript for tricky names', async () => {
    const rows = await sql<{ input: string; out: string | null }[]>`
      select x as input, crm_norm_person_name(x) as out from unnest(${samples}::text[]) as x`;
    for (const r of rows) expect([r.input, r.out]).toEqual([r.input, normPersonName(r.input)]);
  });

  it('matches the stored column for every contact in the database', async () => {
    const rows = await sql<{ first_name: string; last_name: string | null; name_normalised: string | null }[]>`
      select first_name, last_name, name_normalised from contacts`;
    expect(rows.length).toBeGreaterThan(0);
    const wrong = rows.filter((r) => r.name_normalised !== normPersonName(`${r.first_name} ${r.last_name ?? ''}`));
    expect(wrong).toEqual([]);
  });

  it('uses the same honorific and suffix lists as the migration', async () => {
    // Each listed word must be stripped by the SQL function exactly like in TypeScript.
    const names = [...NAME_HONORIFICS.map((h) => `${h} Eva Jansen`), ...NAME_SUFFIXES.map((s) => `Eva Jansen ${s}`)];
    const rows = await sql<{ out: string }[]>`select crm_norm_person_name(x) as out from unnest(${names}::text[]) as x`;
    expect(rows.map((r) => r.out)).toEqual(names.map(() => 'eva jansen'));
    expect(names.map((n) => normPersonName(n))).toEqual(names.map(() => 'eva jansen'));
  });
});
