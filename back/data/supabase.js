const {createClient} = require("@supabase/supabase-js");
const { create } = require("node:domain");

require('dotenv').config();

const supabaseUrl = process.env.SUPABASEURL;
const supabaseKey = process.env.SUPABASEKEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;