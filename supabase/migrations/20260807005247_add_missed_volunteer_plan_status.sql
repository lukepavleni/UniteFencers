-- Add a "missed" status so volunteers can confirm they did NOT complete an
-- activity they signed up for, without deleting their plan history.
alter type volunteer_plan_status add value if not exists 'missed';
