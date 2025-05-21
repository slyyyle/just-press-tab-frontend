export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanum with dash
    .replace(/(^-|-$)+/g, '');   // trim dashes
} 