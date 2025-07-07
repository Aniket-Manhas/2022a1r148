export function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function validateShortcode(code: string): boolean {
  return /^[a-zA-Z0-9]{4,8}$/.test(code);
}

export function validateExpiry(value: string): boolean {
  const num = parseInt(value);
  return !isNaN(num) && num > 0;
}
