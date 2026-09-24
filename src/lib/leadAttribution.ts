export interface AttributionData {
  landing_page: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  fbclid: string;
  msclkid: string;
}

const ATTRIBUTION_KEY = 'mgbc:first-touch:v1';

const EMPTY_ATTRIBUTION: AttributionData = {
  landing_page: '',
  referrer: '',
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_term: '',
  utm_content: '',
  gclid: '',
  fbclid: '',
  msclkid: '',
};

function readStoredAttribution(): AttributionData | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    return value ? (JSON.parse(value) as AttributionData) : null;
  } catch {
    return null;
  }
}

function writeStoredAttribution(value: AttributionData): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }
}

function currentAttribution(): AttributionData {
  if (typeof window === 'undefined') return { ...EMPTY_ATTRIBUTION };
  const url = new URL(window.location.href);
  return {
    landing_page: window.location.href,
    referrer: document.referrer || '',
    utm_source: url.searchParams.get('utm_source') || '',
    utm_medium: url.searchParams.get('utm_medium') || '',
    utm_campaign: url.searchParams.get('utm_campaign') || '',
    utm_term: url.searchParams.get('utm_term') || '',
    utm_content: url.searchParams.get('utm_content') || '',
    gclid: url.searchParams.get('gclid') || '',
    fbclid: url.searchParams.get('fbclid') || '',
    msclkid: url.searchParams.get('msclkid') || '',
  };
}

export function captureInitialAttribution(): AttributionData {
  const stored = readStoredAttribution();
  if (stored?.landing_page) return { ...EMPTY_ATTRIBUTION, ...stored };

  const attribution = currentAttribution();
  writeStoredAttribution(attribution);
  return attribution;
}

export function getAttribution(): AttributionData {
  return captureInitialAttribution();
}
