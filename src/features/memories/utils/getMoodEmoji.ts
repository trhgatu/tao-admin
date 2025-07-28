export function getMoodEmoji(mood: string): string {
  const moodMap: Record<string, string> = {
    happy: '😊',
    peaceful: '😌',
    excited: '🤩',
    nostalgic: '🥺',
    grateful: '🙏',
    reflective: '🤔',
  };
  return moodMap[mood] || '😐';
}
