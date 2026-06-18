/** Money + number-to-words helpers (Bangladeshi lakh/crore grouping). */

const bdGroup = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 0 });

export function money(n: number | string | null | undefined, withSymbol = true): string {
  const v = Number(n ?? 0);
  const s = bdGroup.format(Math.abs(v));
  const sign = v < 0 ? '-' : '';
  return `${sign}${withSymbol ? '৳' + ' ' : ''}${s}`;
}

export function plainAmount(n: number | string | null | undefined): string {
  return bdGroup.format(Number(n ?? 0));
}

const ONES = [
  '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function below100(n: number): string {
  if (n < 20) return ONES[n];
  const t = Math.floor(n / 10);
  const r = n % 10;
  return TENS[t] + (r ? '-' + ONES[r] : '');
}

function below1000(n: number): string {
  const h = Math.floor(n / 100);
  const r = n % 100;
  const parts: string[] = [];
  if (h) parts.push(ONES[h] + ' hundred');
  if (r) parts.push(below100(r));
  return parts.join(' ');
}

/** Whole-number to English words using crore / lakh / thousand grouping. */
export function numberToWords(input: number): string {
  let n = Math.floor(Math.abs(input));
  if (n === 0) return 'zero';

  const crore = Math.floor(n / 10000000); n %= 10000000;
  const lakh = Math.floor(n / 100000); n %= 100000;
  const thousand = Math.floor(n / 1000); n %= 1000;

  const parts: string[] = [];
  if (crore) parts.push((crore > 99 ? numberToWords(crore) : below100(crore)) + ' crore');
  if (lakh) parts.push(below100(lakh) + ' lakh');
  if (thousand) parts.push(below100(thousand) + ' thousand');
  if (n) parts.push(below1000(n));
  return parts.join(' ');
}

/** "One Lakh Twenty-Three Thousand Taka Only" — for printed receipts. */
export function amountInWords(amount: number): string {
  const taka = Math.floor(Math.abs(amount));
  const paisa = Math.round((Math.abs(amount) - taka) * 100);
  const cap = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());
  let words = cap(numberToWords(taka)) + ' Taka';
  if (paisa > 0) words += ' and ' + cap(numberToWords(paisa)) + ' Paisa';
  return words + ' Only';
}
