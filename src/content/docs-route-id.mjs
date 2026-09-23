export function generateDocsIdFromEntry(entry) {
  return entry.split('.').slice(0, -1).join('.');
}
