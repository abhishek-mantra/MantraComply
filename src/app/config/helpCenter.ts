/**
 * MantraComply Help Center Configuration
 * Links to the standalone Help Center running on port 5175 or Vercel
 */

export const HELP_CENTER_BASE_URL =
  (import.meta as any).env?.VITE_HELP_CENTER_URL ||
  "https://help.mantracomply.com";

export const getHelpArticleUrl = (slug: string): string => {
  return `${HELP_CENTER_BASE_URL}/articles/${slug}`;
};

export const getHelpCategoryUrl = (categorySlug: string): string => {
  return `${HELP_CENTER_BASE_URL}/category/${categorySlug}`;
};
