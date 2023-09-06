export default function valueOrZero<T>(value: T) {
    if (value === undefined || 
        value === null || 
        (Array.isArray(value) && value.length === 0)
    ) {
        return 0;
    }
    return value;
}