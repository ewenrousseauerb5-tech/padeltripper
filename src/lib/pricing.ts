const GBP_TO_EUR = 1.175;

function parseGbpAmount(value: string): number | null {
  const match = value.match(/£\s*([\d,.]+)/);
  if (!match) return null;

  const normalized = match[1].replace(/,/g, '');
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatCurrency(amount: number, symbol: '£' | '€'): string {
  const rounded = Number.isInteger(amount) ? amount.toString() : amount.toFixed(2);
  return `${symbol}${rounded}`;
}

export function toDualCurrencyDisplay(gbpValue: string): string {
  const gbpAmount = parseGbpAmount(gbpValue);
  if (gbpAmount == null) return gbpValue;

  const eurAmount = Math.round((gbpAmount * GBP_TO_EUR) / 5) * 5;
  return `${formatCurrency(gbpAmount, '£')} / ${formatCurrency(eurAmount, '€')}`;
}
