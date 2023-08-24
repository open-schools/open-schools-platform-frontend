export function filterTextShaper (value: string) {
  return value.trim().replace(/[,.!?]+$/, '').replace(/^(.{1,40})(\s.*|$)/s, '$1') + (value.length > 40 ? '...' : '')
}
