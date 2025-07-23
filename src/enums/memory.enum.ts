export const MemoryMoodEnumValues = {
  HAPPY: 'happy',
  PEACEFUL: 'peaceful',
  EXCITED: 'excited',
  NOSTALGIC: 'nostalgic',
  GRATEFUL: 'grateful',
  REFLECTIVE: 'reflective',
} as const;

export const ContentStatusEnumValues = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  DRAFT: 'draft',
} as const;

export const MemoryMoodEnumOptions = Object.values(MemoryMoodEnumValues) as [
  string,
  ...string[],
];
export const ContentStatusEnumOptions = Object.values(
  ContentStatusEnumValues
) as [string, ...string[]];

export type MemoryMoodEnum = (typeof MemoryMoodEnumOptions)[number];
export type ContentStatusEnum = (typeof ContentStatusEnumOptions)[number];
