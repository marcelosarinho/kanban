export function addUnderscoresToText(text: string) {
  return text.split(' ').join('_');
}

export function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 24 * 30}`;
}

// export function debounce<T extends (...args: any[]) => any>()