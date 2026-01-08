/**
 * CurrencyService.js - Currency exchange rate management
 * This service fetches exchange rates from a remote server and provides
 * currency conversion functionality
 */

/**
 * Default URL for fetching exchange rates
 * Should return JSON in format: {"USD":1, "GBP":0.6, "EURO":0.7, "ILS":3.4}
 * You should replace this with your actual deployed JSON file URL
 */
export const DEFAULT_RATES_URL =
  "https://raw.githubusercontent.com/yourusername/exchange-rates/main/rates.json";

/**
 * List of supported currencies in the application
 */
export const SUPPORTED_CURRENCIES = ["USD", "ILS", "GBP", "EURO"];

/**
 * Fetches exchange rates from the server
 * @param {string} userUrl - Optional custom URL for exchange rates
 * @returns {Promise<Object>} Promise that resolves to rates object
 */
export async function fetchRates(userUrl) {
  const url = (userUrl && userUrl.trim()) ? userUrl.trim() : DEFAULT_RATES_URL;

  const res = await fetch(url, { method: "GET" });
  if (!res.ok) throw new Error("Failed to fetch exchange rates");

  const data = await res.json();

  // Validate that all required currencies are present
  for (const cur of SUPPORTED_CURRENCIES) {
    if (typeof data[cur] !== "number") {
      throw new Error("Rates JSON missing currency: " + cur);
    }
  }

  // Validate that USD is the base currency (rate = 1)
  if (data.USD !== 1) throw new Error("Rates JSON must include USD: 1");

  return data;
}

/**
 * Converts an amount from one currency to another
 * @param {number} amount - The amount to convert
 * @param {string} fromCurrency - Source currency code
 * @param {string} toCurrency - Target currency code
 * @param {Object} rates - Exchange rates object
 * @returns {number} Converted amount rounded to 2 decimal places
 */
export function convert(amount, fromCurrency, toCurrency, rates) {
  if (fromCurrency === toCurrency) return amount;

  const fromRate = rates[fromCurrency];
  const toRate = rates[toCurrency];

  // Convert to USD first, then to target currency
  const amountInUSD = amount / fromRate;
  const converted = amountInUSD * toRate;

  return Math.round(converted * 100) / 100;
}
