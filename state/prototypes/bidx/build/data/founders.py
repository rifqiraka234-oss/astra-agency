"""Sample founders for the outreach desk. Every company here is invented and was checked against the Companies House
register on 20 Oct 2026 so no name is an existing company's (Kelpline clashed and was dropped). The desk says so in its
footnote. The calls they're matched to are real, from data/calls.json.

checks is eight letters, one per dot, in the order of pages/desk.py CHECKS: g fits, a likely, r fails.
"""

# call ids, from the Innovation Funding Service, plus 'eic' for the EIC Accelerator
OPS, DEC, ASSUR, FRONT, EFF = 2599, 2598, 2597, 2584, 2582
BATT_IP, BATT_FEAS, BIO_IP, BIO_CRD, FOAK = 2595, 2571, 2580, 2542, 2600
DE, SG, JP, CONCRETE, MEDS, CANCER, MATS = 2583, 2526, 2586, 2602, 2560, 2527, 2569
EIC = 'eic'

F = []


def f(id, first, last, company, what, city, founded, team, call, checks, reasons, signals, hook, channel='LinkedIn', state='ready', picked=True):
    F.append(dict(id=id, first=first, last=last, company=company, what=what, city=city, founded=founded, team=team,
                  call=call, checks=checks, reasons=reasons, signals=signals, hook=hook, channel=channel, state=state,
                  picked=picked))


f('fernhollow', 'Maya', 'O.', 'Fernhollow Robotics', 'Soft grippers that pick strawberries without bruising them', 'Canterbury', 'Mar 2024', '7 people', OPS,
  'ggggggga', ['Active, incorporated March 2024', 'Micro company, seven on LinkedIn', 'Robots doing operational work on farms', 'Own gripper and vision software',
               'Two robotics engineers and a CTO', 'Pre seed round announced in June', 'Closes 8 December, seven weeks out', 'Never contacted, connected to Simon at one remove'],
  ['Read the BridgeAI guide yesterday', 'Incorporated Mar 2024', 'Hiring a field engineer'],
  "Saw your post about the first picking trial with a Kent grower this summer")
f('peregrine', 'Tom', 'A.', 'Peregrine Routing', 'Route planning for HGV fleets that cuts empty miles', 'Leeds', 'Nov 2023', '9 people', OPS,
  'gggggaga', ['Active, incorporated November 2023', 'Small company, nine on LinkedIn', 'AI that plans live fleet operations', 'Own routing models',
               'Four engineers named on the team page', 'No round announced yet', 'Closes 8 December, seven weeks out', 'Never contacted'],
  ['Incorporated Nov 2023', 'Pilot with a haulier on their site'],
  "Saw the pilot you're running with a Yorkshire haulier on your site")
f('sorrel', 'Priya', 'S.', 'Sorrel Analytics', 'Bed planning forecasts for NHS hospital wards', 'Manchester', 'Jan 2024', '6 people', DEC,
  'gggggggg', ['Active, incorporated January 2024', 'Micro company', 'AI behind decisions on patient flow', 'Own forecasting models',
               'Data scientists and a clinical lead', 'Seed round closed in spring', 'Closes 8 December', 'Never contacted'],
  ['Read the BridgeAI guide', 'Won Innovate UK funding in 2025', 'Incorporated Jan 2024'],
  "Saw Sorrel won an Innovate UK award last year and the bed planning work has moved on since")
f('hollowbrook', 'Ben', 'K.', 'Hollowbrook AI', 'AI that checks planning applications against local policy', 'Bristol', 'Jun 2024', '5 people', ASSUR,
  'gggggagg', ['Active, incorporated June 2024', 'Micro company', 'AI that checks documents against rules', 'Own models trained on planning policy',
               'Three engineers', 'No round announced yet', 'Closes 8 December', 'Never contacted'],
  ['Incorporated Jun 2024', 'Two council pilots named on site'],
  "Saw you've got two councils trialling the policy checks")
