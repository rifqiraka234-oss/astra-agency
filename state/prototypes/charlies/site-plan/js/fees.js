/* The listed fees sum, the one place it's worked out. The page uses it, and so does qa/sums.js, which checks the
   page against its own sum from plan.json. Works as a classic script (window.CharlieFees) and in Node. */
(function (root) {
  'use strict';
  function fees(plan, orders, aov, share) {
    var f = plan.uber_fees, wk = plan.calculator.weeks_a_year;
    var value = orders * aov * wk, dval = value * share, cval = value - dval;
    var dfee = dval * f.delivery, cfee = cval * f.pickup;
    return { value: value, dval: dval, cval: cval, dfee: dfee, cfee: cfee, total: dfee + cfee };
  }
  function split(plan) { var p = plan.price; return { first: p.eur * p.first_payment_share, second: p.eur * p.second_payment_share, total: p.eur }; }
  function gbp(n) { return '£' + Math.round(n).toLocaleString('en-GB'); }
  function eur(n) { return '€' + Math.round(n).toLocaleString('en-GB'); }
  var api = { fees: fees, split: split, gbp: gbp, eur: eur };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.CharlieFees = api;
})(this);
