export const IMPERSONATE_SUCCESSFUL = 'IMPERSONATE_SUCCESSFUL';
export const IMPERSONATE_FAILED = 'IMPERSONATE_FAILED';

export function successfulImpersonate() {
    return {type: IMPERSONATE_SUCCESSFUL};
}

export function failedImpersonate() {
    return {type: IMPERSONATE_FAILED};
}
