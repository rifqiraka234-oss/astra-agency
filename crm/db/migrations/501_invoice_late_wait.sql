-- 501 The Invoice late rule waits 2 days after the due date before it chases, as the
-- Settings design shows ("Wait 2 days, if still not paid"). The worker defers the
-- invoice.late event until then (lib/automations/rules.ts invoiceLate, wait_days).
update automation_rules
   set steps = '[["When","An invoice is marked late"],["Wait","2 days after the due date"],["If","It is still not paid"],["Then","Task for the account manager, priority High"],["Then","A note on the organization timeline"]]',
       config = config || '{"wait_days":2}'
 where key = 'invoice_late';
