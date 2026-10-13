#!/usr/bin/env python3
"""Builds data/clocks.json from verbatim quotes of Regulation (EU) 2026/2202 and FAILS if any quote is not in the saved Official Journal text.
Run from the build folder, python3 data/make_clocks.py"""
import json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
REG = open(os.path.join(HERE, '../../research/regulation/regulation_2026_2202.txt'), encoding='utf-8').read()
def norm(s):
    s = s.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"').replace(' ', ' ')
    return re.sub(r'\s+', ' ', s).strip()
R = norm(REG)

# hours = position on the ruler. calendar days and months converted for placement only, the text keeps the legal unit.
# who: airline duty, passenger right, or both. claims = part of the claims handling lifecycle.
C = [
 dict(id='departure-info', art='Art. 6(1)', amended='261/2004', who='airline', claims=False, hours=0.05, label='By scheduled departure', unit='clock', value='scheduled departure time',
      starts='the delay is expected', duty='Tell passengers about the delay, their rights, how to claim and how to complain, immediately where possible and at the latest by the scheduled departure time.',
      quote='it shall inform the passengers concerned immediately, where possible, but at the latest, by the time of departure indicated on the passenger’s ticket.'),
 dict(id='tarmac-2h', art='Art. 6a(3)', amended='261/2004', who='airline', claims=False, hours=2, label='2 hours', unit='hours', value=2,
      starts='a tarmac delay begins, at departure with the doors closed and at arrival after touch down', duty='At an airport with commercial passenger traffic in the Union, a tarmac delay that reaches two hours sends the aircraft to the gate or another disembarkation point so passengers can leave it. Only safety, immigration, air traffic control or security reasons allow it to go on.',
      quote='Where a tarmac delay reaches two hours in an airport with commercial passenger traffic situated in a territory of a Member State to which the Treaties apply, the aircraft shall proceed to the gate or to another suitable disembarkation point where passengers shall be allowed to disembark.'),
 dict(id='arrival-3h', art='Art. 6(4)', amended='261/2004', who='passenger', claims=True, hours=3, label='3 hours', unit='hours', value=3,
      starts='the scheduled time of arrival, which the delay at arrival is measured against', duty='A delay at arrival of more than three hours gives the passenger the right to compensation on request.',
      quote='Passengers shall have the right to receive, upon request, compensation from the operating air carrier of the delayed flight in accordance with Article 7 when they reach their final destination with a delay at arrival exceeding three hours.'),
 dict(id='reroute-3h', art='Art. 8(3)', amended='261/2004', who='airline', claims=False, hours=3.01, label='3 hours', unit='hours', value=3,
      starts='after a cancellation, the departure time on the ticket. For other disruptions the text doesn\'t say when the three hours begin', duty='If no comparable rerouting is offered within three hours, the passenger may arrange their own.',
      quote='if the operating air carrier has not offered, within three hours, rerouting under comparable transport conditions, the passenger may arrange his or her own rerouting'),
 dict(id='depart-5h', art='Art. 6(3)', amended='261/2004', who='airline', claims=False, hours=5, label='5 hours', unit='hours', value=5,
      starts='the delay at departure reaches five hours', duty='Once the delay at departure reaches five hours, the airline offers reimbursement without undue delay.',
      quote='When the delay at departure reaches five hours, the operating air carrier shall, without undue delay, offer the passengers concerned reimbursement in accordance with Article 8(1), first subparagraph, point (a).'),
 dict(id='notice-96h', art='Art. 7(4)', amended='261/2004', who='airline', claims=True, hours=96, label='96 hours', unit='hours', value=96,
      starts='the journey ends', duty='Send the passenger, electronically and on a durable medium, their right to compensation and clear instructions for requesting it.',
      quote='within 96 hours of the termination of the journey, electronically provide the passenger, on a durable medium, with information on the passenger’s right to compensation, and clear instructions on how to submit a request for compensation.'),
 dict(id='denied-7d', art='Art. 4(4)', amended='261/2004', who='airline', claims=True, hours=7*24, label='7 calendar days', unit='calendar days', value=7,
      starts='the passenger is denied boarding against their will', duty='Pay the compensation, without undue delay and at the latest within seven calendar days. Reimbursement after a denied boarding runs to the same seven days from the denied boarding.',
      quote='shall compensate the passengers concerned in accordance with Article 7(1), without undue delay and at the latest within seven calendar days of the denied boarding.'),
 dict(id='refund-7d', art='Art. 8(1)(a)', amended='261/2004', who='airline', claims=True, hours=7*24, label='7 calendar days', unit='calendar days', value=7,
      starts='the passenger chooses reimbursement', duty='Reimburse automatically, by bank transfer unless the passenger explicitly agrees to something else on a durable medium. Where the airport managing body activates its contingency plan, the deadline may be extended to 30 calendar days.',
      quote='automatic reimbursement within seven calendar days from the passenger’s choice'),
 dict(id='expenses-14d', art='Art. 9(4)', amended='261/2004', who='airline', claims=True, hours=14*24, label='14 calendar days', unit='calendar days', value=14,
      starts='the passenger submits the request for reimbursement', duty='When the airline hasn\'t provided the assistance owed, reimburse the passenger\'s own expenses that were necessary, reasonable and proportionate. Where the airport managing body activates its contingency plan, the deadline may be extended to 30 calendar days.',
      quote='shall reimburse the expenses incurred by the passengers within 14 calendar days of the submission of the request for reimbursement'),
 dict(id='ack-7wd', art='Art. 15a(2)', amended='261/2004', who='airline', claims=True, hours=7*24*1.4, label='7 working days', unit='working days', value=7,
      starts='a complaint arrives', duty='Confirm receipt of the complaint to the passenger.',
      quote='Within seven working days of receiving the complaint, the addressee shall confirm receipt of the complaint to the passenger.'),
 dict(id='reply-30d', art='Art. 7(9)', amended='261/2004', who='airline', claims=True, hours=30*24, label='30 calendar days', unit='calendar days', value=30,
      starts='the airline receives the request for compensation', duty='Either pay the compensation or give the passenger a justification for not paying it.',
      quote='Within 30 calendar days of the receipt of the request, the operating air carrier shall either pay the compensation or provide the passenger with a justification for not paying the compensation'),
 dict(id='complaint-1m', art='Art. 15a(2)', amended='261/2004', who='airline', claims=True, hours=30.4*24, label='one month', unit='month', value=1,
      starts='a complaint arrives', duty='Give a reasoned reply or, in duly justified cases, say that a final reply will follow in less than two months.',
      quote='Within one month of receiving the complaint, the addressee shall either provide a reasoned reply or, in duly justified cases, inform the passenger that he or she will receive a final reply within a period of less than two months'),
 dict(id='file-9m', art='Art. 7(9)', amended='261/2004', who='passenger', claims=True, hours=273*24, label='nine months', unit='months', value=9,
      starts='the actual date of departure indicated on the ticket', duty='The passenger has nine months from the actual date of departure indicated on their ticket to submit a request for compensation.',
      quote='Requests for compensation under this Article shall be submitted by the passenger within nine months of the actual date of departure indicated on the passenger’s ticket.'),
 dict(id='complaint-12m', art='Art. 15a(2)', amended='261/2004', who='passenger', claims=True, hours=365*24, label='12 months', unit='months', value=12,
      starts='the flight was performed or scheduled', duty='The passenger can complain within 12 months of the flight, or three months after requesting compensation, whichever is later.',
      quote='Such a complaint shall be submitted within 12 months from the date on which the flight was performed or was scheduled to be performed, or three months after submitting a request for compensation, whichever is later.'),
 dict(id='ack-now', art='Art. 7(9)', amended='261/2004', who='airline', claims=True, hours=0.02, label='Immediately', unit='clock', value='immediately',
      starts='the airline receives the request', duty='Acknowledge receipt of the request on a durable medium.',
      quote='Operating air carriers shall immediately acknowledge receipt of the request on a durable medium.'),
]
SHORT = {'departure-info':'Tell passengers about the delay','tarmac-2h':'Tarmac delay, back to the gate','arrival-3h':'Right to compensation','reroute-3h':'Passenger can reroute alone',
 'depart-5h':'Offer reimbursement','notice-96h':'Notice and claim instructions','denied-7d':'Pay for denied boarding','refund-7d':'Reimburse the ticket','expenses-14d':'Reimburse expenses',
 'ack-7wd':'Confirm the complaint','reply-30d':'Pay or justify','complaint-1m':'Reasoned reply to a complaint','file-9m':'Window to file a request','complaint-12m':'Window to complain','ack-now':'Acknowledge the request'}
