export const deep_iterate_obj = (obj: {[key: string]: any}, cb?: () => void) => {
    Object.keys(obj).forEach(key => {
        cb && cb();
        if (typeof obj[key] === 'object' && obj[key] !== null) { deep_iterate_obj(obj[key]); };
    });
}