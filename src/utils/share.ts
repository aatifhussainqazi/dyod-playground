import type { PersonalityArchetype } from '../types/quiz';

export async function shareQuizResult(
  archetype: PersonalityArchetype,
  topCategoryNames: string[]
): Promise<{ success: boolean; method: 'native' | 'clipboard' | 'failed' }> {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://dyod-playground.vercel.app';
  
  const text = `🎓 I just discovered my academic energy on DYOD Playground!\n\n` +
    `⚡ Result: ${archetype.title.toUpperCase()}\n` +
    `✨ "${archetype.tagline}"\n` +
    `🧭 Top fields: ${topCategoryNames.slice(0, 2).join(' & ')}\n\n` +
    `What kind of DYOD explorer are you? Find out here:`;

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: `DYOD Playground - ${archetype.title}`,
        text: text,
        url: currentUrl,
      });
      return { success: true, method: 'native' };
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        return { success: false, method: 'native' };
      }
      // Fall through to clipboard if share failed
    }
  }

  // Fallback to clipboard
  try {
    const fullClipboardText = `${text} ${currentUrl}`;
    await navigator.clipboard.writeText(fullClipboardText);
    return { success: true, method: 'clipboard' };
  } catch {
    return { success: false, method: 'failed' };
  }
}
