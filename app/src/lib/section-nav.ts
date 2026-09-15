export function isHomePath(pathname = window.location.pathname): boolean {
  return (pathname.replace(/\/+$/, '') || '/') === '/';
}

/** Root-absolute href for a homepage section, e.g. '#about' → '/#about'. */
export function homeSectionHref(hash: string): string {
  const id = hash.replace(/^#/, '');
  return id ? `/#${id}` : '/';
}

export function goToHomeSection(hash: string): void {
  const id = hash.replace(/^#/, '');
  const target = id ? `#${id}` : '#home';
  if (isHomePath()) {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  window.location.assign(id ? `/#${id}` : '/');
}

export function handleHomeSectionClick(
  event: { preventDefault: () => void },
  href: string,
): void {
  if (!isHomePath()) {
    return;
  }
  event.preventDefault();
  if (href === '/' || href === '/#home' || href === '#home') {
    goToHomeSection('#home');
    return;
  }
  const hash = href.includes('#') ? href.slice(href.indexOf('#')) : href;
  goToHomeSection(hash);
}