f('corvid', 'Nadia', 'R.', 'Corvid Shield', 'Security monitoring built for small manufacturers', 'Birmingham', 'Aug 2023', '11 people', ASSUR,
  'gggggggg', ['Active, incorporated August 2023', 'Small company, eleven on LinkedIn', 'AI that monitors and evidences security controls', 'Own detection engine',
               'Six engineers', 'Seed round announced in March', 'Closes 8 December', 'Never contacted'],
  ['Incorporated Aug 2023', 'Hiring two security engineers'],
  "Saw Corvid is hiring two more engineers, so the detection side must be growing")
f('quayside', 'Kit', 'L.', 'Quayside Autonomy', 'Autonomous yard tractors for port terminals', 'Southampton', 'Feb 2023', '14 people', OPS,
  'gggggaga', ['Active, incorporated February 2023', 'Small company', 'AI driving operational vehicles', 'Own autonomy stack',
               'Robotics and controls engineers', 'Grant funded so far', 'Closes 8 December', 'Never contacted'],
  ['Won Innovate UK funding in 2024', 'Incorporated Feb 2023'],
  "Saw the yard tractor trial at Southampton is still running")
f('tamarisk', 'Isla', 'M.', 'Tamarisk Health', 'Triage support for GP practices', 'Edinburgh', 'Sep 2024', '4 people', DEC,
  'ggggaagg', ['Active, incorporated September 2024', 'Micro company', 'AI supporting clinical triage decisions', 'Own triage model',
               'A CTO and one engineer', 'Founder funded so far', 'Closes 8 December', 'Never contacted'],
  ['Read the BridgeAI guide', 'Incorporated Sep 2024'],
  "Saw Tamarisk is in four GP practices now")
f('cobalt', 'Sam', 'H.', 'Cobalt Wren', 'Drone inspections of offshore wind blades', 'Aberdeen', 'May 2023', '8 people', OPS,
  'gggggggg', ['Active, incorporated May 2023', 'Micro company', 'AI that runs inspection operations', 'Own defect detection models',
               'Pilots and two ML engineers', 'Seed round announced in 2025', 'Closes 8 December', 'Never contacted'],
  ['Incorporated May 2023', 'New contract with a wind operator on LinkedIn'],
  "Saw the new inspection contract you announced with a wind farm operator")
f('lanternfish', 'Daniel', 'W.', 'Lanternfish AI', 'Small language models that run on factory hardware', 'Cambridge', 'Apr 2025', '6 people', FRONT,
  'gggggaga', ['Active, incorporated April 2025', 'Micro company', 'Frontier AI with a route to scale', 'Own model architecture',
               'Two PhDs and an ML engineer', 'Angel funded', 'Closes 11 November, three weeks out', 'Never contacted'],
  ['University spinout', 'Incorporated Apr 2025'],
  "Saw Lanternfish spun out of the department this spring")
f('moorland', 'Leah', 'B.', 'Moorland Data', 'Smaller, cheaper models for climate forecasting', 'Exeter', 'Jul 2024', '5 people', EFF,
  'ggggggag', ['Active, incorporated July 2024', 'Micro company', 'Efficient AI systems, which is the call', 'Own model compression work',
               'Research led team', 'Pre seed round in 2025', 'Closes 18 November, four weeks out', 'Never contacted'],
  ['Read the Smart grants guide', 'Incorporated Jul 2024'],
  "Saw your paper on shrinking forecast models without losing accuracy")
f('ironwood', 'Marcus', 'T.', 'Ironwood Robotics', 'General purpose robot arms that learn from video', 'London', 'Oct 2024', '10 people', FRONT,
  'gggggggg', ['Active, incorporated October 2024', 'Small company', 'Frontier AI for robotics', 'Own learning stack',
               'Five engineers and a research lead', 'Seed round announced in July', 'Closes 11 November', 'Never contacted'],
  ['Incorporated Oct 2024', 'Hiring a research engineer'],
  "Saw the demo of the arm learning a new task from a single video")
f('blackthorn', 'Ellie', 'C.', 'Blackthorn Acoustics', 'Machine listening that hears faults in pumps early', 'Sheffield', 'Dec 2023', '6 people', EFF,
  'gggggagg', ['Active, incorporated December 2023', 'Micro company', 'Efficient models on small devices', 'Own audio models',
               'Two engineers and a PhD', 'No round announced', 'Closes 18 November', 'Never contacted'],
  ['Incorporated Dec 2023'],
  "Saw Blackthorn's sensor picking up a bearing fault weeks before it failed")
