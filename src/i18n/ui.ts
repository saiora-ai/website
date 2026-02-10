import ru from './ru.json';
import en from './en.json';

export const locales = ['ru', 'en'] as const;
export type Locale = (typeof locales)[number];

type Messages = Record<string, string | Messages>;

const messages: Record<Locale, Messages> = {
  ru,
  en
};

function getByKey(source: Messages, key: string): string | undefined {
  return key.split('.').reduce<string | Messages | undefined>((acc, part) => {
    if (!acc || typeof acc === 'string') {
      return undefined;
    }
    return acc[part];
  }, source) as string | undefined;
}

export function t(locale: Locale, key: string): string {
  const value = getByKey(messages[locale], key);
  if (typeof value === 'string') {
    return value;
  }
  return key;
}

export function getLocalePath(locale: Locale, path = ''): string {
  const normalized = path.replace(/^\/+|\/+$/g, '');
  if (!normalized) {
    return `/${locale}/`;
  }
  return `/${locale}/${normalized}/`;
}
