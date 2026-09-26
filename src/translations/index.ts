import { LanguageCode } from '../types';
import { AppTranslations } from './types';
import { hi } from './hi';
import { en } from './en';
import { gu } from './gu';
import { bn } from './bn';
import { mr } from './mr';
import { ta } from './ta';
import { te } from './te';
import { kn } from './kn';
import { ml } from './ml';
import { pa } from './pa';
import { or } from './or';

export * from './types';

export const translations: Record<LanguageCode, AppTranslations> = {
  hi,
  en,
  gu,
  bn,
  mr,
  ta,
  te,
  kn,
  ml,
  pa,
  or,
};
