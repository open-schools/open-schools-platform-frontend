export function sumObjectValues(obj: any) {
  return Object.keys(obj).reduce((sum, key) => sum + parseFloat(obj[key] || 0), 0)
}
