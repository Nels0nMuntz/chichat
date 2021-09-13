export const isEmptyString = (value: string | null | undefined): boolean => {
    if (!value) return true;
    const _value = value.toString();
    return !_value.length || !_value.replace(/\s/g, '').length;
};