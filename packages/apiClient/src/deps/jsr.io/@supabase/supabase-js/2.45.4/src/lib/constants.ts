// constants.ts
import * as dntShim from "../../../../../../../_dnt.shims.js";

import { RealtimeClientOptions } from '@supabase/realtime-js'
import { SupabaseAuthClientOptions } from './types.js'
import { version } from './version.js'

let JS_ENV = ''
// @ts-ignore
if (typeof dntShim.Deno !== 'undefined') {
  JS_ENV = 'deno'
} else if (typeof document !== 'undefined') {
  JS_ENV = 'web'
} else if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
  JS_ENV = 'react-native'
} else {
  JS_ENV = 'node'
}

export const DEFAULT_HEADERS = { 'X-Client-Info': `supabase-js-${JS_ENV}/${version}` }

export const DEFAULT_GLOBAL_OPTIONS = {
  headers: DEFAULT_HEADERS,
}

export const DEFAULT_DB_OPTIONS = {
  schema: 'public',
}

export const DEFAULT_AUTH_OPTIONS: SupabaseAuthClientOptions = {
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  flowType: 'implicit',
}

export const DEFAULT_REALTIME_OPTIONS: RealtimeClientOptions = {}
