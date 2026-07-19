import type { colors } from '../constants/colors';
import type { radius } from '../constants/radius';
import type { shadows } from '../constants/shadows';
import type { typography } from '../constants/typography';
import type { zIndex } from '../constants/zIndex';

export type ColorToken = keyof typeof colors;
export type RadiusToken = keyof typeof radius;
export type ShadowToken = keyof typeof shadows;
export type TypographyToken = keyof typeof typography;
export type ZIndexToken = keyof typeof zIndex;

export type Theme = 'light' | 'dark';