f('northgate', 'Amara', 'N.', 'Northgate Cells', 'Sodium ion cells for home storage', 'Coventry', 'Jan 2024', '12 people', BATT_IP,
  'gggggggg', ['Active, incorporated January 2024', 'Small company', 'Battery innovation, the call’s scope', 'Own cell chemistry',
               'Electrochemists and a pilot line lead', 'Seed round led by a deep tech fund', 'Closes 25 November', 'Never contacted'],
  ['Read the Investor Partnerships guide', 'Raised seed in 2025'],
  "Saw Northgate's first cells came off the pilot line")
f('marram', 'Owen', 'P.', 'Marram Batteries', 'Recovering lithium from old EV packs', 'Newcastle', 'Mar 2023', '9 people', BATT_FEAS,
  'gggggggg', ['Active, incorporated March 2023', 'Micro company', 'Battery recycling is in scope', 'Own recovery process',
               'Process engineers', 'Grant and angel funded', 'Closes 2 December', 'Never contacted'],
  ['Won Innovate UK funding in 2024', 'Incorporated Mar 2023'],
  "Saw the recovery rates you published for the pilot plant")
f('copperleaf', 'Grace', 'D.', 'Copperleaf Grid', 'Software that predicts battery health in grid storage', 'Glasgow', 'Jun 2023', '8 people', BATT_FEAS,
  'gggggagg', ['Active, incorporated June 2023', 'Micro company', 'Battery feasibility work fits', 'Own health models',
               'Four engineers', 'No round announced', 'Closes 2 December', 'Never contacted'],
  ['Incorporated Jun 2023'],
  "Saw Copperleaf is now monitoring a grid battery site in Scotland")
f('brackenfield', 'Tom', 'E.', 'Brackenfield Bio', 'Enzymes that break down PET packaging', 'Norwich', 'Feb 2024', '7 people', BIO_IP,
  'gggggggg', ['Active, incorporated February 2024', 'Micro company', 'Engineering biology product', 'Own enzyme designs',
               'Biochemists and a process lead', 'Seed round from a biotech fund', 'Closes 2 December', 'Never contacted'],
  ['Read the Investor Partnerships guide', 'Incorporated Feb 2024'],
  "Saw Brackenfield's enzyme cut PET back to monomers in the lab")
f('willowmere', 'Hannah', 'G.', 'Willowmere Biotech', 'Microbes that make colour dyes for textiles', 'Manchester', 'Sep 2023', '6 people', BIO_IP,
  'ggggggag', ['Active, incorporated September 2023', 'Micro company', 'Engineering biology product', 'Own strains',
               'Two scientists and a CTO', 'Seed round in 2025', 'Closes 2 December', 'Never contacted'],
  ['Incorporated Sep 2023'],
  "Saw the first dyed samples you showed at the textile fair")
f('stillwater', 'Joe', 'F.', 'Stillwater Proteins', 'Dairy proteins made by fermentation', 'Reading', 'Nov 2023', '10 people', BIO_IP,
  'gggggggg', ['Active, incorporated November 2023', 'Small company', 'Precision fermentation is engineering biology', 'Own production strains',
               'Fermentation scientists', 'Seed round announced in spring', 'Closes 2 December', 'Never contacted'],
  ['Hiring a fermentation scientist', 'Incorporated Nov 2023'],
  "Saw Stillwater is hiring for the scale up work")
f('foxglove', 'Ravi', 'J.', 'Foxglove Genomics', 'Faster crop breeding from gene data', 'Norwich', 'Apr 2023', '9 people', BIO_CRD,
  'ggggggag', ['Active, incorporated April 2023', 'Micro company', 'Engineering biology with partners', 'Own breeding models',
               'Geneticists and a data lead', 'Grant funded so far', 'Closes 3 November, two weeks out', 'Never contacted'],
  ['Won Innovate UK funding in 2023'],
  "Saw Foxglove's breeding work with a seed company")
