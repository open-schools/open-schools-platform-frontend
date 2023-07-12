const { phone } = require("phone");

export function normalizePhone(data: string, allowLandLine = false) {
  if (!data || !data.startsWith("+")) return;
  const result = phone(data, {
    validateMobilePrefix: !allowLandLine,
    strictDetection: true,
  });
  if (result.isValid) return result.phoneNumber;
}
