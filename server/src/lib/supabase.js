const { createClient } = require('@supabase/supabase-js');

const rawUrl = process.env.SUPABASE_URL?.trim().replace(/\/+$/, '');
const url = rawUrl?.replace(/\/rest\/v1\/?$/, '');
const key = process.env.SUPABASE_SERVICE_KEY?.trim();

const supabase = url && key ? createClient(url, key) : null;

module.exports = { supabase };
