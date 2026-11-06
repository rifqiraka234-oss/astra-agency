import { redirect } from 'next/navigation';

/** /settings opens on Fields, the first section of the design. */
export default function SettingsIndex() {
  redirect('/settings/fields');
}