TINY = {'departure-info':'by dep.','tarmac-2h':'2 h','arrival-3h':'3 h','reroute-3h':'3 h','depart-5h':'5 h','notice-96h':'96 h','denied-7d':'7 d','refund-7d':'7 d','expenses-14d':'14 d','ack-7wd':'7 wd','reply-30d':'30 d','complaint-1m':'1 mo','file-9m':'9 mo','complaint-12m':'12 mo','ack-now':'now'}
for c in C: c['short'] = SHORT[c['id']]; c['tiny'] = TINY[c['id']]
# other verbatim quotes used on the site (law quotes), verified the same way
Q = {
 'burden-communication': 'The burden of proof with regard to establishing whether and when they have provided the necessary information, correspondence, forms or documents',
 'burden-extraordinary': 'The burden of proof with regard to establishing the existence of that direct causal link and establishing that the air carrier has taken all reasonable measures to avoid the disruption shall rest with the operating air carrier.',
 'extraordinary-def': 'events which by their nature or origin are not inherent in the normal exercise of the activity of the air carrier concerned and are beyond the actual control of the air carrier',
 'specify-annex': 'it shall specify which extraordinary circumstance listed in the Annex it invokes',
 'substantiated': 'it shall provide a clear and substantiated explanation, including a concise explanation on how the extraordinary circumstance invoked meets the conditions on direct causal link and all reasonable measures set out in Article 6c(2)',
 'mandate': 'the operating air carrier may require evidence of a valid mandate to act',
 'bank-transfer': 'The compensation shall be paid by electronic bank transfer or, if explicitly agreed by the passenger on a durable medium, by other means.',
 'no-account': 'a passenger is not obliged to have a user account or a specific application as a precondition for accessing or receiving information',
 'date-time': 'they shall include the date and time',
 'automation-review': 'the feasibility of further automation of requests for or payments of compensation for delays',
 'apply': 'It shall apply from 23 October 2027.',
 'force': 'This Regulation shall enter into force on the twentieth day following that of its publication in the Official Journal of the European Union.',
 'amount-250': 'EUR 250 for journeys of 1 500 kilometres or less',
 'amount-600': 'EUR 600 for all journeys not falling under points (a) or (b).',
 'voucher-consent': 'Acceptance shall be valid only if the passenger has given explicit consent on a durable medium.',
 'durable-def': 'any instrument which enables the passenger to store information in a way accessible for future reference, for a period of time adequate for the purposes of the information and which allows the unchanged reproduction of the information stored',
 'clear-unambiguous': 'shall be easily available and provided in a clear and unambiguous manner',
 'accessible-info': 'All information provided to passengers in accordance with this Regulation shall be provided in an accessible format.',
 'journey-def': 'a flight or connecting flights transporting the passenger from the initial point of departure to the passenger\u2019s final destination in accordance with a single air transport contract',
 'arrival-def': 'the time when the aircraft reaches the arrival stand and its parking brakes are engaged (on-block time)',
 'justification-complaint': 'provide the passenger with a justification for not paying the compensation in which case information on the handling of complaints under Article 15a must be provided',
 'event-not-listed': 'if it invokes an event which is not on that list, it shall specify which event it invokes and the reasons why it should be considered an extraordinary circumstance',
 'cumulative': 'Those two conditions are cumulative.',
 'plain-language': 'Air carriers should provide that information in a concise manner using plain language, avoiding sector-specific and legal jargon, that is easily understandable to the passenger.',
 'three-nights': 'the air carrier may limit the hotel accommodation provided in accordance with paragraph 2, point (a), to a maximum of three nights',
 'review-list': 'By 23 October 2031 and every five years thereafter, the Commission shall report to the European Parliament and the Council on the list of extraordinary circumstances set out in the Annex',
 'causal-link': 'Extraordinary circumstances may only be invoked where there is a direct causal link between the occurrence of that circumstance and the disruption to the flight.',
 'notice-condition': 'Where a passenger may have a right to compensation in accordance with Article 5(4), Article 6(4) or Article 6b(3)',
 'operating-responsible': 'Unless otherwise specified, the operating air carrier shall be responsible for meeting the obligations pursuant to this Regulation.',
 'recital-24': 'With a view to facilitating the submission and initiation of requests for compensation following a disruption, air carriers should automatically and electronically provide passengers with information on passengers\u2019 right to compensation and clear instructions on how to submit a request.',
 'ack-complaint-contact': 'Where the operating air carrier does not pay the requested compensation, the passenger may submit a complaint in accordance with Article 15a.',
}
bad = 0
for c in C:
    if norm(c['quote']) not in R:
        print('QUOTE NOT IN REGULATION', c['id']); bad += 1
for k, v in Q.items():
    if norm(v) not in R:
        print('QUOTE NOT IN REGULATION', k); bad += 1
if bad: sys.exit(1)
json.dump({'regulation': 'Regulation (EU) 2026/2202', 'amends': 'Regulation (EC) No 261/2004 and Regulation (EC) No 2027/97', 'signed': '2026-09-16', 'published': '2026-10-02',
           'entersIntoForce': '2026-10-22', 'applies': '2027-10-23', 'clocks': C, 'quotes': Q}, open(os.path.join(HERE, 'clocks.json'), 'w'), ensure_ascii=False, indent=1)
print('OK', len(C), 'clocks,', len(Q), 'quotes, all verbatim in the Official Journal text')
