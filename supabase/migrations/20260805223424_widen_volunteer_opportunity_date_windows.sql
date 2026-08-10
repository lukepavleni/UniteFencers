-- Widen each seeded volunteer opportunity's stated availability window to
-- include the day before and the day after its NAC, not just the NAC's own
-- dates -- these are real orgs' recurring/ongoing shifts, so this just
-- states that range explicitly instead of implying they're only available
-- on the exact tournament days. Data-only update, matched on the unique
-- signup_url (see 20260805012220_seed_real_volunteer_opportunities.sql).

update public.volunteer_opportunities as vo
set event_date_time = v.event_date_time
from (values
  -- October 2026 NAC (Oct 9-12, 2026) -> Oct 8-13, 2026
  ('https://feedhopenow.org/get-involved/volunteer/', 'Recurring shifts available Oct 8-13, 2026 -- the day before, during, and after the NAC -- sign up for an open slot online'),
  ('https://habitatorlando.org/volunteer/', 'Recurring build days available Oct 8-13, 2026 -- the day before, during, and after the NAC -- sign up for an open slot online'),
  ('https://www.centralfloridahomeless.org/take-action', 'Ongoing opportunities Oct 8-13, 2026 -- the day before, during, and after the NAC -- browse and select a slot via their volunteer portal'),
  ('https://rmhccf.org/get-involved/volunteer/', 'Recurring shifts Oct 8-13, 2026 -- the day before, during, and after the NAC -- sign up for an open slot online'),

  -- November 2026 NAC (Nov 20-23, 2026) -> Nov 19-24, 2026
  ('https://mofc.org/get-involved/volunteer/', 'Recurring shifts Nov 19-24, 2026 -- the day before, during, and after the NAC -- sign up via their volunteer hub'),
  ('https://www.habitatmidohio.org/get-involved/volunteer/overview.html', 'Build sites run Tuesday-Saturday; ReStore open Monday-Saturday -- shifts available Nov 19-24, 2026, the day before, during, and after the NAC'),
  ('https://theopenshelter.org/', 'Ongoing opportunities Nov 19-24, 2026 -- the day before, during, and after the NAC -- contact them directly to schedule'),
  ('https://www.lifecarealliance.org/volunteer/', 'Recurring weekday shifts Nov 19-24, 2026 -- the day before, during, and after the NAC -- sign up online'),

  -- January 2027 Junior Olympics & Para NAC (Jan 8-11, 2027) -> Jan 7-12, 2027
  ('https://cityrescue.org/volunteer/', 'Opportunities run 9am-6pm daily Jan 7-12, 2027 -- the day before, during, and after the NAC -- register 1-2 days ahead via their online calendar'),
  ('https://www.homelessalliance.org/get-involved', 'Ongoing opportunities Jan 7-12, 2027 -- the day before, during, and after the NAC -- sign up via their volunteer portal'),
  ('https://www.regionalfoodbank.org/volunteer/individual/', 'Recurring shifts Jan 7-12, 2027 -- the day before, during, and after the NAC -- sign up online'),
  ('https://www.mealsonwheelsokc.org/volunteers', 'Recurring weekday shifts Jan 7-12, 2027 -- the day before, during, and after the NAC -- sign up online, background check required'),

  -- April 2027 NAC (Apr 16-19, 2027) -> Apr 15-20, 2027
  ('https://freestorefoodbank.org/volunteers/', 'Recurring morning (9-11:30am) and afternoon (1-3:30pm) shifts Apr 15-20, 2027 -- the day before, during, and after the NAC -- sign up online'),
  ('https://www.habitatcincinnati.org/individual-volunteers', 'Typical construction shift runs 8:30am-4pm, available Apr 15-20, 2027 -- the day before, during, and after the NAC -- sign up online'),
  ('https://svdpcincinnati.org/volunteer/volunteer-opportunities/', 'Ongoing opportunities Apr 15-20, 2027 -- the day before, during, and after the NAC -- contact them to arrange a shift'),
  ('https://m25m.org/help/volunteering/', 'Weekday walk-in hours 9am-4pm (Mon-Fri) and shorter Saturday slots (1-3pm), available Apr 15-20, 2027 -- the day before, during, and after the NAC -- confirm ahead by phone')
) as v(signup_url, event_date_time)
where vo.signup_url = v.signup_url;