f('elderflower', 'Zara', 'I.', 'Elderflower Labs', 'Fungal leathers for furniture makers', 'London', 'Aug 2024', '5 people', BIO_IP,
  'ggggaagg', ['Active, incorporated August 2024', 'Micro company', 'A biology made material', 'Own growing process',
               'A materials scientist and a designer', 'Angel funded', 'Closes 2 December', 'Never contacted'],
  ['Incorporated Aug 2024'],
  "Saw the chair you made with a furniture studio")
f('saltmarsh', 'Owen', 'S.', 'Saltmarsh Power', 'Tidal kites for river estuaries', 'Swansea', 'May 2022', '13 people', FOAK,
  'gggggagg', ['Active, incorporated May 2022', 'Small company', 'Climate tech first of a kind', 'Own kite design',
               'Marine engineers', 'A larger raise needed for the first array', 'Closes 5 November, two weeks out', 'Never contacted'],
  ['Incorporated May 2022', 'Grid connection news on LinkedIn'],
  "Saw the grid connection news for the estuary site")
f('heathland', 'Ellie', 'V.', 'Heathland Hydrogen', 'Hydrogen from farm waste for tractors', 'Shrewsbury', 'Oct 2022', '11 people', FOAK,
  'ggggggag', ['Active, incorporated October 2022', 'Small company', 'Climate tech first of a kind', 'Own reactor',
               'Chemical engineers', 'Seed round in 2024', 'Closes 5 November', 'Never contacted'],
  ['Incorporated Oct 2022'],
  "Saw the first tractor running on your hydrogen")
f('fenwick', 'Daniel', 'R.', 'Fenwick Optics', 'Lenses for laser welding cameras', 'Oxford', 'Jun 2023', '8 people', DE,
  'ggaggggg', ['Active, incorporated June 2023', 'Micro company', 'Needs a German SME partner, likely from the fair', 'Own optics',
               'Optical engineers', 'Revenue from first customers', 'Closes 1 December', 'Never contacted'],
  ['Exhibited at a Munich trade fair', 'Incorporated Jun 2023'],
  "Saw Fenwick was at the Munich laser fair this year")
f('juniper', 'Grace', 'W.', 'Juniper Kinetics', 'Flywheels for factory energy storage', 'Derby', 'Feb 2023', '10 people', DE,
  'ggggggag', ['Active, incorporated February 2023', 'Small company', 'R&D that suits a German partner', 'Own flywheel design',
               'Mechanical engineers', 'Seed round in 2024', 'Closes 1 December', 'Never contacted'],
  ['German distributor named on site'],
  "Saw you've signed a German distributor")
f('seabright', 'Marcus', 'L.', 'Seabright Marine', 'Hull coatings that cut fuel use on ferries', 'Plymouth', 'Jul 2022', '15 people', SG,
  'gggggggg', ['Active, incorporated July 2022', 'Small company', 'R&D that fits a Singapore partner', 'Own coating chemistry',
               'Chemists and naval architects', 'Revenue and a seed round', 'Closes 16 December', 'Never contacted'],
  ['Singapore port trial on LinkedIn'],
  "Saw the Singapore ferry trial you posted about")
f('thistledown', 'Nadia', 'A.', 'Thistledown Aero', 'Lighter seats for regional aircraft', 'Bristol', 'Mar 2023', '9 people', JP,
  'gggggggg', ['Active, incorporated March 2023', 'Micro company', 'R&D with a Japanese SME partner', 'Own seat structures',
               'Aerospace engineers', 'Seed round in 2025', 'Closes 20 January, three months out', 'Never contacted'],
  ['Japanese supplier on site'],
  "Saw Thistledown is working with a Japanese composites supplier")
f('quillstone', 'Leah', 'Q.', 'Quillstone Materials', 'A low carbon binder to replace some cement', 'Cardiff', 'Jan 2024', '6 people', CONCRETE,
  'gggggggg', ['Active, incorporated January 2024', 'Micro company', 'Concrete decarbonisation, the cohort’s aim', 'Own binder recipe',
               'Two materials scientists', 'Angel funded', 'Closes 2 December', 'Never contacted'],
  ['Read the concrete cohort page', 'Incorporated Jan 2024'],
  "Saw Quillstone's first test slab with a Welsh contractor")
