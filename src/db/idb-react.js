/**
 * idb-react.js - IndexedDB wrapper for React application
 * This module provides Promise-based API for managing costs in IndexedDB
 * React/ES6 module version with import/export support
 */

import { fetchRates, convert } from "../services/CurrencyService.js";

let _db = null;

/**
 * Internal function to open/create the IndexedDB database
 * @param {string} databaseName - Database name
 * @param {number} databaseVersion - Database version
 * @returns {Promise<IDBDatabase>} Promise resolving to database instance
 */
function _openDbInternal(databaseName, databaseVersion) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName, databaseVersion);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("costs")) {
        const store = db.createObjectStore("costs", {
          keyPath: "id",
          autoIncrement: true
        });
        store.createIndex("by_year_month", ["year", "month"], { unique: false });
        store.createIndex("by_category", "category", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Opens the costs database and returns wrapper object with database methods
 * @param {string} databaseName - Name of the database
 * @param {number} databaseVersion - Version number
 * @returns {Promise<Object>} Promise resolving to database wrapper with methods
 */
export async function openCostsDB(databaseName, databaseVersion) {
  _db = await _openDbInternal(databaseName, databaseVersion);

  return {
    addCost,
    getReport,
    getCategoryTotalsForMonth,
    getYearTotals,
  };
}

/**
 * Ensures database is open before operations
 * @returns {IDBDatabase} Database instance
 * @throws {Error} If database is not opened
 */
function _requireDb() {
  if (!_db) throw new Error("DB is not opened. Call openCostsDB first.");
  return _db;
}

/**
 * Adds a new cost item to the database
 * @param {Object} cost - Cost object with sum, currency, category, description
 * @returns {Promise<Object>} Promise resolving to the added cost item
 */
export function addCost(cost) {
  const db = _requireDb();

  const now = new Date();
  const item = {
    sum: Number(cost.sum),
    currency: String(cost.currency),
    category: String(cost.category),
    description: String(cost.description),
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    Date: { day: now.getDate() },
    createdAt: now.toISOString(),
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(["costs"], "readwrite");
    const store = tx.objectStore("costs");

    const req = store.add(item);

    req.onsuccess = () => {
      const inserted = { ...item, id: req.result };
      resolve({
        sum: inserted.sum,
        currency: inserted.currency,
        category: inserted.category,
        description: inserted.description,
        Date: inserted.Date,
        id: inserted.id,
      });
    };

    req.onerror = () => reject(req.error);
  });
}

/**
 * Gets all costs for a specific year and month
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @returns {Promise<Array>} Promise resolving to array of costs
 */
async function _getCostsByYearMonth(year, month) {
  const db = _requireDb();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(["costs"], "readonly");
    const store = tx.objectStore("costs");
    const index = store.index("by_year_month");

    const req = index.getAll([Number(year), Number(month)]);
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Gets all costs from the database
 * @returns {Promise<Array>} Promise resolving to array of all costs
 */
async function _getAllCostsRaw() {
  const db = _requireDb();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(["costs"], "readonly");
    const store = tx.objectStore("costs");

    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Gets detailed report for a specific month and year in specified currency
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @param {string} currency - Target currency code
 * @param {string} ratesUrlOptional - Optional custom URL for exchange rates
 * @returns {Promise<Object>} Promise resolving to report object
 */
export async function getReport(year, month, currency, ratesUrlOptional) {
  const costsRaw = await _getCostsByYearMonth(year, month);
  const rates = await fetchRates(ratesUrlOptional);

  const convertedCosts = costsRaw.map((c) => {
    const convertedSum = convert(c.sum, c.currency, currency, rates);
    return {
      sum: convertedSum,
      currency: c.currency,
      category: c.category,
      description: c.description,
      Date: c.Date || { day: new Date(c.createdAt).getDate() },
    };
  });

  const total = convertedCosts.reduce((acc, c) => acc + Number(c.sum || 0), 0);

  return {
    year: Number(year),
    month: Number(month),
    costs: convertedCosts,
    total: { currency: String(currency), total: Math.round(total * 100) / 100 },
  };
}

/**
 * Gets category totals for a specific month and year
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @param {string} currency - Target currency code
 * @param {string} ratesUrlOptional - Optional custom URL for exchange rates
 * @returns {Promise<Object>} Promise resolving to object with category totals
 */
export async function getCategoryTotalsForMonth(year, month, currency, ratesUrlOptional) {
  const costs = await _getCostsByYearMonth(year, month);
  const rates = await fetchRates(ratesUrlOptional);

  const totals = {};
  for (const c of costs) {
    const v = convert(c.sum, c.currency, currency, rates);
    totals[c.category] = (totals[c.category] || 0) + v;
  }

  for (const k of Object.keys(totals)) {
    totals[k] = Math.round(totals[k] * 100) / 100;
  }

  return totals;
}

/**
 * Gets yearly totals per month for bar chart
 * @param {number} year - Year
 * @param {string} currency - Target currency code
 * @param {string} ratesUrlOptional - Optional custom URL for exchange rates
 * @returns {Promise<Array>} Promise resolving to array of 12 monthly totals
 */
export async function getYearTotals(year, currency, ratesUrlOptional) {
  const all = await _getAllCostsRaw();
  const rates = await fetchRates(ratesUrlOptional);

  const months = Array(12).fill(0);

  for (const c of all) {
    if (Number(c.year) !== Number(year)) continue;
    const idx = Number(c.month) - 1;
    const v = convert(c.sum, c.currency, currency, rates);
    months[idx] += v;
  }

  return months.map((x) => Math.round(x * 100) / 100);
}
