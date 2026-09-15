/**
 * Tiny class-name joiner. Anything falsy is dropped, so
 * conditional classes can be written inline as
 * `condition && "class"` without an empty-string fallback.
 */
export function cn(...values: unknown[]): string {
  return values.filter((value) => typeof value === "string" && value).join(" ");
}
