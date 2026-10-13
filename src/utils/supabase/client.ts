import { createBrowserClient } from "@supabase/ssr";

const DEFAULT_SUPABASE_URL = "https://xwwpvtmvbujtynyanywl.supabase.co";
const DEFAULT_SUPABASE_KEY = "sb_publishable_6rNhhVwAY04T2dInW6eUaw_1MbDHiL0";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  DEFAULT_SUPABASE_KEY;

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey,
  );
