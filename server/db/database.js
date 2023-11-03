require('dotenv').config()
const {createClient} = require('@supabase/supabase-js');

// Create a single supabase client for interacting with your database
const URL = 'https://jrxbdtztowpxiidfvynw.supabase.co';
const KEY = process.env.KEY;
const supabase = createClient(URL, KEY);

module.exports = supabase;