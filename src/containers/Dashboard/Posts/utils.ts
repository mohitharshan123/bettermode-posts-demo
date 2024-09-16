import { POST_TYPE_ALLOWED_REACTIONS_MAP } from "constants/index";
import { ReactionType } from "types/posts";

/**
 * Get the available reactions for a post based on its type.
 */
export const getAvailableReactions = (postTypeId: string): ReactionType[] => {
  return Object.values(ReactionType).filter((type) =>
    POST_TYPE_ALLOWED_REACTIONS_MAP[postTypeId]?.includes(type)
  );
};

/**
 * Cleans up HTML content by removing extra quotes and fixing Tailwind CSS class formatting.
 * @param html - The HTML content as a string.
 * @returns The cleaned-up HTML content.
 */
export const cleanHtmlContent = (html: string) => {
  if (!html) return "";

  // Remove starting and ending double quotes if they exist
  let cleanedHtml = html.replace(/^\"|\"$/g, "");

  // Remove escaped double quotes
  cleanedHtml = cleanedHtml.replace(/\\&quot;/g, '"');

  // Remove additional escaping in text content
  cleanedHtml = cleanedHtml.replace(/\\(?!&quot;)/g, "");

  // Add a space after 'text-lg' in class attributes if necessary
  cleanedHtml = cleanedHtml.replace(
    /class="([^"]*?\btext-lg\b)(?!\s)([^"]*?)"/g,
    'class="$1 $2"'
  );

  // Add a space between <li> elements
  cleanedHtml = cleanedHtml.replace(/<\/li>/g, "</li>\n");

  return cleanedHtml;
};
