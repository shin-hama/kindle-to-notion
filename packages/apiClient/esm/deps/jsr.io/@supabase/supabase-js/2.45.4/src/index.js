import SupabaseClient from './SupabaseClient.js';
export * from '@supabase/auth-js';
export { FunctionsHttpError, FunctionsFetchError, FunctionsRelayError, FunctionsError, FunctionRegion, } from '@supabase/functions-js';
export * from '@supabase/realtime-js';
export { default as SupabaseClient } from './SupabaseClient.js';
/**
 * Creates a new Supabase Client.
 */
export const createClient = (supabaseUrl, supabaseKey, options) => {
    return new SupabaseClient(supabaseUrl, supabaseKey, options);
};
