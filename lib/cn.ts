// Joins class names, skipping falsy entries. No conflict resolution: callers
// must not pass two utilities that set the same property.
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
