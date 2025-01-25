import { createClient } from "@supabase/supabase-js";
import z from "zod";
import type { Database } from "types/supabase";

let supabase: ReturnType<typeof createClient<Database>> | undefined;

export function getSupabaseClient() {
  if (supabase) {
    return supabase;
  }
  const { PUBLIC_SUPABASE_URL: url, PUBLIC_SUPABASE_ANON_KEY: anonKey } = z
    .object({
      PUBLIC_SUPABASE_URL: z.string(),
      PUBLIC_SUPABASE_ANON_KEY: z.string(),
    })
    .parse(import.meta.env);

  supabase = createClient<Database>(url, anonKey);

  return supabase;
}
