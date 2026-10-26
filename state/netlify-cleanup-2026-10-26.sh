#!/usr/bin/env bash
# Deletes the 26 Netlify projects Raka approved on 26 Oct 2026 ("Yes, delete those ones thats fine").
# Why each one goes is in state/netlify-cleanup-2026-10-26.md. Every id below was checked against Netlify by name
# (get-project) on 26 Oct, so the name printed beside it is the project that id deletes.
#
# Run it on a computer that's logged in to Netlify:
#   npx netlify-cli login            (once, opens the browser)
#   bash state/netlify-cleanup-2026-10-26.sh
# Or with a personal access token instead of the login:
#   NETLIFY_AUTH_TOKEN=xxxx bash state/netlify-cleanup-2026-10-26.sh
set -u
del() { echo "deleting $2"; npx -y netlify-cli@latest sites:delete "$1" --force ${NETLIFY_AUTH_TOKEN:+--auth "$NETLIFY_AUTH_TOKEN"} || echo "  FAILED $2"; }

# said no
del 186fe2d9-731d-4e87-9e0d-a3f4bdd59595 astra-negentien80-prototype
del aae9b53e-9667-4099-84a8-fce834168dcc astra-sotocat-prototype
del d84ecf40-3f06-4170-b93f-4d59f64d0928 astra-sotocat-deck
del 99d25f43-ff7b-4e18-a28c-d650c44069cf astra-diisco-prototype
del 96cbc590-c836-4124-a0ec-5b503c22e105 astra-zynox-prototype
del 25023d61-b44f-4784-8596-a1b80aec502c astra-connectome-prototype
del c5948901-c964-416d-a491-e14cb7428807 astra-customkit-prototype
del 6c3f4481-a25b-4593-94f0-e2bbbe5dc98a astra-customkit-deck
del f07bb458-ffa9-4e54-af23-302985c63fb3 astra-point-audit-prototype
del 6f6a7ed2-eca3-4c2b-9fb9-a5f899a9ad7c astra-that-animation-company-prototype
del 85c7136d-245d-4c6b-81e9-14bcdb777d86 astra-archetypehr-prototype

# ghosted
del d3d4ca79-34e3-4f30-9b2c-35a1f34bb5c4 astra-toffetraktaties-prototype
del dd5b672b-8f4d-40c6-ae58-a7a546460568 astra-revios-prototype
del 13cb8f84-c007-4eb0-a656-f3f9e60c7a06 astra-klarity-prototype
del b9e593dd-5461-4dfe-a17c-e5340d8e0cb7 astra-zenara-prototype
del aeed496b-3a4c-4aca-9654-5f2eabf52c2b astra-dilieto-prototype
del b301b309-627e-4774-bcc9-dd524f84561f astra-greentic-prototype
del 6ce2e3f6-41bf-4c2d-9938-2e9812391b55 astra-rosalie-voortman-prototype
del b79c436b-f9cc-4814-9c45-7ace7a161911 aikeprototype
del 42e66de6-1f18-419e-9dde-256b7d7291f0 indigeniousfishersv2
del a2f006db-c069-4480-87a1-89adad0d3022 astra-wistree-deck
del 8d294110-c536-49e5-a197-884ef4b4d803 astra-hire-quality-talent-prototype
del 0f17ce14-dbe7-4ebc-86f4-7c17e1b01614 astra-enrichedu-prototype
del 5520c12a-2f8d-4fb9-8796-0886caa1a45d astra-janforsterestates-prototype

# never sent, Ulrich has v2 and v2 stays
del 779d17d7-a42c-4682-b485-0b455d35c5b5 astra-justclaims-prototype
del 2c5b089a-eeb3-4140-bc77-2464a3a10671 astra-justclaims-v3
