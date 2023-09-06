export default function valueOrNA(value: undefined | null | string | [] | number) {
    if (
      value === undefined ||
      value === null ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return 'N/A';
    }
  
    if (typeof value === 'string') {
      const parts = value.split(' ');
      if (parts[0] === 'undefined' || parts[0] === 'null') {
        return 'N/A';
      }
    }
  
    return value;
  }