f('redshank', 'Sam', 'B.', 'Redshank Materials', 'Concrete aggregate from demolition waste', 'Leicester', 'Sep 2023', '8 people', CONCRETE,
  'gggggagg', ['Active, incorporated September 2023', 'Micro company', 'Concrete decarbonisation', 'Own grading process',
               'Engineers and a plant lead', 'No round announced', 'Closes 2 December', 'Never contacted'],
  ['Incorporated Sep 2023'],
  "Saw Redshank's aggregate going into a school build in Leicester")
f('bellwether', 'Priya', 'K.', 'Bellwether Clinical', 'Continuous manufacturing for generic medicines', 'Nottingham', 'Nov 2022', '16 people', MEDS,
  'gggggggg', ['Active, incorporated November 2022', 'Small company', 'Sustainable medicines manufacturing', 'Own flow process',
               'Process chemists', 'Series A in 2025', 'Closes 2 December', 'Never contacted'],
  ['Won Innovate UK funding in 2024'],
  "Saw the flow process results you shared at the Nottingham event")
f('larkspur', 'Hannah', 'L.', 'Larkspur Diagnostics', 'A finger prick test for sepsis markers', 'London', 'Jun 2022', '12 people', EIC,
  'ggggggag', ['Active, incorporated June 2022', 'Small company', 'Deep tech, TRL 6 to 8, the EIC’s range', 'Own test cartridge',
               'Diagnostics scientists', 'Seed round in 2024', 'Next short proposal batch 3 November', 'Never contacted'],
  ['Read the EIC Accelerator guide'],
  "Saw Larkspur's test is in a hospital evaluation now")
f('meadowlark', 'Isla', 'P.', 'Meadowlark Rehab', 'At home stroke rehab with motion sensors', 'Liverpool', 'Mar 2023', '7 people', EIC,
  'ggggaagg', ['Active, incorporated March 2023', 'Micro company', 'Health tech in the EIC’s range', 'Own sensing and app',
               'Two engineers and a physio lead', 'Angel funded', 'Next short proposal batch 3 November', 'Never contacted'],
  ['Incorporated Mar 2023'],
  "Saw Meadowlark's sensors are going home with patients after discharge now")
f('tessellate', 'Ben', 'O.', 'Tessellate Orbital', 'Satellite alerts for crop disease', 'Harwell', 'Aug 2023', '9 people', OPS,
  'gggggagg', ['Active, incorporated August 2023', 'Micro company', 'AI running farm operations', 'Own disease models',
               'Earth observation scientists', 'Pre seed round', 'Closes 8 December', 'Never contacted'],
  ['Incorporated Aug 2023', 'Agronomy partner named on site'],
  "Saw Tessellate's alerts going out to an agronomy firm's farms")
f('wychwood', 'Joe', 'S.', 'Wychwood Sensors', 'Acoustic sensors that find leaks in water mains', 'Oxford', 'May 2023', '10 people', OPS,
  'gggggggg', ['Active, incorporated May 2023', 'Small company', 'AI running water network operations', 'Own leak detection models',
               'Engineers and data scientists', 'Seed round in 2024', 'Closes 8 December', 'Never contacted'],
  ['Read the BridgeAI guide', 'Water company trial on LinkedIn'],
  "Saw the leak trial you're running with a water company")
f('brightpath', 'Ellie', 'N.', 'Brightpath Cargo', 'Scheduling for council e cargo bike fleets', 'Cambridge', 'Jan 2024', '5 people', OPS,
  'ggggaagg', ['Active, incorporated January 2024', 'Micro company', 'AI running delivery operations', 'Own scheduling engine',
               'Two engineers', 'Founder funded', 'Closes 8 December', 'Never contacted'],
  ['Incorporated Jan 2024'],
  "Saw Brightpath is running the cargo bikes for a council now")
f('rivermint', 'Zara', 'C.', 'Rivermint Foods', 'Fermented fats for plant based foods', 'Leeds', 'Jun 2024', '6 people', BIO_IP,
  'ggggggag', ['Active, incorporated June 2024', 'Micro company', 'Engineering biology food product', 'Own fermentation process',
               'Food scientists', 'Pre seed round', 'Closes 2 December', 'Never contacted'],
  ['Incorporated Jun 2024'],
  "Saw Rivermint's fat in a plant based burger at the food show")
