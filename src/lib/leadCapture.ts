import { getAttribution } from './leadAttribution';

export type LeadFormType = 'contact' | 'assessment';

export interface AssessmentIdentity {
  submission_id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
}

export interface LeadResponse {
  ok: boolean;
  submission_id?: string;
  duplicate?: boolean;
  ignored?: boolean;
  error?: string;
}

export class LeadCaptureError extends Error {
  code: 'configuration' | 'offline' | 'network' | 'timeout' | 'response' | 'server';

  constructor(code: LeadCaptureError['code'], message: string) {
    super(message);
    this.name = 'LeadCaptureError';
    this.code = code;
  }
}

const ASSESSMENT_IDENTITY_KEY = 'mgbc:assessment-identity:v1';
const SCHEMA_VERSION = '1';
const REQUEST_TIMEOUT_MS = 15000;

function readSessionJson<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.sessionStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

function writeSessionJson(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }
}

function newSubmissionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const parts = crypto.getRandomValues(new Uint32Array(4));
    return `${Date.now().toString(36)}-${Array.from(parts, (part) => part.toString(36)).join('-')}`;
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

export function getOrCreateSubmissionId(form: HTMLFormElement): string {
  const existing = form.dataset.submissionId?.trim();
  if (existing) return existing;
  const submissionId = newSubmissionId();
  form.dataset.submissionId = submissionId;
  return submissionId;
}

export function clearPendingSubmissionId(form: HTMLFormElement): void {
  delete form.dataset.submissionId;
}

export function buildLeadPayload(
  formType: LeadFormType,
  formData: FormData,
  extra: Record<string, string | number> = {},
): Record<string, string | number> {
  const payload: Record<string, string | number> = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') payload[key] = value;
  }

  Object.assign(payload, getAttribution(), {
    schema_version: SCHEMA_VERSION,
    form_type: formType,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    language: typeof navigator !== 'undefined' ? navigator.language : '',
    timezone:
      typeof Intl !== 'undefined'
        ? Intl.DateTimeFormat().resolvedOptions().timeZone || ''
        : '',
    client_timestamp: new Date().toISOString(),
    ...extra,
  });

  return payload;
}

function endpoint(): string {
  return String(import.meta.env.PUBLIC_MGBC_LEAD_ENDPOINT || '').trim();
}

export async function submitLead(
  payload: Record<string, string | number>,
): Promise<LeadResponse> {
  const target = endpoint();
  if (!target) {
    throw new LeadCaptureError('configuration', 'Lead endpoint is not configured.');
  }

  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    throw new LeadCaptureError('offline', 'Browser is offline.');
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new LeadCaptureError('response', `Lead endpoint returned HTTP ${response.status}.`);
    }

    let data: LeadResponse;
    try {
      data = (await response.json()) as LeadResponse;
    } catch {
      throw new LeadCaptureError('response', 'Lead endpoint returned invalid JSON.');
    }

    if (!data.ok) {
      throw new LeadCaptureError('server', data.error || 'Lead endpoint rejected the submission.');
    }

    return data;
  } catch (error) {
    if (error instanceof LeadCaptureError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new LeadCaptureError('timeout', 'Lead submission timed out.');
    }
    throw new LeadCaptureError('network', 'Lead submission failed because of a network error.');
  } finally {
    window.clearTimeout(timeout);
  }
}

export function saveAssessmentIdentity(identity: AssessmentIdentity): void {
  writeSessionJson(ASSESSMENT_IDENTITY_KEY, identity);
}

export function getAssessmentIdentity(): AssessmentIdentity | null {
  const stored = readSessionJson<AssessmentIdentity>(ASSESSMENT_IDENTITY_KEY);
  if (!stored?.submission_id || !stored.name || !stored.email) return null;
  return stored;
}

export function prefillContactIdentity(form: HTMLFormElement): AssessmentIdentity | null {
  const identity = getAssessmentIdentity();
  if (!identity) return null;

  const values: Record<string, string> = {
    name: identity.name,
    email: identity.email,
    phone: identity.phone,
    company: identity.company,
  };

  for (const [name, value] of Object.entries(values)) {
    if (!value) continue;
    const field = form.elements.namedItem(name);
    if (field instanceof HTMLInputElement && !field.value) field.value = value;
  }

  return identity;
}
