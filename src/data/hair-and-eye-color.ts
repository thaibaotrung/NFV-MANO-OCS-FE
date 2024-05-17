export interface HairAndEyeColorType {
  value: string;
  label: string;
}
export const hairColors: readonly HairAndEyeColorType[] = [
  { value: 'Brown', label: 'Brown' },
  { value: 'Black', label: 'Black' },
  { value: 'Copper', label: 'Copper' },
  { value: 'Blonde', label: 'Blonde' },
  { value: 'White', label: 'White' },
  { value: 'Hazel', label: 'Hazel' },
  { value: 'Gray', label: 'Gray' },
  { value: 'Red', label: 'Red' },
  { value: 'Yellow', label: 'Yellow' }
];

export const eyeColors: readonly HairAndEyeColorType[] = [
  { value: 'Brown', label: 'Brown' },
  { value: 'Black', label: 'Black' },
  { value: 'Blue', label: 'Blue' },
  { value: 'Green', label: 'Green' },
  { value: 'Hazel', label: 'Hazel' },
  { value: 'Gray', label: 'Gray' }
];
