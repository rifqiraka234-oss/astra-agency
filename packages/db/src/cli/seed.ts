import { closePool, getPool } from '../client.js';

/**
 * Local development fixtures.
 *
 * Everything here is obviously fake and clearly labelled. The seed never
 * creates an enabled campaign policy or a connected integration, so a freshly
 * seeded local database cannot reach a real prospect even by accident.
 */

const adminEmail = process.env['ADMIN_EMAIL'] ?? 'operator@example.test';

const pool = getPool();

await pool.query(
  `INSERT INTO operators (email, display_name, role)
   VALUES ($1, 'Local operator', 'ADMIN')
   ON CONFLICT (lower(email)) DO NOTHING`,
  [adminEmail],
);

await pool.query(
  `INSERT INTO campaign_policies (lemlist_campaign_id, campaign_name, automation_enabled, notes)
   VALUES ('cam_fixture_demo', 'FIXTURE demo campaign', false, 'Seeded locally. Automation stays off until an operator enables it.')
   ON CONFLICT (lemlist_campaign_id) DO NOTHING`,
);

const contact = await pool.query<{ id: string }>(
  `INSERT INTO contacts (lemlist_contact_id, first_name, last_name, email, company_name, company_domain)
   VALUES ('con_fixture_1', 'Sam', 'Fixture', 'sam@fixture.example', 'Fixture Coffee', 'fixture.example')
   ON CONFLICT (lemlist_contact_id) DO UPDATE SET updated_at = now()
   RETURNING id`,
);
const contactId = contact.rows[0]?.id;

if (contactId) {
  await pool.query(
    `INSERT INTO conversations (contact_id, lemlist_campaign_id, channel, owner, state)
     VALUES ($1, 'cam_fixture_demo', 'linkedin', 'UNKNOWN', 'NEW_EVENT')
     ON CONFLICT (contact_id) DO NOTHING`,
    [contactId],
  );
}

console.log('Seeded local fixtures.');
console.log(`  operator:  ${adminEmail}`);
console.log('  campaign:  cam_fixture_demo (automation disabled)');
console.log('  contact:   con_fixture_1 (Sam Fixture, fixture.example)');
console.log('No integration is connected and no campaign is enabled: nothing here can send.');

await closePool();
