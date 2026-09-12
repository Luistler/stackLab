import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://xmvvjduhxqiqwszbxfub.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_9n0-DeDrkAAmUjeAXK4VdA_xBb4D28s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const getSupabaseClient = () => supabase;