f('tinderbox', 'Ravi', 'M.', 'Tinderbox Mycelium', 'Fire safe insulation grown from mycelium', 'Bristol', 'Oct 2023', '8 people', BIO_IP,
  'gggggggg', ['Active, incorporated October 2023', 'Micro company', 'Engineering biology material', 'Own growing method',
               'Biologists and a fire test lead', 'Seed round in 2025', 'Closes 2 December', 'Never contacted'],
  ['Passed a fire test, on LinkedIn'],
  "Saw the fire test result you posted")
f('lumenfold', 'Amara', 'D.', 'Lumenfold Solar', 'Flexible solar film for warehouse roofs', 'Swindon', 'Apr 2022', '14 people', FOAK,
  'gggggagg', ['Active, incorporated April 2022', 'Small company', 'Climate tech first of a kind plant', 'Own film process',
               'Materials engineers', 'A bigger raise needed for the plant', 'Closes 5 November', 'Never contacted'],
  ['Incorporated Apr 2022'],
  "Saw Lumenfold's first warehouse roof go live")
f('vantage', 'Tom', 'R.', 'Vantage Heatpumps', 'Heat pumps for tower blocks', 'Manchester', 'Feb 2022', '18 people', FOAK,
  'ggggggag', ['Active, incorporated February 2022', 'Small company', 'Climate tech first of a kind', 'Own compressor design',
               'Engineers and installers', 'Series A in 2025', 'Closes 5 November', 'Never contacted'],
  ['Hiring a product engineer'],
  "Saw the first tower block in Salford running on your heat pumps")
f('halcyon', 'Kit', 'G.', 'Halcyon Qubits', 'Control chips for quantum computers', 'Glasgow', 'Sep 2023', '9 people', DE,
  'ggaggggg', ['Active, incorporated September 2023', 'Micro company', 'Partner is a German lab, an SME is still needed', 'Own chip design',
               'Chip designers and a physicist', 'Seed round in 2025', 'Closes 1 December', 'Never contacted'],
  ['German research partner named on site'],
  "Saw Halcyon's chip work with a German lab")
f('ashgrove', 'Nadia', 'E.', 'Ashgrove Thermal', 'Thermal batteries for food factories', 'Hull', 'Jul 2023', '7 people', BATT_FEAS,
  'gggggagg', ['Active, incorporated July 2023', 'Micro company', 'Battery feasibility fits', 'Own storage medium',
               'Thermal engineers', 'No round announced', 'Closes 2 December', 'Never contacted'],
  ['Incorporated Jul 2023'],
  "Saw Ashgrove's pilot at a food factory in Hull")
# Found but not picked today, shown under Founders with the dot that stopped them.
f('hartwell', 'Marcus', 'H.', 'Hartwell Imaging', 'AI reading of chest X rays', 'Leeds', 'Mar 2022', '15 people', CANCER,
  'gggggggr', ['Active', 'Small company', 'Cancer diagnosis is the call', 'Own imaging models', 'Radiologists and engineers', 'Series A', 'Closes 28 October',
               'Contacted 40 days ago, inside the 90 day rule'],
  ['Contacted in August'], '', picked=False, state='held')
f('oakmere', 'Leah', 'T.', 'Oakmere Composites', 'Recycled carbon fibre panels', 'Derby', 'Jan 2023', '9 people', MATS,
  'ggggggrg', ['Active', 'Micro company', 'Materials R&D', 'Own process', 'Engineers', 'Seed round', 'Closes 28 October, too close to write well', 'Never contacted'],
  ['Incorporated Jan 2023'], '', picked=False, state='held')
f('granite', 'Joe', 'P.', 'Granite Loop', 'Reusable takeaway packaging', 'London', 'Apr 2024', '6 people', None,
  'ggrgagga', ['Active', 'Micro company', 'No open call fits reuse logistics today', 'A service more than new technology', 'Ops team', 'Pre seed', 'No matching call', 'Never contacted'],
  ['Incorporated Apr 2024'], '', picked=False, state='held')
