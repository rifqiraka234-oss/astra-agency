-- The integration test suite uses a separate database so it can be truncated
-- freely without touching local development data.
CREATE DATABASE astra_reply_agent_test OWNER astra;
