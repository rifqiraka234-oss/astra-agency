// the pages every test covers. SITE and PLAN are the two local servers, or the live hosts when LIVE=1.
const SITE = process.env.LIVE ? 'https://astra-bebetter-prototype.netlify.app' : 'http://localhost:8811';
const PLAN = process.env.LIVE ? 'https://astra-bebetter-plan.netlify.app' : 'http://localhost:8812';
module.exports = { SITE, PLAN, pages: ['/', '/gyms/', '/privacy/', '/gyms/sent/'].map(p => [SITE, p]).concat([[PLAN, '/']]) };
