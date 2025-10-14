export function addUnderscoresToText(text: string) {
  return text.split(' ').join('_');
}

export function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 24 * 30}`;
}

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export function removeCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

export function censorEmail(email: string) {
  if (!email) {
    return '';
  }

  const [local, domain] = email.split('@');
  const firstLetter = local[0];
  const censored = '*'.repeat(local.length - 1);

  return `${firstLetter}${censored}@${domain}`;
}

// export function debounce<T extends (...args: any[]) => any>()