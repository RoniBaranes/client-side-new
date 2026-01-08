/**
 * idb.js - IndexedDB wrapper library for Cost Manager application
 * Vanilla JavaScript version (without modules) for testing
 * This library provides Promise-based API for managing costs in IndexedDB
 */

(function(global) {
  'use strict';

  let _db = null;

  /**
   * Default exchange rates URL
   * This URL should return a JSON object with exchange rates
   * Format: {"USD":1, "GBP":0.6, "EURO":0.7, "ILS":3.4}
   */
  const DEFAULT_RATES_URL = 'https://raw.githubusercontent.com/yourusername/exchange-rates/main/rates.json';

  /**
   * Supported currencies in the application
   */
  const SUPPORTED_CURRENCIES = ['USD', 'ILS', 'GBP', 'EURO'];

  /**
   * Opens or creates a costs database
   * @param {string} databaseName - The name of the database
   * @param {number} databaseVersion - The version number of the database
   * @returns {Promise<Object>} Promise that resolves to a database wrapper object
   */
  function openCostsDB(databaseName, databaseVersion) {
    return new Promise(function(resolve, reject) {
      const request = indexedDB.open(databaseName, databaseVersion);

      request.onupgradeneeded = function(event) {
        const db = event.target.result;

        if (!db.objectStoreNames.contains('costs')) {
          const store = db.createObjectStore('costs', {
            keyPath: 'id',
            autoIncrement: true
          });
          store.createIndex('by_year_month', ['year', 'month'], { unique: false });
          store.createIndex('by_category', 'category', { unique: false });
        }
      };

      request.onsuccess = function() {
        _db = request.result;

        const dbWrapper = {
          addCost: addCost,
          getReport: getReport
        };

        resolve(dbWrapper);
      };

      request.onerror = function() {
        reject(request.error);
      };
    });
  }

  /**
   * Adds a new cost item to the database
   * @param {Object} cost - The cost object with sum, currency, category, description
   * @returns {Promise<Object>} Promise that resolves to the added cost item
   */
  function addCost(cost) {
    if (!_db) {
      return Promise.reject(new Error('Database is not opened. Call openCostsDB first.'));
    }

    return new Promise(function(resolve, reject) {
      const now = new Date();

      const item = {
        sum: Number(cost.sum),
        currency: String(cost.currency),
        category: String(cost.category),
        description: String(cost.description),
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        Date: { day: now.getDate() },
        createdAt: now.toISOString()
      };

      const tx = _db.transaction(['costs'], 'readwrite');
      const store = tx.objectStore('costs');
      const req = store.add(item);

      req.onsuccess = function() {
        resolve({
          sum: item.sum,
          currency: item.currency,
          category: item.category,
          description: item.description,
          Date: item.Date
        });
      };

      req.onerror = function() {
        reject(req.error);
      };
    });
  }

  /**
   * Gets all costs for a specific year and month
   * @param {number} year - The year
   * @param {number} month - The month (1-12)
   * @returns {Promise<Array>} Promise that resolves to array of cost items
   */
  function _getCostsByYearMonth(year, month) {
    if (!_db) {
      return Promise.reject(new Error('Database is not opened.'));
    }

    return new Promise(function(resolve, reject) {
      const tx = _db.transaction(['costs'], 'readonly');
      const store = tx.objectStore('costs');
      const index = store.index('by_year_month');
      const req = index.getAll([Number(year), Number(month)]);

      req.onsuccess = function() {
        resolve(req.result || []);
      };

      req.onerror = function() {
        reject(req.error);
      };
    });
  }

  /**
   * Fetches exchange rates from server
   * @param {string} userUrl - Optional custom URL for exchange rates
   * @returns {Promise<Object>} Promise that resolves to rates object
   */
  function _fetchRates(userUrl) {
    const url = (userUrl && userUrl.trim()) ? userUrl.trim() : DEFAULT_RATES_URL;

    return fetch(url, { method: 'GET' })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }
        return response.json();
      })
      .then(function(data) {
        for (let i = 0; i < SUPPORTED_CURRENCIES.length; i++) {
          const cur = SUPPORTED_CURRENCIES[i];
          if (typeof data[cur] !== 'number') {
            throw new Error('Rates JSON missing currency: ' + cur);
          }
        }
        if (data.USD !== 1) {
          throw new Error('Rates JSON must include USD: 1');
        }
        return data;
      });
  }

  /**
   * Converts amount from one currency to another
   * @param {number} amount - The amount to convert
   * @param {string} fromCurrency - Source currency
   * @param {string} toCurrency - Target currency
   * @param {Object} rates - Exchange rates object
   * @returns {number} Converted amount
   */
  function _convert(amount, fromCurrency, toCurrency, rates) {
    if (fromCurrency === toCurrency) {
      return amount;
    }

    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    const amountInUSD = amount / fromRate;
    const converted = amountInUSD * toRate;

    return Math.round(converted * 100) / 100;
  }

  /**
   * Gets a detailed report for a specific month and year
   * @param {number} year - The year
   * @param {number} month - The month (1-12)
   * @param {string} currency - The currency for the report
   * @returns {Promise<Object>} Promise that resolves to report object
   */
  function getReport(year, month, currency) {
    return _getCostsByYearMonth(year, month)
      .then(function(costsRaw) {
        return _fetchRates()
          .then(function(rates) {
            const convertedCosts = costsRaw.map(function(c) {
              const convertedSum = _convert(c.sum, c.currency, currency, rates);
              return {
                sum: convertedSum,
                currency: c.currency,
                category: c.category,
                description: c.description,
                Date: c.Date || { day: new Date(c.createdAt).getDate() }
              };
            });

            let total = 0;
            for (let i = 0; i < convertedCosts.length; i++) {
              total += Number(convertedCosts[i].sum || 0);
            }

            return {
              year: Number(year),
              month: Number(month),
              costs: convertedCosts,
              total: {
                currency: String(currency),
                total: Math.round(total * 100) / 100
              }
            };
          });
      });
  }

  // Expose the idb object to the global scope
  global.idb = {
    openCostsDB: openCostsDB
  };

})(typeof window !== 'undefined' ? window : global);
