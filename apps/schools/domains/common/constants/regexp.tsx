export const ALPHANUMERIC_REGEXP = /^[a-zA-Z0-9_]+$/
export const UPPER_CASE_ALPHANUMERIC_REGEXP = /^[A-Z0-9_]+$/
export const LETTERS_AND_NUMBERS = /[\p{L}\p{N}]/gu
export const PHONE = /^\+?\d*(\.\d*)?$/
export const PHONE_FORMAT_REGEXP = /(\d)(\d{3})(\d{3})(\d{2})(\d{2})/
export const PHONE_CLEAR_REGEXP = /[^+0-9]/g
export const JAVASCRIPT_URL_XSS =
    /[u00-u1F]*j[\s]*a[\s]*v[\s]*a[\s]*s[\s]*c[\s]*r[\s]*i[\s]*p[\s]*t[\s]*:/i
export const QUERY_SPLIT_REGEX = /[\s.,]+/gm
export const SPECIAL_CHAR_REGEXP = /[^\p{L}\s-]/iu
export const LINEAR_GRADIENT_REGEXP =
    /^linear-gradient\([^(]*(\([^)]*\)[^(]*)*[^)]*\)$/
export const HEX_CODE_REGEXP = /^#(([0-9a-f]){3}){1,2}$/i
export const TWO_OR_MORE_SPACES_REGEXP = /\s\s+/g
export const OMIT_SEARCH_CHARACTERS_REGEXP =
    /[^\p{Alphabetic}\p{Decimal_Number}\s/]/giu
export const MULTIPLE_EMAILS_REGEX =
    /^[\w+.-]+@[a-z\d.-]+\.[a-z]{2,}(\s*,\s*[\w+.-]+@[a-z\d.-]+\.[a-z]{2,})*$/i
export const UUID_REGEXP =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
export const NAME_MUST_NOT_START_REGEXP = /[-]\s|\s[-]/
export const NAME_MUST_CONTAIN_REGEXP = /^\p{L}+(?: \p{L}+)*$/u
