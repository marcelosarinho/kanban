export function addUnderscoresToText(text: string) {
  return text.split(' ').join('_');
}

// export function debounce<T extends (...args: any[]) => any>()