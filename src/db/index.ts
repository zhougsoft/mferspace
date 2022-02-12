import { createClient } from '@supabase/supabase-js';

const { SUPABASE_URL, SUPABASE_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_KEY) {
	throw new Error('Missing Supabase connection string(s) in env');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
