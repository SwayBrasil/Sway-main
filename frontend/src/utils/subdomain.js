/**
 * Utilitários para detectar e trabalhar com subdomínios
 */

/**
 * Detecta se estamos em um subdomínio
 * @returns {string|null} O subdomínio ou null se estiver no domínio principal
 */
export function getSubdomain() {
  if (typeof window === 'undefined') return null;
  
  const hostname = window.location.hostname;
  
  // Se for localhost ou IP, não há subdomínio
  if (hostname === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    return null;
  }
  
  const parts = hostname.split('.');
  
  // Se tiver menos de 2 partes, não há subdomínio
  if (parts.length < 2) {
    return null;
  }
  
  // Se for domínio principal (swaybrasil.com), não há subdomínio
  if (parts.length === 2 && (parts[0] === 'swaybrasil' || parts[0] === 'www')) {
    return null;
  }
  
  // Se tiver 3+ partes, o primeiro é o subdomínio
  if (parts.length >= 3) {
    const subdomain = parts[0];
    // Ignorar 'www'
    if (subdomain === 'www') {
      return parts.length > 3 ? parts[1] : null;
    }
    return subdomain;
  }
  
  return null;
}

/**
 * Verifica se estamos no domínio principal (swaybrasil.com)
 * @returns {boolean}
 */
export function isMainDomain() {
  return getSubdomain() === null;
}

/**
 * Verifica se estamos em um subdomínio de empresa
 * @returns {boolean}
 */
export function isCompanySubdomain() {
  return getSubdomain() !== null;
}

/**
 * Redireciona para o subdomínio da empresa
 * @param {string} subdomain - O subdomínio da empresa
 * @param {string} path - Caminho opcional para redirecionar
 */
export function redirectToSubdomain(subdomain, path = '') {
  const protocol = window.location.protocol;
  const port = window.location.port ? `:${window.location.port}` : '';
  const newUrl = `${protocol}//${subdomain}.swaybrasil.com${port}${path}`;
  window.location.href = newUrl;
}


