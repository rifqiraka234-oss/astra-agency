-- 400, contacts.name_normalised for Raka's dedupe rule: name first, then LinkedIn, then email.
-- The column holds the full name as lib/normalize.ts normPersonName() makes it: lower case,
-- accents folded, punctuation and extra spaces gone, honorifics (Dr, Mr...) in front and
-- suffixes (PhD, MBA, FBCS, Jr...) at the end removed. Word order is kept.
-- The two word lists below mirror NAME_HONORIFICS and NAME_SUFFIXES in lib/normalize.ts,
-- tests/dedupe/normalise.test.ts checks the two agree.

create extension if not exists unaccent;

create or replace function crm_unaccent(input text) returns text
  language sql immutable parallel safe strict
  as $$ select public.unaccent('public.unaccent'::regdictionary, input) $$;

create or replace function crm_norm_person_name(input text) returns text
  language plpgsql immutable parallel safe
as $$
declare
  honorifics constant text[] := array['mr','mrs','ms','miss','mx','dr','drs','dra','prof','professor','sir','dame','lord','lady','rev','revd','ir','ing','dipl','mag','herr','frau','dhr','mevr','mevrouw','mme','mlle','sig','sigra','dott','sr','sra','srta'];
  suffixes constant text[] := array['jr','jnr','sr','snr','ii','iii','iv','phd','dphil','mphil','mba','emba','msc','bsc','meng','beng','ceng','md','mbbs','dds','esq','cpa','cfa','pmp','fbcs','mbcs','citp','frsa','fca','aca','acca','fcca','cima','mcips','fcips','frics','mrics','llm','llb','dba','obe','mbe','cbe','kbe','frcs','mrcs','frcp','mrcp','fcipd','mcipd','cmgr','fcmi','mcmi','fiod','miod','cdir','cissp'];
  v text;
  toks text[];
  n int;
  cut int;
begin
  if input is null then
    return null;
  end if;
  v := normalize(input, NFKD);
  v := regexp_replace(v, '[̀-ͯ᪰-᫿᷀-᷿⃐-⃿︠-︯]', '', 'g');
  v := lower(crm_unaccent(normalize(v, NFC)));
  v := regexp_replace(v, '[^[:alnum:] ]+', ' ', 'g');
  v := btrim(regexp_replace(v, ' +', ' ', 'g'));
  if v = '' then
    return null;
  end if;
  toks := string_to_array(v, ' ');
  loop
    n := array_length(toks, 1);
    cut := 0;
    for k in 1..3 loop
      exit when n <= k;
      if array_to_string(toks[n - k + 1:n], '') = any(suffixes) then
        cut := k;
        exit;
      end if;
    end loop;
    exit when cut = 0;
    toks := toks[1:n - cut];
  end loop;
  while array_length(toks, 1) > 1 and toks[1] = any(honorifics) loop
    toks := toks[2:array_length(toks, 1)];
  end loop;
  return array_to_string(toks, ' ');
end
$$;

alter table contacts
  add column name_normalised text
  generated always as (crm_norm_person_name(first_name || ' ' || coalesce(last_name, ''))) stored;

create index contacts_name_normalised_idx on contacts (name_normalised) where deleted_at is null;
