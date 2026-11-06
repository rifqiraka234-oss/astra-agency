/**
 * Initials in a circle. Users carry their own colours (users.avatar_bg / avatar_fg),
 * anyone else gets a stable colour from their name.
 *   <Avatar name="Raka Mulya" bg={u.avatar_bg} />     <Avatar name="Eva Jansen" size="sm" />
 *   <Avatar name="Brouwerij De Kade" initials="DK" shape="square" bg="#1F3A2E" fg="#F2E6C9" />
 * Sizes: md 36, sm 32, xs 26. Classes: avatar avatar-sm avatar-xs avatar-square.
 */
import { initials as toInitials } from '@/lib/format';

const PALETTE: [string, string][] = [
  ['#DCE6FB', '#1E40AF'],
  ['#F6E3D3', '#7C2D12'],
  ['#DDEFE3', '#166534'],
  ['#EDE3F6', '#5B21B6'],
  ['#FDF3E1', '#92400E'],
  ['#E3EEF7', '#0B4F82'],
];

export function colourFor(seed: string): [string, string] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

export function Avatar({
  name,
  initials,
  bg,
  fg,
  size = 'md',
  shape = 'round',
  title,
}: {
  name: string;
  initials?: string | null;
  bg?: string | null;
  fg?: string | null;
  size?: 'md' | 'sm' | 'xs';
  shape?: 'round' | 'square';
  title?: string;
}) {
  const [pbg, pfg] = colourFor(name);
  const cls = ['avatar', size !== 'md' ? `avatar-${size}` : '', shape === 'square' ? 'avatar-square' : ''].filter(Boolean).join(' ');
  return (
    <span className={cls} style={{ background: bg ?? pbg, color: fg ?? pfg }} title={title ?? name} aria-label={title ?? name} role="img">
      {initials ?? toInitials(name)}
    </span>
  );
}
