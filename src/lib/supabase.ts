import { createClient } from '@supabase/supabase-js';

// Environment variables with fallback to browser localStorage for quick UI testing / connecting
const defaultUrl =
  import.meta.env.PUBLIC_SUPABASE_URL ||
  'https://placeholder-project.supabase.co';
const defaultKey =
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const getSupabaseClient = () => {
  let url = import.meta.env.PUBLIC_SUPABASE_URL || '';
  let key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

  if (typeof window !== 'undefined') {
    const customUrl = localStorage.getItem('stacklab_supabase_url');
    const customKey = localStorage.getItem('stacklab_supabase_anon_key');
    if (customUrl && customKey) {
      url = customUrl;
      key = customKey;
    }
  }

  if (!url || !key || url.includes('placeholder-project')) {
    return null;
  }

  return createClient(url, key);
};

export const supabase = getSupabaseClient();
