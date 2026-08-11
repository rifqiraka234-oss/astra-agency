/**
 * Global test setup.
 *
 * Tests must never be able to perform a live external write. We force the
 * safest possible configuration before any module reads the environment, so a
 * test that accidentally constructs a live adapter still hits the kill switch.
 */
process.env['APP_ENV'] ??= 'test';
process.env['RUNTIME_MODE'] ??= 'TEST';
process.env['GLOBAL_KILL_SWITCH'] ??= 'true';
process.env['ALLOW_LIVE_LEMLIST_SEND'] ??= 'false';
process.env['ALLOW_LIVE_CALENDAR_WRITE'] ??= 'false';
process.env['ALLOW_LIVE_NETLIFY_DEPLOY'] ??= 'false';
process.env['ALLOW_LIVE_WEBHOOK_REGISTRATION'] ??= 'false';
process.env['DATABASE_URL'] ??= 'postgres://astra:astra@localhost:5432/astra_reply_agent_test';
process.env['ENCRYPTION_KEY'] ??= Buffer.alloc(32, 7).toString('base64');
process.env['SESSION_SECRET'] ??= Buffer.alloc(32, 9).toString('base64');
process.env['ADMIN_EMAIL'] ??= 'operator@example.test';
process.env['EXPECTED_LEMLIST_TEAM_ID'] ??= 'tea_test_team';
process.env['LEMLIST_WEBHOOK_SECRET'] ??= 'test-webhook-secret';
process.env['ENABLED_CAMPAIGN_IDS'] ??= 'cam_enabled_one';
process.env['EMAIL_PROVIDER'] ??= 'console';
process.env['CALENDAR_PROVIDER'] ??= 'none';
