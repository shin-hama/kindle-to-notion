import { AuthClient } from '@supabase/auth-js';
export class SupabaseAuthClient extends AuthClient {
    constructor(options) {
        super(options);
    }
}
