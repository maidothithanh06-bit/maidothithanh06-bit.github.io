/**
 * Formatting utilities for PITHY E-Commerce
 */

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount).replace('₫', 'VNĐ');
}

export function formatShortVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
}

/**
 * Generate unique order code according to requirement:
 * Format: PTH-YYYYMMDD-XXXXXX
 */
export function generateOrderCode(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const datePart = `${year}${month}${day}`;

  // High entropy unique token (timestamp ms remainder + crypto or pseudorandom hex)
  const timeSlice = (Date.now() % 100000).toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  const token = (timeSlice + randomPart).substring(0, 6).padEnd(6, 'X');

  return `PTH-${datePart}-${token}`;
}

/**
 * Validate Vietnamese phone numbers (10 digits starting with 03, 05, 07, 08, 09)
 */
export function validateVietnamesePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s.-]/g, '');
  const vnPhoneRegex = /^(03|05|07|08|09)\d{8}$/;
  return vnPhoneRegex.test(cleaned);
}

/**
 * Validate standard email
 */
export function validateEmail(email: string): boolean {
  if (!email) return true; // Optional field
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize cell content against Formula Injection in Google Sheets
 * If text begins with =, +, -, @, or tab/CR, prepend an apostrophe (')
 */
export function sanitizeForSheet(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '';
  const str = String(value).trim();
  if (/^[=+\-@\t\r]/.test(str)) {
    return `'${str}`;
  }
  return str;
}

export function formatDateTimeVi(dateStr?: string): string {
  const date = dateStr ? new Date(dateStr) : new Date();
  return date.toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
