import { createClient } from '@supabase/supabase-js';

const supabaseUrlBackend = process.env.SUPABASE_URL;
const supabaseKeyBackend = process.env.SUPABASE_SECRET_KEY;


export const supabaseAdmin = createClient(supabaseUrlBackend,supabaseKeyBackend);