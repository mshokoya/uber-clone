export const object_key_exists = <T extends Record<string, any>, U extends keyof T>(obj: T, key: U): boolean => {
    if (typeof obj !== 'object' || !obj) return false;
    return key in obj;
} 