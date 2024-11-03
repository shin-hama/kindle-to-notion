// helpers.ts
import * as dntShim from "../../../../../../../_dnt.shims.js";
export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
export function stripTrailingSlash(url) {
    return url.replace(/\/$/, '');
}
export const isBrowser = () => typeof dntShim.dntGlobalThis !== 'undefined';
export function applySettingDefaults(options, defaults) {
    const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions, } = options;
    const { db: DEFAULT_DB_OPTIONS, auth: DEFAULT_AUTH_OPTIONS, realtime: DEFAULT_REALTIME_OPTIONS, global: DEFAULT_GLOBAL_OPTIONS, } = defaults;
    const result = {
        db: {
            ...DEFAULT_DB_OPTIONS,
            ...dbOptions,
        },
        auth: {
            ...DEFAULT_AUTH_OPTIONS,
            ...authOptions,
        },
        realtime: {
            ...DEFAULT_REALTIME_OPTIONS,
            ...realtimeOptions,
        },
        global: {
            ...DEFAULT_GLOBAL_OPTIONS,
            ...globalOptions,
        },
        accessToken: async () => '',
    };
    if (options.accessToken) {
        result.accessToken = options.accessToken;
    }
    else {
        // hack around Required<>
        delete result.accessToken;
    }
    return result;
}
